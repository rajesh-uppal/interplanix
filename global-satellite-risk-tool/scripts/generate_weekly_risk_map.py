# scripts/generate_weekly_risk_map.py
import sys
import os

# ✅ Dynamically add project root to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# ✅ Now imports will work
from src.satellite_tools import download_tle, extract_features_from_tle, plot_satellite_risk_map

# Constants
TLE_URL = "https://celestrak.com/NORAD/elements/gp.php?GROUP=active&FORMAT=tle"
RISK_MAP_DIR = "visualizations/risk_maps"
DOCS_HTML_PATH = "docs/satellite_risk_map_sample.html"

# 1️⃣ Create risk_maps directory if it doesn't exist
os.makedirs(RISK_MAP_DIR, exist_ok=True)

# 2️⃣ Get today's date

from datetime import datetime, timezone
today = datetime.now(timezone.utc).strftime("%Y-%m-%d")


# 3️⃣ Step 1: Download TLE data
tle_path = download_tle(TLE_URL)

# 4️⃣ Step 2: Extract features from the TLE
df = extract_features_from_tle(tle_path)

# 5️⃣ Step 3: Save extracted data as CSV
csv_filename = os.path.join(RISK_MAP_DIR, f"{today}_risk_data.csv")
df.to_csv(csv_filename, index=False)
print(f"✅ Saved risk data to: {csv_filename}")

# 6️⃣ Step 4: Generate and save interactive HTML map
fig = plot_satellite_risk_map(df, title=f"Satellite Risk Map – {today}")
html_filename = os.path.join(RISK_MAP_DIR, f"{today}_satellite_risk_map.html")
fig.write_html(html_filename)
print(f"✅ Saved HTML map to: {html_filename}")

# 7️⃣ Step 5: Copy latest map to docs/ for iframe embedding
from shutil import copyfile
copyfile(html_filename, DOCS_HTML_PATH)
print(f"✅ Copied latest map to: {DOCS_HTML_PATH}")
