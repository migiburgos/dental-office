import React, { useCallback, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Booking from "../pages/Booking";
import Dashboard from "../pages/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { retrieveAuthToken } from "../utils/localStorage";
import { setAxiosAuthToken } from "../utils/axiosInstance";
import {
  authActions,
  servicesActions,
  appointmentsActions,
} from "../stores/actions/";

export default function AppRoutes() {
  const { fetchMyInfo } = authActions;
  const { fetchServices } = servicesActions;
  const { fetchAppointments } = appointmentsActions;

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.data);

  // --------------------LOGIN--------------------
  const login = useCallback(async () => {
    const userSession = await retrieveAuthToken();
    if (userSession) {
      const token = userSession.token;
      setAxiosAuthToken(token);
      dispatch(fetchMyInfo());
    }
  }, [dispatch, fetchMyInfo]);

  // --------------------INITIALIZE--------------------
  const initalize = useCallback(() => {
    login();
    dispatch(fetchServices());
  }, [login, dispatch, fetchServices]);

  useEffect(() => {
    initalize();

    return () => {};
  }, [initalize, dispatch]);

  // --------------------FETCH DATA--------------------
  const fetchData = useCallback(() => {
    if (auth) {
      dispatch(fetchAppointments());
    }
  }, [dispatch, auth, fetchAppointments]);

  useEffect(() => {
    fetchData();
    return () => {};
  }, [fetchData]);

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
