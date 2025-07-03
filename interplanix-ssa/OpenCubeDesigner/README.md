# 🛰️ OpenCubeDesigner - CubeSat Mission Design Toolkit

**Project Goal**: Enable anyone to design, simulate, and plan CubeSat missions using open-source, laptop-executable tools: GMAT for orbital mechanics and FreeCAD for 3D structure modeling.

---

## 📄 Detailed README and Project Overview

### 🚀 What is OpenCubeDesigner?
OpenCubeDesigner is an open-source toolkit designed to help you:
- 📐 **Design CubeSat structures** using FreeCAD (parametric 3D CAD modeling)
- 🌍 **Simulate orbits** with GMAT (General Mission Analysis Tool)
- 📊 **Visualize satellite trajectories and ground tracks** in Python
- 📁 **Document mission profiles** with power/mass budgeting templates

This project is perfect for:
- Students and researchers
- NewSpace startups
- Open-source satellite developers
- Anyone building CubeSat concepts without expensive software or hardware

---

## 📁 Directory Structure (With Purpose)

```bash
OpenCubeDesigner/
├── README.md                         # You are here: project overview and setup guide
├── /docs/                            # Guides, walkthroughs, and tutorials
│   └── tutorial.md                   # Step-by-step workflow explanation
├── /gmat/                            # GMAT scripts and orbital simulation configs
│   └── cube_orbit_simulation.script  # Main script for simulating 1U CubeSat in LEO
├── /freecad/                         # 3D CAD models and design templates
│   └── cube_sat_design.FCStd         # FreeCAD model of 1U CubeSat with modular layout
├── /templates/                       # Planning templates (Excel, LaTeX, etc.)
│   └── power_budget_template.xlsx    # Mass, power, and volume budgeting spreadsheet
├── /notebooks/                       # Jupyter notebooks for plotting or mission logic
│   └── launch_profile_visualizer.ipynb # Visualizer for ground tracks and simulation data
├── /exports/                         # Results, generated figures, mission reports
│   └── CubeSat_Mission_Report.pdf    # Sample output (mission documentation)
└── LICENSE                           # Open-source license (recommend: MIT)
```

---

## 🧰 Requirements

| Tool       | Purpose                              | Link                         |
|------------|--------------------------------------|------------------------------|
| GMAT       | Orbit design and trajectory simulation | https://gmatcentral.org/     |
| FreeCAD    | 3D modeling of satellite structures  | https://freecad.org/         |
| Python 3.x | Data analysis and visualization      | https://python.org/          |
| Jupyter    | Notebook environment                 | https://jupyter.org/         |

### 📦 Recommended Python Libraries
```bash
pip install matplotlib pandas numpy plotly
```

---

## 🔧 Installation & Setup

### 1. GMAT
- Download from: [https://gmatcentral.org](https://gmatcentral.org)
- Extract and run `GMAT.exe` (no install required)

### 2. FreeCAD
- Download from: [https://www.freecad.org/downloads.php](https://www.freecad.org/downloads.php)
- Install and launch using the **Part Design** workbench

### 3. Python + Jupyter
```bash
pip install jupyterlab
jupyter lab  # or use 'jupyter notebook'
```

---

## 🚀 Quickstart Instructions

### 1. Run GMAT Orbit Simulation
```bash
# Open GMAT
# Load the following file:
OpenCubeDesigner/gmat/cube_orbit_simulation.script

# Run the mission sequence
# View the 3D orbit and ground track outputs
```

### 2. Open FreeCAD CubeSat Model
```bash
# Open FreeCAD
# Load:
OpenCubeDesigner/freecad/cube_sat_design.FCStd

# Use the Part Design workbench to explore and modify the CubeSat structure
```

### 3. Launch the Jupyter Notebook
```bash
jupyter notebook notebooks/launch_profile_visualizer.ipynb
```
This will generate ground track plots based on GMAT export data.

---

## 🛰 Sample Mission Walkthrough

1. Design a 1U CubeSat in FreeCAD with:
   - Internal payload bay
   - Side-mounted solar panels
   - Mass: 4 kg, Volume: 1U (10x10x10 cm)

2. Simulate orbit using GMAT:
   - Target orbit: 500 km Sun-Synchronous
   - Use atmospheric drag and sola