const express = require("express");

const authRouter = require("./auth/auth.router");
const dataRouter = require("./data/data.router");
const appointmentsRouter = require("./appointments/appointments.router");

const api = express.Router();

api.use("/auth", authRouter);
api.use("/data", dataRouter);
api.use("/appointments", appointmentsRouter);

module.exports = api;
