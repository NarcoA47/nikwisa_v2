import { EvenPlanningProductState } from "@/types/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: EvenPlanningProductState = {
  product: null,
  event_categories: [],
  stores: [], // Add stores to the state
  status: "idle",
  error: null,
};

export const fetchEventProduct = createAsyncThunk(
  "eventProduct/fetchEventProduct",
  async () => {
    try {
      console.log("Fetching all eevnt planning products");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/eventcategory/`
      );
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      if (axios.isAxiosError(error) && error.response) {
        throw Error(
          error.response.data.message ||
            "Failed to fetch event planning products"
        );
      }
      throw error;
    }
  }
);

export const fetchEventCategories = createAsyncThunk(
  "eventProduct/fetchEventCategories",
  async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/eventcategory/`
      );
      console.log(" event_categories API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching event_categories:", error);
      if (axios.isAxiosError(error) && error.response) {
        throw Error(
          error.response.data.message || "Failed to fetch  event_categories"
        );
      }
      throw error;
    }
  }
);

// Fetch stores with offerings
export const fetchStoresWithOfferings = createAsyncThunk(
  "eventProduct/fetchStoresWithOfferings",
  async () => {
    try {
      console.log("Fetching stores with offerings");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/stores/`
      );
      console.log("Stores API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching stores:", error);
      if (axios.isAxiosError(error) && error.response) {
        throw Error(error.response.data.message || "Failed to fetch stores");
      }
      throw error;
    }
  }
);

const eventSlice = createSlice({
  name: "eventProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEventProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchEventProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(fetchEventCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEventCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.event_categories = action.payload;
      })
      .addCase(fetchEventCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(fetchStoresWithOfferings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStoresWithOfferings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stores = action.payload;
      })
      .addCase(fetchStoresWithOfferings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default eventSlice.reducer;

// import { Category, WeddingProduct, WeddingProductState } from "@/types/types";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState: WeddingProductState = {
//   product: null,
//   event_categories: [],
//   status: "idle",
//   error: null,
// };

// export const fetchEventProduct = createAsyncThunk(
//   "weddingProduct/fetchEventProduct",
//   async () => {
//     try {
//       console.log("Fetching all event planning products");
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/weddings/`
//       );
//       console.log("API response:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       if (axios.isAxiosError(error) && error.response) {
//         throw Error(
//           error.response.data.message || "Failed to fetch event planning products"
//         );
//       }
//       throw error;
//     }
//   }
// );

// export const fetchEventCategories = createAsyncThunk(
//   "weddingProduct/fetchEventCategories",
//   async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/weddingscategory/`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching event_categories:", error);
//       if (axios.isAxiosError(error) && error.response) {
//         throw Error(
//           error.response.data.message || "Failed to fetch event planning event_categories"
//         );
//       }
//       throw error;
//     }
//   }
// );

// const weddingSlice = createSlice({
//   name: "weddingProduct",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchEventProduct.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchEventProduct.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.product = action.payload;
//       })
//       .addCase(fetchEventProduct.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message ?? null;
//       })
//       .addCase(fetchEventCategories.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchEventCategories.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.event_categories = action.payload;
//       })
//       .addCase(fetchEventCategories.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message ?? null;
//       });
//   },
// });

// export default weddingSlice.reducer;
