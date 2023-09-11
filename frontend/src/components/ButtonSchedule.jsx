import React from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ButtonSchedule({ type, openModal }) {
  const auth = useSelector((state) => state.auth.data);

  const onClick = () => {
    if (auth) {
    } else {
      openModal();
    }
  };

  return auth ? (
    <Button
      variant="contained"
      size="large"
      sx={[
        { width: 255, maxWidth: "100%" },
        type === "large" && { height: 64 },
      ]}
      onClick={onClick}
      component={Link}
      to="/schedule"
    >
      About Page
    </Button>
  ) : (
    <Button
      variant="contained"
      size="large"
      sx={[
        { width: 255, maxWidth: "100%" },
        type === "large" && { height: 64 },
      ]}
      onClick={onClick}
    >
      Schedule Appointment
    </Button>
  );
}
