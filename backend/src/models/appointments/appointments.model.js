const Appointments = require("./appointments.mongo");
const ObjectId = require("mongoose").Types.ObjectId;

async function fetchAppointmentsByUserId(userId) {
  const appointments = await Appointments.find({
    user: new ObjectId(userId),
  });

  if (appointments) {
    return appointments;
  }

  return null;
}

async function createAppointment({ user, service, doctor, day, time }) {
  const appointment = await Appointments.create({
    user,
    service,
    doctor,
    day,
    time,
  });

  return appointment;
}

module.exports = {
  createAppointment,
  fetchAppointmentsByUserId,
};
