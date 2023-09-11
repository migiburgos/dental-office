import { configureStore } from "@reduxjs/toolkit";
import { authReducer, servicesReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
  },
});
