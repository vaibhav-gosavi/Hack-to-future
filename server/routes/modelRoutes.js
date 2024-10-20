const express = require('express');
const router = express.Router();
const { getModels, createModel, updateModelMetrics, trainModel, fetchModelMetrics } = require('../controllers/modelController');

// Route to get all models for a project
router.get('/:projectId', getModels);

// Route to create a new model for a project
router.post('/:projectId', createModel);

// Route to update a model's metrics
router.put('/:modelId', updateModelMetrics);

// Route to start model training
router.post('/train-model', trainModel);

// Route to fetch model metrics from MLflow
router.post('/fetch-metrics', fetchModelMetrics);

module.exports = router;
