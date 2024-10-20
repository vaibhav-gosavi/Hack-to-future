const Model = require('../models/Model');

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

// Update model metrics
const updateModelMetrics = async (req, res) => {
    const { metrics } = req.body;

    try {
        const model = await Model.findById(req.params.modelId);

        if (!model) {
            return res.status(404).json({ message: 'Model not found' });
        }

        model.metrics = metrics || model.metrics;
        await model.save();
        res.json(model);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getModels, createModel, updateModelMetrics };
