const {
  createAppointment,
  fetchAppointmentsByUserId,
} = require("../../models/appointments/appointments.model");
const UsersModel = require("../../models/users/users.model");
const DoctorsModel = require("../../models/doctors/doctors.model");
const ServicseModel = require("../../models/services/services.model");

async function httpCreateAppointment(req, res) {
  const { username, doctorName, serviceTitle, day, time } = req.body;

  // validate
  if (!username || !doctorName || !serviceTitle || !day || !time) {
    return res.status(400).json({
      error: {
        message: "Missing required appointment properties",
      },
    });
  }

  // check if user exists
  const user = await UsersModel.findByUsername(username);
  if (!user) {
    return res.status(400).json({
      error: {
        message: "User does not exist",
      },
    });
  }

  // check if doctor exists
  const doctor = await DoctorsModel.findByName(doctorName);
  if (!doctor) {
    return res.status(400).json({
      error: {
        message: "Doctor does not exist",
      },
    });
  }

  // check if service exists
  const service = await ServicseModel.findByTitle(serviceTitle);
  if (!service) {
    return res.status(400).json({
      error: {
        message: "Service does not exist",
      },
    });
  }

  // if doctor is in service
  const doctorInService = service.doctors.filter((d) => d.equals(doctor._id));
  if (doctorInService.length < 1) {
    return res.status(400).json({
      error: {
        message: "Doctor does not offer this service",
      },
    });
  }

  // check if day in doctor timings
  const dayInDoctorTiming = doctor.timings.filter(
    (timing) => timing.day === day
  );
  if (dayInDoctorTiming.length < 1) {
    return res.status(400).json({
      error: {
        message: "Doctor does not accept appointments on this day",
      },
    });
  }

  // check if time in doctor timings
  const timeInDoctorTiming = dayInDoctorTiming[0].times.filter(
    (t) => t === time
  );
  if (timeInDoctorTiming.length < 1) {
    return res.status(400).json({
      error: {
        message: "Doctor does not accept appointments on this time",
      },
    });
  }

  // create appointment
  const appointment = await createAppointment({
    user,
    service,
    doctor,
    day,
    time,
  });

  return res.status(201).json({
    appointment,
    message: "Appointment created successfully!",
  });
}

module.exports = {
  httpCreateAppointment,
};
