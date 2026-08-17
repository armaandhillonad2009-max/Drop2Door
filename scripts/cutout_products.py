import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

DIR = "/app/frontend/public/images"


def cutout(src, dst, tol=14, max_w=900):
    im = Image.open(src).convert("RGB")
    if im.width > max_w:
        im = im.resize((max_w, int(im.height * max_w / im.width)), Image.LANCZOS)
    a = np.asarray(im).astype(np.int16)
    white = (a[:, :, 0] > 255 - tol) & (a[:, :, 1] > 255 - tol) & (a[:, :, 2] > 255 - tol)
    lbl, _ = ndimage.label(white)
    border = set(np.unique(np.concatenate([lbl[0, :], lbl[-1, :], lbl[:, 0], lbl[:, -1]])))
    border.discard(0)
    bg = np.isin(lbl, list(border))
    alpha = np.where(bg, 0, 255).astype(np.uint8)
    am = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(1.2))
    out = im.convert("RGBA")
    out.putalpha(am)
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
    out.save(dst, "WEBP", quality=88, method=6)
    print(dst, out.size)


cutout(f"{DIR}/raw-compliments.png", f"{DIR}/product-compliments.webp")
cutout(f"{DIR}/raw-eska.png", f"{DIR}/product-eska.webp")
cutout(f"{DIR}/raw-kirkland.png", f"{DIR}/product-kirkland.webp")

im = Image.open(f"{DIR}/raw-delivery.png").convert("RGB")
if im.width > 1200:
    im = im.resize((1200, int(im.height * 1200 / im.width)), Image.LANCZOS)
im.save(f"{DIR}/delivery-stack.webp", "WEBP", quality=82, method=6)
print("delivery-stack.webp", im.size)
