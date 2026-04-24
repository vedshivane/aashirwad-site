from __future__ import annotations

import argparse
from pathlib import Path
from collections import deque

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
PROJECT_ROOT = ROOT.parent
DEFAULT_OUTPUT_DIR = PROJECT_ROOT / "public" / "images" / "doors"

ASSET_SPECS = (
    {
        "source": ROOT / "images" / "greyandwhite.jpeg",
        "output": "white-solid-panel.png",
        "crop": (18, 48, 525, 1512),
        "polygon": ((20, 12), (0, 1458), (494, 1415), (506, 55)),
    },
    {
        "source": ROOT / "images" / "greyandwhite.jpeg",
        "output": "grey-solid-panel.png",
        "crop": (560, 72, 997, 1490),
        "polygon": ((14, 16), (0, 1414), (437, 1368), (431, 49)),
    },
    {
        "source": ROOT / "images" / "white_solid.jpeg",
        "output": "white-solid-designed.png",
        "crop": (0, 0, 203, 556),
        "polygon": ((10, 8), (0, 551), (193, 543), (198, 12)),
    },
    {
        "source": ROOT / "images" / "grey_solid.jpeg",
        "output": "grey-solid-designed.png",
        "crop": (0, 0, 207, 552),
        "polygon": ((13, 10), (0, 548), (205, 541), (206, 17)),
    },
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build transparent PNG door assets for the solid and designed grey/white variants."
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help=f"Output directory. Defaults to {DEFAULT_OUTPUT_DIR}.",
    )
    parser.add_argument(
        "--padding",
        type=int,
        default=6,
        help="Padding in pixels retained around each extracted door.",
    )
    return parser.parse_args()


def crop_to_alpha(image: Image.Image, padding: int) -> Image.Image:
    alpha = image.getchannel("A")
    bbox = alpha.getbbox()
    if not bbox:
        return image

    left, top, right, bottom = bbox
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(image.width, right + padding)
    bottom = min(image.height, bottom + padding)
    return image.crop((left, top, right, bottom))


def is_background_pixel(pixel: tuple[int, int, int, int]) -> bool:
    r, g, b, _ = pixel
    max_channel = max(r, g, b)
    min_channel = min(r, g, b)
    chroma = max_channel - min_channel
    return max_channel >= 242 and chroma <= 14


def remove_border_background(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size
    visited = [[False] * width for _ in range(height)]
    queue: deque[tuple[int, int]] = deque()

    def enqueue(x: int, y: int) -> None:
        if visited[y][x]:
            return
        if not is_background_pixel(pixels[x, y]):
            return
        visited[y][x] = True
        queue.append((x, y))

    for x in range(width):
        enqueue(x, 0)
        enqueue(x, height - 1)

    for y in range(height):
        enqueue(0, y)
        enqueue(width - 1, y)

    while queue:
        x, y = queue.popleft()
        pixels[x, y] = (255, 255, 255, 0)

        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height:
                if not visited[ny][nx] and is_background_pixel(pixels[nx, ny]):
                    visited[ny][nx] = True
                    queue.append((nx, ny))

    return crop_to_alpha(rgba, 2)


def render_asset(source: Path, crop: tuple[int, int, int, int], polygon: tuple[tuple[int, int], ...], padding: int) -> Image.Image:
    image = Image.open(source).convert("RGBA").crop(crop)
    alpha_mask = Image.new("L", image.size, 0)
    draw = ImageDraw.Draw(alpha_mask)
    draw.polygon(polygon, fill=255)
    image.putalpha(alpha_mask)
    return crop_to_alpha(image, padding)


def build_assets(output_dir: Path, padding: int) -> list[Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    saved_paths: list[Path] = []

    for spec in ASSET_SPECS:
        result = render_asset(spec["source"], spec["crop"], spec["polygon"], padding)
        if spec["output"] in {"white-solid-designed.png", "grey-solid-designed.png"}:
            result = remove_border_background(result)
        output_path = output_dir / spec["output"]
        result.save(output_path)
        saved_paths.append(output_path)

    return saved_paths


def main() -> None:
    args = parse_args()
    saved_paths = build_assets(args.output_dir, args.padding)
    for path in saved_paths:
        print(path.as_posix())


if __name__ == "__main__":
    main()
