import os
import pandas as pd
import numpy as np

def generate_synthetic_metadata(tle_file_path: str, output_path: str = "data/debris_metadata_expanded.csv"):
    """
    Generates a synthetic debris metadata file based on TLE data.
    The metadata includes mass, size, and source_event fields for each NORAD ID.

    Parameters:
        tle_file_path (str): Path to the TLE file to extract NORAD_CAT_IDs.
        output_path (str): Path to save the generated metadata CSV file.
    """

    def extract_norad_id(line1):
        try:
            return int(line1[2:7])
        except:
            return None

    # ✅ Read and parse TLE file
    with open(tle_file_path, 'r') as f:
        lines = [line.strip() for line in f.readlines() if line.strip()]

    if len(lines) % 3 != 0:
        print("⚠️ Warning: TLE lines are not a multiple of 3.")

    # ✅ Extract NORAD IDs from TLE
    norad_ids = []
    for i in range(0, len(lines) - 2, 3):
        line1 = lines[i + 1]
        norad_id = extract_norad_id(line1)
        if norad_id is not None:
            norad_ids.append(norad_id)

    unique_ids = sorted(set(norad_ids))
    print(f"✅ Extracted {len(unique_ids)} unique NORAD IDs from TLE file.")

    # ✅ Generate synthetic metadata
    np.random.seed(42)  # for reproducibility

    metadata_df = pd.DataFrame({
        'mass_kg': np.random.uniform(0.05, 5000.0, size=len(unique_ids)),  # 50 grams to 5 tons
        'size_cm': np.random.uniform(0.1, 100.0, size=len(unique_ids)),    # 1 mm to 1 meter
        'source_event': np.random.choice(['Fragmentation', 'Collision', 'Deployed Object'], size=len(unique_ids))
    }, index=unique_ids)

    metadata_df.index.name = 'norad_id'

    # ✅ Save to CSV
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    metadata_df.to_csv(output_path)
    print(f"✅ Synthetic metadata file saved at: {output_path}")


# Example usage
if __name__ == "__main__":
    generate_synthetic_metadata("data/tle_data_20250611.txt")
