const express = require("express");

const authRouter = require("./auth/auth.router");
const dataRouter = require("./data/data.router");
const appointmentsRouter = require("./appointments/appointments.router");
const auth = require("../middlewares/auth.middleware");

const api = express.Router();

api.use("/auth", authRouter);
api.use("/data", dataRouter);
api.use("/appointments", auth, appointmentsRouter);

module.exports = api;
