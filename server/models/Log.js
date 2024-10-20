const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    workflow: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workflow',
        required: true,
    },
    step: {
        type: String,
        required: true,
    },
    log: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
