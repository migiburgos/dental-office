import { configureStore } from "@reduxjs/toolkit";
import { authReducer, servicesReducer, appointmentsReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    appointments: appointmentsReducer,
  },
});
