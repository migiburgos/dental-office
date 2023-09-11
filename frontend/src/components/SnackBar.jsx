import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useSnack } from "../context/SnackContext";

export default function SnackBar() {
  const { snackState, closeAlert } = useSnack();
  return (
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
  );
}
