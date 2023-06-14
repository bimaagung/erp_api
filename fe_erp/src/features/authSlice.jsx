import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import config from '../config'

// const apiUrl = config.apiBaseUrl
//       console.log(apiUrl)

const initialState = {
  token: null,
  loading: false,
  errorMessage: null,
}

export const signin = createAsyncThunk(
  "user/signin",
  async (params = {}, { rejectWithValue }) => {
    try {
  
      
      const response = await axios.post("http://localhost:8000/api/signin", params);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.errorMessage = null;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = true;
        state.errorMessage = action.payload;
      })
  }
});

export const authSelector = {
  selectRefreshToken : (state) => state.auth.token
}

export default authSlice.reducer;
