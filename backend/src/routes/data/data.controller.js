const data = require("../../data/data.json");
const {
  createUser,
  deleteGeneratedUser,
} = require("../../models/users/users.model");
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
  createManyAppointments,
} = require("../../models/appointments/appointments.model");

async function httpGenerateAllData(req, res) {
  await createUser(data.user.name, data.user.username, data.user.password);
  await createManyDoctors(data.doctors);
  await createManyServices(data.services);
  await createManyAppointments(data.appointments);
  return res.status(200).json({
    message: "Data Generated Successfully!",
  });
}

async function httpDeleteAllData(req, res) {
  await deleteAllAppointments();
  await deleteAllServices();
  await deleteAllDoctors();
  await deleteGeneratedUser();
  return res.status(200).json({
    message: "Data Deleted Successfully!",
  });
}

module.exports = {
  httpGenerateAllData,
  httpDeleteAllData,
};
