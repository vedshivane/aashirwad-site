from pathlib import Path
from PIL import Image, ImageFilter, ImageStat

ROOT = Path(__file__).resolve().parents[1]
PROJECT_ROOT = ROOT.parent
SRC_DIR = PROJECT_ROOT / "public" / "images" / "frames"
OUT_DIR = SRC_DIR / "textures"
OUT_DIR.mkdir(parents=True, exist_ok=True)

sources = {
    "coffee-black": SRC_DIR / "frame-coffee-black.png",
    "sandalwood": SRC_DIR / "frame-sandalwood.png",
    "ecoteak": SRC_DIR / "frame-ecoteak.png",
}

for key, src in sources.items():
    img = Image.open(src).convert("RGBA")
    alpha = img.getchannel("A")
    bbox = alpha.getbbox()
    if not bbox:
        continue
    crop = img.crop(bbox)
    w, h = crop.size

    # Find a smooth fully-opaque patch with minimal edge detail.
    gray = crop.convert("L")
    edges = gray.filter(ImageFilter.FIND_EDGES)
    crop_alpha = crop.getchannel("A")

    pw = max(48, int(w * 0.18))
    ph = max(48, int(h * 0.22))
    step = max(8, min(pw, ph) // 6)

    best_box = None
    best_score = None

    x_start = int(w * 0.05)
    x_end = max(x_start + 1, int(w * 0.82))
    y_start = int(h * 0.12)
    y_end = max(y_start + 1, int(h * 0.75))

    for y0 in range(y_start, y_end, step):
        for x0 in range(x_start, x_end, step):
            x1 = x0 + pw
            y1 = y0 + ph
            if x1 > w or y1 > h:
                continue

            a_patch = crop_alpha.crop((x0, y0, x1, y1))
            a_min, _ = a_patch.getextrema()
            if a_min < 245:
                continue

            edge_mean = ImageStat.Stat(edges.crop((x0, y0, x1, y1))).mean[0]
            lum_mean = ImageStat.Stat(gray.crop((x0, y0, x1, y1))).mean[0]

            # Lower score = flatter patch with moderate brightness.
            score = edge_mean + abs(lum_mean - 138) * 0.03

            if best_score is None or score < best_score:
                best_score = score
                best_box = (x0, y0, x1, y1)

    if best_box is None:
        # Fallback to a central region if no opaque candidate is found.
        x0 = max(0, (w - pw) // 2)
        y0 = max(0, (h - ph) // 2)
        best_box = (x0, y0, x0 + pw, y0 + ph)

    patch = crop.crop(best_box)

    # upscale to make a texture tile with enough detail
    tile = patch.resize((512, 512), Image.Resampling.LANCZOS)
    tile.save(OUT_DIR / f"{key}-grain.png")

print("saved textures to", OUT_DIR)
