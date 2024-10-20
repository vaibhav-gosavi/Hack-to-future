const Model = require('../models/Model');
const { spawn } = require('child_process');

// Get all models for a project
const getModels = async (req, res) => {
    try {
        const models = await Model.find({ project: req.params.projectId });
        res.json(models);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new model
const createModel = async (req, res) => {
    const { name, modelType, parameters } = req.body;

    try {
        const model = new Model({
            project: req.params.projectId,
            name,
            modelType,
            parameters,
        });

        await model.save();
        res.status(201).json(model);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Controller to fetch model evaluation metrics from MLflow
const fetchModelMetrics = (req, res) => {
    const experimentName = req.body.experimentName; // Pass experiment name from the frontend

    // Spawn a child process to run the Python script for fetching metrics
    const pythonProcess = spawn('python', ['fetch_model_metrics.py', experimentName]);

    let pythonOutput = '';

    // Capture the output from the Python script
    pythonProcess.stdout.on('data', (data) => {
        pythonOutput += data.toString();
    });

    // Capture errors
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
    });

    // On process close, return the result
    pythonProcess.on('close', (code) => {
        if (code === 0) {
            res.status(200).json({
                message: 'Metrics fetched successfully',
                metrics: pythonOutput, // Return the fetched metrics
            });
        } else {
            res.status(500).json({
                message: 'Failed to fetch metrics',
                error: `Python process exited with code ${code}`,
            });
        }
    });
};

// Controller to trigger model training using TPOT
const trainModel = (req, res) => {
    const { datasetPath, modelType } = req.body;

    // Spawn a Python process to run the training script
    const pythonProcess = spawn('python', ['train_model.py', datasetPath, modelType]);

    let output = '';

    // Capture stdout (output) from the Python script
    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    // Handle any errors
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });

    // When the Python process completes, send the output back to the client
    pythonProcess.on('close', (code) => {
        if (code === 0) {
            // Save model details to the database (optional)
            const model = new Model({
                name: 'Best Model',
                score: output.match(/Best model score: (\d+\.\d+)/)[1],
                parameters: {}, // Add more model parameters if needed
            });
            model.save();

            res.status(200).json({ message: 'Model training completed', output });
        } else {
            res.status(500).json({ message: 'Error during model training' });
        }
    });
};

module.exports = { getModels, createModel, updateModelMetrics, trainModel };
