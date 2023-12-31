import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SectionTitle } from "../../components";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonSchedule from "../../components/ButtonSchedule";
import { appointmentsActions } from "../../stores/actions";

export default function Dashboard() {
  const { deleteAppointment } = appointmentsActions;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.data);
  const appointments = useSelector((state) => state.appointments.data);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteAppointment({ appointmentId: selectedAppointment._id }));
    handleDialogClose();
  };

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SectionTitle>Dashboard</SectionTitle>
        <Typography variant="h5">Hi, {auth.name}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            appointments && appointments.length > 0 ? "flex-end" : "center",
          mb: 2,
        }}
      >
        <ButtonSchedule
          type={appointments && appointments.length > 0 ? "regular" : "large"}
        />
      </Box>
      {appointments && appointments.length > 0 && (
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
                <TableCell align="right" sx={{ fontWeight: "bold" }} />
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
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          handleDialogOpen({ _id, service, doctor, day, time })
                        }
                        color="error"
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {selectedAppointment && (
          <>
            <DialogTitle id="alert-dialog-title">{`Cancel ${selectedAppointment.service.title} with ${selectedAppointment.doctor.name}`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please note that once you proceed with this action, it cannot be
                undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Disagree</Button>
              <Button onClick={handleDelete} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}
