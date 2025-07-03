# src/dummy_orbit_env.py
"""
🛰️ Dummy Orbital Environment for AI Training
--------------------------------------------
This is a simplified OpenAI Gym environment designed to simulate basic 2D orbital motion.
It is meant to train AI agents (like PPO) for satellite collision avoidance behavior.

Environment Overview:
- Observation: [x, y, vx, vy]
- Action: [Δvx, Δvy]
- Reward: +1 if outside danger zone, -1 if near center (possible collision)
- Episode ends if satellite moves too far away
"""

import gym
import numpy as np
from gym import spaces

class DummyOrbitalEnv(gym.Env):
    """
    Custom Gym environment for simulating simplified orbital behavior.
    The state contains 2D position and velocity. The agent applies
    small changes to velocity (Δvx, Δvy) to avoid a central 'danger' zone.
    """
    def __init__(self):
        super(DummyOrbitalEnv, self).__init__()

        # Define the 4D observation space: [x, y, vx, vy]
        self.observation_space = spaces.Box(
            low=-1.0, high=1.0, shape=(4,), dtype=np.float32
        )

        # Define the 2D action space: [Δvx, Δvy] (small nudges)
        self.action_space = spaces.Box(
            low=-0.05, high=0.05, shape=(2,), dtype=np.float32
        )

        # Initialize internal state
        self.state = None
        self.reset()

    def reset(self):
        """
        Randomize the initial state (position and velocity).
        Called at the beginning of each episode.
        """
        self.state = np.random.uniform(low=-0.5, high=0.5, size=(4,)).astype(np.float32)
        return self.state

    def step(self, action):
        """
        Apply agent's action to update the state.
        Returns: next_state, reward, done, info
        """
        # Unpack current state: [x, y, vx, vy]
        x, y, vx, vy = self.state

        # Update position using current velocity
        x += vx
        y += vy

        # Update velocity using agent's action (Δvx, Δvy)
        vx += action[0]
        vy += action[1]

        # Store updated state
        self.state = np.array([x, y, vx, vy], dtype=np.float32)

        # Compute distance to origin (assumed danger zone)
        dist = np.linalg.norm([x, y])

        # Reward: avoid being too close to center
        reward = -1.0 if dist < 0.05 else 1.0

        # Episode ends if satellite drifts too far
        done = dist > 2.0

        return self.state, reward, done, {}

def train_agent():
    """
    Trains a PPO agent on the DummyOrbitalEnv for 5000 timesteps.
    Returns the trained model.
    """
    from stable_baselines3 import PPO

    env = DummyOrbitalEnv()
    model = PPO("MlpPolicy", env, verbose=1)
    model.learn(total_timesteps=5000)
    return model
