import React from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ButtonSchedule({ type }) {
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth.data);

  const onClick = () => {
    navigate("/schedule");
  };

  return (
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
