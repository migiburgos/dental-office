import React, { useCallback, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

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
  const { fetchMyInfo, redirectUserToDashboard } = authActions;
  const { fetchServices } = servicesActions;
  const { fetchAppointments } = appointmentsActions;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth.data);
  const hasRedirectedToDashboard = useSelector(
    (state) => state.auth.hasRedirectedToDashboard
  );
  const appointments = useSelector((state) => state.appointments.data);

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

  // --------------------REDIRECT TO DASHBOARD--------------------
  useEffect(() => {
    if (!hasRedirectedToDashboard && appointments) {
      navigate("/dashboard");
      dispatch(redirectUserToDashboard());
    }
  }, [dispatch, navigate, hasRedirectedToDashboard, appointments]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<Booking />} />
      {auth && (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
