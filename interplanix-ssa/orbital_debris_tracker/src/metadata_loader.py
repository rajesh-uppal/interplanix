# src/metadata_loader.py

"""
metadata_loader.py

🔍 Purpose:
Loads supplementary metadata for orbital debris objects such as:
- Size (diameter in cm)
- Mass (kg)
- Source event (e.g. collision, explosion)
- Material type (optional)

📌 This metadata is intended to enhance:
- Physical simulations (drag, decay, etc.)
- Visualization filters
- Risk analysis

👨‍💻 Author: Interplanix SSA Team
"""

import pandas as pd
import os

def load_debris_metadata(csv_path):
    """
    Loads debris metadata from a CSV file.

    Parameters:
    -----------
    csv_path : str
        Full path to the CSV file containing metadata.
        Expected to include columns like:
        - norad_id
        - size_cm
        - mass_kg
        - source_event
        - material (optional)

    Returns:
    --------
    pd.DataFrame
        DataFrame indexed by 'norad_id' for easy merging with TLE or feature datasets.
    """

    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"❌ Metadata file not found: {csv_path}")

    # Load the CSV
    metadata_df = pd.read_csv(csv_path)

    # Check required columns
    required_columns = {"norad_id", "size_cm", "mass_kg", "source_event"}
    missing = required_columns - set(metadata_df.columns)
    if missing:
        raise ValueError(f"❌ Missing required columns: {missing}")

    # Set 'norad_id' as the index (for easy joining with TLE-based DataFrames)
    metadata_df.set_index("norad_id", inplace=True)

    print(f"✅ Loaded debris metadata: {metadata_df.shape[0]} entries")
    return metadata_df


if __name__ == "__main__":
    # Example usage (you can run this directly to test)
    test_path = "data/debris_metadata_sample.csv"
    try:
        df_meta = load_debris_metadata(test_path)
        print(df_meta.head())
    except Exception as e:
        print(f"⚠️ Error: {e}")
