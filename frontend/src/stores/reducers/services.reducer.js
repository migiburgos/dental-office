import { createSlice } from "@reduxjs/toolkit";
import { servicesActions } from "../actions";
const { fetchServices } = servicesActions;

const authSlice = createSlice({
  name: "services",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchServices.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchServices.rejected, (state, action) => {
      //console.error('auth.reducer -> fetchServices.rejected', action.payload);
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
