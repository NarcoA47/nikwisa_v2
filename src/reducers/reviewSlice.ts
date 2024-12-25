import { Review, ReviewState } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for reviews
const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

// Async thunks

// Fetch reviews by store ID
export const fetchReviewsByStoreId = createAsyncThunk(
  "reviews/fetchReviewsByStoreId",
  async (storeId: number, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/store_list/${storeId}/reviews`
      );

      return response.data as Review[]; // Ensure this is an array of reviews
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

// Add a new review
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (
    { storeId, reviewData }: { storeId: string; reviewData: Review },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/store_list/${storeId}/reviews`,
        reviewData
      );
      return response.data as Review;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

// Update an existing review
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async (
    {
      storeId,
      reviewId,
      reviewData,
    }: { storeId: string; reviewId: string; reviewData: Review },
    thunkAPI
  ) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/store_list/${storeId}/reviews/${reviewId}`,
        reviewData
      );
      return response.data as Review;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

// Delete a review
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (
    { storeId, reviewId }: { storeId: string; reviewId: string },
    thunkAPI
  ) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/store_list/${storeId}/reviews/${reviewId}`
      );
      return reviewId; // Return review ID to be deleted for state updates
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

// Slice
const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Reviews by Store ID
    builder.addCase(fetchReviewsByStoreId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchReviewsByStoreId.fulfilled,
      (state, action: PayloadAction<Review[]>) => {
        state.loading = false;
        state.reviews = action.payload; // Set the fetched reviews
      }
    );
    builder.addCase(fetchReviewsByStoreId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Add Review
    builder.addCase(addReview.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      addReview.fulfilled,
      (state, action: PayloadAction<Review>) => {
        state.loading = false;
        state.reviews.push(action.payload); // Add the new review to the list
      }
    );
    builder.addCase(addReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update Review
    builder.addCase(updateReview.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateReview.fulfilled,
      (state, action: PayloadAction<Review>) => {
        state.loading = false;
        const index = state.reviews.findIndex(
          (review) => review.id === action.payload.id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload; // Update the review in the list
        }
      }
    );
    builder.addCase(updateReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete Review
    builder.addCase(deleteReview.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      deleteReview.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.reviews = state.reviews.filter(
          (review) => review.id !== Number(action.payload)
        ); // Remove the deleted review from the list
      }
    );
    builder.addCase(deleteReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const reviewsReducer = reviewsSlice.reducer;
