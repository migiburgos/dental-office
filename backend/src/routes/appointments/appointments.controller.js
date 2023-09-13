const {
  createAppointment,
  isAppointmentAvailable,
  fetchAppointmentsByUserId,
  updateAppointments,
  fetchAppointmentsByDoctor,
  deleteAppointmentById,
} = require("../../models/appointments/appointments.model");
const UsersModel = require("../../models/users/users.model");
const DoctorsModel = require("../../models/doctors/doctors.model");
const ServicesModel = require("../../models/services/services.model");
const { checkDoctorTimeDayAvailable } = require("./appointments.helper");

async function httpFetchAppointments(req, res) {
  const userId = req.context;

  const appointments = await fetchAppointmentsByUserId(userId);

  return res.status(200).json({
    appointments,
    message: "Retrieved appointments successfully!",
  });
}

async function httpFetchAppointmentsByDoctor(req, res) {
  const { name: doctorName } = req.params;

  if (!doctorName) {
    return res.status(400).json({
      error: {
        message: "Missing doctor name",
      },
    });
  }

  const doctor = await DoctorsModel.findByName(doctorName);
  if (!doctor) {
    return res.status(400).json({
      error: {
        message: "Doctor does not exist",
      },
    });
  }

  const appointments = await fetchAppointmentsByDoctor(doctor.id);

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

  // check if doctor, time, and day is available
  const { doctor, error } = await checkDoctorTimeDayAvailable({
    doctorName,
    day,
    time,
  });
  if (error) {
    return res.status(400).json({
      error: {
        message: error.message,
      },
    });
  }

  // check if service exists
  const service = await ServicesModel.findByTitle(serviceTitle);
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

  // check if appointment is available
  const isAppointmentExists = await isAppointmentAvailable({
    userId: user.id,
    serviceId: service.id,
    doctorId: doctor.id,
    day: day,
    time: time,
  });
  if (isAppointmentExists) {
    return res.status(400).json({
      error: {
        message:
          "This appointment is no longer available. Choose another doctor, day, or time.",
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

async function httpUpdateAppointments(req, res) {
  const appointmentId = req.params.id;
  const { doctorName, day, time } = req.body;

  if (!appointmentId || !day || !time) {
    return res.status(400).json({
      error: {
        message: "Missing required appointment property",
      },
    });
  }

  // check if doctor time and day is available
  const { error } = await checkDoctorTimeDayAvailable({
    doctorName,
    day,
    time,
  });
  if (error) {
    return res.status(400).json({
      error: {
        message: error.message,
      },
    });
  }

  const appointment = await updateAppointments(appointmentId, { day, time });
  if (!appointment) {
    return res.status(400).json({
      error: {
        message: "Appointment does not exist",
      },
    });
  }

  return res.status(200).json({
    appointment,
    message: "Updated appointment successfully!",
  });
}

async function httpDeleteAppointmentById(req, res) {
  const appointmentId = req.params.id;

  if (!appointmentId) {
    return res.status(400).json({
      error: {
        message: "Missing appointmentId",
      },
    });
  }

  const appointment = await deleteAppointmentById(appointmentId);
  if (!appointment) {
    return res.status(400).json({
      error: {
        message: "Appointment does not exist",
      },
    });
  }

  return res.status(200).json({
    appointment,
    message: "Updated appointment successfully!",
  });
}

module.exports = {
  httpFetchAppointments,
  httpCreateAppointment,
  httpUpdateAppointments,
  httpDeleteAppointmentById,
  httpFetchAppointmentsByDoctor,
};
