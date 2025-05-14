const { selectAllTopics } = require("../models/topics.model.js");

const getAllTopics = (req, res) => {
  selectAllTopics().then((topics) => {
    return res.status(200).json({ topics });
  });
};

module.exports = { getAllTopics };
