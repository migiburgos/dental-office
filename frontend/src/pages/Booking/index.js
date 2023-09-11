import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { SectionTitle } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { appointmentsActions } from "../../stores/actions";
import { useSnack } from "../../context/SnackContext";

export default function Booking() {
  const { fetchAppointmentsByDoctor, createAppointment } = appointmentsActions;
  const dispatch = useDispatch();
  const { showErrorAlert, showSuccessAlert } = useSnack();

  const services = useSelector((state) => state.services.data);
  const appointmentsByDoctor = useSelector(
    (state) => state.appointments.dataByDoctor
  );

  const [service, setService] = useState("");
  const [doctor, setDoctor] = useState("");
  const [doctorWithSlots, setDoctorWithSlots] = useState(null);
  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);

  const handleService = (event) => {
    setService(event.target.value);
    setDoctor("");
    setDay(null);
    setTime(null);
  };

  const handleDoctor = (event) => {
    setDoctor(event.target.value);
    dispatch(fetchAppointmentsByDoctor({ doctor: event.target.value.name }));
    setDoctorWithSlots(null);
    setDay(null);
    setTime(null);
  };

  const handleDayTime = (day, time) => {
    setDay(day);
    setTime(time);
  };

  const handleCreateAppointment = () => {
    if (service && doctor && day && time) {
      // create appointment
      dispatch(
        createAppointment({
          doctorName: doctor.name,
          serviceTitle: service.title,
          day,
          time,
        })
      );
      showSuccessAlert("Appointment Booked Successfully!");
    } else {
      showErrorAlert("Missing required appointment property");
    }
  };

  // --------------------HANDLE DOCTOR WITH SLOTS--------------------
  useEffect(() => {
    if (doctor && appointmentsByDoctor) {
      // deep clone doctor
      let tempDoc = JSON.parse(JSON.stringify(doctor));
      // loop through doctor timing
      const newTimings = tempDoc.timings.map((timing) => {
        const { day, times } = timing;
        const newTimes = times.map((time) => {
          // if doctor day and time === appointment doctor day and time
          const isUnavailable =
            appointmentsByDoctor.filter(
              (a) =>
                a.doctor.name === doctor.name &&
                a.day === day &&
                a.time === time
            ).length > 0;
          // doctor time isUnavailable
          return { time, isUnavailable };
        });

        timing.times = newTimes;
        return timing;
      });
      tempDoc.timings = newTimings;
      setDoctorWithSlots(tempDoc);
    }
  }, [doctor, appointmentsByDoctor, dispatch, fetchAppointmentsByDoctor]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        position: "relative",
        mt: 12,
        mb: 16,
      }}
    >
      <SectionTitle>Schedule Appointment</SectionTitle>

      <Box sx={{ display: "flex", mb: 8 }}>
        <FormControl sx={{ width: 300, mr: 8 }}>
          <InputLabel id="service-select-helper-label">Service</InputLabel>
          <Select
            labelId="service-select-helper-label"
            id="service-select-helper"
            value={service}
            label="Service"
            onChange={handleService}
          >
            <MenuItem value="">
              <em>Select a service</em>
            </MenuItem>
            {services.map((s, i) => (
              <MenuItem key={i} value={s}>
                {s.title}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select a service</FormHelperText>
        </FormControl>

        {service && (
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="doctor-select-helper-label">Doctor</InputLabel>
            <Select
              labelId="doctor-select-helper-label"
              id="doctor-select-helper"
              value={doctor}
              label="Doctor"
              onChange={handleDoctor}
              disabled={service === null}
            >
              <MenuItem value="">
                <em>Select a doctor</em>
              </MenuItem>
              {service.doctors.map((d, i) => (
                <MenuItem key={i} value={d}>
                  {d.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select a doctor</FormHelperText>
          </FormControl>
        )}
      </Box>

      {doctorWithSlots && (
        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Available Slots
          </Typography>
          {doctorWithSlots.timings.map(({ day: doctorDay, times }, i) => (
            <Box key={i} sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {doctorDay}
              </Typography>
              <Box>
                {times.map((doctorTime, i) => (
                  <Chip
                    key={i}
                    label={doctorTime.time}
                    onClick={() => handleDayTime(doctorDay, doctorTime.time)}
                    variant={
                      (doctorDay === day && doctorTime.time === time) ||
                      doctorTime.isUnavailable
                        ? "filled"
                        : "outlined"
                    }
                    color={
                      doctorDay === day && doctorTime.time === time
                        ? "primary"
                        : "default"
                    }
                    disabled={doctorTime.isUnavailable}
                    sx={{ mr: 1 }}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}
      {service && doctor && day && time && (
        <>
          <Button
            variant="contained"
            size="large"
            onClick={handleCreateAppointment}
          >
            Schedule
          </Button>
        </>
      )}
    </Container>
  );
}
