# Import necessary modules from SGP4 for satellite orbit propagation
from sgp4.api import Satrec, jday
import numpy as np
from datetime import datetime, timedelta

def parse_tle_file(tle_path):
    """
    Parses a Two-Line Element (TLE) file and creates a list of Satrec objects.

    Each satellite's data is represented by two lines (line1 and line2).
    These lines are converted to Satrec (Satellite Record) objects using SGP4.

    Parameters:
        tle_path (str): Path to the TLE file.

    Returns:
        List[Satrec]: List of satellite record objects usable for orbit propagation.
    """
    satellites = []
    try:
        # Read all lines from the TLE file
        with open(tle_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()

            # Process every 3 lines (name, line1, line2)
            for i in range(0, len(lines) - 2, 3):
                line1 = lines[i + 1].strip()
                line2 = lines[i + 2].strip()

                # Create Satrec object from line1 and line2
                satellite = Satrec.twoline2rv(line1, line2)
                satellites.append(satellite)
    except Exception as e:
        print(f"❌ Error reading TLE file: {e}")

    return satellites

def propagate_satellite(satrec, minutes_ahead=0):
    """
    Propagates a satellite's orbit forward by a specified number of minutes.

    Uses the SGP4 algorithm to get satellite position in Earth-Centered Inertial (ECI) frame.

    Parameters:
        satrec (Satrec): A satellite record object from SGP4.
        minutes_ahead (int): Time to propagate forward from current UTC time.

    Returns:
        tuple or None: (x, y, z) ECI coordinates in kilometers or None if error.
    """
    try:
        # Get the future UTC datetime
        future_time = datetime.utcnow() + timedelta(minutes=minutes_ahead)

        # Convert datetime to Julian date required by sgp4
        jd, fr = jday(
            future_time.year,
            future_time.month,
            future_time.day,
            future_time.hour,
            future_time.minute,
            future_time.second + future_time.microsecond * 1e-6
        )

        # Propagate the satellite using SGP4 to get its position
        error_code, position, _ = satrec.sgp4(jd, fr)

        # Return position if propagation successful
        if error_code == 0:
            return position  # [x, y, z] in kilometers
        else:
            print(f"⚠️ Propagation error (code {error_code})")
            return None
    except Exception as e:
        print(f"❌ Propagation failed: {e}")
        return None

def simulate_all_debris(tle_path, forecast_minutes=0):
    """
    Simulates all satellite positions at a future time point.

    Loops through all TLE entries, propagates their orbits, and stores ECI positions.

    Parameters:
        tle_path (str): Path to the TLE file.
        forecast_minutes (int): Time in minutes to simulate into the future.

    Returns:
        List[dict]: List of dictionaries containing satellite ID and (x, y, z) position in km.
    """
    # Parse TLE file into satellite records
    satellites = parse_tle_file(tle_path)
    results = []

    # Propagate each satellite and collect position data
    for idx, sat in enumerate(satellites):
        pos = propagate_satellite(sat, forecast_minutes)
        if pos:
            results.append({
                'id': f"SAT-{idx}",   # Assign unique ID to each satellite
                'x_km': pos[0],
                'y_km': pos[1],
                'z_km': pos[2]
            })

    print(f"🛰️ Simulated {len(results)} satellites/debris positions at +{forecast_minutes} minutes.")
    return results


# Example usage (only run this when debugging directly):
# if __name__ == "__main__":
#     positions = simulate_all_debris("data/tle_debri_20250611.txt", forecast_minutes=60)
#     print(positions[:5])  # Show first 5 debris positions
