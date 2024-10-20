const express = require('express');
const router = express.Router();
const { getWorkflows, createWorkflow, updateWorkflowStep } = require('../controllers/workflowController');

// Route to get all workflows for a project
router.get('/:projectId', getWorkflows);

// Route to create a new workflow for a project
router.post('/:projectId', createWorkflow);

// Route to update a specific workflow step
router.put('/:workflowId/step/:stepId', updateWorkflowStep);

module.exports = router;
