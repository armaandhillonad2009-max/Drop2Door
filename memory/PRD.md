# PRD: Drop2Door Water Delivery Services Website

## Original Problem Statement
Build a complete, production-ready, premium website for Drop2Door Water Delivery Services, a real bottled-water delivery business operating in the Greater Toronto Area since January 2026. Must use real uploaded photography, WhatsApp-first ordering (+1 647 375-3572), a working quote/request form emailed to drop2doorwater@gmail.com, a postal-code/city delivery-area checker, curated Google reviews, Instagram/TikTok links, and be deployable free on Netlify. Visual bar: Apple.com / Based.com polish, dark + icy + premium, Awwwards-level motion (masked hero reveal, framer-motion reveals, lenis smooth scroll, editorial marquee, numbered manifesto chapters). No subscriptions, no fixed prices (quote-based), min 10 packs/cases, Eska 35-pack only, no owner photo, no legal entity name, no invented info. No em dashes in copy.

## Architecture
- Frontend: React 19 SPA (CRA/craco), Tailwind, framer-motion, lenis, sonner, react-router-dom v7. Content centralized in `src/data/site.js` (business info, products, reviews, cities, gallery, WhatsApp messages).
- Backend: FastAPI `/api/quote` + `/api/bulk-quote` -> saves to MongoDB `quote_requests` + emails drop2doorwater@gmail.com via Emergent managed Resend proxy (server-side templates, guardrail gate, IP rate limit 6/hr).
- Images: real uploads cropped/optimized into webp in `frontend/public/images/` (hero strip, bottle cutouts per brand, glacier/eska panels, brand card, phoenix mark, favicon).
- Deploy: `frontend/netlify.toml` (yarn build, SPA redirects, REACT_APP_BACKEND_URL env).

## User Personas
- Residential customer wanting cases delivered without store trips
- Business/office manager needing recurring or large orders
- Event planner (weddings, parties, corporate) needing bulk scheduled delivery
- Restaurant/hotel buyer

## Core Requirements (static)
WhatsApp CTAs with context pre-filled messages; working quote modal + bulk form; area checker (GTA postal FSAs + city list); 4 curated reviews auto-rotating with See Us on Google; social links; real photo gallery; About story; legal pages (Privacy, Terms, Delivery & Cancellation: no returns/refunds, 24h cancellation notice); local SEO (titles, meta, JSON-LD LocalBusiness); responsive + floating WhatsApp button; performance-conscious.

## Implemented (2026-08-17)
- Full site: Home (kinetic masked hero, marquee, brands, manifesto 01-04, film strip, checker, reviews, CTA), Water, Delivery Areas, Events & Bulk (bulk form), Gallery, About, Contact, Privacy, Terms, Delivery Policy
- Backend quote + bulk endpoints live, verified `email_sent: true` to owner inbox, Mongo backup
- Area checker verified both verdicts (L6Y 1A1 yes; K1A 0B1 outside)
- Lenis + framer-motion throughout, reduced-motion support, lazy images, webp optimization
- Netlify config ready

## Iteration 2026-08-17 (v2, owner-requested changes)
- Navbar: replaced logo lockup with owner's attached logo image (`logo-dark.png`); right corner phone number replaced with icon-only WhatsApp button
- Hero: glacier motion clip embedded as background (`/videos/glacier.mp4` H.264 + `glacier.webm` VP9 fallback), fades in on load, fades out on scroll and after clip ends; disabled under prefers-reduced-motion
- Gallery: removed bottle/glacier visuals; added 2 new real photos (`sidewalk.webp` curbside skid, `van-interior.webp` strapped load); grid uses grid-flow-dense
- Home/Water brand cards: replaced single-bottle crops with tilted editorial cards using full trio photo (`bottles.webp`) with per-brand `pos` object-position focus; hero bottle frame now tilted with offset border
- Manifesto 04 image swapped to sidewalk.webp; Water page header bg swapped to panel-glacier.webp
- Deleted bottle-kirkland/eska/compliments crop files

## Iteration 2026-08-17 (v3, owner-requested changes)
- Hero: removed the 3-bottle frame; hero is now centered cinematic type over the glacier video
- Glacier video now loops forever (no end fade-out; scroll fade-away kept); added portrait-cropped `glacier-mobile.mp4/.webm` served via source media query under 640px
- Product cards (Home brands + Water): real case photos with white backgrounds removed programmatically (`product-kirkland/eska/compliments.webp`, transparent, flood-fill cutout via /app/scripts/cutout_products.py), shown on dark radial ice stages with glow, tilted frames kept
- Added "Other water companies are available on request" note under product grids on Home and Water
- Gallery: added `delivery-stack.webp` (stacked cases photo), now 7 items

## Iteration 2026-08-17 (v4, owner-requested changes)
- Glacier loop smoothed: video is now a forward+reverse boomerang (11.75s) so the loop point is seamless; regenerated glacier.mp4/webm and mobile crops (original kept as glacier-orig.mp4)
- CTABand: glacier clip fades in behind the final call-to-action (whileInView, opacity 0.35, mobile crop sources), page now opens and closes on ice
- Product cards (Home + Water): new Tilt component (framer-motion springs, perspective 900) makes each case lean toward the cursor
- Gallery: explicit lg grid placement (4x3 mosaic, no gaps), clean sm stacking; fixed swapped captions/alts between van-interior and sidewalk photos
- Reviews: redesigned card, centered layout (stars, quote, author, divider, dots + Google link), removed decorative quote icon that overlapped the stars

## Verified
- curl POST /api/quote and /api/bulk-quote: success + email sent
- Screenshots: hero, manifesto, modal, checker both verdicts, reviews, mobile home + events

## Backlog / Next
- P1: Custom domain on Netlify; update REACT_APP_BACKEND_URL env in netlify.toml if backend URL changes
- P1: Add fixed prices later if owner provides them
- P2: More real photos (other vans, staff) when available
- P2: Google review refresh as new reviews come in

## Notes for Future Edits
All editable content lives in `src/data/site.js`: SITE contact info, WA_MESSAGES, PRODUCTS, REVIEWS, CITIES, GALLERY, PRODUCT_OPTIONS, TIME_SLOTS. Legal copy in `src/pages/Legal.jsx`.
