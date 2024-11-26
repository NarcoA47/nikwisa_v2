import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface WeddingProduct {
  id: number;
  product_title: string;
  slug: string;
  location: string;
  contact: string;
  reaction: string | null;
  rating: string;
  services: string;
  send_inquiry: string | null;
  category: number;
  subcategory: string | null;
  related_products: number[];
}

interface WeddingProductState {
  product: WeddingProduct | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WeddingProductState = {
  product: null,
  status: 'idle',
  error: null,
};

export const fetchWeddingProduct = createAsyncThunk('weddingProduct/fetchWeddingProduct', async (productId: number) => {
  const response = await axios.get(`/api/products/${productId}`);
  return response.data;
});

const weddingProductSlice = createSlice({
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
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default weddingProductSlice.reducer;