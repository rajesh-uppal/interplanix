# 🛰 Satellite Risk Map

This project uses real-time TLE (Two-Line Element) data and machine learning heuristics to visualize and classify orbital satellites by risk level. It's designed for **space situational awareness (SSA)**, debris risk evaluation, and satellite operations planning.

## 🌐 Interactive Map Preview (Embed Ready)

```html
<h2>🛰️ Global Satellite Risk Monitoring Tool</h2>
<p>This interactive map shows real-time satellite risk levels based on orbital inclination.</p>

<iframe 
  src="https://rajesh-uppal.github.io/interplanix-ssa/satellite-risk-map/satellite_risk_map_clean.html" 
  width="100%" 
  height="600" 
  style="border:none;">
</iframe>

<p>Use this tool to explore orbital risk zones, satellite altitudes, and hover for details.</p>
```

## 📊 Overview

This interactive visualization shows satellites in orbit with **color-coded risk levels** based on their proximity to the Earth's equator. It is built using Skyfield for orbit propagation and Plotly for mapping.

**Risk levels**:
- **Low (≤10°)**: Equatorial orbits – low congestion
- **Medium (10°–50°)**: Mid-inclination – moderate risk
- **High (>50°)**: Polar orbits – higher conjunction risk

> ⚠️ Note: This is a simplified model. Future versions can integrate velocity, size, and debris density.

## 🔑 Key Features

- 🛰️ Real-world satellite positions
- 🎯 Color-coded by risk level
- 🔍 Hover tooltips with satellite name & risk
- 🌍 Interactive globe (zoom & pan)

## 🧪 Use Cases

- Space Situational Awareness (SSA)
- Traffic analysis in crowded orbits
- Defense & commercial satellite decision support

## ▶️ How to Run

```bash
pip install -r requirements.txt
jupyter notebook satellite_risk_map_full.ipynb
```

Or use:
```bash
python ssa_template.py
```

## 📁 Output Files

- `docs/satellite_risk_map_sample.html`: Default output for GitHub Pages embed
- `visualizations/risk_maps/YYYY-MM-DD_*.html/.csv`: Timestamped maps and data exports

## 🌍 GitHub Pages Setup

To publish this tool:

1. Push this repo to GitHub
2. Enable Pages from the `/docs` folder in Settings
3. Use the iframe HTML to embed the map on your website or WordPress page

---

© 2025 Interplanix | Built for the future of secure, visible orbital operations.