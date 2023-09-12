import React from "react";
import { Modal, Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

export default function LoadingIndicator() {
  const isAuthLoading = useSelector((state) => state.auth.loading);
  const isServicesLoading = useSelector((state) => state.services.loading);
  const isAppointmentsLoading = useSelector(
    (state) => state.appointments.loading
  );

  return (
    <Modal
      open={isAuthLoading || isServicesLoading || isAppointmentsLoading}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CircularProgress />
      </Box>
    </Modal>
  );
}
