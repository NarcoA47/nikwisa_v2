import Offerings from "@/components/event-planning/tabs/Offerings";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Interfaces
interface Offering {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Review {
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  reviewText: string;
}

export interface Store {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  overview: string;
  photos: string[];
  reviewDetails: Review[];
  Offerings: Offering[];
}

interface StoreState {
  stores: Store[];
  selectedStore: Store | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: StoreState = {
  stores: [],
  selectedStore: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchStoresWithOfferings = createAsyncThunk(
  "stores/fetchStoresWithOfferings",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/store_list`
      );
      return response.data as Store[];
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchStoreById = createAsyncThunk(
  "stores/fetchStoreById",
  async (storeId: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/store_list/${storeId}`
      );
      return response.data as Store;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchOfferingsByStoreId = createAsyncThunk(
  "stores/fetchOfferingsByStoreId",
  async (storeId: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/store_list/${storeId}/`
      );
      return response.data as Offering[];
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const addStore = createAsyncThunk(
  "stores/addStore",
  async (storeData: Store, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/store_list/`,
        storeData
      );
      return response.data as Store;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const updateStore = createAsyncThunk(
  "stores/updateStore",
  async (
    { storeId, storeData }: { storeId: string; storeData: Store },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/store_list/${storeId}`,
        storeData
      );
      return response.data as Store;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const deleteStore = createAsyncThunk(
  "stores/deleteStore",
  async (storeId: string, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/store_list/${storeId}`
      );
      return storeId; // Return store ID to be deleted for state updates
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

// Slice
const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Stores
    builder.addCase(fetchStoresWithOfferings.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchStoresWithOfferings.fulfilled,
      (state, action: PayloadAction<Store[]>) => {
        state.loading = false;
        state.stores = action.payload;
      }
    );
    builder.addCase(fetchStoresWithOfferings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch Store By ID
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

    // Fetch Services By Store ID
    builder.addCase(fetchOfferingsByStoreId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchOfferingsByStoreId.fulfilled,
      (state, action: PayloadAction<Offering[]>) => {
        if (state.selectedStore) {
          state.selectedStore.Offerings = action.payload;
        }
        state.loading = false;
      }
    );
    builder.addCase(fetchOfferingsByStoreId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Add Store
    builder.addCase(addStore.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      addStore.fulfilled,
      (state, action: PayloadAction<Store>) => {
        state.loading = false;
        state.stores.push(action.payload); // Add the new store to the list
      }
    );
    builder.addCase(addStore.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update Store
    builder.addCase(updateStore.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateStore.fulfilled,
      (state, action: PayloadAction<Store>) => {
        state.loading = false;
        const index = state.stores.findIndex(
          (store) => store.id === action.payload.id
        );
        if (index !== -1) {
          state.stores[index] = action.payload; // Update the store in the list
        }
      }
    );
    builder.addCase(updateStore.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete Store
    builder.addCase(deleteStore.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      deleteStore.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.stores = state.stores.filter(
          (store) => store.id !== action.payload
        ); // Remove the deleted store from the list
      }
    );
    builder.addCase(deleteStore.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// export default storeSlice.reducer;
export const storeReducer = storeSlice.reducer;
