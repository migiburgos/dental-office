const data = require("../../data/data.json");
const {
  createManyDoctors,
  deleteAllDoctors,
} = require("../../models/doctors/doctors.model");
const {
  createManyServices,
  deleteAllServices,
} = require("../../models/services/services.model");

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
  return res.status(200).json({
    message: "Data Deleted Successfully!",
  });
}

module.exports = {
  httpGenerateAllData,
  httpDeleteAllData,
};
