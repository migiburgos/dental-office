const express = require("express");
const { httpFetchServices } = require("./services.controller");

const servicesRouter = express.Router();

servicesRouter.get("/", httpFetchServices);

module.exports = servicesRouter;
