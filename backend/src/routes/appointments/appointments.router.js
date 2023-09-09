const express = require("express");
const { httpCreateAppointment } = require("./appointments.controller");

const appointmentsRouter = express.Router();

appointmentsRouter.post("/create", httpCreateAppointment);

module.exports = appointmentsRouter;
