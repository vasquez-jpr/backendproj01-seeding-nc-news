const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (articlesData) => {
  if (articlesData.length === 0) {
    return {};
  }
  const result = {};
  articlesData.forEach((article) => {
    result[article.title] = article.article_id;
  });
  return result;
};

exports.createArticlesLookupObject = (articlesData) => {
  if (articlesData.length === 0) {
    return {};
  }
  const lookupObject = {};
  articlesData.forEach((article) => {
    lookupObject[article.title] = article.article_id;
  });
  return lookupObject;
};
