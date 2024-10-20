const express = require('express');
const router = express.Router();
const { getExperiments, createExperiment } = require('../controllers/experimentController');

// Route to get all experiments for a project
router.get('/:projectId', getExperiments);

// Route to create a new experiment for a project
router.post('/:projectId', createExperiment);

module.exports = router;
