from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import numpy as np

def simulate_data(n=1000):
    X = np.random.rand(n, 3)
    y = (X[:,0] < 0.1).astype(int)
    return X, y

def train_predictor():
    X, y = simulate_data()
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    model = RandomForestClassifier()
    model.fit(X_train, y_train)
    print(classification_report(y_test, model.predict(X_test)))
    return model
