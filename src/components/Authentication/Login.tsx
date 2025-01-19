import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchToken } from "../../utils/api";
import {jwtDecode} from "jwt-decode";
import Cookies from 'js-cookie';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  interface UserData {
    username: string;
    email: string;
    // Add other properties if needed
  }

  const [userData, setUserData] = useState<UserData | null>(null); // State to hold user data

  useEffect(() => {
    // Check if access token is available in cookies
    const token = Cookies.get("access_token");
    if (token) {
      fetchUserData(token); // Fetch user data on token presence
      router.push("/dashboard"); // Redirect to dashboard if token is found
    }
  }, [router]);

  const fetchUserData = (token: string) => {
    try {
      const decoded: any = jwtDecode(token); // Decode the JWT to extract user data
      setUserData(decoded); // Set user data from decoded token
    } catch (err) {
      console.error("Failed to decode token", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { access, refresh } = await fetchToken(username, password);

      if (!access || !refresh) {
        throw new Error('No token found');
      }

      // Store tokens in cookies
      Cookies.set('access_token', access);
      Cookies.set('refresh_token', refresh);

      // Fetch user data after successful login
      fetchUserData(access);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: unknown) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[500px] bg-white border-t-[5px] border-[#B88E2F] rounded-lg shadow-lg p-8 my-12 mx-auto"
      >
        <h3 className="text-center text-4xl font-semibold">Login</h3>

        {/* Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-md text-center bg-red-100 text-red-800">
            {error}
          </div>
        )}

        <div className="form-row mt-6">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-row mt-6">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute right-3 top-3 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full bg-[#B88E2F] text-white p-3 rounded-lg mt-6 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#B88E2F]"}
          `}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex justify-between items-center mt-4">
          <button
            // onClick={handleForgotPassword}
            className="text-yellow-500 hover:underline text-sm"
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
