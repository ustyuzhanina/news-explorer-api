const router = require('express').Router();

const { checkArticleReqHeaders, checkArticleBody, checkArticleParams } = require('../middlewares/validation');

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

router.get('/', checkArticleReqHeaders, getArticles);
router.post('/', checkArticleBody, createArticle);
router.delete('/:articleId', checkArticleParams, deleteArticle);

module.exports = router;
