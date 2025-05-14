const db = require("./db/connection");
const express = require("express");
const app = express();

const { getAPI } = require("./server/controllers/api.controller");
const { getAllTopics } = require("./server/controllers/topics.controller");

app.use(express.json());

app.get("/api", getAPI);

app.get("/api/topics", getAllTopics);

module.exports = app;
