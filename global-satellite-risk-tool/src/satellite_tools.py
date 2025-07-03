# src/satellite_tools.py

import requests
import pandas as pd
from datetime import datetime, timezone
import plotly.express as px
import os

def download_tle(url: str, save_dir: str = "data") -> str:
    """
    Downloads TLE data from a given URL and saves it as a file with today's date.

    Args:
        url (str): The URL to download TLE data from.
        save_dir (str): Directory to save the TLE file.

    Returns:
        str: Full path to the saved TLE file.
    """
    # Ensure the output directory exists
    os.makedirs(save_dir, exist_ok=True)

    # Format today's date in YYYYMMDD format
    today_str = datetime.now(timezone.utc).strftime("%Y%m%d")
    tle_filename = f"tle_data_{today_str}.txt"
    tle_path = os.path.join(save_dir, tle_filename)

    # Request TLE data
    response = requests.get(url)
    if response.status_code == 200:
        with open(tle_path, "w", encoding="utf-8") as f:
            f.write(response.text)
        print(f"✅ TLE data saved to {tle_path}")
    else:
        raise Exception(f"❌ Failed to download TLE data: HTTP {response.status_code}")

    return tle_path


def extract_features_from_tle(tle_path: str) -> pd.DataFrame:
    """
    Parses the downloaded TLE file and returns a DataFrame with basic features.

    Args:
        tle_path (str): Path to the TLE file.

    Returns:
        pd.DataFrame: DataFrame containing satellite name and placeholder values.
    """
    with open(tle_path, "r", encoding="utf-8") as file:
        lines = file.readlines()

    data = []
    for i in range(0, len(lines), 3):
        if i + 2 >= len(lines): break
        name = lines[i].strip()
        line1 = lines[i+1].strip()
        line2 = lines[i+2].strip()
        
        # Placeholder values, you can replace with real TLE calculations later
        data.append({
            "name": name,
            "risk_level": hash(name) % 5 + 1,  # Dummy risk level (1–5)
            "latitude": (hash(line1) % 180) - 90,  # Dummy latitude
            "longitude": (hash(line2) % 360) - 180  # Dummy longitude
        })

    df = pd.DataFrame(data)
    print(f"✅ Extracted features for {len(df)} satellites")
    return df


def plot_satellite_risk_map(df: pd.DataFrame, title: str = "Satellite Risk Map") -> px.scatter_geo:
    """
    Generates an interactive Plotly map from satellite data.

    Args:
        df (pd.DataFrame): DataFrame with columns: name, latitude, longitude, risk_level.
        title (str): Title of the map.

    Returns:
        plotly.graph_objs._figure.Figure: Plotly map figure.
    """
    fig = px.scatter_geo(
        df,
        lat="latitude",
        lon="longitude",
        color="risk_level",
        hover_name="name",
        title=title,
        projection="natural earth",
        color_continuous_scale="Reds"
    )
    return fig
