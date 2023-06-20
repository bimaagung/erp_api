import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../config'

const initialState = {
  data: {},
  loading: false,
  errorMessage: null,
}

export const getPositionList = createAsyncThunk(
  "admin/get-position",
  async (_, { rejectWithValue }) => {
    const apiUrl = config.apiBaseUrl;
    try {
      const response = await axios.get(apiUrl + "position");
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPositionList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPositionList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.errorMessage = null;
      })
      
  }
});

export const positionSelector = {
  selectData: (state) => state.position.data,
  loading: (state) => state.position.loading,
  errorMessage: (state) => state.position.errorMessage
}

export default positionSlice.reducer;
