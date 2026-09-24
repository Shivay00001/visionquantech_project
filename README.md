# VisionQuantech Project

**Desktop GUI app (tkinter)** — "VisionQuantech Pro" full-stack website builder, same family as `visionquantech_builder` / `visionquantech_exe_build`.

## Run

```bash
python visionquantech_builder.py          # launch the desktop GUI
```

## Deps

```bash
pip install Pillow
```

## Notes

- Boot verified under `xvfb-run` (main window opens, no traceback).
- Fixed 2026-09-24: `root.state('zoomed')` is Windows-only; wrapped in try/except so the app boots on Linux too.
- Desktop app — needs a display; not a web service.
