import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../config'

const initialState = {
  data: {},
  loading: false,
  errorMessage: null,
}

export const getOfficeList = createAsyncThunk(
  "admin/get-office",
  async (_, { rejectWithValue }) => {
    const apiUrl = config.apiBaseUrl;
    try {
      const response = await axios.get(apiUrl + "kantor-cabang");
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const officeSlice = createSlice({
  name: "office",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOfficeList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOfficeList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.errorMessage = null;
      })
      .addCase(getOfficeList.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = {};
      });
  }
});

export const officeSelector = {
  selectData: (state) => state.office.data,
  loading: (state) => state.office.loading,
  errorMessage: (state) => state.office.errorMessage
}

export default officeSlice.reducer;
