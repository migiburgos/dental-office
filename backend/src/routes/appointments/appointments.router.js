const express = require("express");
const {
  httpFetchAppointments,
  httpCreateAppointment,
  httpUpdateAppointments,
} = require("./appointments.controller");

const appointmentsRouter = express.Router();

appointmentsRouter.get("/", httpFetchAppointments);
appointmentsRouter.put("/:id", httpUpdateAppointments);
appointmentsRouter.post("/create", httpCreateAppointment);

module.exports = appointmentsRouter;
