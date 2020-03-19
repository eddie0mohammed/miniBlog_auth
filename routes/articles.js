
const express = require('express');

const articleController = require('../controllers/articleController');

const checkAuth = require('../middleware/checkAuth');

const router = express.Router();


// @route   GET /articles
// @desc    Get all articles
// @access  Public
router.get('/', articleController.getAllArticles);


// @route   POST /articles
// @desc    Create new article
// @access  Private
router.post('/', checkAuth, articleController.createArticle);


// @route   PATCH /articles/:articleId
// @desc    Update specific article
// @access  Private
router.patch('/:articleId', checkAuth, articleController.updateArticle);


// @route   DELETE /articles/:articleId
// @desc    Delete specific article
// @access  Private
router.delete('/:articleId', checkAuth, articleController.deleteArticle);



module.exports = router;