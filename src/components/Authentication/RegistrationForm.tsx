"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../reducers/authSlice";

export default function RegistrationForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  // State to track the current step
  const [step, setStep] = useState(1);

  // Form data state
  const [formData, setFormData] = useState({
    phone_number: "",
    otp: "",
    password: "",
    confirm_password: "",
    username: "",
    email: "",
    dob: "",
  });

  const [alert, setAlert] = useState<{ message: string; type: string } | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
  };

  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(null);

    if (step === 1) {
      // Handle phone number submission and OTP request
      if (!formData.phone_number) {
        setAlert({ message: "Phone number is required.", type: "error" });
        return;
      }

      try {
        console.log("Requesting OTP for:", formData.phone_number);
        setAlert({ message: "OTP sent successfully!", type: "success" });
        setStep(2); // Move to the next step
      } catch (error) {
        console.error("OTP request failed:", error);
        setAlert({
          message: "Failed to send OTP. Please try again.",
          type: "error",
        });
      }
    } else if (step === 2) {
      // Validate OTP
      if (formData.otp !== "1234") {
        setAlert({ message: "Invalid OTP. Please try again.", type: "error" });
        return;
      }
      setAlert({ message: "OTP verified!", type: "success" });
      setStep(3); // Move to the next step
    } else if (step === 3) {
      // Validate password match
      if (formData.password !== formData.confirm_password) {
        setAlert({ message: "Passwords do not match.", type: "error" });
        return;
      }
      setStep(4); // Move to the next step
    } else if (step === 4) {
      // Final submission
      if (!formData.username || !formData.email || !formData.dob) {
        setAlert({ message: "All fields are required.", type: "error" });
        return;
      }

      setLoading(true);
      try {
        // Simulate API call
        console.log("Submitting registration:", formData);
        setTimeout(() => {
          setAlert({ message: "Registration successful!", type: "success" });
          setLoading(false);
          router.push("/signin");
        }, 2000);
      } catch (error) {
        console.error("Registration failed:", error);
        setAlert({
          message: "Registration failed. Please try again.",
          type: "error",
        });
        setLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleNext}
      className="w-full max-w-[400px] bg-white border-t-[5px] border-[#B88E2F] rounded-lg shadow-md p-6 mx-auto my-12"
    >
      <h3 className="text-center text-2xl font-semibold mb-4">Register</h3>

      {/* Step Content */}
      {step === 1 && (
        <div className="mb-4">
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
      )}

      {step === 2 && (
        <div className="mb-4">
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700"
          >
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
      )}

      {step === 3 && (
        <>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
        </>
      )}

      {/* Alert Message */}
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

      {/* Submit/Next Button */}
      <button
        type="submit"
        className={`w-full bg-[#B88E2F] text-white py-2 px-4 rounded-md ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#B88E2F]"
        }`}
        disabled={loading}
      >
        {loading ? "Processing..." : step === 4 ? "Register" : "Next"}
      </button>

      <p className="text-center mt-4 text-sm">
        Already a member?{" "}
        <a href="/signin" className="text-yellow-500 hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}

// "use client";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import type { AppDispatch } from "../../../reducers/store";
// import { RootState } from "../../../reducers/store";
// import { createUserProfile } from "@/reducers/authSlice";

// export default function RegistrationForm() {
//   const dispatch: AppDispatch = useDispatch();
//   const router = useRouter();
//   const loading = useSelector((state: RootState) => state.auth.loading);

//   // State to track the current step
//   const [step, setStep] = useState(1);

//   // Form data state
//   const [formData, setFormData] = useState({
//     phone_number: "",
//     otp: "",
//     password: "",
//     confirm_password: "",
//     role: "Customer",
//     username: "",
//     email: "",
//     dob: "",
//   });

//   const [alert, setAlert] = useState<{ message: string; type: string } | null>(
//     null
//   );

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setAlert(null);

//     if (step === 1) {
//       // Handle phone number submission and OTP request
//       try {
//         // Simulate an OTP request
//         console.log("Requesting OTP for:", formData.phone_number);
//         setAlert({ message: "OTP sent successfully!", type: "success" });
//         setStep(2); // Move to the next step
//       } catch (error) {
//         console.error("OTP request failed:", error);
//         setAlert({
//           message: "Failed to send OTP. Please try again.",
//           type: "error",
//         });
//       }
//     } else if (step === 2) {
//       // Validate OTP
//       if (formData.otp === "1234") {
//         setAlert({ message: "OTP verified!", type: "success" });
//         setStep(3); // Move to the next step
//       } else {
//         setAlert({ message: "Invalid OTP. Please try again.", type: "error" });
//       }
//     } else if (step === 3) {
//       // Validate password match
//       if (formData.password !== formData.confirm_password) {
//         setAlert({ message: "Passwords do not match.", type: "error" });
//         return;
//       }
//       setStep(4); // Move to the next step
//     } else if (step === 4) {
//       // Final submission
//       try {
//         const response = await dispatch(createUserProfile(formData)).unwrap();
//         setAlert({ message: response.message, type: "success" });
//         setTimeout(() => {
//           router.push("/signin");
//         }, 2000);
//       } catch (error) {
//         console.error("Registration failed:", error);
//         setAlert({
//           message: "Registration failed. Please try again.",
//           type: "error",
//         });
//       }
//     }
//   };

//   return (
//     <form
//       onSubmit={handleNext}
//       className="w-full max-w-[400px] bg-white border-t-[5px] border-[#B88E2F] rounded-lg shadow-md p-6 mx-auto my-12"
//     >
//       <h3 className="text-center text-2xl font-semibold mb-4">Register</h3>

//       {/* Step Content */}
//       {step === 1 && (
//         <div className="mb-4">
//           <label
//             htmlFor="phone_number"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Phone Number
//           </label>
//           <input
//             type="text"
//             id="phone_number"
//             name="phone_number"
//             value={formData.phone_number}
//             onChange={handleChange}
//             className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//       )}

//       {step === 2 && (
//         <div className="mb-4">
//           <label
//             htmlFor="otp"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Enter OTP
//           </label>
//           <input
//             type="text"
//             id="otp"
//             name="otp"
//             value={formData.otp}
//             onChange={handleChange}
//             className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//             required
//           />
//         </div>
//       )}

//       {step === 3 && (
//         <>
//           <div className="mb-4">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="confirm_password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirm_password"
//               name="confirm_password"
//               value={formData.confirm_password}
//               onChange={handleChange}
//               className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//               required
//             />
//           </div>
//         </>
//       )}

//       {step === 4 && (
//         <>
//           <div className="mb-4">
//             <label
//               htmlFor="username"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="dob"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Date of Birth
//             </label>
//             <input
//               type="date"
//               id="dob"
//               name="dob"
//               value={formData.dob}
//               onChange={handleChange}
//               className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//               required
//             />
//           </div>
//         </>
//       )}

//       {/* Alert Message */}
//       {alert && (
//         <div
//           className={`mb-4 p-3 rounded-md text-center ${
//             alert.type === "success"
//               ? "bg-green-100 text-green-800"
//               : "bg-red-100 text-red-800"
//           }`}
//         >
//           {alert.message}
//         </div>
//       )}

//       {/* Submit/Next Button */}
//       <button
//         type="submit"
//         className={`w-full bg-[#B88E2F] text-white py-2 px-4 rounded-md ${
//           loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#B88E2F]"
//         }`}
//         disabled={loading}
//       >
//         {loading ? "Processing..." : step === 4 ? "Register" : "Next"}
//       </button>

//       <p className="text-center mt-4 text-sm">
//         Already a member?{" "}
//         <a href="/signin" className="text-yellow-500 hover:underline">
//           Sign in
//         </a>
//       </p>
//     </form>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import type { AppDispatch } from "../../../reducers/store";
// import { RootState } from "../../../reducers/store";
// import { createUserProfile } from "@/reducers/authSlice";

// export default function RegistrationForm() {
//   const dispatch: AppDispatch = useDispatch();
//   const router = useRouter();
//   const loading = useSelector((state: RootState) => state.auth.loading);

//   const [formData, setFormData] = useState({
//     role: "Customer",
//     username: "",
//     phone_number: "",
//     password: "",
//   });

//   const [alert, setAlert] = useState<{ message: string; type: string } | null>(
//     null
//   );

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setAlert(null);

//     try {
//       const response = await dispatch(createUserProfile(formData)).unwrap();
//       setAlert({ message: response.message, type: "success" });
//       setTimeout(() => {
//         router.push("/signin");
//       }, 2000);
//     } catch (error) {
//       console.error("Registration failed:", error);
//       setAlert({
//         message: "Registration failed. Please try again.",
//         type: "error",
//       });
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="w-full max-w-[400px] bg-white border-t-[5px] border-[#B88E2F] rounded-lg shadow-md p-6 mx-auto my-12"
//     >
//       <h3 className="text-center text-2xl font-semibold mb-4">Register</h3>

//       {/* Role Selection */}
//       <div className="mb-4">
//         <label
//           htmlFor="role"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Role
//         </label>
//         <select
//           id="role"
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//         >
//           <option value="Customer">Customer</option>
//           <option value="Tasker">Tasker</option>
//           <option value="Merchant">Merchant</option>
//         </select>
//       </div>

//       {/* Username */}
//       <div className="mb-4">
//         <label
//           htmlFor="username"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Username
//         </label>
//         <input
//           type="text"
//           id="username"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//           required
//         />
//       </div>

//       {/* Email */}
//       <div className="mb-4">
//         <label
//           htmlFor="phone_number"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Phone
//         </label>
//         <input
//           type="phone_number"
//           id="phone_number"
//           name="phone_number"
//           value={formData.phone_number}
//           onChange={handleChange}
//           className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//           required
//         />
//       </div>

//       {/* Password */}
//       <div className="mb-4">
//         <label
//           htmlFor="password"
//           className="block text-sm font-medium text-gray-700"
//         >
//           Password
//         </label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
//           required
//         />
//       </div>

//       {/* Alert Message */}
//       {alert && (
//         <div
//           className={`mb-4 p-3 rounded-md text-center ${
//             alert.type === "success"
//               ? "bg-green-100 text-green-800"
//               : "bg-red-100 text-red-800"
//           }`}
//         >
//           {alert.message}
//         </div>
//       )}

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className={`w-full bg-[#B88E2F] text-white py-2 px-4 rounded-md ${
//           loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#B88E2F]"
//         }`}
//         disabled={loading}
//       >
//         {loading ? "Registering..." : "Register"}
//       </button>

//       <p className="text-center mt-4 text-sm">
//         Already a member?{" "}
//         <a href="/signin" className="text-yellow-500 hover:underline">
//           Sign in
//         </a>
//       </p>
//     </form>
//   );
// }
