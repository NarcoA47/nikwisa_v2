// components/Categories/Step3StoreDetails.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/reducers/store";
import FormRow from "@/components/forms/FormRow";
import { fetchEventCategories } from "@/reducers/eventSlice";
import { useRouter } from "next/navigation";
import { addStore } from "@/reducers/storeSlice";

const Step3StoreDetails = ({ storeData, onPrevious, onSubmit }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const [data, setData] = useState(storeData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    dispatch(fetchEventCategories());
  }, [dispatch]);

  const handleInputChange = (field: string, value: any) => {
    setData((prev: typeof storeData) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setData({ ...data, image: file });
    }
  };

  const validateFields = () => {
    const newErrors: any = {};
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
    return { ...data, phone_number: data.phone_number.trim() }; // example sanitization
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
      console.log("Form Data:", sanitizedData); // Logs the entire data object to the console

      // Uncomment below line to trigger the real submission if desired
      // await dispatch(addStore(sanitizedData));

      // If you want to simulate a successful submission:
      router.push("/dashboard/stores-lists"); // or redirect to any other page
    } catch (error) {
      console.error(error);
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
        name=" working_hours"
        value={data.working_hours} // Changed from storeData.whats_app to data.whats_app
        handleChange={(e) => handleInputChange("working_hours", e.target.value)}
        labelText=" Working Hours"
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
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Step3StoreDetails;
