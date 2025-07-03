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
from dash import dcc, html
import plotly.graph_objects as go

# 📁 Load missile event data from JSON file
DATA_FILE = os.path.join("..", "data", "missile_events.json")

# Open and parse the JSON data file
with open(DATA_FILE, "r") as f:
    event_data = json.load(f)

# 🧹 Filter events that have valid coordinates
valid_events = [e for e in event_data if e["lat"] != 0 and e["lon"] != 0]

# 🎯 Extract data for plotting
lats = [e["lat"] for e in valid_events]
lons = [e["lon"] for e in valid_events]
names = [e["name"] for e in valid_events]

# 🌍 Create a Plotly map figure with missile names
fig = go.Figure(go.Scattergeo(
    lat=lats,
    lon=lons,
    text=names,               # Show missile names on hover
    mode="markers+text",      # Show both markers and text labels
    marker=dict(size=10, color="red"),
    textposition="top center" # Position of missile names on the plot
))

# 🎨 Style the map layout
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

# ⚙️ Initialize the Dash app
app = dash.Dash(__name__)
server = app.server  # for deploying to Render/Heroku

# 📐 Define the layout of the dashboard
app.layout = html.Div(style={"backgroundColor": "black", "color": "lime"}, children=[
    html.H1("Missile Launch Detection Dashboard", style={"textAlign": "center"}),
    dcc.Graph(figure=fig)
])

# ▶️ Run the app locally
if __name__ == "__main__":
    app.run_server(debug=True)
