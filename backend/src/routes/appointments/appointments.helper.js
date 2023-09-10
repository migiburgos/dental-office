const DoctorsModel = require("../../models/doctors/doctors.model");

async function checkDoctorTimeDayAvailable({ doctorName, day, time }) {
  // check if doctor exists
  const doctor = await DoctorsModel.findByName(doctorName);
  if (!doctor) {
    return {
      error: {
        message: "Doctor does not exist",
      },
    };
  }

  // check if day in doctor timings
  const dayInDoctorTiming = doctor.timings.filter(
    (timing) => timing.day === day
  );
  if (dayInDoctorTiming.length < 1) {
    return {
      error: {
        message: "Doctor does not accept appointments on this day",
      },
    };
  }

  // check if time in doctor timings
  const timeInDoctorTiming = dayInDoctorTiming[0].times.filter(
    (t) => t === time
  );
  if (timeInDoctorTiming.length < 1) {
    return {
      error: {
        message: "Doctor does not accept appointments on this time",
      },
    };
  }

  return { doctor };
}

module.exports = {
  checkDoctorTimeDayAvailable,
};
