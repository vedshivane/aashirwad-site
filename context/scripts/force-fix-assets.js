const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const src = 'C:\\Users\\Ved\\.gemini\\antigravity\\brain\\8f718f55-127c-410e-83dd-173eb1f44692\\media__1776933091899.png';
const targetDir = path.resolve(__dirname, 'public/images/frames');

try {
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    // Try magick first
    try {
        execSync(`magick convert "${src}" -crop 3x1@ +repage "${targetDir}/frame-%d.png"`);
        console.log('MAGICK_SUCCESS');
        
        // Rename
        const map = { 'frame-0.png': 'frame-sandalwood.png', 'frame-1.png': 'frame-ecoteak.png', 'frame-2.png': 'frame-coffee-black.png' };
        Object.entries(map).forEach(([oldN, newN]) => {
            if (fs.existsSync(path.join(targetDir, oldN))) {
                fs.renameSync(path.join(targetDir, oldN), path.join(targetDir, newN));
            }
        });
    } catch (e) {
        console.log(`MAGICK_FAILED: ${e.message}`);
        // Fallback: Copy full image to all 3 names to stop 404s
        const files = ['frame-sandalwood.png', 'frame-ecoteak.png', 'frame-coffee-black.png'];
        files.forEach(f => fs.copyFileSync(src, path.join(targetDir, f)));
        console.log('FALLBACK_COPY_DONE');
    }

    console.log('FILES:', fs.readdirSync(targetDir));
} catch (e) {
    console.log('FATAL:', e.message);
}
