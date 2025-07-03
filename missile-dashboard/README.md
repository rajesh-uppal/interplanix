# 🌍 Global Missile Detection & Warning Dashboard

A real-time, NORAD-style missile detection and early warning dashboard built with Python and Dash. It visualizes missile launch events on a world map and simulates threat detection using open-source intelligence data such as those from CSIS Missile Threat or news feeds.

This project is built to demonstrate:
- A working simulation of a global early warning system.
- A framework for integrating real-time data sources for geopolitical monitoring.
- A deployable and embeddable dashboard for WordPress websites or other CMS platforms.

---

## 🔍 What This Project Does

This dashboard simulates or displays actual missile activity (such as tests or launches) by:
- Plotting events on an interactive world map.
- Updating event data in real-time (scraped or simulated).
- Styling the user interface like NORAD’s radar systems (dark theme, blinking alerts, military fonts).
- Being embeddable into WordPress using a simple iframe.

---

## 🧠 Use Cases

- **Defense and aerospace blogs** showcasing missile test activity.
- **Education**: Teaching students about missile geography and global defense systems.
- **Geopolitical tracking tools**: Integrating missile events with other intelligence dashboards.

---

## 🛠️ Technologies Used

| Tool / Library     | Purpose                          |
|--------------------|----------------------------------|
| `Dash`             | Web framework for the dashboard  |
| `Plotly`           | World map and threat plotting    |
| `Requests`         | Fetching external data (scraping)|
| `BeautifulSoup4`   | Parsing HTML from open-source sites |
| `Gunicorn`         | Production web server for deployment |
| `Render.com`       | Free cloud hosting with auto-deploy |
| `WordPress`        | Dashboard integration via iframe |

---

## 📁 Project Structure

