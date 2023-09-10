import { Box, Button, Container } from "@mui/material";
import React from "react";
import { SectionTitle } from "../../components";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const appointments = [
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Dashboard() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        position: "relative",
        mt: 12,
        mb: 16,
      }}
    >
      <SectionTitle>Dashboard</SectionTitle>
      <TableContainer sx={{ mb: 12 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#EEEEEE" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Service</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Doctor
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Day
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Time
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map(({ service, doctor, day, time }, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {service.title}
                </TableCell>
                <TableCell align="right">{doctor.name}</TableCell>
                <TableCell align="right">{day}</TableCell>
                <TableCell align="right">{time}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" size="small">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{ width: 256, maxWidth: "100%", height: 64 }}
        >
          Schedule Appointment
        </Button>
      </Box>
    </Container>
  );
}
