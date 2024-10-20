import pandas as pd
from tpot import TPOTClassifier, TPOTRegressor
import sys

# Load arguments passed from the backend
dataset_path = sys.argv[1]
model_type = sys.argv[2]  # 'classification' or 'regression'

# Load the dataset
data = pd.read_csv(dataset_path)
X = data.iloc[:, :-1]  # All rows, all columns except the last (features)
y = data.iloc[:, -1]   # Last column (target)

# Set up AutoML TPOT
if model_type == 'classification':
    tpot = TPOTClassifier(generations=5, population_size=50, verbosity=2)
elif model_type == 'regression':
    tpot = TPOTRegressor(generations=5, population_size=50, verbosity=2)
else:
    print("Invalid model type. Use 'classification' or 'regression'.")
    sys.exit(1)

# Train the model
tpot.fit(X, y)

# Export the best model
tpot.export('best_model_pipeline.py')

# Print accuracy for logging
accuracy = tpot.score(X, y)
print(f'Best model accuracy: {accuracy}')
