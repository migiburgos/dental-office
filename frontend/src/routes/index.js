import React, { useCallback, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Booking from "../pages/Booking";
import Dashboard from "../pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { retrieveAuthToken } from "../utils/localStorage";
import axiosInstance from "../utils/axiosInstance";
import { authActions } from "../stores/actions/";

const { fetchMyInfo } = authActions;

export default function AppRoutes() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.data);

  // --------------------LOGIN--------------------
  const login = useCallback(async () => {
    {
      const userSession = await retrieveAuthToken();
      if (userSession) {
        const token = userSession.token;
        axiosInstance.defaults.headers["auth-token"] = token;
        dispatch(fetchMyInfo()).then(() => console.log("yo"));
      }
    }
  }, [dispatch]);

  // --------------------INITIALIZE--------------------
  const initalize = useCallback(() => {
    login();
  }, [login]);

  useEffect(() => {
    initalize();

    return () => {};
  }, [initalize, dispatch]);

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
