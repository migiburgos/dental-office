const express = require("express");

const authRouter = require("./auth/auth.router");
const dataRouter = require("./data/data.router");

const api = express.Router();

api.use("/auth", authRouter);
api.use("/data", dataRouter);

module.exports = api;
