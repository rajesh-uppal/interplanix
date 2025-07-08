# PowerShell Script to Sync Final HTML Dashboards to GitHub Pages Docs Folder

# Set working directory to script location
Set-Location -Path (Split-Path -Parent $MyInvocation.MyCommand.Definition)

# Ensure 'docs' folder exists
if (-Not (Test-Path -Path "docs")) {
    New-Item -ItemType Directory -Path "docs"
    Write-Host "Created 'docs/' folder."
}
else {
    Write-Host "'docs/' folder already exists."
}

# Copy dashboard HTML files from project subfolders to 'docs/' with new names

# 1. Satellite Risk Map
if (Test-Path "global-satellite-risk-tool/docs/satellite_risk_map_sample.html") {
    Copy-Item "global-satellite-risk-tool/docs/satellite_risk_map_sample.html" "docs/satellite_risk_map.html" -Force
    Write-Host "Synced satellite_risk_map.html"
}

# 2. Orbital Debris Tracker
if (Test-Path "orbital-debris-tracker/docs/orbital_debris_tracker_clean.html") {
    Copy-Item "orbital-debris-tracker/docs/orbital_debris_tracker_clean.html" "docs/orbital_debris_tracker.html" -Force
    Write-Host "Synced orbital_debris_tracker.html"
}

# 3. Space Traffic AI Simulation
if (Test-Path "space-traffic-ai/docs/traffic_visualization.html") {
    Copy-Item "space-traffic-ai/docs/traffic_visualization.html" "docs/space_traffic_simulation.html" -Force
    Write-Host "Synced space_traffic_simulation.html"
}

# 4. Missile Threat Dashboard
if (Test-Path "missile-dashboard/docs/missile_dashboard.html") {
    Copy-Item "missile-dashboard/docs/missile_dashboard.html" "docs/missile_threat_dashboard.html" -Force
    Write-Host "Synced missile_threat_dashboard.html"
}

Write-Host ""
Write-Host "Done syncing all dashboards to /docs for GitHub Pages."
