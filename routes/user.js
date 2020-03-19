
const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();


// @route   GET /users
// @desc    Get all users
// @access  Public
router.get('/', userController.getAllUsers);


// @route   POST /users
// @desc    create new
// @access  Public
router.post('/', userController.createUser);


module.exports = router;