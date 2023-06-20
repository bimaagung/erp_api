import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../config'

const initialState = {
  data: {},
  loading: false,
  errorMessage: null,
}

export const getDepartemntList = createAsyncThunk(
  "admin/get-departement",
  async (_, { rejectWithValue }) => {
    const apiUrl = config.apiBaseUrl;
    try {
      const response = await axios.get(apiUrl + "department");
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDepartemntList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDepartemntList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.errorMessage = null;
      })
      
  }
});

export const departmentSelector = {
  selectData: (state) => state.department.data,
  loading: (state) => state.department.loading,
  errorMessage: (state) => state.department.errorMessage
}

export default departmentSlice.reducer;
