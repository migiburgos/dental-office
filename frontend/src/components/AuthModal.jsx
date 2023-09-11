import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Button, Modal, TextField } from "@mui/material";
import { SectionTitle } from "../components";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../stores/actions";
import { useSnack } from "../context/SnackContext";
import { useAuthModal } from "../context/AuthModalContext";

const { login } = authActions;

export default function AuthModal() {
  const dispatch = useDispatch();
  const { isModalShowing, closeModal } = useAuthModal();
  const { showErrorAlert, showSuccessAlert } = useSnack();

  const auth = useSelector((state) => state.auth.data);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmit = () => {
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    if (auth) {
      closeModal();
      showSuccessAlert("Login Successfully!");
    }
  }, [auth]);

  return (
    <Modal
      open={isModalShowing}
      //   open={true}
      onClose={closeModal}
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
