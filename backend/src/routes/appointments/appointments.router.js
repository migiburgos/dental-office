const express = require("express");
const {
  httpFetchAppointments,
  httpCreateAppointment,
  httpUpdateAppointments,
  httpFetchAppointmentsByServiceAndDoctor,
} = require("./appointments.controller");

const appointmentsRouter = express.Router();

appointmentsRouter.get("/", httpFetchAppointments);
appointmentsRouter.get("/", httpFetchAppointmentsByServiceAndDoctor);
appointmentsRouter.put("/:id", httpUpdateAppointments);
appointmentsRouter.post("/create", httpCreateAppointment);

module.exports = appointmentsRouter;
