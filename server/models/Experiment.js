const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Model',
        required: true,
    },
    parameters: {
        type: Object,
        required: true,
    },
    performanceMetrics: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        enum: ['Running', 'Completed', 'Failed'],
        default: 'Running',
    },
    startedAt: {
        type: Date,
        default: Date.now,
    },
    completedAt: {
        type: Date,
        default: null,
    },
});

const Experiment = mongoose.model('Experiment', experimentSchema);

module.exports = Experiment;
