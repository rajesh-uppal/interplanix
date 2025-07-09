# 🛰️ OpenCubeDesigner – Interplanix CubeSat Simulation Suite

**OpenCubeDesigner** is a simulation and education toolkit under the Interplanix initiative, helping users model, simulate, and visualize CubeSat orbits using open-source tools like GMAT, FreeCAD, and Python.

---

## 📁 Folder Overview

```
opencubedesigner/
├── cubesat-sim.html
│   Main interactive simulator to generate GMAT scripts for different orbits.
│
├── assets/
│   ├── style.css       → Optional external styles for UI.
│   └── script.js       → JavaScript (if logic is externalized from HTML).
│
├── scripts/
│   └── orbit_template.script
│      Sample GMAT script template used by the simulation interface.
│
├── models/
│   └── cubesat.FCStd
│      FreeCAD model of a CubeSat (structure, solar panels, payload bay).
│
├── notebooks/
│   └── orbit_visualizer.ipynb
│      Jupyter Notebook for orbit visualization or SSA integration.
│
├── docs/
│   └── cubesat-orbit-simulation.html
│      Offline-friendly documentation version of the simulator.
│
├── README.md
│   This file – overview, instructions, and folder purpose.
│
└── LICENSE
    Project licensing (e.g., MIT or CC-BY-SA).
```

---

## 🚀 How to Use

1. Open `cubesat-sim.html` in a browser.
2. Choose LEO / SSO / Elliptical orbit type.
3. Generate and download a GMAT `.script`.
4. Open in [GMAT](https://gmatcentral.org) to simulate.

---

## 🛠 Technologies

- **GMAT** – Orbit simulation and propagation
- **FreeCAD** – Mechanical modeling and design
- **Python / Jupyter** – Orbit prediction, SSA, visualization
- **HTML/CSS/JS** – User interface & logic

---

## 🤝 Contributing

All contributions welcome! Fork the repo, enhance simulation modes, or improve CAD and visualization features.

---

## 📄 License

This project is licensed under the MIT License unless otherwise noted.
