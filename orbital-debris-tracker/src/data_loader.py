import pandas as pd

import pandas as pd

import pandas as pd

import pandas as pd

def load_tle_data(filepath):
    """
    Load a TLE file assuming the standard 3-line format: Name, Line1, Line2.
    Returns a DataFrame with columns: Name, Line1, Line2
    """
    with open(filepath, 'r') as file:
        lines = [line.strip() for line in file if line.strip()]
        
    if len(lines) % 3 != 0:
        print(f"⚠️ Warning: TLE file has {len(lines)} lines, not a multiple of 3.")

    names, line1s, line2s = [], [], []
    
    for i in range(0, len(lines) - 2, 3):
        name = lines[i]
        l1 = lines[i + 1]
        l2 = lines[i + 2]
        if l1.startswith("1 ") and l2.startswith("2 "):
            names.append(name)
            line1s.append(l1)
            line2s.append(l2)
        else:
            print(f"⚠️ Skipping malformed TLE block:\n{name}\n{l1}\n{l2}")

    tle_df = pd.DataFrame({
        "Name": names,
        "Line1": line1s,
        "Line2": line2s
    })

    print(f"✅ Parsed {len(tle_df)} valid TLE entries.")
    return tle_df




