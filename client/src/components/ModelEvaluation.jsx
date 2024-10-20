import React, { useState } from 'react';
import axios from 'axios';

const ModelEvaluation = () => {
    const [experimentName, setExperimentName] = useState('AutoML Experiment'); // Default experiment name
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(false);

    // Function to fetch metrics from the backend
    const handleFetchMetrics = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/projects/fetch-metrics', {
                experimentName,
            });
            setMetrics(response.data.metrics);
        } catch (error) {
            console.error('Error fetching metrics:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Model Evaluation</h1>
            <input
                type="text"
                value={experimentName}
                onChange={(e) => setExperimentName(e.target.value)}
                placeholder="Enter experiment name"
            />
            <br />
            <button onClick={handleFetchMetrics} disabled={loading}>
                {loading ? 'Fetching Metrics...' : 'Fetch Metrics'}
            </button>

            {metrics && (
                <div>
                    <h2>Model Metrics</h2>
                    <pre>{metrics}</pre>
                </div>
            )}
        </div>
    );
};

export default ModelEvaluation;
