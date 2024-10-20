const express = require('express');
const router = express.Router();
const { getProjects, createProject, uploadDataset } = require('../controllers/projectController');
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Store files in 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Save file with unique name
    }
});

const upload = multer({ storage: storage });

// Route to get all projects
router.get('/', getProjects);

// Route to create a new project
router.post('/', createProject);

router.post('/preprocess', preprocessDataset);



// Route to upload dataset
router.post('/upload-dataset', upload.single('dataset'), uploadDataset);

module.exports = router;
