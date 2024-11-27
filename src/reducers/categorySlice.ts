import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface WeddingCategory {
  [x: string]: unknown;
  id: number;
  name: string;
  slug: string;
  image: string;
}

interface WeddingCategoryState {
  weddingCategories: string[];
  categories: WeddingCategory[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WeddingCategoryState = {
  weddingCategories: [],
  categories: [],
  status: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'weddingscategory/fetchWeddingCategories',
  async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/weddingscategory/`
      );
      console.log('API response:', response.data); // Log the response
      return response.data; // Assuming response.data is an array of categories
    } catch (error) {
      console.error('Error fetching categories:', error); // Log the error
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data?.message || 'Failed to fetch categories');
      } else {
        throw new Error('Failed to fetch categories');
      }
    }
  }
);

const weddingcategorySlice = createSlice({
  name: 'weddingCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default weddingcategorySlice.reducer;