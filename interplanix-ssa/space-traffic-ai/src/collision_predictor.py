# src/collision_predictor.py
"""
Collision Predictor Module for Space Traffic AI
------------------------------------------------
This module provides a function to detect potential collisions between satellites
based on their 3D positions over time.

Inputs:
- A dictionary of satellite positions
- A configurable distance threshold (in km)

Outputs:
- A list of dictionaries describing potential collision events
"""

import math
from typing import Dict, List, Tuple

def euclidean_distance(p1: Tuple[float, float, float], p2: Tuple[float, float, float]) -> float:
    """
    Compute the Euclidean distance between two 3D points.
    """
    return math.sqrt((p1[0] - p2[0]) ** 2 +
                     (p1[1] - p2[1]) ** 2 +
                     (p1[2] - p2[2]) ** 2)

def detect_collisions(positions: Dict[str, List[Tuple[float, float, float]]],
                      threshold_km: float = 50.0) -> List[Dict]:
    """
    Detect potential satellite collisions based on 3D distance proximity.

    Parameters:
    - positions: Dictionary mapping satellite names to list of 3D positions (one per timestep)
    - threshold_km: Distance below which a potential collision is flagged

    Returns:
    - A list of potential collision events
    """
    collision_events = []
    satellites = list(positions.keys())
    num_steps = len(next(iter(positions.values())))  # Assume all satellites have same time steps

    # Loop through each time step
    for t in range(num_steps):
        # Check all satellite pairs at this time step
        for i in range(len(satellites)):
            for j in range(i + 1, len(satellites)):
                sat1 = satellites[i]
                sat2 = satellites[j]

                pos1 = positions[sat1][t]
                pos2 = positions[sat2][t]

                distance = euclidean_distance(pos1, pos2)

                if distance <= threshold_km:
                    collision_events.append({
                        "sat1": sat1,
                        "sat2": sat2,
                        "time": t,
                        "distance_km": round(distance, 2)
                    })

    return collision_events
