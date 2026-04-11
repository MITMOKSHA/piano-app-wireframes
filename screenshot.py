import subprocess
import os
from PIL import Image

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE = "/Users/moksha/aiFirst/app/piano-wireframes"

slides = ["slide1.html", "slide2.html", "slide3.html", "slide4.html"]

for s in slides:
    html_path = f"file://{BASE}/{s}"
    out_path = f"{BASE}/{s.replace('.html', '.png')}"
    subprocess.run([
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--screenshot={out_path}",
        "--window-size=960,540",
        html_path
    ], capture_output=True)
    print(f"Generated {out_path}")

imgs = [Image.open(f"{BASE}/{s.replace('.html', '.png')}") for s in slides]

W, H = imgs[0].size
cols = 2
rows = 2
gap = 20
canvas = Image.new("RGB", (cols * W + (cols+1)*gap, rows * H + (rows+1)*gap), (240, 240, 240))

for i, img in enumerate(imgs):
    col = i % cols
    row = i // cols
    x = gap + col * (W + gap)
    y = gap + row * (H + gap)
    canvas.paste(img, (x, y))

out = f"{BASE}/wireframes-preview.png"
canvas.save(out)
print(f"Preview saved: {out}")
