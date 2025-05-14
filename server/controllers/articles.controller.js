const {
  selectArticleById,
  selectArticles,
} = require("../models/articles.model.js");

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      return res.status(200).json({ article });
    })
    .catch((err) => {
      next(err);
    });
};

const getArticles = (req, res, next) => {
  selectArticles()
    .then((article) => {
      return res.status(200).json({ article });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getArticleById, getArticles };
