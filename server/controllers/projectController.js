const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

// Existing functions for getting and creating projects
// (getProjects and createProject)

// Function to handle dataset upload
const uploadDataset = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Get dataset path and file metadata
        const datasetPath = req.file.path;
        const fileSize = req.file.size;
        const fileName = req.file.originalname;

        // Read the first few lines of the dataset to show metadata (for CSV example)
        const data = fs.readFileSync(datasetPath, 'utf-8');
        const rows = data.split('\n');
        const columnNames = rows[0].split(',');

        // Store metadata in the database (as part of a project or independently)
        const datasetMetadata = {
            name: fileName,
            path: datasetPath,
            size: fileSize,
            columns: columnNames,
            rowCount: rows.length - 1
        };

        // Optionally, you can store this metadata as part of a project in your database
        // const project = await Project.findById(req.body.projectId);
        // project.datasets.push(datasetMetadata);
        // await project.save();

        res.status(200).json({
            message: 'Dataset uploaded successfully',
            metadata: datasetMetadata
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const fs = require('fs');
const path = require('path');

// Controller for preprocessing dataset
const preprocessDataset = async (req, res) => {
    try {
        const { datasetPath, options } = req.body;  // Dataset path and preprocessing options

        // Read the dataset (assuming CSV)
        const data = fs.readFileSync(path.join(__dirname, '../', datasetPath), 'utf-8');
        let rows = data.split('\n').map(row => row.split(','));

        const columnNames = rows[0];
        rows = rows.slice(1);  // Remove the header row for processing

        // Example preprocessing options
        if (options.handleMissingValues) {
            rows = rows.map(row => row.map(value => (value === '' ? '0' : value)));  // Replace empty values with 0
        }

        if (options.normalize) {
            const numericColumns = rows[0].map((_, colIndex) => rows.map(row => parseFloat(row[colIndex]) || 0));
            const normalizedData = numericColumns.map(column => {
                const max = Math.max(...column);
                const min = Math.min(...column);
                return column.map(value => (value - min) / (max - min));
            });

            // Convert back to row-wise data after normalization
            rows = rows.map((_, rowIndex) => normalizedData.map(column => column[rowIndex]));
        }

        // Combine the column headers back with the processed rows
        const processedData = [columnNames, ...rows];

        res.status(200).json({
            message: 'Dataset preprocessed successfully',
            data: processedData,
        });
    } catch (error) {
        console.error('Error processing dataset:', error);
        res.status(500).json({ message: 'Server error during dataset preprocessing' });
    }
};


module.exports = { getProjects, createProject, uploadDataset, preprocessDataset};
