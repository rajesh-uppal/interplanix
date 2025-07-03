# src/orbit_simulator.py

import pandas as pd
import numpy as np

def simulate_decay(df, days=180):
    """
    Simulates basic orbital decay based on area-to-mass ratio.
    
    Expects:
      - Either columns 'Area' and 'Mass',
      - Or columns 'size_cm' and 'mass_kg'.

    Args:
        df (pd.DataFrame): Satellite/debris data including:
           - If available: 'Area' (m^2) and 'Mass' (kg),
           - Otherwise: 'size_cm' (diameter in cm) and 'mass_kg'.
           - Also needs 'SemiMajorAxis_km' column for initial orbit.
        days (int): Number of days to simulate forward.

    Returns:
        pd.DataFrame: DataFrame with a new column 'Simulated_SemiMajorAxis_km'.
    """
    df = df.copy()
    # 1. Determine Mass (kg)
    if 'Mass' in df.columns:
        mass = df['Mass']
    elif 'mass_kg' in df.columns:
        mass = df['mass_kg']
    else:
        raise ValueError("simulate_decay: missing 'Mass' or 'mass_kg' column")

    # 2. Determine Area (m^2)
    if 'Area' in df.columns:
        area = df['Area']
    elif 'size_cm' in df.columns:
        # Convert diameter in cm to radius in meters, then compute area of circle
        radius_m = df['size_cm'] / 100.0 / 2.0
        area = np.pi * (radius_m ** 2)
    else:
        raise ValueError("simulate_decay: missing 'Area' or 'size_cm' column")

    # 3. Ensure initial semi-major axis exists
    if 'SemiMajorAxis_km' not in df.columns:
        raise ValueError("simulate_decay: missing 'SemiMajorAxis_km' column in DataFrame")

    # 4. Simplified drag decay: decay_rate_per_day ∝ area/mass
    #    You may later replace with more sophisticated atmospheric density model.
    decay_rate_per_day = (area / mass) * 1e-4  # arbitrary coefficient for demo

    # 5. Simulate decay
    df['Simulated_SemiMajorAxis_km'] = df['SemiMajorAxis_km'] - decay_rate_per_day * days
    # Prevent negative values
    df['Simulated_SemiMajorAxis_km'] = df['Simulated_SemiMajorAxis_km'].clip(lower=0.0)

    return df
