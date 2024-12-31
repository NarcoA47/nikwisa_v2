import axios from "axios";

// Define token types
interface Tokens {
  access: string;
  refresh: string;
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

// Initial state
const initialState: AuthState = {
  isAuthenticated: Boolean(localStorage.getItem("access_token")),
  accessToken: localStorage.getItem("access_token") || null,
  refreshToken: localStorage.getItem("refresh_token") || null,
  user: null,
  error: null,
  loading: false,
};
// Reducer
interface AuthAction {
  type: string;
  payload?: Tokens;
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload ? action.payload.access : state.accessToken,
        refreshToken: action.payload ? action.payload.refresh : state.refreshToken,
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
export const setAuth = (tokens: Tokens, user: User) => ({
  type: SET_AUTH,
  payload: { ...tokens, user },
});

export const logout = () => ({
  type: LOGOUT,
});


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

    // Store tokens in localStorage
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);

    // Fetch user data using the access token
    let user = null;
    try {
      const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      user = userResponse.data;
    } catch (userError) {
      console.error("Failed to fetch user data:", userError);
      // Handle case where fetching user data fails but login still succeeds
    }

    // Return tokens and user data (user can be null if fetching user fails)
    return { access, refresh, user };
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Login failed");
  }
};
