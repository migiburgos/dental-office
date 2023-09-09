const {
  createAppointment,
  isAppointmentAvailable,
  fetchAppointmentsByUserId,
} = require("../../models/appointments/appointments.model");
const UsersModel = require("../../models/users/users.model");
const DoctorsModel = require("../../models/doctors/doctors.model");
const ServicseModel = require("../../models/services/services.model");

async function httpFetchAppointments(req, res) {
  const userId = req.context;

  const appointments = await fetchAppointmentsByUserId(userId);

  return res.status(200).json({
    appointments,
    message: "Retrieved appointments successfully!",
  });
}

async function httpCreateAppointment(req, res) {
  const { doctorName, serviceTitle, day, time } = req.body;
  const userId = req.context;

  // validate
  if (!doctorName || !serviceTitle || !day || !time) {
    return res.status(400).json({
      error: {
        message: "Missing required appointment properties",
      },
    });
  }

  // check if user exists
  const user = await UsersModel.findById(userId);
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

  // check if appointment is available
  const isAppointmentExists = isAppointmentAvailable({
    userId: user.id,
    serviceId: service.id,
    doctorId: doctor.id,
    day: day,
    time: time,
  });
  if (isAppointmentExists) {
    return res.status(400).json({
      error: {
        message: "This appointment is no longer available",
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
  httpFetchAppointments,
  httpCreateAppointment,
};
