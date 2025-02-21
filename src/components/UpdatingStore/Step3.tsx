import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/reducers/store";
import FormRow from "@/components/forms/FormRow";
import { partialUpdateStore } from "@/reducers/storeSlice";
import { useRouter } from "next/navigation";
import { Store } from "@/types/types";

interface Step3Props {
  storeData: Store;
  storeId: string | string[] | undefined;
  onPrevious: () => void;
  onSubmit: (data: Store) => void;
}

const Step3: React.FC<Step3Props> = ({ storeData, storeId, onPrevious, onSubmit }) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState<Store>(storeData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: unknown) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({ ...data, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    const phoneRegex = /^[+]*[0-9]{10,13}$/;

    if (data.phone_number && !phoneRegex.test(data.phone_number)) {
      newErrors.phone_number = "Invalid phone number format.";
    }
    if (data.whats_app && !phoneRegex.test(data.whats_app)) {
      newErrors.whats_app = "Invalid WhatsApp number format.";
    }
    if (!data.name) newErrors.name = "Store name is required.";
    if (!data.location) newErrors.location = "Location is required.";

    return newErrors;
  };

  const sanitizePayload = (data: Store): Store => {
    return {
      ...data,
      name: data.name || "",
      overview: data.overview || "",
      phone_number: data.phone_number || "",
      location: data.location || "",
      whats_app: data.whats_app || "",
      working_hours: data.working_hours || "",
      image: data.image || "",
      id: data.id,
      rating: data.rating,
      reviews_count: data.reviews_count,
      // photos: data.photos,
      // Add other required properties here
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const sanitizedData = sanitizePayload(data);
    setIsSubmitting(true);
    console.log("Final Store Data:", sanitizedData);
    try {
      await dispatch(
        partialUpdateStore({
          storeId: Array.isArray(storeId) ? storeId[0] : storeId || "",
          partialData: sanitizedData,
        })
      ).unwrap();

      console.log("storeId", storeId);
      onSubmit(sanitizedData);
      router.push("/dashboard/stores-lists");
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-lg font-bold mb-4">Store Details</h2>

      <FormRow
        type="text"
        name="name"
        value={data.name || ""}
        handleChange={(e) => handleInputChange("name", e.target.value)}
        labelText="Store Name"
        placeholder="Enter store name"
        error={errors.name}
      />

      <FormRow
        type="textarea"
        name="overview"
        value={data.overview || ""}
        handleChange={(e) => handleInputChange("overview", e.target.value)}
        labelText="Store Overview"
        placeholder="Enter a brief description"
        error={errors.overview}
      />

      <FormRow
        type="text"
        name="location"
        value={data.location || ""}
        handleChange={(e) => handleInputChange("location", e.target.value)}
        labelText="Location"
        placeholder="Enter location"
        error={errors.location}
      />

      <FormRow
        type="text"
        name="phone_number"
        value={data.phone_number || ""}
        handleChange={(e) => handleInputChange("phone_number", e.target.value)}
        labelText="Phone Number"
        placeholder="Enter phone number"
        error={errors.phone_number}
      />

      <FormRow
        type="text"
        name="whats_app"
        value={data.whats_app || ""}
        handleChange={(e) => handleInputChange("whats_app", e.target.value)}
        labelText="WhatsApp Number"
        placeholder="Enter WhatsApp number"
        error={errors.whats_app}
      />

      <FormRow
        type="text"
        name="working_hours"
        value={data.working_hours || ""}
        handleChange={(e) => handleInputChange("working_hours", e.target.value)}
        labelText="Working Hours"
        placeholder="Enter working hours"
        error={errors.working_hours}
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

export default Step3;
