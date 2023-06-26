import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

const initialState = {
  data: {},
  loading: false,
  errorMessage: null,
  success : false
};

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
  const apiUrl = config.apiBaseUrl;
  try {
    const response = await axios.get(apiUrl + `kantor-cabang/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const addOffice = createAsyncThunk(
  "office/add",
  async (params = {}, { rejectWithValue }) => {
    const apiUrl = config.apiBaseUrl;
    try {
      const response = await axios.post(apiUrl + "kantor-cabang", params);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const UpdateOffice = createAsyncThunk(
  "office/update",
  async ({ id, params }) => {
    // const token = document.cookie
    //     .split('; ')
    //     .find((row) => row.startsWith('token='))
    //     ?.split('=')[1];
    const apiUrl = config.apiBaseUrl;
    try {
      const response = await axios.post(apiUrl + `kantor-cabang/${id}?_method=PUT`, params, {
        // headers: {
        //     "content-type": "multipart/form-data",
        //     Authorization: `Bearer ${token}`
        // }
      });

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteOffice = createAsyncThunk("delete/office", async (id) => {
  console.log(id);
  const apiUrl = config.apiBaseUrl;
  const response = await axios.delete(apiUrl + `kantor-cabang/${id}`, {
    headers: {
      // Uncomment and modify headers as needed
      // "content-type": "multipart/form-data",
      // Authorization: `Bearer ${token}`,
    },
  });
  try {
    return response.data;
  } catch (err) {
    console.log(err);
  }
});
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
        state.loading = false;
        state.errorMessage = null;
        state.data = action.payload;
        state.success = true
      })
      .addCase(addOffice.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
        state.data = null;
      })
      .addCase(addOffice.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload.meta.message;
        state.data = {};
      })
      
      .addCase(getOfficeByid.fulfilled, (state, action) => {
        (state.loading = false),
          (state.errorMessage = null),
          (state.data = action.payload);
      })
      .addCase(getOfficeByid.pending, (state, action) => {
        (state.loading = true),
          (state.errorMessage = null),
          (state.data = null);
      })
      .addCase(UpdateOffice.pending, (state, action) => {
        (state.loading = true), (state.errorMessage = null);
        state.data = null;
      })
      .addCase(UpdateOffice.fulfilled, (state, action) => {
        (state.loading = false), (state.errorMessage = null);
        state.data = action.payload;
      })
      .addCase(deleteOffice.fulfilled, (state, action) => {
        state.loading = false;
        state.errorMessage = null
        state.data = action.payload
      })
      .addCase(deleteOffice.pending, (state, action) => {
        state.loading = true;
        state.errorMessage = null
        state.data = action.payload
      })
      .addCase(deleteOffice.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload
        state.data = null
      })
  },
});

export const officeSelector = {
  selectData: (state) => state.office.data,
  loading: (state) => state.office.loading,
  errorMessage: (state) => state.office.errorMessage,
  success : (state) => state.office.success
};

export default officeSlice.reducer;
