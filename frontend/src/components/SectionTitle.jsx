import React from "react";
import Typography from "@mui/material/Typography";

export default function SectionTitle({ children }) {
  return (
    <Typography variant="h2" sx={{ fontWeight: "bold", marginBottom: "3rem" }}>
      {children}
    </Typography>
  );
}
