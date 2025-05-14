const endpointsJson = require("../../endpoints.json");

const getAPI = (req, res) => {
  res.json({ endpoints: endpointsJson });
};

module.exports = { getAPI };
