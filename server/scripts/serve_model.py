from flask import Flask, request, jsonify
import numpy as np
import joblib  # Used to load the model

app = Flask(__name__)

# Load the trained model (assume it's saved as best_model_pipeline.pkl)
model = joblib.load('best_model_pipeline.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    # Get the JSON input from the client
    data = request.json['data']

    # Convert input to numpy array for model prediction
    input_data = np.array(data['ndarray'])

    # Make predictions using the loaded model
    predictions = model.predict(input_data)

    # Return the predictions as JSON
    return jsonify({'predictions': predictions.tolist()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Run the Flask app on port 5000
