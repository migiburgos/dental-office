const Appointments = require("./appointments.mongo");
const ObjectId = require("mongoose").Types.ObjectId;

async function fetchAppointmentsByUserId(userId) {
  const appointments = await Appointments.find({
    user: new ObjectId(userId),
  })
    .populate({ path: "user", select: "username" })
    .populate({ path: "doctor", select: "name" })
    .populate({ path: "service", select: "title" });

  if (appointments) {
    return appointments;
  }

  return null;
}

async function isAppointmentAvailable({
  userId,
  serviceId,
  doctorId,
  day,
  time,
}) {
  const appointments = await Appointments.findOne({
    user: new ObjectId(userId),
    service: new ObjectId(serviceId),
    doctor: new ObjectId(doctorId),
    day,
    time,
  });

  if (appointments) {
    return true;
  }

  return false;
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
  isAppointmentAvailable,
};
