import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";
export const login = createAsyncThunk(
    "user/login",
    async (params : any) => {
      try {
        const apiUrl = config.apiBaseUrl;
        // const apiUrl = '';
        const response = await axios.post(apiUrl + "/signin", params);
        return response.data;
      } catch (err: any) {
        if (!err.response) {
          throw err;
        }
        // Handle the error here if needed
        throw err;
      }
    }
  );

  interface authState {
    data: {},
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected',
    errorMessage : any
  }

const authSlice = createSlice({
    name: "auth",
    initialState: {
      data: {},
      loading: "idle",
      errorMessage: null,
    } as authState ,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.loading = "pending";
          state.errorMessage = null;
        })
        .addCase(login.fulfilled, (state :any, action) => {
          state.loading = "fulfilled";
          state.data = action.payload;
          state.errorMessage = null;
        })
        .addCase(login.rejected, (state : any, action) => {
          state.loading = "rejected";
          state.errorMessage  = action.payload;
        });
    },
  });


  export const authSelector = {
    selectToken: (state :any) => state.auth.data,
    loading: (state :any) => state.auth.loading,
    errorMessage: (state :any) => state.auth.errorMessage,
  };
  
  
  export default authSlice.reducer;