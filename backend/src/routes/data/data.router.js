const express = require("express");
const { httpGenerateAllData, httpDeleteAllData } = require("./data.controller");

const dataRouter = express.Router();

dataRouter.get("/generate", httpGenerateAllData);
dataRouter.delete("/delete", httpDeleteAllData);

module.exports = dataRouter;
