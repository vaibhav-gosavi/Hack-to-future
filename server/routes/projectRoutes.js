const express = require('express');
const router = express.Router();
const { getProjects, createProject } = require('../controllers/projectController');

// Route to get all projects
router.get('/', getProjects);

// Route to create a new project
router.post('/', createProject);

module.exports = router;
