Screenshots while scrolling
--------------------------

This document explains how to use the Playwright script to capture screenshots as the page scrolls.

Setup (Windows):

1. Install Playwright for Python:

```powershell
python -m pip install --upgrade pip
pip install playwright
python -m playwright install chromium
```

2. Serve the website locally (from the repository root):

```powershell
cd website
python -m http.server 8000
# open http://localhost:8000 to verify
```

3. Run the scrolling screenshot script (from repo root):

```powershell
python tools\scroll_screenshots.py http://localhost:8000 --out website\screenshots --width 1366 --height 768 --delay 0.6
```

Options:
- `--out`: output directory for screenshots
- `--width`/`--height`: viewport size
- `--delay`: seconds to wait after each scroll
- `--headful`: run with visible browser for debugging
- `--full-last`: also save a final full-page screenshot named `shot_full.png`

Notes:
- The script scrolls in viewport-sized steps from top to bottom and saves sequential PNGs named `shot_000.png`, `shot_001.png`, ...
- If you need a single tall stitched image, you can provide the sequence to an image stitcher (ImageMagick, Python Pillow script, etc.).
