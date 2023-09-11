import { createAsyncThunk } from "@reduxjs/toolkit";
import { servicesAPI } from "../apis";

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (body, { rejectWithValue }) => {
    try {
      const services = await servicesAPI.fetchServices(body);

      return services.services;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
