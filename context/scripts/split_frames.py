from PIL import Image, ImageOps
import os
import sys

source_path = r"C:\Users\Ved\.gemini\antigravity\brain\8f718f55-127c-410e-83dd-173eb1f44692\media__1776933091899.png"
output_dir = r"public\images\frames"

def remove_background(img):
    img = img.convert("RGBA")
    data = img.getdata()
    new_data = []
    for item in data:
        r, g, b, a = item
        if r > 185 and g > 185 and b > 185 and abs(r-g) < 30 and abs(g-b) < 30:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
    img.putdata(new_data)
    return img

def center_and_scale(img, target_size=(1100, 1500)):
    # 1. Detect content
    alpha = img.split()[3]
    bbox = alpha.getbbox()
    if not bbox:
        return Image.new("RGBA", target_size, (0,0,0,0))
        
    content = img.crop(bbox)
    
    # 2. Normalize height (80% of target)
    # This solves the "too tall" issue correctly
    target_h = int(target_size[1] * 0.8)
    cw, ch = content.size
    scale = target_h / ch
    new_w = int(cw * scale)
    
    content = content.resize((new_w, target_h), Image.Resampling.LANCZOS)
    
    # 3. Square/Centered Canvas
    canvas = Image.new("RGBA", target_size, (0, 0, 0, 0))
    ox = (target_size[0] - new_w) // 2
    oy = (target_size[1] - target_h) // 2
    
    canvas.paste(content, (ox, oy), content)
    return canvas

try:
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    if not os.path.exists(source_path):
        source_path = r"c:\Users\Ved\Downloads\image.png"

    img = Image.open(source_path).convert("RGBA")
    w, h = img.size
    chunk_w = w // 3

    names = ["frame-sandalwood.png", "frame-ecoteak.png", "frame-coffee-black.png"]

    for i in range(3):
        left = i * chunk_w
        right = (i + 1) * chunk_w
        if i == 2: right = w
        
        print(f"Normalizing {names[i]}...")
        chunk = img.crop((left, 0, right, h))
        
        # Clean
        chunk = remove_background(chunk)
        
        # Center and Scale (Strict boundaries, NO OVERLAP)
        final = center_and_scale(chunk, target_size=(1100, 1500))
        
        p = os.path.join(output_dir, names[i])
        final.save(p, "PNG")
        print(f"Finalized: {p}")

    print("CENTERING_FIX_SUCCESS")
except Exception as e:
    print(f"ERROR: {str(e)}")
    sys.exit(1)
