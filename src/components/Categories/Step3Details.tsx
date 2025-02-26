import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/reducers/store";
import FormRow from "@/components/forms/FormRow";
import { fetchEventCategories } from "@/reducers/eventSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { addStore } from "@/reducers/storeSlice"; // Import the addStore function from your slice
import { Category } from "@/types/types";
import { Step2Payload } from "./Step2SubCategories";

type Step3StoreDetailsProps = {
  storeData: Step2Payload;
  onPrevious: () => void;
  onSubmit: () => void;
};

const Step3StoreDetails: React.FC<Step3StoreDetailsProps> = ({ storeData, onPrevious }) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  console.log("storeData", storeData);
  const [data, setData] = useState(storeData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ setErrors] = useState<unknown>({});
  const [user, setUser] = useState<{ user_id: string } | null>(null); // Make sure to capture user_id

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) {
      setUser(null); // No token found, set user to null
      return;
    }

    try {
      const decodedToken: { user_id: string } = jwtDecode(accessToken); // Decode user_id from the token
      setUser(decodedToken); // Set the decoded user details
    } catch (error) {
      console.error("Failed to decode token:", error);
      setUser(null); // Invalid token, set user to null
    }
  }, []);

  useEffect(() => {
    dispatch(fetchEventCategories());
  }, [dispatch]);

  const handleInputChange = (field: string, value: unknown) => {
    setData((prev: typeof storeData) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setData({ ...data, image: file });
    }
  };

  const validateFields = () => {
    const newErrors: unknown = {};
    const phoneRegex = /^[+]*[0-9]{10,13}$/;

    if (data.phone_number && !phoneRegex.test(data.phone_number)) {
      newErrors.phone_number = "Invalid phone number format.";
    }
    if (data.whats_app && !phoneRegex.test(data.whats_app)) {
      newErrors.whats_app = "Invalid WhatsApp number format.";
    }
    if (!data.name) newErrors.name = "Store name is required.";
    if (data.categories.length === 0)
      newErrors.categories = "Category is required.";
    if (!data.event_planning_categories)
      newErrors.event_planning_categories = "Event category is required.";

    return newErrors;
  };

  const sanitizePayload = (data: typeof storeData) => {
    // Include the owner with user_id here
    return {
      ...data,
      phone_number: data.phone_number.trim(),
      owner: user?.user_id, // Adding the owner field
    };
  };

  const handleSubmit = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const sanitizedData = sanitizePayload(data);

      // Manually append each category as a separate entry in FormData
      const formData = new FormData();
      formData.append("name", sanitizedData.name);
      formData.append("overview", sanitizedData.overview);
      formData.append("location", sanitizedData.location);
      formData.append("phone_number", sanitizedData.phone_number);
      formData.append("whats_app", sanitizedData.whats_app);
      formData.append("working_hours", sanitizedData.working_hours);
      formData.append("image", sanitizedData.image);
      formData.append("owner", sanitizedData.owner); // Add owner
      sanitizedData.categories.forEach((category: Category) => {
        formData.append("categories", JSON.stringify(category)); // Convert category to string before appending
      });
      sanitizedData.event_planning_categories.forEach(
        (eventCategory: Category) => {
          formData.append(
            "event_planning_categories",
            JSON.stringify(eventCategory)
          ); // Convert event category to string before appending
        }
      );

      // If rent_hire_categories is not empty, append it too
      sanitizedData.rent_hire_categories.forEach((rentCategory: Category) => {
        formData.append("rent_hire_categories", JSON.stringify(rentCategory)); // Convert rent category to string before appending
      });
      console.log("Form Data:", formData);
      // Send the request with FormData
      const response = await dispatch(addStore(formData));

      if (response.type === "stores/addStore/fulfilled") {
        router.push("/dashboard/stores-lists");
      } else {
        console.error("Store creation failed:", response.payload);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-lg font-bold mb-4">Store Details</h2>
      <FormRow
        type="text"
        name="name"
        value={data.name} // Use data for all fields
        handleChange={(e) => handleInputChange("name", e.target.value)}
        labelText="Store Name"
        placeholder="Enter store name"
      />

      <FormRow
        type="textarea"
        name="overview"
        value={data.overview} // Changed from storeData.overview to data.overview
        handleChange={(e) => handleInputChange("overview", e.target.value)}
        labelText="Store Overview"
        placeholder="Enter a brief description"
      />

      <FormRow
        type="text"
        name="location"
        value={data.location} // Changed from storeData.location to data.location
        handleChange={(e) => handleInputChange("location", e.target.value)}
        labelText="Location"
        placeholder="Enter location"
      />

      <FormRow
        type="text"
        name="phone_number"
        value={data.phone_number} // Use data for consistency
        handleChange={(e) => handleInputChange("phone_number", e.target.value)}
        labelText="Phone Number"
        placeholder="Enter phone number"
      />

      <FormRow
        type="text"
        name="whats_app"
        value={data.whats_app} // Changed from storeData.whats_app to data.whats_app
        handleChange={(e) => handleInputChange("whats_app", e.target.value)}
        labelText="WhatsApp Number"
        placeholder="Enter WhatsApp number"
      />
      <FormRow
        type="text"
        name="working_hours"
        value={data.working_hours} // Changed from storeData.whats_app to data.whats_app
        handleChange={(e) => handleInputChange("working_hours", e.target.value)}
        labelText="Working Hours"
        placeholder="Enter Working Hours"
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
      <div className="mt-4">
        <button
          onClick={onPrevious}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-4"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className={`bg-[#B8902E] text-white px-4 py-2 rounded ${
            isSubmitting ? "opacity-50" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "create store"}
        </button>
      </div>
    </div>
  );
};

export default Step3StoreDetails;
