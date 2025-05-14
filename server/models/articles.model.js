const db = require("../../db/connection");

const selectArticleById = (article_id) => {
  return db
    .query(
      "SELECT article_id,title,topic,author,body,created_at,votes,article_img_url FROM articles WHERE article_id = $1",
      [article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, message: "Resource not found" });
      }
      return result.rows[0];
    });
};

const selectArticles = () => {
  return db
    .query("SELECT * FROM articles")
    .then((result) => {
      return result.rows;
    })
    .catch(console.log);
};

module.exports = { selectArticleById, selectArticles };
