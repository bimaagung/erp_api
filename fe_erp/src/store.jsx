import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import officeSlice from "./features/officeSlice";
import employeeSlice from "./features/employeeSlice";
import departmentSlice from "./features/departmentSlice";
import positionSlice from "./features/positionSlice";

const store = configureStore({
  reducer: {
    office: officeSlice,
    auth: authSlice,
    employee: employeeSlice,
    department: departmentSlice,
    position : positionSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
