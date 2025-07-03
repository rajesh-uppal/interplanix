import gym
import numpy as np
from stable_baselines3 import PPO

class DummyOrbitalEnv(gym.Env):
    def __init__(self):
        super().__init__()
        self.observation_space = gym.spaces.Box(low=-1, high=1, shape=(4,))
        self.action_space = gym.spaces.Box(low=-0.05, high=0.05, shape=(2,))
        self.state = None
        self.reset()

    def reset(self):
        self.state = np.random.uniform(-0.5, 0.5, size=(4,))
        return self.state

    def step(self, action):
        self.state[:2] += self.state[2:]
        self.state[2:] += action
        dist = np.linalg.norm(self.state[:2])
        reward = -1 if dist < 0.05 else 1
        done = dist > 2.0
        return self.state, reward, done, {}

def train_agent():
    env = DummyOrbitalEnv()
    model = PPO("MlpPolicy", env, verbose=1)
    model.learn(total_timesteps=5000)
    return model
