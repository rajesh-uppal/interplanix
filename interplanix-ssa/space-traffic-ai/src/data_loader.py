from sgp4.api import Satrec
from sgp4.conveniences import sat_epoch_datetime
from datetime import datetime, timedelta
import numpy as np

def load_sample_tle():
    tle_list = [
        ("ISS (ZARYA)",
         "1 25544U 98067A   24078.54712963  .00012071  00000+0  23197-3 0  9994",
         "2 25544  51.6422  34.9460 0002050  13.2828  72.7253 15.50031464438589")
    ]
    return tle_list

def propagate_satellite(tle, minutes=60):
    sat = Satrec.twoline2rv(tle[1], tle[2])
    positions = []
    epoch = sat_epoch_datetime(sat)
    for minute in range(minutes):
        dt = epoch + timedelta(minutes=minute)
        e, r, v = sat.sgp4(dt.year, dt.timetuple().tm_yday + dt.hour/24.0)
        if e == 0:
            positions.append(r)
    return positions
