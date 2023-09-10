import {
  Box,
  Chip,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SectionTitle } from "../../components";

const services = [
  {
    _id: "64fdf072295805991b69df55",
    title: "Service 1",
    description: "Lorem Ipsum alskjdaskd aklsjdklasjd  kldklas jads",
    doctors: [
      {
        _id: "64fdf072295805991b69df4b",
        name: "Bobby Drake",
        timings: [
          {
            day: "Tuesday",
            times: ["9:30 AM", "11:30 AM", "1:30 PM"],
          },
          {
            day: "Thursday",
            times: ["9:30 AM", "11:30 AM", "1:30 PM"],
          },
          {
            day: "Friday",
            times: ["9:30 AM", "11:30 AM", "1:30 PM"],
          },
        ],
        __v: 0,
      },
      {
        _id: "64fdf072295805991b69df4a",
        name: "Leila Howe",
        timings: [
          {
            day: "Monday",
            times: ["2:00 PM", "4:00 PM", "6:00 PM"],
          },
          {
            day: "Wednesday",
            times: ["2:00 PM", "4:00 PM", "6:00 PM"],
          },
          {
            day: "Friday",
            times: ["2:00 PM", "4:00 PM", "6:00 PM"],
          },
        ],
        __v: 0,
      },
      {
        _id: "64fdf072295805991b69df49",
        name: "John Smith",
        timings: [
          {
            day: "Monday",
            times: ["1:30 PM", "3:30 PM", "5:30 PM"],
          },
          {
            day: "Tuesday",
            times: ["1:30 PM", "3:30 PM", "5:30 PM"],
          },
          {
            day: "Wednesday",
            times: ["1:30 PM", "3:30 PM", "5:30 PM"],
          },
        ],
        __v: 0,
      },
    ],
    __v: 0,
  },
  {
    _id: "64fdf072295805991b69df56",
    title: "Service 2",
    description: "Lorem Ipsum alskjdaskd aklsjdklasjd  kldklas jads",
    doctors: [
      {
        _id: "64fdf072295805991b69df4a",
        name: "Leila Howe",
        timings: [
          {
            day: "Monday",
            times: ["2:00 PM", "4:00 PM", "6:00 PM"],
          },
          {
            day: "Wednesday",
            times: ["2:00 PM", "4:00 PM", "6:00 PM"],
          },
          {
            day: "Friday",
            times: ["2:00 PM", "4:00 PM", "6:00 PM"],
          },
        ],
        __v: 0,
      },
      {
        _id: "64fdf072295805991b69df49",
        name: "John Smith",
        timings: [
          {
            day: "Monday",
            times: ["1:30 PM", "3:30 PM", "5:30 PM"],
          },
          {
            day: "Tuesday",
            times: ["1:30 PM", "3:30 PM", "5:30 PM"],
          },
          {
            day: "Wednesday",
            times: ["1:30 PM", "3:30 PM", "5:30 PM"],
          },
        ],
        __v: 0,
      },
    ],
    __v: 0,
  },
  {
    _id: "64fdf072295805991b69df57",
    title: "Service 3",
    description: "Lorem Ipsum alskjdaskd aklsjdklasjd  kldklas jads",
    doctors: [
      {
        _id: "64fdf072295805991b69df49",
        name: "John Smith",
        timings: [
          {
            day: "Monday",
            times: ["1:30 PM", "3:30 PM", "5:30 PM"],
          },
          {
            day: "Tuesday",
            times: ["1:30 PM", "3:30 PM", "5:30 PM"],
          },
          {
            day: "Wednesday",
            times: ["1:30 PM", "3:30 PM", "5:30 PM"],
          },
        ],
        __v: 0,
      },
    ],
    __v: 0,
  },
];

export default function Booking() {
  const [service, setService] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);

  const handleService = (event) => {
    setService(event.target.value);
    setDoctor(null);
    setDay(null);
    setTime(null);
  };

  const handleDoctor = (event) => {
    setDoctor(event.target.value);
    setDay(null);
    setTime(null);
  };

  const handleDayTime = (day, time) => {
    setDay(day);
    setTime(time);
  };
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
            {services.map((s) => (
              <MenuItem value={s}>{s.title}</MenuItem>
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
              {service.doctors.map((d) => (
                <MenuItem value={d}>{d.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select a doctor</FormHelperText>
          </FormControl>
        )}
      </Box>

      {doctor && (
        <>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Available Slots
          </Typography>
          {doctor.timings.map(({ day: doctorDay, times }) => (
            <Box sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {doctorDay}
              </Typography>
              <Box>
                {times.map((doctorTime) => (
                  <Chip
                    label={doctorTime}
                    onClick={() => handleDayTime(doctorDay, doctorTime)}
                    variant={
                      doctorDay === day && doctorTime === time
                        ? "filled"
                        : "outlined"
                    }
                    color={
                      doctorDay === day && doctorTime === time
                        ? "primary"
                        : "default"
                    }
                    sx={{ mr: 1 }}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </>
      )}
    </Container>
  );
}
