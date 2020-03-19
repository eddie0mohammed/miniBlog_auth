
const express = require('express');

const authController = require('../controllers/authController');

const checkAuth = require('../middleware/checkAuth');

const router = express.Router();


// @route   POST /auth
// @desc    login
// @access  Public
router.post('/', authController.login);


// @route   GET /auth/user
// @desc    Get current user
// @access  Private
router.get('/user', checkAuth, authController.getUser);




module.exports = router;