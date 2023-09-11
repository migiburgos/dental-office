import { Box, Button, Container } from "@mui/material";
import React from "react";
import { SectionTitle } from "../../components";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonSchedule from "../../components/ButtonSchedule";

export default function Dashboard() {
  const navigate = useNavigate();

  const appointments = useSelector((state) => state.appointments.data);

  const handleEdit = (appointmentId, serviceTitle, doctorName, day, time) => {
    navigate(
      `/schedule?appointmentId=${appointmentId}&serviceTitle=${serviceTitle}&doctorName=${doctorName}&day=${day}&time=${time}`
    );
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
      <SectionTitle>Dashboard</SectionTitle>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: appointments ? "flex-end" : "center",
          mb: 2,
        }}
      >
        <ButtonSchedule type={appointments ? "regular" : "large"} />
      </Box>
      {appointments && (
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
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold" }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map(
                ({ _id, service, doctor, day, time }, index) => (
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
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          handleEdit(_id, service.title, doctor.name, day, time)
                        }
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
