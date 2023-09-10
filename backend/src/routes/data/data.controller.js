const data = require("../../data/data.json");
const {
  createManyDoctors,
  deleteAllDoctors,
} = require("../../models/doctors/doctors.model");
const {
  createManyServices,
  deleteAllServices,
} = require("../../models/services/services.model");
const {
  deleteAllAppointments,
} = require("../../models/appointments/appointments.model");

async function httpGenerateAllData(req, res) {
  await createManyDoctors(data.doctors);
  await createManyServices(data.services);
  return res.status(200).json({
    message: "Data Generated Successfully!",
  });
}

async function httpDeleteAllData(req, res) {
  await deleteAllDoctors();
  await deleteAllServices();
  await deleteAllAppointments();
  return res.status(200).json({
    message: "Data Deleted Successfully!",
  });
}

module.exports = {
  httpGenerateAllData,
  httpDeleteAllData,
};
