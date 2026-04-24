from __future__ import annotations

import argparse
from collections import deque
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PROJECT_ROOT = ROOT.parent
DEFAULT_SOURCE = ROOT / "images" / "zigzag.png"
DEFAULT_OUTPUT = PROJECT_ROOT / "public" / "images" / "doors" / "zigzag-wood.png"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Clean the zigzag door image and export a transparent PNG.")
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    return parser.parse_args()


def is_background_pixel(pixel: tuple[int, int, int, int]) -> bool:
    r, g, b, _ = pixel
    max_channel = max(r, g, b)
    min_channel = min(r, g, b)
    chroma = max_channel - min_channel
    return max_channel >= 240 and chroma <= 10


def remove_background(image: Image.Image) -> Image.Image:
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

    return rgba


def main() -> None:
    args = parse_args()
    if not args.source.exists():
        raise FileNotFoundError(f"Source image not found: {args.source}")

    output = remove_background(Image.open(args.source))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    output.save(args.output)
    print(args.output.as_posix())


if __name__ == "__main__":
    main()
