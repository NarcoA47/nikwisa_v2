import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ReactNode } from "react";

interface Store {
  reviewsCount: ReactNode;
  productsCount: ReactNode;
  id: number;
  name: string;
  description: string;
  image: string;
  owner: string;
}

interface FetchStoresPayload {
  results: Store[];
}

interface StoreState {
  stores: Store[];
  selectedStore: Store | null;
  loading: boolean;
  error: string | null;
}

const initialState: StoreState = {
  stores: [],
  selectedStore: null,
  loading: false,
  error: null,
};

// Async Thunks
export const fetchStores = createAsyncThunk(
  "stores/fetchStores",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const fetchStoreById = createAsyncThunk(
  "stores/fetchStoreById",
  async (storeId: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

// Slice
const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStores.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchStores.fulfilled,
      (state, action: PayloadAction<FetchStoresPayload>) => {
        state.loading = false;
        state.stores = action.payload.results;
      }
    );
    builder.addCase(fetchStores.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchStoreById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchStoreById.fulfilled,
      (state, action: PayloadAction<Store>) => {
        state.loading = false;
        state.selectedStore = action.payload;
      }
    );
    builder.addCase(fetchStoreById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default storeSlice.reducer;
