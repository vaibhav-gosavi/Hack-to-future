const Project = require('../models/Project');

// Get all projects for a user
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user.userId });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new project
const createProject = async (req, res) => {
    const { name, description } = req.body;

    try {
        const project = new Project({
            name,
            description,
            owner: req.user.userId,
        });

        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a project
const updateProject = async (req, res) => {
    const { name, description } = req.body;

    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.owner.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        project.name = name || project.name;
        project.description = description || project.description;

        await project.save();
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a project
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.owner.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await project.remove();
        res.json({ message: 'Project removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };
