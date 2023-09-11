import React, { useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useSnack } from "../context/SnackContext";
import { useSelector } from "react-redux";

export default function SnackBar() {
  const { snackState, closeAlert, showErrorAlert } = useSnack();
  const authError = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (authError) {
      showErrorAlert(authError.message);
    }
  }, [authError]);

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