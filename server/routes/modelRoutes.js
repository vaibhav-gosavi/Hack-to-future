const express = require('express');
const router = express.Router();
const { getModels, createModel, updateModelMetrics } = require('../controllers/modelController');

// Route to get all models for a project
router.get('/:projectId', getModels);

// Route to create a new model for a project
router.post('/:projectId', createModel);

// Route to update a model's metrics
router.put('/:modelId', updateModelMetrics);

module.exports = router;
