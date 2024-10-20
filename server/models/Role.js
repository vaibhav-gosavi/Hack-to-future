const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
    },
    permissions: {
        type: [String], // e.g., ['create_project', 'delete_project', 'view_logs']
        required: true,
    },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
