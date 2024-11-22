import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { RootState } from "./store";

// Interfaces
interface UserProfile {
  id: string;
  user_id: number;
  username: string;
  email: string;
  role: string;
  // Add other user profile fields as needed
}

interface AuthState {
  initialState: { user_id: number; username: string; email: string };
  role: string | null;
  access: unknown;
  user: UserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  access: undefined,
  role: null,
  initialState: {
    user_id: -1,
    username: "",
    email: "",
  },
};

// Load tokens from local storage if available
if (typeof window !== "undefined") {
  const accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");
  if (accessToken) {
    initialState.accessToken = accessToken;
    const decodedToken = jwtDecode<{ user_id: number }>(accessToken);
    initialState.user = {
      id: "",
      user_id: decodedToken.user_id,
      username: "",
      email: "",
      role: "",
    }; // Set user_id and initialize other fields
  }
  if (refreshToken) {
    initialState.refreshToken = refreshToken;
  }
}

// Async thunk for logging in the user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login/`,
        {
          username,
          password,
        }
      );

      const { access, refresh } = response.data;

      // Store tokens in local storage
      if (typeof window !== "undefined") {
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
      }

      // Decode the JWT token to get user information
      const decodedToken = jwtDecode<{ user_id: number }>(access);

      // Fetch user profile to get the role
      const userProfileResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${decodedToken.user_id}/`,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      return {
        accessToken: access,
        refreshToken: refresh,
        userProfile: userProfileResponse.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const accessToken = state.auth.accessToken;
      const userId = state.auth.user?.user_id;

      if (!accessToken || !userId) {
        return thunkAPI.rejectWithValue("No access token or user ID found");
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${userId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
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

// Async thunk for creating user profile
export const createUserProfile = createAsyncThunk(
  "auth/createUserProfile",
  async (profileData: Partial<UserProfile>, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        return thunkAPI.rejectWithValue("No access token found");
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
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

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (profileData: Partial<UserProfile>, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        return thunkAPI.rejectWithValue("No access token found");
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
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

// Async thunk for deleting user profile
export const deleteUserProfile = createAsyncThunk(
  "auth/deleteUserProfile",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const accessToken = state.auth.accessToken;

      if (!accessToken) {
        return thunkAPI.rejectWithValue("No access token found");
      }

      await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return;
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
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (
        state,
        action: PayloadAction<{
          accessToken: string;
          refreshToken: string;
          userProfile: UserProfile;
        }>
      ) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.userProfile;
        state.role = action.payload.userProfile.role; // Set the role
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchUserProfile.fulfilled,
      (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload.role; // Set the role
      }
    );
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(createUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      createUserProfile.fulfilled,
      (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload.role; // Set the role
      }
    );
    builder.addCase(createUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateUserProfile.fulfilled,
      (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload.role; // Set the role
      }
    );
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(deleteUserProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUserProfile.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    });
    builder.addCase(deleteUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
