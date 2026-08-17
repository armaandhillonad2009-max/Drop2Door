from PIL import Image
import os

DIR = "/app/frontend/public/images"

src = Image.open(os.path.join(DIR, "hero-main.png")).convert("RGB")
w, h = src.size
strip_y = int(h * 0.665)

def save_webp(im, name, q=84, max_w=1600):
    if im.width > max_w:
        im = im.resize((max_w, int(im.height * max_w / im.width)), Image.LANCZOS)
    im.save(os.path.join(DIR, name), "WEBP", quality=q, method=6)
    print(name, im.size)

save_webp(src.crop((0, 0, w, strip_y)), "hero-strip.webp", q=82)
save_webp(src.crop((760, 0, w, strip_y)), "bottles.webp", q=86)
save_webp(src.crop((775, 60, 925, 660)), "bottle-compliments.webp", q=86)
save_webp(src.crop((895, 25, 1095, 665)), "bottle-eska.webp", q=86)
save_webp(src.crop((1065, 55, 1295, 665)), "bottle-kirkland.webp", q=86)
save_webp(src.crop((0, strip_y, w // 2, h)), "panel-glacier.webp", q=82)
save_webp(src.crop((w // 2, strip_y, w, h)), "panel-eska.webp", q=82)

card = Image.open(os.path.join(DIR, "hero-alt.png")).convert("RGB")
save_webp(card, "brand-card.webp", q=88)

for name in ["water5.webp", "water7.webp", "vehicle.webp"]:
    im = Image.open(os.path.join(DIR, name)).convert("RGB")
    save_webp(im, name, q=80)

os.remove(os.path.join(DIR, "hero-main.png"))
os.remove(os.path.join(DIR, "hero-alt.png"))
print("done")
