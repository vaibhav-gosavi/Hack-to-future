import { useState } from 'react';
import axios from 'axios';

const ModelTrainingForm = () => {
    const [datasetPath, setDatasetPath] = useState('');  // Path to dataset
    const [modelType, setModelType] = useState('classification');  // Model type
    const [loading, setLoading] = useState(false);
    const [trainingMessage, setTrainingMessage] = useState('');

    // Function to handle model training
    const handleTrainModel = async () => {
        if (!datasetPath) {
            alert('Please enter the dataset path');
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/projects/train-model', {
                datasetPath,
                modelType
            });
            setTrainingMessage(res.data.message);
        } catch (error) {
            setTrainingMessage('Error during model training');
            console.error('Error training model', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Train Model</h1>
            <input
                type="text"
                value={datasetPath}
                onChange={(e) => setDatasetPath(e.target.value)}
                placeholder="Enter dataset path"
            />
            <br />
            <select value={modelType} onChange={(e) => setModelType(e.target.value)}>
                <option value="classification">Classification</option>
                <option value="regression">Regression</option>
            </select>
            <br />
            <button onClick={handleTrainModel} disabled={loading}>
                {loading ? 'Training...' : 'Start Training'}
            </button>

            {trainingMessage && <p>{trainingMessage}</p>}
        </div>
    );
};

export default ModelTrainingForm;
