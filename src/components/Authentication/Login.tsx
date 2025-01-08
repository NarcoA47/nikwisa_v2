import React, { useState, useEffect } from "react";
import { RootState } from "../../reducers/store";
import { loginUser, setAuth } from "../../reducers/authSlice";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: string } | null>(
    null
  );

  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(null); // Clear previous alerts

    try {
      // Simulating login API call
      const tokens = await loginUser(username, password);

      // If login is successful, set the auth state and redirect to dashboard
      dispatch(
        setAuth({
          tokens: {
            access: tokens.access,
            refresh: tokens.refresh,
            tokens: null,
          },
          user: { username, id: 0, email: "" },
          isAuthenticated: false,
        })
      );

      setAlert({ message: "Login successful!", type: "success" });

      // Redirecting user to dashboard
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (error) {
      console.error("Login failed:", error);
      setAlert({
        message: "Login failed. Please check your credentials and try again.",
        type: "error",
      });
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[500px] bg-white border-t-[5px] border-[#B88E2F] rounded-lg shadow-lg p-8 my-12 mx-auto transition-all hover:shadow-xl"
      >
        <h3 className="text-center text-4xl font-semibold">Login</h3>

        {/* Display Alert */}
        {alert && (
          <div
            className={`mb-4 p-3 rounded-md text-center ${
              alert.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {alert.message}
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
    </div>
  );
};

export default LoginForm;

// import React, { useState, useEffect } from "react";
// import { RootState } from "../../reducers/store";
// import { loginUser, setAuth } from "../../reducers/authSlice";
// import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
// import Swal from "sweetalert2";
// import Alert from "../forms/Alert";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";

// const LoginForm: React.FC = () => {
//   const dispatch = useDispatch();
//   const router = useRouter(); // Use router hook for redirection

//   const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   // Redirect if user is already authenticated
//   useEffect(() => {
//     if (isAuthenticated) {
//       router.push("/dashboard"); // Redirect to dashboard if authenticated
//     }
//   }, [isAuthenticated, router]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       // Simulating login API call
//       const tokens = await loginUser(username, password);

//       // If login is successful, set the auth state and redirect to dashboard
//       dispatch(setAuth({
//         tokens: {
//           access: tokens.access, refresh: tokens.refresh,
//           tokens: null
//         }, user: {
//           username,
//           id: 0,
//           email: ""
//         },
//         isAuthenticated: false
//       }));

//       Swal.fire({
//         icon: "success",
//         title: "Login Successful",
//         timer: 1500,
//       });

//       // Redirecting user to dashboard
//       router.push("/dashboard");
//     } catch (error) {
//       console.error("Login failed:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Login Failed",
//         text: "Please check your credentials and try again.",
//       });
//     }
//   };

//   const handleForgotPassword = () => {
//     router.push("/forgot-password"); // Redirect to forgot-password page
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-8">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-[500px] bg-white border-t-[5px] border-[#B88E2F] rounded-lg shadow-lg p-8 my-12 mx-ausition-all hover:shadow-xl"
//       >
//         <h3 className="text-center text-4xl font-semibold">Login</h3>

//         {/* Display Alert */}
//         {error && <Alert message={error} type="danger" />}

//         <div className="form-row mt-6">
//           <label htmlFor="username" className="form-label">
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-row mt-6">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <div
//               className="absolute right-3 top-3 text-gray-600 cursor-pointer"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
//             </div>
//           </div>
//         </div>

//       <button
//         type="submit"
//         className={`w-full bg-[#B88E2F] text-white p-3 rounded-lg mt-6 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#B88E2F]"}`}
//         disabled={loading}
//       >
//         {loading ? <FaSpinner className="animate-spin" /> : "Login"}
//       </button>

//         <div className="flex justify-between items-center mt-4">
//           <button
//             onClick={handleForgotPassword}
//             className="text-yellow-500 hover:underline text-sm"
//           >
//             Forgot Password?
//           </button>
//         </div>

//         {/* Divider with Sign-In With text */}
//         <div className="relative mt-6">
//           <hr className="border-gray-300" />
//           <span className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
//             Sign in with
//           </span>
//         </div>

//         <div className="text-center mt-6">
//           <div className="flex justify-center items-center space-x-4">
//             {/* Google Button */}
//             <button
//               onClick={() =>
//                 Swal.fire({
//                   icon: "info",
//                   title: "Google Sign-In Coming Soon",
//                   timer: 1500,
//                 })
//               }
//               className="flex items-center border border-gray-300 rounded-md px-4 py-2 transition duration-300 hover:shadow-lg"
//             >
//               {/* <FcGoogle size={24} /> */}
//               <span className="ml-2 text-gray-700">Google</span>
//             </button>

//             {/* Facebook Button */}
//             <button
//               onClick={() =>
//                 Swal.fire({
//                   icon: "info",
//                   title: "Facebook Sign-In Coming Soon",
//                   timer: 1500,
//                 })
//               }
//               className="flex items-center border border-gray-300 rounded-md px-4 py-2 transition duration-300 hover:shadow-lg"
//             >
//               {/* <FaSquareFacebook size={24} /> */}
//               <span className="ml-2 text-gray-700">Facebook</span>
//             </button>
//           </div>
//         </div>
//         {/* Signup Link */}
//         <p className="text-center mt-4">
//           <span className="text-slate-400">Not a member? </span>
//           <a href="/signup" className="text-yellow-500 hover:underline">
//             Signup
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
