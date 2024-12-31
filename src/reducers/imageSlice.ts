import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define types based on the image data structure from the backend
export interface ImageData {
  id: number;
  store: number;
  uploaded_at: string;
  image: string;
}

export interface ImageState {
  images: ImageData[]; // Store the list of images
  loading: boolean;
  error: string | null;
}

// Initial state for images
const initialState: ImageState = {
  images: [],
  loading: false,
  error: null,
};

// Async thunks

// Fetch all images for a store
export const fetchImagesByStoreId = createAsyncThunk(
  "images/fetchImagesByStoreId",
  async (storeId: number, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/store_list/${storeId}/images`
      );
      return response.data as ImageData[];
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

// Add a new image
export const addImage = createAsyncThunk(
  "images/addImage",
  async (imageData: FormData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/store_images/`,
        imageData
      );
      return response.data as ImageData;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

// Delete an image
export const deleteImage = createAsyncThunk(
  "images/deleteImage",
  async (imageId: number, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/store_images/${imageId}`
      );
      return imageId; // Return the image ID to be deleted for state updates
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

// Slice
const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Images by Store ID
    builder.addCase(fetchImagesByStoreId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchImagesByStoreId.fulfilled,
      (state, action: PayloadAction<ImageData[]>) => {
        state.loading = false;
        state.images = action.payload; // Set the fetched images
      }
    );
    builder.addCase(fetchImagesByStoreId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Add Image
    builder.addCase(addImage.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      addImage.fulfilled,
      (state, action: PayloadAction<ImageData>) => {
        state.loading = false;
        state.images.push(action.payload); // Add the new image to the list
      }
    );
    builder.addCase(addImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete Image
    builder.addCase(deleteImage.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      deleteImage.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.images = state.images.filter(
          (image) => image.id !== action.payload
        ); // Remove the deleted image from the list
      }
    );
    builder.addCase(deleteImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const imagesReducer = imagesSlice.reducer;
