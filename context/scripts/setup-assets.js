const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\Ved\\.gemini\\antigravity\\brain\\8f718f55-127c-410e-83dd-173eb1f44692\\media__1776933091899.png';
const targetDir = path.resolve(__dirname, 'public/images/frames');

try {
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
        console.log(`Created directory: ${targetDir}`);
    }

    if (fs.existsSync(src)) {
        const files = ['frame-sandalwood.png', 'frame-ecoteak.png', 'frame-coffee-black.png'];
        files.forEach(f => {
            fs.copyFileSync(src, path.join(targetDir, f));
            console.log(`Copied: ${f}`);
        });
        console.log('SYNC_COMPLETE');
    } else {
        console.log(`ERROR: Source artifact missing at ${src}`);
    }
} catch (e) {
    console.log(`ERROR: ${e.message}`);
}
