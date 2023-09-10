const express = require("express");

const authRouter = require("./auth/auth.router");
const dataRouter = require("./data/data.router");
const servicesRouter = require("./services/services.router");
const usersRouter = require("./users/users.router");
const appointmentsRouter = require("./appointments/appointments.router");

const auth = require("../middlewares/auth.middleware");

const api = express.Router();

api.use("/auth", authRouter);
api.use("/data", dataRouter);
api.use("/services", servicesRouter);
api.use("/users", auth, usersRouter);
api.use("/appointments", auth, appointmentsRouter);

module.exports = api;
