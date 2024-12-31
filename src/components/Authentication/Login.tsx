import React, { useState, useEffect } from "react";
import { RootState } from "../../reducers/store";
import { loginUser, setAuth } from "../../reducers/authSlice";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import Alert from "../forms/Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate hook for redirection

  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); // Redirect to dashboard if authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Simulating login API call
      const tokens = await loginUser(username, password);
      
      // If login is successful, set the auth state and redirect to dashboard
      dispatch(setAuth(tokens));
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
      });

      // Redirecting user to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please check your credentials and try again.",
      });
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Redirect to forgot-password page
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[500px] bg-white border-t-[5px] border-[#B88E2F] rounded-lg shadow-lg p-8 my-12 mx-auto transition-all hover:shadow-xl"
    >
      <h3 className="text-center text-4xl font-semibold">Login</h3>

      {/* Display Alert */}
      {error && <Alert message={error} type="danger" />}

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
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className={`w-full bg-[#B88E2F] text-white p-3 rounded-lg mt-6 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#B88E2F]"}`}
        disabled={loading}
      >
        {loading ? <FaSpinner className="animate-spin" /> : "Login"}
      </button>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleForgotPassword}
          className="text-yellow-500 hover:underline text-sm"
        >
          Forgot Password?
        </button>
      </div>

      <div className="relative mt-6">
        <hr className="border-gray-300" />
        <span className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
          Sign in with
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
