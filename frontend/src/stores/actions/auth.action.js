import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../apis";
import { setAxiosAuthToken } from "../../utils/axiosInstance";
import { storeAuthToken, removeAuthToken } from "../../utils/localStorage";

export const register = createAsyncThunk(
  "auth/register",
  async (body, { rejectWithValue }) => {
    try {
      const data = await authAPI.register(body);

      setAxiosAuthToken(data.token);
      storeAuthToken(data.token);

      return data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (body, { rejectWithValue }) => {
    try {
      const data = await authAPI.login(body);

      setAxiosAuthToken(data.token);
      storeAuthToken(data.token);

      return data.user;
    } catch (error) {
      // console.error("auth.action -> login -> error", error);
      return rejectWithValue(error);
    }
  }
);

export const fetchMyInfo = createAsyncThunk(
  "auth/fetchMyInfo",
  async (body, { rejectWithValue }) => {
    try {
      const data = await authAPI.fetchMyInfo(body);

      return data.user;
    } catch (error) {
      // console.error("auth.action -> fetchMyInfo -> error", error);
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    removeAuthToken();
    return null;
  }
);
