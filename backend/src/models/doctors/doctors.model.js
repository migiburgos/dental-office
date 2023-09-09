const Doctors = require("./doctors.mongo");

async function createManyDoctors(data) {
  const doctors = await Doctors.create(data);

  return doctors;
}

async function deleteAllDoctors(data) {
  const doctors = await Doctors.deleteMany();

  return doctors;
}

async function findByName(name) {
  const doctor = await Doctors.findOne({ name });

  if (doctor) {
    return doctor;
  }

  return null;
}

module.exports = {
  createManyDoctors,
  deleteAllDoctors,
  findByName,
};
