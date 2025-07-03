from poliastro.bodies import Earth
from poliastro.twobody import Orbit
from poliastro.maneuver import Maneuver
from astropy import units as u

def simple_transfer():
    orb1 = Orbit.circular(Earth, alt=400 * u.km)
    orb2 = Orbit.circular(Earth, alt=800 * u.km)
    man = Maneuver.hohmann(orb1, orb2)
    print(f"Δv1 = {man.impulses[0][1]:.2f}, Δv2 = {man.impulses[1][1]:.2f}")
