# 🌌 Interplanix: Space Simulation & R&D Platform

**Interplanix** is a unified educational and research-driven platform that combines interactive simulations, mission planning tools, and space domain awareness technologies. It serves as both a public learning resource and a demonstrator for solving real-world aerospace and defense challenges.

---

## 🚀 Featured Projects

### 🪐 [Solar System Simulator](https://rajesh-uppal.github.io/interplanix/solar-system.html)
A dynamic orbital simulation of the solar system built with [Three.js](https://threejs.org/). Users can explore planetary orbits and initiate **detailed planet previews** like Mars with rotating 3D models and moons.

> **Under Development:** Earth will soon support moon interaction and dynamic satellite overlays.

---

### 🛰️ Global Satellite Risk Map
Located under `global-satellite-risk-tool/`, this tool maps satellite vulnerabilities based on orbital positions and debris forecasts.

- Real-time Two-Line Element (TLE) parsing
- Collision prediction algorithms
- Weekly updated orbital risk visualizations

---

### 🛡️ Missile Threat Dashboard
A web-based system to track global missile events and simulate threat trajectories. It features:
- Integrated news scraper
- Threat mapping by region
- Defense readiness metrics

---

### 🛠️ Orbital Debris Tracker
Forecasts debris accumulation and models orbital decay using metadata ingestion and debris prediction tools.

---

## 🧭 Project Layout

```text
interplanix/
├── docs/                  # GitHub Pages deployment (published HTML)
│   ├── solar-system.html
│   ├── planet-previews/
│   └── shared-assets/
├── solar-sim/             # Simulation source code
│   ├── solar-system-sim/
│   ├── planet-previews/
│   └── shared-assets/
├── global-satellite-risk-tool/
├── missile-dashboard/
├── orbital-debris-tracker/
├── moon-colonization-roadmap/
├── OpenCubeDesigner/
├── space-traffic-ai/
├── .gitignore
└── README.md
