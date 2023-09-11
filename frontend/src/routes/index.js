import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Booking from "../pages/Booking";
import Dashboard from "../pages/Dashboard";
import { useSelector } from "react-redux";

export default function AppRoutes() {
  const auth = useSelector((state) => state.auth.data);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {auth && (
        <>
          <Route path="/schedule" element={<Booking />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
