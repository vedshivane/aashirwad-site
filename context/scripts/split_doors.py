from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PROJECT_ROOT = ROOT.parent
DEFAULT_SOURCE = ROOT / "images" / "input.png"
DEFAULT_OUTPUT_DIR = PROJECT_ROOT / "public" / "images" / "doors"
OUTPUT_FILES = ("ecoteak-501.png", "zigzag-wood.png", "teak.png")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Split a 3-door composite image into individual transparent PNG assets "
            "for the EcoTeak 501, Zigzag Wood, and Teak door finishes."
        )
    )
    parser.add_argument(
        "--source",
        type=Path,
        default=DEFAULT_SOURCE,
        help=f"Composite image path. Defaults to {DEFAULT_SOURCE}.",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help=f"Output directory. Defaults to {DEFAULT_OUTPUT_DIR}.",
    )
    parser.add_argument(
        "--trim",
        type=int,
        default=14,
        help="Extra pixels trimmed from each detected door edge to remove thin borders.",
    )
    return parser.parse_args()


def luminance(pixel: tuple[int, int, int] | tuple[int, int, int, int]) -> float:
    r, g, b = pixel[:3]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def is_background(pixel: tuple[int, int, int, int]) -> bool:
    r, g, b, a = pixel
    if a == 0:
        return True

    max_channel = max(r, g, b)
    min_channel = min(r, g, b)
    chroma = max_channel - min_channel
    bright = luminance(pixel)

    return bright >= 214 and chroma <= 24


def find_vertical_segments(image: Image.Image) -> list[tuple[int, int]]:
    width, height = image.size
    segments: list[tuple[int, int]] = []
    in_segment = False
    start = 0
    min_pixels = max(24, height // 14)

    for x in range(width):
        dark_pixels = 0
        for y in range(height):
            if not is_background(image.getpixel((x, y))):
                dark_pixels += 1

        if dark_pixels >= min_pixels and not in_segment:
            start = x
            in_segment = True
        elif dark_pixels < min_pixels and in_segment:
            if x - start > width // 18:
                segments.append((start, x))
            in_segment = False

    if in_segment and width - start > width // 18:
        segments.append((start, width))

    return segments


def remove_background(chunk: Image.Image) -> Image.Image:
    rgba = chunk.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size

    for y in range(height):
        for x in range(width):
            pixel = pixels[x, y]
            if is_background(pixel):
                pixels[x, y] = (255, 255, 255, 0)

    return rgba


def trim_to_alpha(chunk: Image.Image, trim: int) -> Image.Image:
    alpha = chunk.getchannel("A")
    bbox = alpha.getbbox()
    if not bbox:
        return chunk

    left, top, right, bottom = bbox
    left = min(max(left + trim, 0), right)
    top = min(max(top + trim, 0), bottom)
    right = max(min(right - trim, chunk.width), left)
    bottom = max(min(bottom - trim, chunk.height), top)
    return chunk.crop((left, top, right, bottom))


def split_doors(source: Path, output_dir: Path, trim: int) -> list[Path]:
    if not source.exists():
        raise FileNotFoundError(
            f"Source image not found: {source}. Place the composite image there or pass --source."
        )

    output_dir.mkdir(parents=True, exist_ok=True)
    image = Image.open(source).convert("RGBA")
    segments = find_vertical_segments(image)

    if len(segments) != 3:
        raise RuntimeError(
            f"Expected 3 door segments, found {len(segments)}. "
            "Use a clean 3-door composite with light background."
        )

    saved_paths: list[Path] = []
    for (left, right), filename in zip(segments, OUTPUT_FILES, strict=True):
        chunk = image.crop((left, 0, right, image.height))
        chunk = remove_background(chunk)
        chunk = trim_to_alpha(chunk, trim)

        output_path = output_dir / filename
        chunk.save(output_path)
        saved_paths.append(output_path)

    return saved_paths


def main() -> None:
    args = parse_args()
    saved_paths = split_doors(args.source, args.output_dir, args.trim)
    for path in saved_paths:
        print(path.as_posix())


if __name__ == "__main__":
    main()
