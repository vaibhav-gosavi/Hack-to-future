const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');

// Route to register a new user
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route to get user profile (requires authentication)
router.get('/profile', getUserProfile);

module.exports = router;
