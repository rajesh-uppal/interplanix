# 🛰️ Global Missile Detection & Warning Dashboard

This project simulates a real-time missile detection dashboard like NORAD's, using Python, Dash, Plotly, and optionally data scraped from open sources like CSIS.

## Features
- Plot global missile launch events on a world map
- Hoverable missile names and coordinates
- Jupyter notebook for testing and demonstration
- Dash app for deployment (can be embedded in WordPress)

## Run Instructions

```bash
# Activate your environment
conda activate interplanix

# Install dependencies
pip install -r requirements.txt

# Run scraper
python src/scraper.py

# Start the app
python src/app.py
```

Then open http://127.0.0.1:8050 in your browser.

## Embed in WordPress

Deploy the app and embed it with an iframe:
```html
<iframe src="https://your-host.com" width="100%" height="600"></iframe>
```
