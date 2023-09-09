const Doctors = require("./doctors.mongo");

async function createManyDoctors(data) {
  const doctors = await Doctors.create(data);

  return doctors;
}

async function deleteAllDoctors(data) {
  const doctors = await Doctors.deleteMany();

  return doctors;
}

module.exports = {
  createManyDoctors,
  deleteAllDoctors,
};
