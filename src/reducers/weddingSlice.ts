import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ReactNode } from 'react';

interface WeddingProduct {
  location: ReactNode;
  contact: ReactNode;
  id: number;
  title: string;
  description: string;
  price: number;
  reaction: string | null;
  rating: string;
  services: string;
  send_inquiry: string | null;
  category: number;
  subcategory: string | null;
  related_products: number[];
}

interface Category {
  id: number;
  title: string;
  slug: string;
  image: string;
}

interface WeddingProductState {
  product: WeddingProduct | null;
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WeddingProductState = {
  product: null,
  categories: [],
  status: 'idle',
  error: null,
};

export const fetchWeddingProduct = createAsyncThunk('weddingProduct/fetchWeddingProduct', async () => {
  try {
    console.log('Fetching all wedding products');
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/weddings/`
    );
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw Error(error.response.data.message || 'Failed to fetch wedding products');
    }
    throw error;
  }
});

export const fetchWeddingCategories = createAsyncThunk('weddingProduct/fetchWeddingCategories', async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/weddingscategory/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw Error(error.response.data.message || 'Failed to fetch wedding categories');
    }
    throw error;
  }
});

const weddingSlice = createSlice({
  name: 'weddingProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeddingProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeddingProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchWeddingProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      })
      .addCase(fetchWeddingCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeddingCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchWeddingCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      });
  },
});

export default weddingSlice.reducer;