import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";

import Swal from "sweetalert2";

import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import { AppDispatch, RootState } from "@/reducers/store";
import { loginUser } from "@/reducers/authSlice";
import Alert from "../forms/Alert";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    type: "success" | "danger";
  }>({ show: false, message: "", type: "success" });
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    } else {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await dispatch(
        loginUser({ username, password })
      ).unwrap();

      if (response.accessToken) {
        localStorage.setItem("access", response.accessToken);
        setAlert({
          show: true,
          message: "Login Successful! Redirecting...",
          type: "success",
        });
        setTimeout(() => {
          setAlert({ show: false, message: "", type: "success" });
          router.push("/dashboard");
        }, 4000);
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setAlert({
        show: true,
        message: "Login Failed. Please try again!",
        type: "danger",
      });
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "danger" });
      }, 4000);
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[500px] bg-white border-t-[5px] border-[#B88E2F] rounded-lg shadow-lg p-8 my-12 mx-auto transition-all hover:shadow-xl"
    >
      <h3 className="text-center text-4xl font-semibold">Login</h3>

      {/* Display Alert */}
      {alert.show && <Alert message={alert.message} type={alert.type} />}

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
        className={`w-full bg-[#B88E2F] text-white p-3 rounded-lg mt-6 ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#B88E2F]"
        }`}
        disabled={loading}
      >
        {loading ? <FaSpinner className="animate-spin" /> : "Login"}
      </button>

      {/* {error && <p className="mt-4 text-red-500 text-center">{error}</p>} */}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleForgotPassword}
          className="text-yellow-500 hover:underline text-sm"
        >
          Forgot Password?
        </button>
      </div>

      {/* Divider with Sign-In With text */}
      <div className="relative mt-6">
        <hr className="border-gray-300" />
        <span className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
          Sign in with
        </span>
      </div>

      <div className="text-center mt-6">
        <div className="flex justify-center items-center space-x-4">
          {/* Google Button */}
          <button
            onClick={() =>
              Swal.fire({
                icon: "info",
                title: "Google Sign-In Coming Soon",
                timer: 1500,
              })
            }
            className="flex items-center border border-gray-300 rounded-md px-4 py-2 transition duration-300 hover:shadow-lg"
          >
            <FcGoogle size={24} />
            <span className="ml-2 text-gray-700">Google</span>
          </button>

          {/* Facebook Button */}
          <button
            onClick={() =>
              Swal.fire({
                icon: "info",
                title: "Facebook Sign-In Coming Soon",
                timer: 1500,
              })
            }
            className="flex items-center border border-gray-300 rounded-md px-4 py-2 transition duration-300 hover:shadow-lg"
          >
            <FaSquareFacebook size={24} />
            <span className="ml-2 text-gray-700">Facebook</span>
          </button>
        </div>
      </div>

      {/* Signup Link */}
      <p className="text-center mt-4">
        <span className="text-slate-400">Not a member? </span>
        <a href="/signup" className="text-yellow-500 hover:underline">
          Signup
        </a>
      </p>
    </form>
  );
};

export default LoginForm;

// "use client";

// import { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { FaSquareFacebook } from "react-icons/fa6";

// const LoginForm = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <form className="w-full max-w-[500px] bg-white border-t-[5px] border-[#B88E2F] rounded-lg shadow-lg p-8 my-12 mx-auto hover:shadow-xl transition-all">
//       <h3 className="text-center text-4xl font-semibold">Login</h3>

//       <div className="form-row mt-6">
//         <label htmlFor="username" className="form-label">
//           Username
//         </label>
//         <input
//           type="text"
//           id="username"
//           placeholder="Enter your username"
//           className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-yellow-500"
//           required
//         />
//       </div>

//       <div className="form-row mt-6 relative">
//         <label htmlFor="password" className="form-label">
//           Password
//         </label>
//         <input
//           type={showPassword ? "text" : "password"}
//           id="password"
//           placeholder="Enter your password"
//           className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-yellow-500"
//           required
//         />
//         <div
//           className="absolute right-3 top-9 text-gray-600 cursor-pointer"
//           onClick={() => setShowPassword(!showPassword)}
//         >
//           {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-[#B88E2F] text-white p-3 rounded-lg mt-6 hover:bg-yellow-600"
//       >
//         Login
//       </button>

//       <div className="flex justify-center items-center mt-4">
//         <button className="text-yellow-500 hover:underline text-sm">
//           Forgot Password?
//         </button>
//       </div>

//       <div className="relative mt-6">
//         <hr className="border-gray-300" />
//         <span className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
//           Sign in with
//         </span>
//       </div>

//       <div className="flex justify-center items-center flex-wrap gap-4 mt-6">
//         <button className="flex items-center border border-gray-300 rounded-md px-4 py-2 transition hover:shadow-lg">
//           <FcGoogle size={18} />
//           <span className="text-[9px] ml-2 text-gray-700">Google</span>
//         </button>
//         <button className="flex items-center border border-gray-300 rounded-md px-4 py-2 transition hover:shadow-lg">
//           <FaSquareFacebook size={18} />
//           <span className="text-[9px] ml-2 text-gray-700">Facebook</span>
//         </button>
//       </div>

//       <p className="text-center mt-4">
//         <span className="text-slate-400">Not a member? </span>
//         <a href="/signup" className="text-yellow-500 hover:underline">
//           Signup
//         </a>
//       </p>
//     </form>
//   );
// };

// export default LoginForm;
