const { MongoError } = require('mongodb');
const { ObjectID } = require('mongodb');
const Article = require('../models/article');
const { notFoundError, forbidden } = require('../configs/error-msg');
const NotFoundError = require('../errors/not-found-err');
const PermissionError = require('../errors/permission-err');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      if (articles.length) {
        res.send(articles);
      } else {
        throw new NotFoundError(notFoundError.article);
      }
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.status(201).send({
      keyword: article.keyword,
      title: article.title,
      text: article.text,
      date: article.date,
      source: article.source,
      link: article.link,
      image: article.image,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
      }

      if (err instanceof MongoError) {
        return res.status(503).json({
          type: 'MongoError',
          message: err.message,
        });
      }

      return next(err);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findOne({ _id: new ObjectID(req.params.articleId) }).select('+owner')
    .orFail()
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new PermissionError(forbidden.deleteArticle);
      }
      article.remove()
        .then((document) => {
          res.send({ data: document });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
      }

      if (err instanceof MongoError) {
        return res.status(503).json({
          type: 'MongoError',
          message: err.message,
        });
      }

      return next(err);
    });
};
