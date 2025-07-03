import dash
from dash import dcc, html
import plotly.graph_objects as go

app = dash.Dash(__name__)

app.layout = html.Div([
    html.H1("🛰️ Space Traffic Simulation"),
    dcc.Graph(id="sim-map", figure=go.Figure())
])

if __name__ == "__main__":
    app.run_server(debug=True)
