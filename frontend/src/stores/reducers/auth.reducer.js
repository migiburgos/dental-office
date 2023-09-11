import { createSlice } from "@reduxjs/toolkit";
import { authActions } from "../actions";
const { register, login } = authActions;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      //console.error('auth.reducer -> register.rejected', action.payload);
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.error("auth.reducer -> login.rejected", action.payload);
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
