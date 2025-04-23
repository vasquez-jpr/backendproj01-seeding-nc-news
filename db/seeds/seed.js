const db = require("../connection");
const format = require("pg-format");
const {
  convertTimestampToDate,
  createRef,
  createArticlesLookupObject,
} = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(
        `CREATE TABLE users (
        username VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        avatar_url VARCHAR(1000) NOT NULL
      );`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE topics (
        slug VARCHAR(255) PRIMARY KEY,
        description VARCHAR(255) NOT NULL,
        img_url VARCHAR(1000) NOT NULL
      );`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        topic VARCHAR(255) REFERENCES topics(slug),
        author VARCHAR(255) REFERENCES users(username),
        body TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0,
        article_img_url VARCHAR(1000) NOT NULL
      );`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        article_id INT REFERENCES articles(article_id),
        body TEXT NOT NULL,
        votes INT DEFAULT 0,
        author VARCHAR(255) REFERENCES users(username),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
      );
    })
    .then(() => {
      const formattedTopics = topicData.map((topic) => {
        return [topic.slug, topic.description, topic.img_url];
      });
      const insertTopicsQuery = format(
        `INSERT INTO topics (
        slug,
        description,
        img_url
      )
      VALUES %L;`,
        formattedTopics
      );
      return db.query(insertTopicsQuery);
    })
    .then(() => {
      const formattedUsers = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      });
      const insertUsersQuery = format(
        `INSERT INTO users (
        username,
        name,
        avatar_url
      )
      VALUES %L;`,
        formattedUsers
      );
      return db.query(insertUsersQuery);
    })
    .then(() => {
      const formattedArticles = articleData.map((article) => {
        const acceptedArticle = convertTimestampToDate(article);
        return [
          acceptedArticle.title,
          acceptedArticle.topic,
          acceptedArticle.author,
          acceptedArticle.body,
          acceptedArticle.created_at,
          acceptedArticle.votes,
          acceptedArticle.article_img_url,
        ];
      });
      const insertArticlesQuery = format(
        `INSERT INTO articles (
        title,
        topic,
        author,
        body,
        created_at,
        votes,
        article_img_url
      )
      VALUES %L RETURNING *;`,
        formattedArticles
      );
      return db.query(insertArticlesQuery);
    })
    .then((result) => {
      const articlesLookup = createArticlesLookupObject(result.rows);
      // const articlesRefObject = createRef(result.rows);
      const formattedComments = commentData.map((comment) => {
        const acceptedComment = convertTimestampToDate(comment);
        return [
          // articlesRefObject[comment.article_title],
          // acceptedComment.article_id,
          articlesLookup[acceptedComment.article_title],
          acceptedComment.body,
          acceptedComment.votes,
          acceptedComment.author,
          acceptedComment.created_at,
        ];
      });
      console.log(formattedComments, "<<<<<");
      const insertCommentsQuery = format(
        `INSERT INTO comments (
        article_id,
        body,
        votes,
        author,
        created_at
      )
      VALUES %L;`,
        formattedComments
      );
      return db.query(insertCommentsQuery);
    })
    .then(() => {
      console.log("Seeding complete!");
    });
};
module.exports = seed;
