import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

const initialState = {
  data: {},
  loading: false,
  errorMessage: null,
};

export const getEmployeeList = createAsyncThunk(
  "admin/get-employee",
  async (_, { rejectWithValue }) => {
    const apiUrl = config.apiBaseUrl;
    try {
      const response = await axios.get(apiUrl + "karyawan");
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEmployeeByid = createAsyncThunk(
  "employee/getbyid",
  async (id) => {
    const apiUrl = config.apiBaseUrl;
    try {
      const response = await axios.get(apiUrl + `karyawan/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addEmployee = createAsyncThunk(
  "employee/add",
  async (params = {}, { rejectWithValue }) => {
    // const token = document.cookie
    //     .split('; ')
    //     .find((row) => row.startsWith('token='))
    //     ?.split('=')[1];

    const apiUrl = config.apiBaseUrl;
    try {
      const response = await axios.post(apiUrl + "karyawan", params, {
        headers: {
          // Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/update",
  async ({ id, params }, { rejectWithValue }) => {
    // const token = document.cookie
    //     .split('; ')
    //     .find((row) => row.startsWith('token='))
    //     ?.split('=')[1];
    const apiUrl = config.apiBaseUrl;
    try {
      const response = await axios.post(apiUrl + `karyawan/${id}?_method=PUT`, params, {
        // headers: {
        //     "content-type": "multipart/form-data",
        //     Authorization: `Bearer ${token}`
        // }
      });

      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployeeList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.errorMessage = null;
      })
      .addCase(getEmployeeList.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = {};
      })
      .addCase(getEmployeeByid.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.errorMessage = null;
      })
      .addCase(getEmployeeByid.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = {};
      })
      .addCase(getEmployeeByid.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.errorMessage = null;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.meta.message;
        state.data = {};
      });
  },
});

export const employeeSelector = {
  selectData: (state) => state.employee.data,
  loading: (state) => state.employee.loading,
  errorMessage: (state) => state.employee.errorMessage,
};

export default employeeSlice.reducer;
