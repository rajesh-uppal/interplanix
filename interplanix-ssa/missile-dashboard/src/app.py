# src/app.py

"""
app.py
-------
This Dash web app displays missile event data on a world map using Plotly.
Missile names are shown on hover and as text labels near markers.
"""

import json
import os
import dash
from dash import dcc, html, Input, Output
import plotly.graph_objects as go

# 📁 Load missile event data from JSON file
DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "missile_events.json")
DATA_FILE = os.path.abspath(DATA_FILE)

print("📁 Current working directory:", os.getcwd())
print("📄 Attempting to load:", DATA_FILE)


# Helper function to create the map figure
def create_missile_map(missile_data):
    valid_events = [e for e in missile_data if e.get("lat") and e.get("lon")]
    lats = [e["lat"] for e in valid_events]
    lons = [e["lon"] for e in valid_events]
    names = [e["name"] for e in valid_events]

    fig = go.Figure(go.Scattergeo(
        lat=lats,
        lon=lons,
        text=names,
        mode="markers+text",
        marker=dict(size=10, color="red"),
        textposition="top center"
    ))

    fig.update_layout(
        geo=dict(
            projection_type="natural earth",
            showland=True,
            landcolor="black",
            bgcolor="black"
        ),
        paper_bgcolor="black",
        font_color="lime",
        title="🛰️ Global Missile Event Map with Labels"
    )
    return fig


# ⚙️ Initialize the Dash app
app = dash.Dash(__name__)
server = app.server  # for deploying to Render/Heroku


# 📐 Define the layout of the dashboard
app.layout = html.Div(style={"backgroundColor": "black", "color": "lime"}, children=[
    html.H1("Missile Launch Detection Dashboard", style={"textAlign": "center", "color": "lime", "marginTop": "10px"}),
    
    dcc.Graph(id="missile-map", figure=create_missile_map([])),  # Load empty map by default
    dcc.Interval(
        id='interval-refresh',
        interval=2 * 60 * 1000,  # 2 minutes in milliseconds
        n_intervals=0
    )
])


@app.callback(
    Output("missile-map", "figure"),
    Input("interval-refresh", "n_intervals")
)
def update_map(n):
    try:
        with open(DATA_FILE, "r", encoding="utf-8-sig") as f:
            missile_data = json.load(f)
    except FileNotFoundError:
        print(f"⚠️ File not found: {DATA_FILE}")
        missile_data = []
    return create_missile_map(missile_data)


# ▶️ Run the app locally
if __name__ == "__main__":
    app.run_server(debug=True, host="0.0.0.0", port=10000)
