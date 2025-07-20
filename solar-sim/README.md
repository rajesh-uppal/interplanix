# 🪐 Solar System Simulator & Planet Preview Modules

This project under the **Interplanix** initiative simulates orbital mechanics, planet rotation, and interactive 3D previews of planets using [Three.js](https://threejs.org/). It is part of a larger vision to build a unified educational and space R&D platform.

---

## 🔭 Features

- Real-time 3D **solar system simulation**
- Planet click-to-preview functionality
- Detailed **Mars** simulation with moons (Phobos, Deimos)
- Scalable structure to support Earth, Moon, and others in future

---

## 🧩 Folder Structure

```text
solar-sim/
├── solar-system-sim/       # Main orbital simulation (formerly under /docs)
│   ├── css/
│   ├── js/
│   └── solar-system.html
│
├── planet-previews/        # Individual planet simulation viewers
│   └── mars/
│       ├── css/
│       ├── js/
│       └── index.html
│
└── shared-assets/
    └── textures/           # Shared textures (e.g., Mars texture map)
