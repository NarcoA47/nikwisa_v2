import axios from "axios";
import Cookies from "js-cookie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define token types
interface Tokens {
  access: string;
  refresh: string;
  // tokens?: unknown; // Add this line to include tokens property
  // tokens?: Tokens; // Add this line to include tokens property
  tokens: Tokens | null; // Add tokens property to AuthState
}

// Define User type
interface User {
  id: number;
  username: string;
  email: string;
}

// Define AuthState
interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  error: string | null;
  loading: boolean;
}

// Action types
const SET_AUTH = 'SET_AUTH';
const LOGOUT = 'LOGOUT';

// Check if cookies are available
const getCookie = (key: string): string | null => {
  return Cookies.get(key) || null;
};

// Initial state
const initialState: AuthState = {
  isAuthenticated: Boolean(getCookie("access_token")),
  accessToken: getCookie("access_token"),
  refreshToken: getCookie("refresh_token"),
  user: null,
  error: null,
  loading: false,
};

// Reducer
interface AuthAction {
  type: string;
  payload?: Tokens & { user?: User };
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload?.access || state.accessToken,
        refreshToken: action.payload?.refresh || state.refreshToken,
        user: action.payload?.user || state.user, // Update user in state
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};

// Actions
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state: AuthState, action: PayloadAction<{ tokens: Tokens; user: User; isAuthenticated: boolean }>) => {
      state.accessToken = action.payload.tokens.access;
      state.refreshToken = action.payload.tokens.refresh;
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    // other reducers...
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;

export const logout = () => ({
  type: LOGOUT,
});

// Function to refresh access token
const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/token/refresh/`,
      { refresh: refreshToken }
    );
    const { access } = response.data;
    Cookies.set("access_token", access);
    return access;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error("Token refresh failed");
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    // Make API request to fetch the tokens
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/token/`,
      {
        username,
        password,
      }
    );

    const { access, refresh }: Tokens = response.data;

    // Store tokens in cookies
    Cookies.set("access_token", access);
    Cookies.set("refresh_token", refresh);

    // Fetch user data using the access token
    let user = null;
    try {
      const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      user = userResponse.data;
    } catch (userError) {
      console.error("Failed to fetch user data:", userError);
      // Provide a fallback user object or log out the user
      user = { id: 0, username: "Guest", email: "" }; // Example fallback
    }
    // Return tokens and user data (user can be null if fetching user fails)
    return { access, refresh, user };
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Login failed");
  }
};

// Function to fetch user data with token refresh logic
export const fetchUserData = async () => {
  let access = getCookie("access_token");
  const refresh = getCookie("refresh_token");

  if (!access && refresh) {
    access = await refreshAccessToken(refresh);
  }

  if (access) {
    try {
      const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      return userResponse.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Failed to fetch user data");
    }
  } else {
    throw new Error("No valid tokens available");
  }
};
