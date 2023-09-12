const path = require("path");
const express = require("express");
const cors = require("cors");

const api = require("./routes/api");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", api);

module.exports = app;
