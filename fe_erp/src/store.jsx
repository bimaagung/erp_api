import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import officeSlice from "./features/officeSlice";
import employeeSlice from "./features/employeeSlice";

const store = configureStore({
  reducer: {
    office: officeSlice,
    auth: authSlice,
    employee: employeeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
