"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/reducers/store";
import { createUserProfile } from "@/reducers/authSlice";
// import type { AppDispatch } from "../../../reducers/store";
// import { RootState } from "../../../reducers/store";
// import { createUserProfile } from "@/reducers/authSlice";

// Define role-specific fields
const roleSpecificFields = {
  Tasker: [
    "services",
    "experience",
    "availability",
    "serviceAreas",
    "portfolio",
  ],
  Merchant: [
    "business_name",
    "product_categories",
    "delivery_options",
    "payment_methods",
    "stock_levels",
  ],
};

export default function RegistrationForm() {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const [formData, setFormData] = useState({
    role: "Customer", // default role
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    password: "",
    // Tasker/Merchant specific fields
    services: "",
    experience: "",
    availability: "",
    serviceAreas: "",
    portfolio: "",
    business_name: "",
    product_categories: "",
    delivery_options: "",
    payment_methods: "",
    stock_levels: "",
  });

  const [alert, setAlert] = useState<{ message: string; type: string } | null>(
    null
  );
  const [, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(null);

    try {
      const response = await dispatch(createUserProfile(formData)).unwrap();
      setAlert({ message: response.message, type: "success" });
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (error) {
      console.error("Registration failed:", error);
      setAlert({
        message: "Registration failed. Please try again.",
        type: "error",
      });
      setIsSuccess(false);
    }
  };

  // Dynamically generate fields based on role
  const getRoleSpecificFields = () => {
    const fields =
      roleSpecificFields[formData.role as keyof typeof roleSpecificFields];
    if (!fields) return null;

    return fields.map((field) => (
      <div className="form-row" key={field}>
        <label htmlFor={field} className="form-label">
          {field
            .replace("_", " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())}
        </label>
        <input
          type="text"
          name={field}
          value={formData[field as keyof typeof formData] || ""}
          onChange={handleChange}
          className="form-input"
          required
          placeholder={`Enter ${field.replace("_", " ")}`}
        />
      </div>
    ));
  };

  // Common fields to generate dynamically
  const commonFields = [
    "first_name",
    "last_name",
    "username",
    "email",
    "phone_number",
    "password",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[500px] bg-white border-t-[5px] border-[#B88E2F] rounded-lg shadow-lg p-8 my-12 mx-auto transition-all hover:shadow-xl"
    >
      <h3 className="text-center text-4xl font-semibold">Register</h3>

      {/* Role Selection */}
      <div className="form-row">
        <label htmlFor="role" className="form-label">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="form-select"
        >
          <option value="Customer">Customer</option>
          <option value="Tasker">Tasker</option>
          <option value="Merchant">Merchant</option>
        </select>
      </div>

      {/* Common Fields */}
      {commonFields.map((field) => (
        <div className="form-row" key={field}>
          <label htmlFor={field} className="form-label">
            {field
              .replace("_", " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </label>
          <input
            type={field === "password" ? "password" : "text"}
            name={field}
            value={formData[field as keyof typeof formData]}
            onChange={handleChange}
            className="form-input"
            required
            title={field}
            placeholder={`Enter ${field.replace("_", " ")}`}
          />
        </div>
      ))}

      {/* Role-Specific Fields */}
      {getRoleSpecificFields()}

      {/* Alert Message */}
      {alert && (
        <div
          className={`mt-4 p-3 text-center rounded-lg ${
            alert.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {alert.message}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full bg-[#B88E2F] text-white p-3 rounded-lg ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#B88E2F]"
        }`}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p className="text-center mt-4">
        <span className="text-slate-400">Already a member? </span>
        <a href="/signin" className="text-yellow-500 hover:underline">
          Signin
        </a>
      </p>
    </form>
  );
}
