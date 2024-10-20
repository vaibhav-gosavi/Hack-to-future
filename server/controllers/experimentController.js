const Experiment = require('../models/Experiment');

// Get all experiments for a project
const getExperiments = async (req, res) => {
    try {
        const experiments = await Experiment.find({ project: req.params.projectId });
        res.json(experiments);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new experiment
const createExperiment = async (req, res) => {
    const { model, parameters, performanceMetrics } = req.body;

    try {
        const experiment = new Experiment({
            project: req.params.projectId,
            model,
            parameters,
            performanceMetrics,
        });

        await experiment.save();
        res.status(201).json(experiment);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getExperiments, createExperiment };
