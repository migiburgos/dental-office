import React, { createContext, useContext, useEffect, useState } from "react";

const SnackContext = createContext(null);

export default function SnackContextProvider({ children }) {
  const [snackState, setSnackState] = useState({
    isOpen: false,
    type: "error",
    message: "This is an error message!",
  });

  const showErrorAlert = (message = "This is an error message!") => {
    setSnackState({
      type: "error",
      message: "This is an error message!",
      isOpen: true,
    });
  };

  const showSuccessAlert = (message = "This is a success message!") => {
    setSnackState({
      type: "success",
      message: message,
      isOpen: true,
    });
  };

  const closeAlert = () => {
    setSnackState({ ...snackState, isOpen: false });
  };

  return (
    <SnackContext.Provider
      value={{
        snackState,
        closeAlert,
        showErrorAlert,
        showSuccessAlert,
      }}
    >
      {children}
    </SnackContext.Provider>
  );
}

export function useSnack() {
  const context = useContext(SnackContext);

  if (context === null) {
    throw new Error("useSnack must be used within a SnackContextProvider");
  }

  return context;
}
