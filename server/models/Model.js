const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    modelType: {
        type: String,
        required: true,
    },
    parameters: {
        type: Object,
        default: {},
    },
    metrics: {
        type: Object,
        default: {},
    },
    status: {
        type: String,
        enum: ['Training', 'Trained', 'Failed'],
        default: 'Training',
    },
    trainedAt: {
        type: Date,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
