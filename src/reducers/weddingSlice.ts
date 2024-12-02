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

export const fetchWeddingProduct = createAsyncThunk('weddingProduct/fetchWeddingProduct', async (categoryId: number) => {
  try {
    console.log(`Fetching product for category ID: ${categoryId}`);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/weddings/category/${categoryId}/`
    );
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || 'Failed to fetch product');
    } else {
      throw new Error('Failed to fetch product');
    }
  }
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