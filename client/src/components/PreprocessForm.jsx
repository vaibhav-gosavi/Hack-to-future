import React, { useState } from 'react';
import axios from 'axios';

const PreprocessForm = () => {
    const [datasetPath, setDatasetPath] = useState('path/to/dataset.csv');  // Change this path to your uploaded dataset
    const [options, setOptions] = useState({
        handleMissingValues: false,
        normalize: false,
    });
    const [processedData, setProcessedData] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleOptionChange = (e) => {
        setOptions({
            ...options,
            [e.target.name]: e.target.checked
        });
    };

    const handlePreprocess = async () => {
        setProcessing(true);
        try {
            const res = await axios.post('http://localhost:5000/api/projects/preprocess-dataset', {
                datasetPath,
                options
            });
            setProcessedData(res.data.data);
        } catch (error) {
            console.error('Error processing dataset:', error);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div>
            <h1>Preprocess Dataset</h1>

            <label>
                <input
                    type="checkbox"
                    name="handleMissingValues"
                    checked={options.handleMissingValues}
                    onChange={handleOptionChange}
                />
                Handle Missing Values
            </label>
            <br />

            <label>
                <input
                    type="checkbox"
                    name="normalize"
                    checked={options.normalize}
                    onChange={handleOptionChange}
                />
                Normalize Data
            </label>
            <br />

            <button onClick={handlePreprocess} disabled={processing}>
                {processing ? 'Processing...' : 'Start Preprocessing'}
            </button>

            {processedData && (
                <div>
                    <h2>Preprocessed Data</h2>
                    <pre>{JSON.stringify(processedData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default PreprocessForm;
