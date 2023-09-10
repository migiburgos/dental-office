const Appointments = require("./appointments.mongo");
const ObjectId = require("mongoose").Types.ObjectId;
const UsersModel = require("../users/users.model");
const DoctorsModel = require("../doctors/doctors.model");
const ServicesModel = require("../services/services.model");

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
    // service: new ObjectId(serviceId),
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

async function updateAppointments(appointmentId, newData) {
  const appointments = await Appointments.findOneAndUpdate(
    {
      _id: new ObjectId(appointmentId),
    },
    newData,
    { new: true }
  )
    .populate({ path: "user", select: "username" })
    .populate({ path: "doctor", select: "name" })
    .populate({ path: "service", select: "title" });

  if (appointments) {
    return appointments;
  }

  return null;
}

async function deleteAllAppointments() {
  const appointments = await Appointments.deleteMany();

  return appointments;
}

async function createManyAppointments(data) {
  // get doctors by name
  const appointmentsWithData = await Promise.all(
    data.map(async (appointment) => {
      const user = await UsersModel.findByUsername(appointment.user);
      const doctor = await DoctorsModel.findByName(appointment.doctor);
      const service = await ServicesModel.findByTitle(appointment.service);

      appointment.user = user;
      appointment.doctor = doctor;
      appointment.service = service;

      return appointment;
    })
  );
  console.log(appointmentsWithData);

  const appointment = await Appointments.create(appointmentsWithData);

  return appointment;
}

async function fetchAppointmentsByDoctor(doctorId) {
  const appointments = await Appointments.find(
    {
      doctor: new ObjectId(doctorId),
    },
    "-user"
  )
    .populate({ path: "doctor", select: "name" })
    .populate({ path: "service", select: "title" });

  if (appointments) {
    return appointments;
  }

  return null;
}

module.exports = {
  createAppointment,
  fetchAppointmentsByUserId,
  isAppointmentAvailable,
  updateAppointments,
  deleteAllAppointments,
  createManyAppointments,
  fetchAppointmentsByDoctor,
};
