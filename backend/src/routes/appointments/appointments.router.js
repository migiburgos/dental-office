const express = require("express");
const {
  httpFetchAppointments,
  httpCreateAppointment,
} = require("./appointments.controller");

const appointmentsRouter = express.Router();

appointmentsRouter.get("/", httpFetchAppointments);
appointmentsRouter.post("/create", httpCreateAppointment);

module.exports = appointmentsRouter;
