import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCompanyProfile = createAsyncThunk(
  "company/fetchProfile",
  async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/company/`
    );
    return response.data;
  }
);

export const updateCompanyProfile = createAsyncThunk(
  "company/updateProfile",
  async (formData: FormData) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/company/`,
      formData
    );
    return response.data;
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    profile: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchCompanyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(updateCompanyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompanyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateCompanyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default companySlice.reducer;
