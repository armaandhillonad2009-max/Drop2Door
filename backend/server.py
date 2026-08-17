import os
import re
import time
import ipaddress
import logging
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path
from typing import Optional
from datetime import datetime, timezone

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, Request
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

# ---------------- Guardrail gate (managed email) ----------------
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: Optional[str] = None) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as client_http:
            resp = await client_http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        return None


# ---------------- Rate limiting ----------------
_rate: dict = {}


def rate_limit(ip: str, limit: int = 6, window: int = 3600) -> None:
    now = time.time()
    hits = [t for t in _rate.get(ip, []) if now - t < window]
    if len(hits) >= limit:
        raise HTTPException(status_code=429, detail="Too many requests. Please try again later or message us on WhatsApp.")
    hits.append(now)
    _rate[ip] = hits


# ---------------- Models ----------------
class QuoteRequest(BaseModel):
    name: str
    phone: str
    email: EmailStr
    address: Optional[str] = ""
    postal_code: Optional[str] = ""
    customer_type: Optional[str] = "Residential"
    product: Optional[str] = ""
    quantity: Optional[str] = ""
    preferred_date: Optional[str] = ""
    preferred_time: Optional[str] = ""
    message: Optional[str] = ""


class BulkQuoteRequest(BaseModel):
    name: str
    organization: Optional[str] = ""
    email: EmailStr
    phone: str
    event_type: Optional[str] = ""
    event_date: Optional[str] = ""
    address: Optional[str] = ""
    quantity: Optional[str] = ""
    product: Optional[str] = ""
    notes: Optional[str] = ""


def _row(label: str, value: str) -> str:
    return (
        f'<tr><td style="padding:8px 16px 8px 0;color:#64748b;font-size:13px;'
        f'vertical-align:top;white-space:nowrap">{escape(label)}</td>'
        f'<td style="padding:8px 0;color:#0f172a;font-size:14px">{escape(value or "-")}</td></tr>'
    )


def _email_shell(title: str, rows: str) -> str:
    return (
        '<table role="presentation" width="100%" style="background:#f1f5f9;padding:24px 0">'
        '<tr><td align="center"><table role="presentation" width="560" '
        'style="background:#ffffff;border-radius:12px;padding:32px;font-family:Arial,sans-serif">'
        f'<tr><td><p style="margin:0 0 4px;font-size:12px;letter-spacing:2px;color:#0284c7;'
        f'text-transform:uppercase">{escape(EMAIL_FROM_NAME)}</p>'
        f'<h1 style="margin:0 0 20px;font-size:22px;color:#0f172a">{escape(title)}</h1>'
        f'<table role="presentation" width="100%">{rows}</table>'
        '<p style="margin:24px 0 0;font-size:12px;color:#94a3b8">Submitted through the Drop2Door '
        "website request form. Reply directly to the customer using the contact details above.</p>"
        "</td></tr></table></td></tr></table>"
    )


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "Drop2Door Water Delivery Services API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/quote")
async def create_quote(payload: QuoteRequest, request: Request):
    rate_limit(request.client.host if request.client else "unknown")
    doc = payload.model_dump()
    doc["id"] = os.urandom(8).hex()
    doc["kind"] = "quote"
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.quote_requests.insert_one(doc)

    rows = "".join([
        _row("Name", payload.name),
        _row("Phone", payload.phone),
        _row("Email", payload.email),
        _row("Delivery address", payload.address),
        _row("Postal code", payload.postal_code),
        _row("Customer type", payload.customer_type),
        _row("Product", payload.product),
        _row("Quantity", payload.quantity),
        _row("Preferred date", payload.preferred_date),
        _row("Preferred time", payload.preferred_time),
        _row("Message", payload.message),
    ])
    html = _email_shell(f"New quote request from {payload.name}", rows)
    email_id = await send_email(to=OWNER_EMAIL, subject=f"New Quote Request: {payload.name}", html=html)
    return {"status": "success", "id": doc["id"], "email_sent": bool(email_id)}


@api_router.post("/bulk-quote")
async def create_bulk_quote(payload: BulkQuoteRequest, request: Request):
    rate_limit(request.client.host if request.client else "unknown")
    doc = payload.model_dump()
    doc["id"] = os.urandom(8).hex()
    doc["kind"] = "bulk"
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.quote_requests.insert_one(doc)

    rows = "".join([
        _row("Name", payload.name),
        _row("Organization", payload.organization),
        _row("Email", payload.email),
        _row("Phone", payload.phone),
        _row("Event / business type", payload.event_type),
        _row("Event date", payload.event_date),
        _row("Delivery address", payload.address),
        _row("Estimated quantity", payload.quantity),
        _row("Product / brand", payload.product),
        _row("Notes", payload.notes),
    ])
    title = f"New bulk quote request from {payload.organization or payload.name}"
    html = _email_shell(title, rows)
    email_id = await send_email(to=OWNER_EMAIL, subject=f"New Bulk Quote Request: {payload.organization or payload.name}", html=html)
    return {"status": "success", "id": doc["id"], "email_sent": bool(email_id)}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
