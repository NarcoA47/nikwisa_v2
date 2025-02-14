import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import FormRow from "@/components/forms/FormRow";
import { updateStore } from "@/reducers/storeSlice";
import Image from "next/image";
import { Category } from "@/types/types";

const EditStep3StoreDetails = ({ storeData, onPrevious }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState(storeData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});

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
    return {
      ...data,
      phone_number: data.phone_number?.trim(),
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

      // Log the sanitized data
      console.log("Updated Data:", sanitizedData);

      const formData = new FormData();
      formData.append("name", sanitizedData.name);
      formData.append("overview", sanitizedData.overview);
      formData.append("location", sanitizedData.location);
      formData.append("phone_number", sanitizedData.phone_number);
      formData.append("whats_app", sanitizedData.whats_app);
      formData.append("working_hours", sanitizedData.working_hours);

      if (sanitizedData.image instanceof File) {
        formData.append("image", sanitizedData.image);
      }

      sanitizedData.categories.forEach((category: Category) => {
        formData.append("categories", category.id);
      });

      sanitizedData.event_planning_categories.forEach(
        (eventCategory: Category) => {
          formData.append("event_planning_categories", eventCategory.id);
        }
      );

      sanitizedData.rent_hire_categories.forEach((rentCategory: Category) => {
        formData.append("rent_hire_categories", rentCategory.id);
      });

      console.log("Form Data (for submission):", formData);

      // Dispatch update action
      const response = await dispatch(
        updateStore({ storeId: data.id, storeData: formData })
      );

      if (!response.error) {
        router.push("/dashboard/stores-lists");
      } else {
        console.error("Store update failed:", response.error);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error during store update:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-lg font-bold mb-4">Edit Store Details</h2>
      <FormRow
        type="text"
        name="name"
        value={data.name}
        handleChange={(e) => handleInputChange("name", e.target.value)}
        labelText="Store Name"
        placeholder="Enter store name"
      />

      <FormRow
        type="textarea"
        name="overview"
        value={data.overview}
        handleChange={(e) => handleInputChange("overview", e.target.value)}
        labelText="Store Overview"
        placeholder="Enter a brief description"
      />

      <FormRow
        type="text"
        name="location"
        value={data.location}
        handleChange={(e) => handleInputChange("location", e.target.value)}
        labelText="Location"
        placeholder="Enter location"
      />

      <FormRow
        type="text"
        name="phone_number"
        value={data.phone_number}
        handleChange={(e) => handleInputChange("phone_number", e.target.value)}
        labelText="Phone Number"
        placeholder="Enter phone number"
      />

      <FormRow
        type="text"
        name="whats_app"
        value={data.whats_app}
        handleChange={(e) => handleInputChange("whats_app", e.target.value)}
        labelText="WhatsApp Number"
        placeholder="Enter WhatsApp number"
      />

      <FormRow
        type="text"
        name="working_hours"
        value={data.working_hours}
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
        {data.image && !(data.image instanceof File) && (
          <div className="my-4">
            <Image
              src={data.image}
              alt="Store"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        )}
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
          {isSubmitting ? "Updating..." : "Update Store"}
        </button>
      </div>
    </div>
  );
};

export default EditStep3StoreDetails;

// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import FormRow from "@/components/forms/FormRow";
// import { updateStore } from "@/reducers/storeSlice"; // You'll need to create this action
// import Image from "next/image";

// const EditStep3StoreDetails = ({ storeData, onPrevious }: any) => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const [data, setData] = useState(storeData);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState<any>({});

//   const handleInputChange = (field: string, value: any) => {
//     setData((prev: typeof storeData) => ({ ...prev, [field]: value }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.length) {
//       const file = e.target.files[0];
//       setData({ ...data, image: file });
//     }
//   };

//   const validateFields = () => {
//     const newErrors: any = {};
//     const phoneRegex = /^[+]*[0-9]{10,13}$/;

//     if (data.phone_number && !phoneRegex.test(data.phone_number)) {
//       newErrors.phone_number = "Invalid phone number format.";
//     }
//     if (data.whats_app && !phoneRegex.test(data.whats_app)) {
//       newErrors.whats_app = "Invalid WhatsApp number format.";
//     }
//     if (!data.name) newErrors.name = "Store name is required.";

//     return newErrors;
//   };

//   const handleSubmit = async () => {
//     const validationErrors = validateFields();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("overview", data.overview);
//       formData.append("location", data.location);
//       formData.append("phone_number", data.phone_number);
//       formData.append("whats_app", data.whats_app);
//       formData.append("working_hours", data.working_hours);

//       if (data.image) {
//         formData.append("image", data.image);
//       }

//       data.categories.forEach((category: any) => {
//         formData.append("categories", JSON.stringify(category));
//       });

//       data.event_planning_categories.forEach((eventCategory: any) => {
//         formData.append(
//           "event_planning_categories",
//           JSON.stringify(eventCategory)
//         );
//       });

//       data.rent_hire_categories.forEach((rentCategory: any) => {
//         formData.append("rent_hire_categories", JSON.stringify(rentCategory));
//       });

//       const response = await dispatch(updateStore({ id: data.id, formData }));

//       if (response.type === "stores/updateStore/fulfilled") {
//         router.push("/dashboard/stores-lists");
//       } else {
//         console.error("Store update failed:", response.payload);
//         setIsSubmitting(false);
//       }
//     } catch (error) {
//       console.error("Error during update:", error);
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-8">
//       <h2 className="text-lg font-bold mb-4">Edit Store Details</h2>

//       {data.current_image && (
//         <div className="mb-4">
//           <label className="block text-base font-medium text-gray-700 mb-2">
//             Current Image
//           </label>
//           <Image
//             src={data.current_image}
//             alt="Current store image"
//             width={200}
//             height={200}
//             className="rounded-lg"
//           />
//         </div>
//       )}

//       <FormRow
//         type="text"
//         name="name"
//         value={data.name}
//         handleChange={(e) => handleInputChange("name", e.target.value)}
//         labelText="Store Name"
//         placeholder="Enter store name"
//       />

//       {/* Add all other FormRow components similar to Step3StoreDetails */}

//       <div className="mt-4">
//         <button
//           onClick={onPrevious}
//           className="bg-gray-500 text-white px-4 py-2 rounded mr-4"
//         >
//           Previous
//         </button>
//         <button
//           onClick={handleSubmit}
//           className={`bg-[#B8902E] text-white px-4 py-2 rounded ${
//             isSubmitting ? "opacity-50" : ""
//           }`}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Updating..." : "Update Store"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditStep3StoreDetails;
