const express = require("express");

const api = require("./routes/api");

const app = express();

app.use(express.json());

app.use("/api/v1", api);

module.exports = app;
