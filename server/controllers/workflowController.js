const Workflow = require('../models/Workflow');

// Get all workflows for a project
const getWorkflows = async (req, res) => {
    try {
        const workflows = await Workflow.find({ project: req.params.projectId });
        res.json(workflows);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new workflow
const createWorkflow = async (req, res) => {
    const { name, steps } = req.body;

    try {
        const workflow = new Workflow({
            project: req.params.projectId,
            name,
            steps,
        });

        await workflow.save();
        res.status(201).json(workflow);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a workflow step
const updateWorkflowStep = async (req, res) => {
    const { status, logs } = req.body;

    try {
        const workflow = await Workflow.findById(req.params.workflowId);
        const step = workflow.steps.id(req.params.stepId);

        if (!step) {
            return res.status(404).json({ message: 'Step not found' });
        }

        step.status = status || step.status;
        step.logs = logs || step.logs;

        await workflow.save();
        res.json(workflow);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getWorkflows, createWorkflow, updateWorkflowStep };
