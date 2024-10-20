import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import GradientBoostingClassifier

# Load dataset and split for demo
data = pd.read_csv('path/to/dataset.csv')  # Replace with actual dataset path
X = data.drop('target_column', axis=1)
y = data['target_column']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Create the best pipeline found by TPOT
pipeline = make_pipeline(
    StandardScaler(),
    GradientBoostingClassifier()
)

# Train the pipeline on the training data
pipeline.fit(X_train, y_train)

# Predict using the trained model
predictions = pipeline.predict(X_test)

# Model accuracy
print(f'Model accuracy: {pipeline.score(X_test, y_test)}')
