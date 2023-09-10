import React, { useState } from "react";
import { Tabs, Tab, Box, Button, Modal, TextField } from "@mui/material";
import { SectionTitle } from "../components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

export default function AuthModal({ isModalShowing, closeModal }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmit = () => {};

  return (
    <Modal
      open={isModalShowing}
      //   open={true}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <SectionTitle>Login / Register</SectionTitle>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 8,
          }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </Box>

        {value === 1 && (
          <TextField
            label="Name"
            variant="outlined"
            sx={{ mb: 5 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <TextField
          label="Username"
          variant="outlined"
          sx={{ mb: 5 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          sx={{ mb: 5 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {value === 1 && (
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            sx={{ mb: 5 }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <Button
          variant="contained"
          size="large"
          sx={{ mb: 5 }}
          onClick={onSubmit}
        >
          {value === 0 ? "Login" : "Register"}
        </Button>
      </Box>
    </Modal>
  );
}
