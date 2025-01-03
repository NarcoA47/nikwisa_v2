import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Defining types locally in the slice for clarity

export interface Offering {
  id: number; // ID as a string
  name: string;
  description: string;
  price: number;
  image: string | null; // Allow null for fallback
  phone_number?: string;
  whatsapp_number?: string;
}

export interface OfferingState {
  offerings: Offering[]; // Ensure offerings is always an array
  loading: boolean;
  error: string | null;
}

// Initial state for offerings
const initialState: OfferingState = {
  offerings: [],
  loading: false,
  error: null,
};

// Async thunks

// Fetch offering by ID
export const fetchOfferingById = createAsyncThunk(
  "offerings/fetchOfferingById",
  async (offeringId: number, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/offerings/${offeringId}`
      );
      console.log("fetchOfferingById response:", response.data);
      return response.data as Offering;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

// Fetch offerings by store ID
export const fetchOfferingsByStoreId = createAsyncThunk(
  "offerings/fetchOfferingsByStoreId",
  async (storeId: number, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/store_list/${storeId}/offerings`
      );
      console.log("fetchOfferingsByStoreId response:", response.data);

      // Assuming the response is an object containing an 'offerings' array
      return response.data as Offering[];
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

// Add a new offering
export const addOffering = createAsyncThunk(
  "offerings/addOffering",
  async (offeringData: Offering, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/offerings`,
        offeringData
      );
      return response.data as Offering;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

// Update an existing offering (partial edit)
export const updateOffering = createAsyncThunk(
  "offerings/updateOffering",
  async (
    {
      offeringId,
      offeringData,
    }: { offeringId: number; offeringData: Partial<Offering> },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/offerings/${offeringId}`,
        offeringData
      );
      return response.data as Offering;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

// Delete an offering
export const deleteOffering = createAsyncThunk(
  "offerings/deleteOffering",
  async (offeringId: number, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/offerings/${offeringId}`
      );
      return offeringId; // Return offering ID to be deleted for state updates
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

// Slice
const offeringsSlice = createSlice({
  name: "offerings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Offering by ID
    builder.addCase(fetchOfferingById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchOfferingById.fulfilled,
      (state, action: PayloadAction<Offering>) => {
        state.loading = false;
        const index = state.offerings.findIndex(
          (offering) => offering.id === action.payload.id
        );
        if (index === -1) {
          state.offerings.push(action.payload); // Add new offering if it doesn't exist
        } else {
          state.offerings[index] = action.payload; // Update existing offering
        }
      }
    );
    builder.addCase(fetchOfferingById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Fetch Offerings by Store ID
    builder.addCase(fetchOfferingsByStoreId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchOfferingsByStoreId.fulfilled,
      (state, action: PayloadAction<Offering[]>) => {
        state.loading = false;
        state.offerings = action.payload; // Set the fetched offerings
      }
    );
    builder.addCase(fetchOfferingsByStoreId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Add Offering
    builder.addCase(addOffering.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      addOffering.fulfilled,
      (state, action: PayloadAction<Offering>) => {
        state.loading = false;
        state.offerings.push(action.payload); // Add the new offering to the list
      }
    );
    builder.addCase(addOffering.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update Offering (Partial Update)
    builder.addCase(updateOffering.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateOffering.fulfilled,
      (state, action: PayloadAction<Offering>) => {
        state.loading = false;
        const index = state.offerings.findIndex(
          (offering) => offering.id === action.payload.id
        );
        if (index !== -1) {
          // Merge the updated offering with the existing one
          state.offerings[index] = {
            ...state.offerings[index],
            ...action.payload,
          };
        }
      }
    );
    builder.addCase(updateOffering.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete Offering
    builder.addCase(deleteOffering.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      deleteOffering.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.offerings = state.offerings.filter(
          (offering) => offering.id !== action.payload.toString()
        ); // Remove the deleted offering from the list
      }
    );
    builder.addCase(deleteOffering.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const offeringsReducer = offeringsSlice.reducer;
