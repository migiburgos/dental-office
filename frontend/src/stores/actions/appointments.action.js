import { createAsyncThunk } from "@reduxjs/toolkit";
import { appointmentsAPI } from "../apis";

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async (body, { rejectWithValue }) => {
    try {
      const appointments = await appointmentsAPI.fetchAppointments(body);

      return appointments.appointments;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAppointmentsByDoctor = createAsyncThunk(
  "appointments/fetchAppointmentsByDoctor",
  async (body, { rejectWithValue }) => {
    try {
      const appointments = await appointmentsAPI.fetchAppointmentsByDoctor(
        body
      );

      return appointments.appointments;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const appointments = await appointmentsAPI.createAppointment(body);
      dispatch(fetchAppointments());

      return appointments.appointments;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateAppointment = createAsyncThunk(
  "appointments/updateAppointment",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const appointments = await appointmentsAPI.updateAppointment(body);
      dispatch(fetchAppointments());

      return appointments.appointments;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointments/deleteAppointment",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const appointments = await appointmentsAPI.deleteAppointment(body);
      dispatch(fetchAppointments());

      return appointments.appointments;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
