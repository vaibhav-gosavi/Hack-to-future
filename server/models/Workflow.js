const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    steps: [
        {
            name: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                enum: ['Pending', 'Running', 'Completed', 'Failed'],
                default: 'Pending',
            },
            startedAt: {
                type: Date,
                default: null,
            },
            completedAt: {
                type: Date,
                default: null,
            },
            logs: {
                type: String,
                default: '',
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Workflow = mongoose.model('Workflow', workflowSchema);

module.exports = Workflow;
