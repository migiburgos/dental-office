import React, { createContext, useContext, useState } from "react";

const AuthModalContext = createContext(null);

export default function AuthModalContextProvider({ children }) {
  const [isModalShowing, setIsModalShowing] = useState(false);
  const openModal = () => setIsModalShowing(true);
  const closeModal = () => setIsModalShowing(false);

  return (
    <AuthModalContext.Provider
      value={{
        isModalShowing,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);

  if (context === null) {
    throw new Error(
      "useAuthModal must be used within a AuthModalContextProvider"
    );
  }

  return context;
}
