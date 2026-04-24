from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PROJECT_ROOT = ROOT.parent
SOURCE = ROOT / "brand" / "logo-source.jpeg"
PUBLIC = PROJECT_ROOT / "public"


def build_mask(image: Image.Image) -> list[list[int]]:
    rgba = image.convert("RGBA")
    width, height = rgba.size
    pixels = rgba.load()
    mask = [[0] * width for _ in range(height)]

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a and not (r > 235 and g > 235 and b > 235):
                mask[y][x] = 1

    return mask


def connected_components(mask: list[list[int]]) -> list[tuple[int, tuple[int, int, int, int]]]:
    height = len(mask)
    width = len(mask[0])
    visited = [[False] * width for _ in range(height)]
    components: list[tuple[int, tuple[int, int, int, int]]] = []

    for y in range(height):
        for x in range(width):
            if not mask[y][x] or visited[y][x]:
                continue

            queue = deque([(x, y)])
            visited[y][x] = True
            count = 0
            min_x = max_x = x
            min_y = max_y = y

            while queue:
                cx, cy = queue.popleft()
                count += 1
                min_x = min(min_x, cx)
                max_x = max(max_x, cx)
                min_y = min(min_y, cy)
                max_y = max(max_y, cy)

                for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if 0 <= nx < width and 0 <= ny < height and mask[ny][nx] and not visited[ny][nx]:
                        visited[ny][nx] = True
                        queue.append((nx, ny))

            components.append((count, (min_x, min_y, max_x, max_y)))

    return components


def emblem_bounds(image: Image.Image) -> tuple[int, int, int, int]:
    mask = build_mask(image)
    components = connected_components(mask)

    emblem_components = []
    for area, bounds in components:
        min_x, min_y, max_x, max_y = bounds
        if area < 1400:
            continue
        if max_y > 470:
            continue
        emblem_components.append(bounds)

    min_x = min(bounds[0] for bounds in emblem_components)
    min_y = min(bounds[1] for bounds in emblem_components)
    max_x = max(bounds[2] for bounds in emblem_components)
    max_y = max(bounds[3] for bounds in emblem_components)

    return min_x, min_y, max_x, max_y


def save_symbol_assets(image: Image.Image, bounds: tuple[int, int, int, int]) -> None:
    min_x, min_y, max_x, max_y = bounds
    side_pad = 40
    top_pad = 40
    bottom_pad = 14
    symbol = image.convert("RGBA").crop(
        (min_x - side_pad, min_y - top_pad, max_x + side_pad, max_y + bottom_pad)
    )
    symbol = remove_white_background(symbol)
    symbol.save(PUBLIC / "brand-symbol.png")

    square = Image.new("RGBA", (512, 512), (255, 255, 255, 0))
    fitted = contain(symbol, (360, 360))
    x = (square.width - fitted.width) // 2
    y = (square.height - fitted.height) // 2
    square.alpha_composite(fitted, (x, y))
    square.save(PUBLIC / "brand-symbol-square.png")

    social = Image.new("RGBA", (1200, 630), (255, 255, 255, 0))
    social_mark = contain(symbol, (320, 320))
    social.alpha_composite(social_mark, ((social.width - social_mark.width) // 2, 94))
    social.save(PUBLIC / "brand-social.png")


def contain(image: Image.Image, box: tuple[int, int]) -> Image.Image:
    target_w, target_h = box
    ratio = min(target_w / image.width, target_h / image.height)
    new_size = (max(1, int(image.width * ratio)), max(1, int(image.height * ratio)))
    return image.resize(new_size, Image.Resampling.LANCZOS)


def remove_white_background(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    pixels = rgba.load()

    width, height = rgba.size
    queue: deque[tuple[int, int]] = deque()
    visited: set[tuple[int, int]] = set()

    def is_background(px: int, py: int) -> bool:
        r, g, b, a = pixels[px, py]
        if a == 0:
            return True
        brightness = (r + g + b) / 3
        chroma = max(r, g, b) - min(r, g, b)
        return brightness > 210 and chroma < 42

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        point = queue.popleft()
        if point in visited:
            continue
        visited.add(point)
        px, py = point
        if not is_background(px, py):
            continue

        pixels[px, py] = (255, 255, 255, 0)

        for nx, ny in ((px + 1, py), (px - 1, py), (px, py + 1), (px, py - 1)):
            if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                queue.append((nx, ny))

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue

            brightness = (r + g + b) / 3
            chroma = max(r, g, b) - min(r, g, b)
            if brightness > 238 and chroma < 34:
                pixels[x, y] = (255, 255, 255, 0)
                continue

            if brightness > 220 and chroma < 70:
                soften = max(0, min(255, int((242 - brightness) * 12)))
                pixels[x, y] = (r, g, b, min(a, soften))
    return rgba


def main() -> None:
    image = Image.open(SOURCE)
    bounds = emblem_bounds(image)
    save_symbol_assets(image, bounds)
    print("generated:", "brand-symbol.png", "brand-symbol-square.png", "brand-social.png")


if __name__ == "__main__":
    main()
