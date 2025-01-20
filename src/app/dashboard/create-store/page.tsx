"use client";

import FormRow from "@/components/forms/FormRow";

import { fetchCategories } from "@/reducers/categorySlice";
import { fetchEventCategories } from "@/reducers/eventSlice";
import { AppDispatch, RootState } from "@/reducers/store";
import { addStore } from "@/reducers/storeSlice";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const defaultStoreData = {
  name: "",
  categories: [], // Array of category titles
  event_planning_categories: [], // Array of event planning category titles
  overview: "",
  phone_number: "",
  whats_app: "",
  location: "",
  image: null,
  working_hours: null, // New field for working hours, default to null
  is_verified: false, // Default to false
  is_responsive: false, // Default to false
};

const FormRowSelect = ({ label, value, options, onChange, id }: any) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-semibold">
      {label}
    </label>
    <select
      id={id}
      className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
    >
      <option value="" disabled>
        -- Select an option --
      </option>
      {options?.map((option: any) => (
        <option key={option.id} value={option.slug}>
          {option.title}
        </option>
      ))}
    </select>
  </div>
);

const CreateStore: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [storeData, setStoreData] = useState(defaultStoreData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const EventCategories = useSelector(
    (state: RootState) => state.eventProduct.event_categories
  );
  const { user } = useSelector((state: RootState) => state.auth);

  console.log("user Object", user);
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchEventCategories());
  }, [dispatch]);

  const handleInputChange = (field: string, value: any) => {
    setStoreData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setStoreData({ ...storeData, image: file });
    }
  };

  const validateFields = () => {
    const newErrors: any = {};
    const phoneRegex = /^[+]*[0-9]{10,13}$/;

    if (storeData.phone_number && !phoneRegex.test(storeData.phone_number)) {
      newErrors.phone_number = "Invalid phone number format.";
    }
    if (storeData.whats_app && !phoneRegex.test(storeData.whats_app)) {
      newErrors.whats_app = "Invalid WhatsApp number format.";
    }
    if (!storeData.name) newErrors.name = "Store name is required.";
    if (storeData.categories.length === 0)
      newErrors.categories = "Category is required.";
    if (!storeData.event_planning_categories)
      newErrors.event_planning_categories = "Event category is required.";

    return newErrors;
  };

  const sanitizePayload = (data: typeof storeData) => {
    console.log("Raw store data:", data); // Log raw data
    const sanitized = {
      ...(data.name && { name: data.name }),
      ...(data.categories.length > 0 && { categories: data.categories }),
      ...(data.event_planning_categories && {
        event_planning_categories: data.event_planning_categories,
      }),
      ...(data.overview && { overview: data.overview }),
      ...(data.phone_number && { phone_number: data.phone_number }),
      ...(data.location && { location: data.location }),
      ...(data.whats_app && { whats_app: data.whats_app }),
      ...(data.image && { image: data.image }),
      owner: user?.id, // Ensure user ID is being passed
    };
    console.log("Sanitized payload:", sanitized); // Log sanitized data
    return sanitized;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateFields();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const sanitizedData = sanitizePayload(storeData);

    const formData = new FormData();
    Object.entries(sanitizedData).forEach(([key, value]) => {
      if (key === "image" && value) {
        formData.append(key, value as File);
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item)); // Handle arrays properly
      } else {
        formData.append(key, value as string); // Do not JSON.stringify non-objects
      }
    });

    console.log("Final form data being submitted:");
    formData.forEach((value, key) => console.log(`${key}:`, value)); // Log FormData for debugging

    setIsSubmitting(true);
    try {
      await dispatch(addStore(formData)).unwrap();
      router.push("/stores");
    } catch (error) {
      console.error("Error creating store:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        <div>
          <h2 className="text-lg font-bold mb-4">Store Information</h2>
          <FormRow
            type="text"
            name="name"
            value={storeData.name}
            handleChange={(e) => handleInputChange("name", e.target.value)}
            labelText="Store Name"
            placeholder="Enter store name"
          />
          <FormRow
            type="textarea"
            name="overview"
            value={storeData.overview}
            handleChange={(e) => handleInputChange("overview", e.target.value)}
            labelText="Store Overview"
            placeholder="Enter a brief description"
          />
          <FormRow
            type="text"
            name="location"
            value={storeData.location}
            handleChange={(e) => handleInputChange("location", e.target.value)}
            labelText="Location"
            placeholder="Enter location"
          />
          <FormRow
            type="text"
            name="phone_number"
            value={storeData.phone_number}
            handleChange={(e) =>
              handleInputChange("phone_number", e.target.value)
            }
            labelText="Phone Number"
            placeholder="Enter phone number"
          />
          <FormRow
            type="text"
            name="whats_app"
            value={storeData.whats_app}
            handleChange={(e) => handleInputChange("whats_app", e.target.value)}
            labelText="WhatsApp Number"
            placeholder="Enter WhatsApp number"
          />

          <FormRowSelect
            label="Categories"
            value={storeData.categories}
            options={categories}
            id="categories"
            onChange={(id, value) =>
              handleInputChange(
                id,
                Array.from(new Set([...storeData.categories, value]))
              )
            }
          />

          <FormRowSelect
            label="Wedding Category"
            value={storeData.event_planning_categories}
            options={EventCategories}
            id="event_planning_categories"
            onChange={handleInputChange}
          />

          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-base font-medium text-gray-700"
            >
              Store Image
            </label>
            <input
              type="file"
              id="image"
              className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleImageChange}
            />
          </div>

          <button
            type="submit"
            className={`bg-[#B8902E] text-white py-2 px-4 rounded mt-4 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Create Store"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStore;
