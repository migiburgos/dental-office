import { createSlice } from "@reduxjs/toolkit";
import { appointmentsActions } from "../actions";
const { fetchAppointments, fetchAppointmentsByDoctor, createAppointment } =
  appointmentsActions;

const authSlice = createSlice({
  name: "appointments",
  initialState: {
    data: null,
    dataByDoctor: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAppointments.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAppointments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAppointments.rejected, (state, action) => {
      //console.error('auth.reducer -> fetchAppointments.rejected', action.payload);
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchAppointmentsByDoctor.fulfilled, (state, action) => {
      state.dataByDoctor = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAppointmentsByDoctor.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAppointmentsByDoctor.rejected, (state, action) => {
      // console.error("auth.reducer -> fetchAppointmentsByDoctor.rejected", action.payload);
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(createAppointment.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createAppointment.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createAppointment.rejected, (state, action) => {
      // console.error("auth.reducer -> createAppointment.rejected", action.payload);
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
