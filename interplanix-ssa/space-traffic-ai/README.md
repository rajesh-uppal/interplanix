# 🚀 Space Traffic Management with AI/ML

This project simulates space traffic and uses intelligent systems to:
- Predict orbital collisions
- Recommend autonomous avoidance maneuvers
- Perform deep-space trajectory planning

## Modules

- `data_loader.py`: Load TLEs and simulate satellite positions
- `collision_predictor.py`: Predict potential orbital collisions
- `avoidance_agent.py`: Train RL agents to perform collision avoidance
- `trajectory_planner.py`: Solve for optimal orbital transfer maneuvers
- `dashboard.py`: Visualize traffic and agent behavior (optional)

## Dependencies

```bash
pip install -r requirements.txt
```

## Getting Started

- Run `notebooks/simulation_demo.ipynb` to simulate and visualize traffic
- Train models in `src/` using TLEs or synthetic scenarios
