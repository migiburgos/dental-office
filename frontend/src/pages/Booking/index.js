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
import React, { useEffect, useState } from "react";
import { SectionTitle } from "../../components";
import { useSelector } from "react-redux";

const appointmentsByDoctor = [
  {
    _id: "64fe031e4eec49c65dfb466d",
    service: {
      _id: "64fe031e4eec49c65dfb464c",
      title: "Dental Cleanings",
    },
    doctor: {
      _id: "64fe031e4eec49c65dfb4640",
      name: "John Smith",
    },
    day: "Monday",
    time: "1:30 PM",
    __v: 0,
  },
  {
    _id: "64fe031e4eec49c65dfb466e",
    service: {
      _id: "64fe031e4eec49c65dfb464c",
      title: "Dental Cleanings",
    },
    doctor: {
      _id: "64fe031e4eec49c65dfb4640",
      name: "John Smith",
    },
    day: "Tuesday",
    time: "5:30 PM",
    __v: 0,
  },
  {
    _id: "64fe031e4eec49c65dfb466f",
    service: {
      _id: "64fe031e4eec49c65dfb464c",
      title: "Dental Cleanings",
    },
    doctor: {
      _id: "64fe031e4eec49c65dfb4640",
      name: "John Smith",
    },
    day: "Wednesday",
    time: "3:30 PM",
    __v: 0,
  },
];

export default function Booking() {
  const services = useSelector((state) => state.services.data);

  const [service, setService] = useState("");
  const [doctor, setDoctor] = useState("");
  const [doctorWithSlots, setDoctorWithSlots] = useState(null);
  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);

  const [snackState, setSnackState] = useState({
    isOpen: false,
    type: "error",
    message: "This is an error message!",
  });

  const showErrorAlert = (newState) => {
    setSnackState({
      type: "error",
      message: "This is an error message!",
      isOpen: true,
    });
  };

  const showSuccessAlert = (newState) => {
    setSnackState({
      type: "success",
      message: "This is a success message!",
      isOpen: true,
    });
  };

  const closeAlert = () => {
    setSnackState({ ...snackState, isOpen: false });
  };

  const handleService = (event) => {
    setService(event.target.value);
    setDoctor("");
    setDay(null);
    setTime(null);
  };

  const handleDoctor = (event) => {
    setDoctor(event.target.value);
    setDoctorWithSlots(null);
    setDay(null);
    setTime(null);
  };

  const handleDayTime = (day, time) => {
    setDay(day);
    setTime(time);
  };

  useEffect(() => {
    if (doctor) {
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
  }, [doctor]);

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
          <Button variant="contained" size="large" onClick={showErrorAlert}>
            Error
          </Button>
          <Button variant="contained" size="large" onClick={showSuccessAlert}>
            Success
          </Button>
        </>
      )}
      <Snackbar
        open={snackState.isOpen}
        autoHideDuration={6000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={closeAlert}
          severity={snackState.type}
          sx={{ width: "100%" }}
        >
          {snackState.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
