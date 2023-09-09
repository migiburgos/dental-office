const data = require("../../data/data.json");
const {
  createManyDoctors,
  deleteAllDoctors,
} = require("../../models/doctors/doctors.model");

async function httpGenerateAllData(req, res) {
  await createManyDoctors(data.doctors);
  return res.status(200).json({
    message: "Data Generated Successfully!",
  });
}

async function httpDeleteAllData(req, res) {
  await deleteAllDoctors();
  return res.status(200).json({
    message: "Data Deleted Successfully!",
  });
}

module.exports = {
  httpGenerateAllData,
  httpDeleteAllData,
};
