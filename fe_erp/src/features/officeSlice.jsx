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

export const getOfficeByid = createAsyncThunk("office/getbyid", async (id) => {
  const apiUrl = config.apiBaseUrl
  try {
    const response = await axios.get(apiUrl + `kantor-cabang/${id}`)
    return response.data
    
  } catch (error) {
    console.log(error)  
  }
})


export const addOffice = createAsyncThunk("office/add", async (params = {}) => {

  // const token = document.cookie
  //     .split('; ')
  //     .find((row) => row.startsWith('token='))
  //     ?.split('=')[1];

  const apiUrl = config.apiBaseUrl
  try {
      const response = await axios.post(apiUrl + "kantor-cabang", params, {
          // headers: {
          //     Authorization: `Bearer ${token}`
          // }
      });

      return response.data
  } catch (err) {
      console.log(err)
  }
})

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
      })
      .addCase(addOffice.fulfilled, (state, action) => {
        state.loading = false,
        state.errorMessage = null,
        state.data = action.payload
      })
      .addCase(addOffice.pending, (state, action) => {
        state.loading = true,
        state.errorMessage = null,
        state.data = null
      })
      .addCase(getOfficeByid.fulfilled, (state, action) => {
        state.loading = false,
        state.errorMessage = null,
        state.data = action.payload
      })
      .addCase(getOfficeByid.pending, (state, action) => {
        state.loading = true,
        state.errorMessage = null,
        state.data = null
      })
  }
});

export const officeSelector = {
  selectData: (state) => state.office.data,
  loading: (state) => state.office.loading,
  errorMessage: (state) => state.office.errorMessage
}

export default officeSlice.reducer;
