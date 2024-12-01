import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Interfaces
interface Service {
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
  services: Service[];
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
export const fetchStoresWithServices = createAsyncThunk(
  "stores/fetchStoresWithServices",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores`
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
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}`
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

export const fetchServicesByStoreId = createAsyncThunk(
  "stores/fetchServicesByStoreId",
  async (storeId: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/${storeId}/services`
      );
      return response.data as Service[];
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
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores`,
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

// Slice
const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Stores
    builder.addCase(fetchStoresWithServices.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchStoresWithServices.fulfilled,
      (state, action: PayloadAction<Store[]>) => {
        state.loading = false;
        state.stores = action.payload;
      }
    );
    builder.addCase(fetchStoresWithServices.rejected, (state, action) => {
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
    builder.addCase(fetchServicesByStoreId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchServicesByStoreId.fulfilled,
      (state, action: PayloadAction<Service[]>) => {
        if (state.selectedStore) {
          state.selectedStore.services = action.payload;
        }
        state.loading = false;
      }
    );
    builder.addCase(fetchServicesByStoreId.rejected, (state, action) => {
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
  },
});

// const storeSlice = createSlice({
//   name: "stores",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchStoresWithServices.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(
//       fetchStoresWithServices.fulfilled,
//       (state, action: PayloadAction<Store[]>) => {
//         state.loading = false;
//         state.stores = action.payload;
//       }
//     );
//     builder.addCase(fetchStoresWithServices.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload as string;
//     });

//     builder.addCase(fetchStoreById.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(
//       fetchStoreById.fulfilled,
//       (state, action: PayloadAction<Store>) => {
//         state.loading = false;
//         state.selectedStore = action.payload;
//       }
//     );
//     builder.addCase(fetchStoreById.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload as string;
//     });

//     builder.addCase(fetchServicesByStoreId.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(
//       fetchServicesByStoreId.fulfilled,
//       (state, action: PayloadAction<Service[]>) => {
//         if (state.selectedStore) {
//           state.selectedStore.services = action.payload;
//         }
//         state.loading = false;
//       }
//     );
//     builder.addCase(fetchServicesByStoreId.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload as string;
//     });
//   },
// });

// Export the reducer
export const storeReducer = storeSlice.reducer;
