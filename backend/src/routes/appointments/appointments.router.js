const express = require("express");
const {
  httpFetchAppointments,
  httpCreateAppointment,
  httpUpdateAppointments,
  httpDeleteAppointmentById,
} = require("./appointments.controller");

const appointmentsRouter = express.Router();

appointmentsRouter.get("/", httpFetchAppointments);
appointmentsRouter.put("/:id", httpUpdateAppointments);
appointmentsRouter.post("/create", httpCreateAppointment);
appointmentsRouter.delete("/:id", httpDeleteAppointmentById);

module.exports = appointmentsRouter;
