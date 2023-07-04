import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

const initialState = {
  data: {},
  loading: false,
  errorMessage: null,
};

export const addFamily = createAsyncThunk(
  "family/add",
  async ({id, params } , { rejectWithValue }) => {
    const apiUrl = config.apiBaseUrl;
    try {
      const response = await axios.post(`${apiUrl}karyawan/keluarga/${id}`, params, {
        headers: {
          "Content-Type": "application/json",
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

const familySlice = createSlice({
  name: "family",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFamily.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.errorMessage = null;
      })
      .addCase(addFamily.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(addFamily.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.data = {};
      });
  },
});

export const familySelector = {
  selectData: (state) => state.family.data,
  loading: (state) => state.family.loading,
  errorMessage: (state) => state.family.errorMessage,
};

export default familySlice.reducer;
