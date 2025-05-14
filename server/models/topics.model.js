const db = require("../../db/connection");

const selectAllTopics = () => {
  return db
    .query("SELECT slug, description FROM topics")
    .then((result) => {
      return result.rows;
    })
    .catch(console.log);
};

module.exports = { selectAllTopics };
