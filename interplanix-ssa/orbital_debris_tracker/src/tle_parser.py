# src/tle_parser.py

"""
TLE Parser Module
Parses a standard TLE file into structured data.
"""

import pandas as pd

def parse_tle_file(tle_path):
    """
    Parses a TLE (Two-Line Element) file and returns a DataFrame.

    Parameters:
        tle_path (str): Path to the TLE file.

    Returns:
        pd.DataFrame: DataFrame with satellite name, line1, and line2.
    """
    with open(tle_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    names, line1s, line2s = [], [], []

    # TLE files contain 3 lines per satellite: name, line1, line2
    for i in range(0, len(lines), 3):
        try:
            name = lines[i].strip()
            line1 = lines[i+1].strip()
            line2 = lines[i+2].strip()
            names.append(name)
            line1s.append(line1)
            line2s.append(line2)
        except IndexError:
            print(f"Warning: Incomplete TLE entry at line {i}")
            continue

    df = pd.DataFrame({
        'Name': names,
        'Line1': line1s,
        'Line2': line2s
    })

    return df
