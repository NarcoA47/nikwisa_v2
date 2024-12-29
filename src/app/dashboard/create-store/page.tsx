"use client";

import { fetchCategories } from "@/reducers/categorySlice";
import { AppDispatch, RootState } from "@/reducers/store";
import { addStore } from "@/reducers/storeSlice";
import { fetchWeddingCategories } from "@/reducers/weddingSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const defaultStoreData = {
  name: "",
  categories: [],
  wedding_category: "",
  overview: "",
  phone_number: "",
  whats_app: "",
  location: "",
  image: null,
};

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  placeholder,
}: any) => (
  <div className="mb-6">
    <label htmlFor={name} className="block text-base font-medium text-gray-700">
      {labelText}
    </label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}
  </div>
);

const SelectInput = ({ label, value, options, onChange, id }: any) => (
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
  const weddingCategories = useSelector(
    (state: RootState) => state.weddingProduct.wedding_categories
  );
  const { user } = useSelector((state: RootState) => state.auth);

  console.log("user Object", user);
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchWeddingCategories());
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
    if (!storeData.wedding_category)
      newErrors.wedding_category = "Wedding category is required.";

    return newErrors;
  };

  const sanitizePayload = (data: typeof storeData) => {
    console.log("Raw store data:", data); // Log raw data
    const sanitized = {
      ...(data.name && { name: data.name }),
      ...(data.categories.length > 0 && { categories: data.categories }),
      ...(data.wedding_category && { wedding_category: data.wedding_category }),
      ...(data.overview && { overview: data.overview }),
      ...(data.phone_number && { phone_number: data.phone_number }),
      ...(data.location && { location: data.location }),
      ...(data.whats_app && { whats_app: data.whats_app }),
      ...(data.image && { image: data.image }),
      owner: user?.username, // Ensure user ID is being passed
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

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const validationErrors = validateFields();
  //   setErrors(validationErrors);
  //   if (Object.keys(validationErrors).length > 0) return;

  //   const sanitizedData = sanitizePayload(storeData);

  //   const formData = new FormData();
  //   Object.entries(sanitizedData).forEach(([key, value]) => {
  //     if (key === "image" && value) {
  //       formData.append(key, value as File);
  //     } else {
  //       formData.append(key, JSON.stringify(value));
  //     }
  //   });

  //   console.log("Final form data being submitted:", formData); // Log final FormData
  //   setIsSubmitting(true);
  //   try {
  //     await dispatch(addStore(formData)).unwrap();
  //     router.push("/stores");
  //   } catch (error) {
  //     console.error("Error creating store:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

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

          <SelectInput
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

          <SelectInput
            label="Wedding Category"
            value={storeData.wedding_category}
            options={weddingCategories}
            id="wedding_category"
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

// "use client";

// import { fetchCategories } from "@/reducers/categorySlice";
// import { AppDispatch, RootState } from "@/reducers/store";
// import { addStore } from "@/reducers/storeSlice";
// import { fetchWeddingCategories } from "@/reducers/weddingSlice";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const defaultStoreData = {
//   name: "",
//   categories: [],
//   wedding_category: "",
//   overview: "",
//   phone_number: "",
//   whats_app: "",
//   location: "",
//   image: null,
// };

// const FormRow = ({
//   type,
//   name,
//   value,
//   handleChange,
//   labelText,
//   placeholder,
// }: any) => (
//   <div className="mb-6">
//     <label htmlFor={name} className="block text-base font-medium text-gray-700">
//       {labelText}
//     </label>
//     {type === "textarea" ? (
//       <textarea
//         name={name}
//         value={value}
//         onChange={handleChange}
//         placeholder={placeholder}
//         className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     ) : (
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={handleChange}
//         placeholder={placeholder}
//         className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     )}
//   </div>
// );

// const SelectInput = ({ label, value, options, onChange, id }: any) => (
//   <div className="mb-4">
//     <label htmlFor={id} className="block text-sm font-semibold">
//       {label}
//     </label>
//     <select
//       id={id}
//       className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       value={value}
//       onChange={(e) => onChange(id, e.target.value)}
//     >
//       <option value="" disabled>
//         -- Select an option --
//       </option>
//       {options?.map((option: any) => (
//         <option key={option.id} value={option.slug}>
//           {option.title}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// const CreateStore: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();

//   const [storeData, setStoreData] = useState(defaultStoreData);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState<any>({});
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const categories = useSelector(
//     (state: RootState) => state.categories.categories
//   );
//   const weddingCategories = useSelector(
//     (state: RootState) => state.weddingProduct.wedding_categories
//   );
//   const { user } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchWeddingCategories());
//   }, [dispatch]);

//   const handleInputChange = (field: string, value: any) => {
//     setStoreData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.length) {
//       const file = e.target.files[0];
//       setStoreData({ ...storeData, image: file });
//     }
//   };

//   const validateFields = () => {
//     const newErrors: any = {};
//     const phoneRegex = /^[+]*[0-9]{10,13}$/;

//     if (storeData.phone_number && !phoneRegex.test(storeData.phone_number)) {
//       newErrors.phone_number = "Invalid phone number format.";
//     }
//     if (storeData.whats_app && !phoneRegex.test(storeData.whats_app)) {
//       newErrors.whats_app = "Invalid WhatsApp number format.";
//     }
//     if (!storeData.name) newErrors.name = "Store name is required.";
//     if (storeData.categories.length === 0)
//       newErrors.categories = "Category is required.";
//     if (!storeData.wedding_category)
//       newErrors.wedding_category = "Wedding category is required.";

//     return newErrors;
//   };

//   const sanitizePayload = (data: typeof storeData) => {
//     return {
//       ...(data.name && { name: data.name }),
//       ...(data.categories.length > 0 && { categories: data.categories }),
//       ...(data.wedding_category && { wedding_category: data.wedding_category }),
//       ...(data.overview && { overview: data.overview }),
//       ...(data.phone_number && { phone_number: data.phone_number }),
//       ...(data.location && { location: data.location }),
//       ...(data.whats_app && { whats_app: data.whats_app }),
//       ...(data.image && { image: data.image }),
//       owner: user?.user_id, // Ensure user ID is being passed
//     };
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const validationErrors = validateFields();
//     setErrors(validationErrors);
//     if (Object.keys(validationErrors).length > 0) return;

//     const sanitizedData = sanitizePayload(storeData);

//     const formData = new FormData();
//     Object.entries(sanitizedData).forEach(([key, value]) => {
//       if (key === "image" && value) {
//         formData.append(key, value as File);
//       } else {
//         formData.append(key, JSON.stringify(value));
//       }
//     });

//     setIsSubmitting(true);
//     try {
//       await dispatch(addStore(formData)).unwrap();
//       router.push("/stores");
//     } catch (error) {
//       console.error("Error creating store:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-8">
//       <form onSubmit={handleSubmit}>
//         <div>
//           <h2 className="text-lg font-bold mb-4">Store Information</h2>
//           <FormRow
//             type="text"
//             name="name"
//             value={storeData.name}
//             handleChange={(e) => handleInputChange("name", e.target.value)}
//             labelText="Store Name"
//             placeholder="Enter store name"
//           />
//           <FormRow
//             type="textarea"
//             name="overview"
//             value={storeData.overview}
//             handleChange={(e) => handleInputChange("overview", e.target.value)}
//             labelText="Store Overview"
//             placeholder="Enter a brief description"
//           />
//           <FormRow
//             type="text"
//             name="location"
//             value={storeData.location}
//             handleChange={(e) => handleInputChange("location", e.target.value)}
//             labelText="Location"
//             placeholder="Enter location"
//           />
//           <FormRow
//             type="text"
//             name="phone_number"
//             value={storeData.phone_number}
//             handleChange={(e) =>
//               handleInputChange("phone_number", e.target.value)
//             }
//             labelText="Phone Number"
//             placeholder="Enter phone number"
//           />
//           <FormRow
//             type="text"
//             name="whats_app"
//             value={storeData.whats_app}
//             handleChange={(e) => handleInputChange("whats_app", e.target.value)}
//             labelText="WhatsApp Number"
//             placeholder="Enter WhatsApp number"
//           />

//           <SelectInput
//             label="Categories"
//             value={storeData.categories}
//             options={categories}
//             id="categories"
//             onChange={(id, value) =>
//               handleInputChange(
//                 id,
//                 Array.from(new Set([...storeData.categories, value]))
//               )
//             }
//           />

//           <SelectInput
//             label="Wedding Category"
//             value={storeData.wedding_category}
//             options={weddingCategories}
//             id="wedding_category"
//             onChange={handleInputChange}
//           />

//           <div className="mb-6">
//             <label
//               htmlFor="image"
//               className="block text-base font-medium text-gray-700"
//             >
//               Store Image
//             </label>
//             <input
//               type="file"
//               id="image"
//               className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={handleImageChange}
//             />
//           </div>

//           <button
//             type="submit"
//             className={`bg-[#B8902E] text-white py-2 px-4 rounded mt-4 ${
//               isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Saving..." : "Create Store"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateStore;

// "use client";

// import { fetchCategories } from "@/reducers/categorySlice";
// import { AppDispatch, RootState } from "@/reducers/store";
// import { addStore } from "@/reducers/storeSlice";
// import { fetchWeddingCategories } from "@/reducers/weddingSlice";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const defaultStoreData = {
//   name: "",
//   categories: [],
//   wedding_category: "",
//   overview: "",
//   phone_number: "",
//   whats_app: "",
//   location: "",
//   image: null,
// };

// const FormRow = ({
//   type,
//   name,
//   value,
//   handleChange,
//   labelText,
//   placeholder,
// }: any) => (
//   <div className="mb-6">
//     <label htmlFor={name} className="block text-base font-medium text-gray-700">
//       {labelText}
//     </label>
//     {type === "textarea" ? (
//       <textarea
//         name={name}
//         value={value}
//         onChange={handleChange}
//         placeholder={placeholder}
//         className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     ) : (
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={handleChange}
//         placeholder={placeholder}
//         className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     )}
//   </div>
// );

// const SelectInput = ({ label, value, options, onChange, id }: any) => (
//   <div className="mb-4">
//     <label htmlFor={id} className="block text-sm font-semibold">
//       {label}
//     </label>
//     <select
//       id={id}
//       className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       value={value}
//       onChange={(e) => onChange(id, e.target.value)}
//     >
//       <option value="" disabled>
//         -- Select an option --
//       </option>
//       {options?.map((option: any) => (
//         <option key={option.id} value={option.slug}>
//           {option.title}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// const CreateStore: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();

//   const [storeData, setStoreData] = useState(defaultStoreData);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState<any>({});
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const categories = useSelector(
//     (state: RootState) => state.categories.categories
//   );
//   const weddingCategories = useSelector(
//     (state: RootState) => state.weddingProduct.wedding_categories
//   );
//   const { user } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchWeddingCategories());
//   }, [dispatch]);

//   const handleInputChange = (field: string, value: any) => {
//     setStoreData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.length) {
//       const file = e.target.files[0];
//       const imageUrl = URL.createObjectURL(file);
//       setStoreData({ ...storeData, image: imageUrl });
//     }
//   };

//   const validateFields = () => {
//     const newErrors: any = {};
//     const phoneRegex = /^[+]*[0-9]{10,13}$/;

//     if (storeData.phone_number && !phoneRegex.test(storeData.phone_number)) {
//       newErrors.phone_number = "Invalid phone number format.";
//     }
//     if (storeData.whats_app && !phoneRegex.test(storeData.whats_app)) {
//       newErrors.whats_app = "Invalid WhatsApp number format.";
//     }
//     if (!storeData.name) newErrors.name = "Store name is required.";
//     if (storeData.categories.length === 0)
//       newErrors.categories = "Category is required.";

//     return newErrors;
//   };

//   const sanitizePayload = (data: typeof storeData) => {
//     return {
//       ...(data.name && { name: data.name }),
//       ...(data.categories.length > 0 && { categories: data.categories }),
//       ...(data.wedding_category && { wedding_category: data.wedding_category }),
//       ...(data.overview && { overview: data.overview }),
//       ...(data.phone_number && { phone_number: data.phone_number }),
//       ...(data.location && { location: data.location }),
//       ...(data.whats_app && { whats_app: data.whats_app }),
//       ...(data.image && { image: data.image }),
//     };
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form submitted with data:", storeData);

//     const validationErrors = validateFields();
//     setErrors(validationErrors);
//     if (Object.keys(validationErrors).length > 0) {
//       console.log("Validation errors:", validationErrors);
//       return;
//     }

//     const sanitizedData = sanitizePayload(storeData);
//     console.log("Sanitized payload for submission:", sanitizedData);

//     setIsSubmitting(true);
//     try {
//       await dispatch(addStore(sanitizedData)).unwrap();
//       console.log("Store created successfully!");
//       setIsSubmitted(true);
//       router.push("/stores");
//     } catch (error) {
//       console.error("Error response:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-8">
//       <form onSubmit={handleSubmit}>
//         <div>
//           <h2 className="text-lg font-bold mb-4">Store Information</h2>
//           <FormRow
//             type="text"
//             name="name"
//             value={storeData.name}
//             handleChange={(e) => handleInputChange("name", e.target.value)}
//             labelText="Store Name"
//             placeholder="Enter store name"
//           />
//           <FormRow
//             type="textarea"
//             name="overview"
//             value={storeData.overview}
//             handleChange={(e) => handleInputChange("overview", e.target.value)}
//             labelText="Store Overview"
//             placeholder="Enter a brief description"
//           />
//           <FormRow
//             type="text"
//             name="location"
//             value={storeData.location}
//             handleChange={(e) => handleInputChange("location", e.target.value)}
//             labelText="Location"
//             placeholder="Enter location"
//           />
//           <FormRow
//             type="text"
//             name="phone_number"
//             value={storeData.phone_number}
//             handleChange={(e) =>
//               handleInputChange("phone_number", e.target.value)
//             }
//             labelText="Phone Number"
//             placeholder="Enter phone number"
//           />
//           <FormRow
//             type="text"
//             name="whats_app"
//             value={storeData.whats_app}
//             handleChange={(e) => handleInputChange("whats_app", e.target.value)}
//             labelText="WhatsApp Number"
//             placeholder="Enter WhatsApp number"
//           />

//           <SelectInput
//             label="Categories"
//             value={storeData.categories}
//             options={categories}
//             id="categories"
//             onChange={(id, value) =>
//               handleInputChange(
//                 id,
//                 Array.from(new Set([...storeData.categories, value]))
//               )
//             }
//           />

//           <SelectInput
//             label="Wedding Category"
//             value={storeData.wedding_category}
//             options={weddingCategories}
//             id="wedding_category"
//             onChange={handleInputChange}
//           />

//           <div className="mb-6">
//             <label
//               htmlFor="image"
//               className="block text-base font-medium text-gray-700"
//             >
//               Store Image
//             </label>
//             <input
//               type="file"
//               id="image"
//               className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={handleImageChange}
//             />
//           </div>

//           <button
//             type="submit"
//             className={`bg-[#B8902E] text-white py-2 px-4 rounded mt-4 ${
//               isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Saving..." : "Create Store"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateStore;

// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import SelectInput from './SelectInput'; // Assuming you have this or similar component

// const CreateStore = ({ categories, weddingCategories, addStore }) => {
//   const { user } = useSelector((state) => state.authState); // Get logged-in user

//   const [storeData, setStoreData] = useState({
//     name: '',
//     categories: [],
//     wedding_category: '',
//     overview: '',
//     location: '',
//     phone_number: '',
//     whats_app: '',
//     image: null,
//   });

//   const [errors, setErrors] = useState({});

//   const handleInputChange = (field, value) => {
//     setStoreData((prevState) => ({
//       ...prevState,
//       [field]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setStoreData((prevState) => ({ ...prevState, image: file }));
//   };

//   const validateFields = () => {
//     const newErrors = {};

//     if (!storeData.name) newErrors.name = 'Store name is required.';
//     if (storeData.categories.length === 0) newErrors.categories = 'At least one category is required.';
//     if (!storeData.wedding_category) newErrors.wedding_category = 'Wedding category is required.';
//     if (!storeData.location) newErrors.location = 'Location is required.';
//     if (!storeData.phone_number) newErrors.phone_number = 'Phone number is required.';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateFields()) return;

//     const formData = new FormData();
//     formData.append('name', storeData.name);
//     formData.append('categories', JSON.stringify(storeData.categories));
//     formData.append('wedding_category', storeData.wedding_category);
//     formData.append('overview', storeData.overview);
//     formData.append('location', storeData.location);
//     formData.append('phone_number', storeData.phone_number);
//     formData.append('whats_app', storeData.whats_app);
//     formData.append('image', storeData.image);
//     formData.append('owner', user.id); // Add logged-in user's ID as owner

//     addStore(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Store Name:</label>
//         <input
//           type="text"
//           value={storeData.name}
//           onChange={(e) => handleInputChange('name', e.target.value)}
//         />
//         {errors.name && <span>{errors.name}</span>}
//       </div>

//       <div>
//         <label>Categories:</label>
//         <SelectInput
//           label="Categories"
//           value={storeData.categories}
//           options={categories}
//           id="categories"
//           multiple={true} // Enable multi-select
//           onChange={(id, value) =>
//             handleInputChange(
//               id,
//               Array.from(new Set([...storeData.categories, value]))
//             )
//           }
//         />
//         {errors.categories && <span>{errors.categories}</span>}
//       </div>

//       <div>
//         <label>Wedding Category:</label>
//         <select
//           value={storeData.wedding_category}
//           onChange={(e) => handleInputChange('wedding_category', e.target.value)}
//         >
//           <option value="">Select a wedding category</option>
//           {weddingCategories.map((category) => (
//             <option key={category.id} value={category.id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//         {errors.wedding_category && <span>{errors.wedding_category}</span>}
//       </div>

//       <div>
//         <label>Overview:</label>
//         <textarea
//           value={storeData.overview}
//           onChange={(e) => handleInputChange('overview', e.target.value)}
//         />
//       </div>

//       <div>
//         <label>Location:</label>
//         <input
//           type="text"
//           value={storeData.location}
//           onChange={(e) => handleInputChange('location', e.target.value)}
//         />
//         {errors.location && <span>{errors.location}</span>}
//       </div>

//       <div>
//         <label>Phone Number:</label>
//         <input
//           type="text"
//           value={storeData.phone_number}
//           onChange={(e) => handleInputChange('phone_number', e.target.value)}
//         />
//         {errors.phone_number && <span>{errors.phone_number}</span>}
//       </div>

//       <div>
//         <label>WhatsApp:</label>
//         <input
//           type="text"
//           value={storeData.whats_app}
//           onChange={(e) => handleInputChange('whats_app', e.target.value)}
//         />
//       </div>

//       <div>
//         <label>Image:</label>
//         <input type="file" onChange={handleImageChange} />
//       </div>

//       <button type="submit">Create Store</button>
//     </form>
//   );
// };

// export default CreateStore;

// "use client";

// import { fetchCategories } from "@/reducers/categorySlice";
// import { AppDispatch, RootState } from "@/reducers/store";
// import { addStore } from "@/reducers/storeSlice";
// import { fetchWeddingCategories } from "@/reducers/weddingSlice";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const defaultStoreData = {
//   name: "",
//   categories: [],
//   wedding_category: "",
//   overview: "",
//   phone_number: "",
//   whats_app: "",
//   location: "",
//   image: null,
// };

// const FormRow = ({
//   type,
//   name,
//   value,
//   handleChange,
//   labelText,
//   placeholder,
//   options,
//   multiple = false,
// }: any) => (
//   <div className="mb-6">
//     <label htmlFor={name} className="block text-base font-medium text-gray-700">
//       {labelText}
//     </label>
//     {type === "textarea" ? (
//       <textarea
//         name={name}
//         value={value}
//         onChange={handleChange}
//         placeholder={placeholder}
//         className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     ) : (
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={handleChange}
//         placeholder={placeholder}
//         className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     )}
//   </div>
// );

// const SelectInput = ({ label, value, options, onChange, id }: any) => (
//   <div className="mb-4">
//     <label htmlFor={id} className="block text-sm font-semibold">
//       {label}
//     </label>
//     <select
//       id={id}
//       className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       value={value}
//       onChange={(e) => onChange(id, e.target.value)}
//     >
//       <option value="" disabled>
//         -- Select an option --
//       </option>
//       {options?.map((option: any) => (
//         <option key={option.id} value={option.slug}>
//           {option.title}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// const CreateStore: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();

//   const [storeData, setStoreData] = useState(defaultStoreData);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState<any>({});
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const categories = useSelector(
//     (state: RootState) => state.categories.categories
//   );
//   const weddingCategories = useSelector(
//     (state: RootState) => state.weddingProduct.wedding_categories
//   );

//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchWeddingCategories());
//   }, [dispatch]);

//   const handleInputChange = (field: string, value: any) => {
//     setStoreData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.length) {
//       const file = e.target.files[0];
//       const imageUrl = URL.createObjectURL(file);
//       setStoreData({ ...storeData, image: imageUrl });
//     }
//   };

//   const validateFields = () => {
//     const newErrors: any = {};
//     const phoneRegex = /^[+]*[0-9]{10,13}$/;

//     if (storeData.phone_number && !phoneRegex.test(storeData.phone_number)) {
//       newErrors.phone_number = "Invalid phone number format.";
//     }
//     if (storeData.whats_app && !phoneRegex.test(storeData.whats_app)) {
//       newErrors.whats_app = "Invalid WhatsApp number format.";
//     }
//     if (!storeData.name) newErrors.name = "Store name is required.";
//     if (storeData.categories.length === 0)
//       newErrors.categories = "Category is required.";

//     return newErrors;
//   };

//   const sanitizePayload = (data: typeof storeData) => {
//     return {
//       ...(data.name && { name: data.name }),
//       ...(data.categories.length > 0 && { categories: data.categories }),
//       ...(data.wedding_category && { wedding_category: data.wedding_category }),
//       ...(data.overview && { overview: data.overview }),
//       ...(data.phone_number && { phone_number: data.phone_number }),
//       ...(data.location && { location: data.location }),
//       ...(data.whats_app && { whats_app: data.whats_app }),
//       ...(data.image && { image: data.image }),
//     };
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const validationErrors = validateFields();
//     setErrors(validationErrors);
//     if (Object.keys(validationErrors).length > 0) return;

//     const sanitizedData = sanitizePayload(storeData);

//     setIsSubmitting(true);
//     try {
//       await dispatch(addStore(sanitizedData)).unwrap();
//       setIsSubmitted(true);
//     } catch (error) {
//       console.error("Error response:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-8">
//       <form onSubmit={handleSubmit}>
//         <div>
//           <h2 className="text-lg font-bold mb-4">Store Information</h2>
//           <FormRow
//             type="text"
//             name="name"
//             value={storeData.name}
//             handleChange={(e) => handleInputChange("name", e.target.value)}
//             labelText="Store Name"
//             placeholder="Enter store name"
//           />
//           <FormRow
//             type="textarea"
//             name="overview"
//             value={storeData.overview}
//             handleChange={(e) => handleInputChange("overview", e.target.value)}
//             labelText="Store Overview"
//             placeholder="Enter a brief description"
//           />
//           <FormRow
//             type="text"
//             name="location"
//             value={storeData.location}
//             handleChange={(e) => handleInputChange("location", e.target.value)}
//             labelText="Location"
//             placeholder="Enter location"
//           />
//           <FormRow
//             type="text"
//             name="phone_number"
//             value={storeData.phone_number}
//             handleChange={(e) =>
//               handleInputChange("phone_number", e.target.value)
//             }
//             labelText="Phone Number"
//             placeholder="Enter phone number"
//           />
//           <FormRow
//             type="text"
//             name="whats_app"
//             value={storeData.whats_app}
//             handleChange={(e) => handleInputChange("whats_app", e.target.value)}
//             labelText="WhatsApp Number"
//             placeholder="Enter WhatsApp number"
//           />

//           <SelectInput
//             label="Categories"
//             value={storeData.categories}
//             options={categories}
//             id="categories"
//             onChange={(id, value) =>
//               handleInputChange(
//                 id,
//                 Array.from(new Set([...storeData.categories, value]))
//               )
//             }
//           />

//           <SelectInput
//             label="Wedding Category"
//             value={storeData.wedding_category}
//             options={weddingCategories}
//             id="wedding_category"
//             onChange={handleInputChange}
//           />

//           <div className="mb-6">
//             <label
//               htmlFor="image"
//               className="block text-base font-medium text-gray-700"
//             >
//               Store Image
//             </label>
//             <input
//               type="file"
//               id="image"
//               className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={handleImageChange}
//             />
//           </div>

//           <button
//             type="submit"
//             className={`bg-[#B8902E] text-white py-2 px-4 rounded mt-4 ${
//               isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Saving..." : "Create Store"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateStore;

// "use client";

// import { fetchCategories } from "@/reducers/categorySlice";
// import { AppDispatch, RootState } from "@/reducers/store";
// import { addStore } from "@/reducers/storeSlice";
// import { fetchWeddingCategories } from "@/reducers/weddingSlice";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const defaultStoreData = {
//   name: "",
//   categories: [],
//   wedding_category: "",
//   overview: "",
//   phone_number: "",
//   whats_app: "",
//   location: "",
//   image: null, // We'll handle images as a URL or path
// };

// const FormRow = ({
//   type,
//   name,
//   value,
//   handleChange,
//   labelText,
//   placeholder,
// }: any) => (
//   <div className="mb-6">
//     <label htmlFor={name} className="block text-base font-medium text-gray-700">
//       {labelText}
//     </label>
//     {type === "textarea" ? (
//       <textarea
//         name={name}
//         value={value}
//         onChange={handleChange}
//         placeholder={placeholder}
//         className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     ) : (
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={handleChange}
//         placeholder={placeholder}
//         className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     )}
//   </div>
// );

// const CreateStore: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();

//   const [storeData, setStoreData] = useState(defaultStoreData);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState<any>({});
//   const [loading, setLoading] = useState(false);

//   const categories = useSelector(
//     (state: RootState) => state.categories.categories
//   );
//   const weddingCategories = useSelector(
//     (state: RootState) => state.weddingProduct.wedding_categories
//   );

//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchWeddingCategories());
//   }, [dispatch]);

//   const handleInputChange = (field: string, value: any) => {
//     setStoreData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.length) {
//       const file = e.target.files[0];
//       const imageUrl = URL.createObjectURL(file); // In a real-world scenario, upload the file to the server and get the image URL
//       setStoreData({ ...storeData, image: imageUrl });
//     }
//   };

//   const validateFields = () => {
//     const newErrors: any = {};
//     const phoneRegex = /^[+]*[0-9]{10,13}$/;

//     if (storeData.phone_number && !phoneRegex.test(storeData.phone_number)) {
//       newErrors.phone_number = "Invalid phone number format.";
//     }
//     if (storeData.whats_app && !phoneRegex.test(storeData.whats_app)) {
//       newErrors.whats_app = "Invalid WhatsApp number format.";
//     }
//     if (!storeData.name) newErrors.name = "Store name is required.";
//     if (storeData.categories.length === 0)
//       newErrors.categories = "Category is required.";

//     return newErrors;
//   };

//   const sanitizePayload = (data: typeof storeData) => {
//     return {
//       ...(data.name && { name: data.name }),
//       ...(data.categories.length > 0 && {
//         categories: data.categories.map((cat) =>
//           typeof cat === "string" ? cat : ""
//         ),
//       }),
//       ...(data.wedding_category && { wedding_category: data.wedding_category }),
//       ...(data.overview && { overview: data.overview }),
//       ...(data.phone_number && { phone_number: data.phone_number }),
//       ...(data.location && { location: data.location }),
//       ...(data.whats_app && { whats_app: data.whats_app }),
//       ...(data.image && { image: data.image }), // Sending image URL or path
//     };
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const validationErrors = validateFields();
//     setErrors(validationErrors);
//     if (Object.keys(validationErrors).length > 0) return;

//     const sanitizedData = sanitizePayload(storeData);

//     setIsSubmitting(true);
//     try {
//       await dispatch(addStore(sanitizedData)).unwrap();
//       router.push("/dashboard/stores-lists");
//     } catch (error) {
//       console.error("Error response:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-8">
//       <form onSubmit={handleSubmit}>
//         <div>
//           <h2 className="text-lg font-bold mb-4">Store Information</h2>
//           <FormRow
//             type="text"
//             name="name"
//             value={storeData.name}
//             handleChange={(e) => handleInputChange("name", e.target.value)}
//             labelText="Store Name"
//             placeholder="Enter store name"
//           />
//           <FormRow
//             type="textarea"
//             name="overview"
//             value={storeData.overview}
//             handleChange={(e) => handleInputChange("overview", e.target.value)}
//             labelText="Store Overview"
//             placeholder="Enter a brief description"
//           />
//           <FormRow
//             type="text"
//             name="location"
//             value={storeData.location}
//             handleChange={(e) => handleInputChange("location", e.target.value)}
//             labelText="Location"
//             placeholder="Enter location"
//           />
//           <FormRow
//             type="text"
//             name="phone_number"
//             value={storeData.phone_number}
//             handleChange={(e) =>
//               handleInputChange("phone_number", e.target.value)
//             }
//             labelText="Phone Number"
//             placeholder="Enter phone number"
//           />
//           <FormRow
//             type="text"
//             name="whats_app"
//             value={storeData.whats_app}
//             handleChange={(e) => handleInputChange("whats_app", e.target.value)}
//             labelText="WhatsApp Number"
//             placeholder="Enter WhatsApp number"
//           />
//           <div className="mb-6">
//             <label
//               htmlFor="image"
//               className="block text-base font-medium text-gray-700"
//             >
//               Store Image
//             </label>
//             <input
//               type="file"
//               id="image"
//               className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={handleImageChange}
//             />
//           </div>
//         </div>

//         {/* Preview and Submit */}
//         <div>
//           <h2 className="text-lg font-bold mb-4">Preview</h2>
//           <pre className="bg-gray-100 p-4 rounded">
//             {JSON.stringify(
//               {
//                 name: storeData.name,
//                 overview: storeData.overview,
//                 location: storeData.location,
//                 phone_number: storeData.phone_number,
//                 whats_app: storeData.whats_app,
//                 image: storeData.image,
//               },
//               null,
//               2
//             )}
//           </pre>
//           <button
//             type="submit"
//             className={`bg-[#B8902E] text-white py-2 px-4 rounded mt-4 ${
//               isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Saving..." : "Create Store"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateStore;

// "use client";

// import { fetchCategories } from "@/reducers/categorySlice";
// import { AppDispatch, RootState } from "@/reducers/store";
// import { addStore } from "@/reducers/storeSlice";
// import { fetchWeddingCategories } from "@/reducers/weddingSlice";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const defaultStoreData = {
//   name: "",
//   categories: [],
//   wedding_category: "",
//   overview: "",
//   phone_number: "",
//   whats_app: "",
//   location: "",
//   photos: [],
//   offerings: [{ name: "", description: "", price: 0, image: null }],
// };

// const FormRow = ({
//   type,
//   name,
//   value,
//   handleChange,
//   labelText,
//   placeholder,
// }: any) => (
//   <div className="mb-6">
//     <label htmlFor={name} className="block text-base font-medium text-gray-700">
//       {labelText}
//     </label>
//     {type === "textarea" ? (
//       <textarea
//         name={name}
//         value={value}
//         onChange={handleChange}
//         placeholder={placeholder}
//         className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     ) : (
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={handleChange}
//         placeholder={placeholder}
//         className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     )}
//   </div>
// );

// const CreateStore: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();

//   const [storeData, setStoreData] = useState(defaultStoreData);
//   const [step, setStep] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState<any>({});
//   const [loading, setLoading] = useState(false);

//   const categories = useSelector(
//     (state: RootState) => state.categories.categories
//   );
//   const weddingCategories = useSelector(
//     (state: RootState) => state.weddingProduct.wedding_categories
//   );

//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchWeddingCategories());
//   }, [dispatch]);

//   const handleInputChange = (field: string, value: any) => {
//     setStoreData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleOfferingChange = (index: number, field: string, value: any) => {
//     const updatedOfferings = [...storeData.offerings];
//     updatedOfferings[index][field] = value;
//     setStoreData({ ...storeData, offerings: updatedOfferings });
//   };

//   const addOffering = () => {
//     setStoreData({
//       ...storeData,
//       offerings: [
//         ...storeData.offerings,
//         { name: "", description: "", price: 0, image: null },
//       ],
//     });
//   };

//   const removeOffering = (index: number) => {
//     const updatedOfferings = storeData.offerings.filter((_, i) => i !== index);
//     setStoreData({ ...storeData, offerings: updatedOfferings });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.length) {
//       setStoreData({
//         ...storeData,
//         photos: [...storeData.photos, e.target.files[0]],
//       });
//     }
//   };

//   const validateFields = () => {
//     const newErrors: any = {};
//     const phoneRegex = /^[+]*[0-9]{10,13}$/;
//     if (!phoneRegex.test(storeData.phone_number)) {
//       newErrors.phone_number = "Invalid phone number format.";
//     }
//     if (storeData.whats_app && !phoneRegex.test(storeData.whats_app)) {
//       newErrors.whats_app = "Invalid WhatsApp number format.";
//     }
//     if (!storeData.name) newErrors.name = "Store name is required.";
//     if (storeData.categories.length === 0)
//       newErrors.categories = "Category is required.";
//     return newErrors;
//   };

//   const sanitizePayload = (data: typeof storeData) => {
//     return {
//       ...(data.name && { name: data.name }),
//       ...(data.categories.length > 0 && {
//         categories: data.categories.map((cat) =>
//           typeof cat === "string" ? cat : ""
//         ),
//       }),
//       ...(data.wedding_category && { wedding_category: data.wedding_category }),
//       ...(data.overview && { overview: data.overview }),
//       ...(data.phone_number && { phone_number: data.phone_number }),
//       ...(data.location && { location: data.location }),
//       ...(data.whats_app && { whats_app: data.whats_app }),
//       ...(data.photos && { photos: data.photos }),
//       ...(data.offerings && { offerings: data.offerings }),
//     };
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const validationErrors = validateFields();
//     setErrors(validationErrors);
//     if (Object.keys(validationErrors).length > 0) return;

//     const sanitizedData = sanitizePayload(storeData);

//     setIsSubmitting(true);
//     try {
//       await dispatch(addStore(sanitizedData)).unwrap();
//       router.push("/dashboard/stores-lists");
//     } catch (error) {
//       console.error("Error response:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-8">
//       <div className="flex justify-between mb-4">
//         <button
//           className="bg-gray-300 py-2 px-4 rounded disabled:opacity-50"
//           onClick={() => setStep(step - 1)}
//           disabled={step === 1}
//         >
//           Previous
//         </button>
//         <button
//           className="bg-[#B8902E] text-white py-2 px-4 rounded"
//           onClick={() => setStep(step + 1)}
//           disabled={step === 4}
//         >
//           Next
//         </button>
//       </div>

//       <form onSubmit={handleSubmit}>
//         {/* Step 1: Store Information */}
//         {step === 1 && (
//           <div>
//             <h2 className="text-lg font-bold mb-4">Store Information</h2>
//             <FormRow
//               type="text"
//               name="name"
//               value={storeData.name}
//               handleChange={(e) => handleInputChange("name", e.target.value)}
//               labelText="Store Name"
//               placeholder="Enter store name"
//             />
//             <FormRow
//               type="textarea"
//               name="overview"
//               value={storeData.overview}
//               handleChange={(e) =>
//                 handleInputChange("overview", e.target.value)
//               }
//               labelText="Store Overview"
//               placeholder="Enter a brief description"
//             />
//             <FormRow
//               type="text"
//               name="location"
//               value={storeData.location}
//               handleChange={(e) =>
//                 handleInputChange("location", e.target.value)
//               }
//               labelText="Location"
//               placeholder="Enter location"
//             />
//             <FormRow
//               type="text"
//               name="phone_number"
//               value={storeData.phone_number}
//               handleChange={(e) =>
//                 handleInputChange("phone_number", e.target.value)
//               }
//               labelText="Phone Number"
//               placeholder="Enter phone number"
//             />
//             <FormRow
//               type="text"
//               name="whats_app"
//               value={storeData.whats_app}
//               handleChange={(e) =>
//                 handleInputChange("whats_app", e.target.value)
//               }
//               labelText="WhatsApp Number"
//               placeholder="Enter WhatsApp number"
//             />
//             <div className="mb-6">
//               <label
//                 htmlFor="image"
//                 className="block text-base font-medium text-gray-700"
//               >
//                 Store Image
//               </label>
//               <input
//                 type="file"
//                 id="image"
//                 className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 onChange={handleImageChange}
//               />
//             </div>
//           </div>
//         )}

//         {/* Step 2: Photos */}
//         {step === 2 && (
//           <div>
//             <h2 className="text-lg font-bold mb-4">Store Photos</h2>
//             <input type="file" multiple onChange={handleImageChange} />
//             <div className="flex mt-2">
//               {storeData.photos.map((photo, index) => (
//                 <img
//                   key={index}
//                   src={URL.createObjectURL(photo)}
//                   alt={`Store photo ${index}`}
//                   className="w-24 h-24 object-cover mr-2"
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Step 3: Offerings */}
//         {step === 3 && (
//           <div>
//             <h2 className="text-lg font-bold mb-4">Offerings</h2>
//             {storeData.offerings.map((offering, index) => (
//               <div key={index} className="border p-4 mb-4 rounded">
//                 <FormRow
//                   type="text"
//                   name={`offering-name-${index}`}
//                   value={offering.name}
//                   handleChange={(e) =>
//                     handleOfferingChange(index, "name", e.target.value)
//                   }
//                   labelText="Offering Name"
//                   placeholder="Enter offering name"
//                 />
//                 <FormRow
//                   type="textarea"
//                   name={`offering-description-${index}`}
//                   value={offering.description}
//                   handleChange={(e) =>
//                     handleOfferingChange(index, "description", e.target.value)
//                   }
//                   labelText="Offering Description"
//                   placeholder="Enter offering description"
//                 />
//                 <FormRow
//                   type="number"
//                   name={`offering-price-${index}`}
//                   value={offering.price}
//                   handleChange={(e) =>
//                     handleOfferingChange(
//                       index,
//                       "price",
//                       parseFloat(e.target.value)
//                     )
//                   }
//                   labelText="Price"
//                   placeholder="Enter offering price"
//                 />
//                 <div className="mb-4">
//                   <label
//                     htmlFor={`offering-image-${index}`}
//                     className="block text-base font-medium text-gray-700"
//                   >
//                     Offering Image
//                   </label>
//                   <input
//                     type="file"
//                     id={`offering-image-${index}`}
//                     className="w-full p-2 border rounded"
//                     onChange={(e) =>
//                       handleOfferingChange(
//                         index,
//                         "image",
//                         e.target.files?.[0] || null
//                       )
//                     }
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   className="bg-red-500 text-white py-1 px-2 rounded"
//                   onClick={() => removeOffering(index)}
//                 >
//                   Remove Offering
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               className="bg-green-500 text-white py-2 px-4 rounded"
//               onClick={addOffering}
//             >
//               Add Offering
//             </button>
//           </div>
//         )}

//         {/* Step 4: Preview and Submit */}
//         {step === 4 && (
//           <div>
//             <h2 className="text-lg font-bold mb-4">Preview</h2>
//             <pre className="bg-gray-100 p-4 rounded">
//               {JSON.stringify(
//                 {
//                   name: storeData.name,
//                   overview: storeData.overview,
//                   location: storeData.location,
//                   phone_number: storeData.phone_number,
//                   whats_app: storeData.whats_app,
//                   offerings: storeData.offerings,
//                   photos: storeData.photos,
//                 },
//                 null,
//                 2
//               )}
//             </pre>
//             <button
//               type="submit"
//               className="bg-[#B8902E] text-white py-2 px-4 rounded mt-4"
//             >
//               {loading ? "Saving..." : "Create Store"}
//             </button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default CreateStore;

// "use client";

// import { fetchCategories } from "@/reducers/categorySlice";
// import { AppDispatch, RootState } from "@/reducers/store";
// import { addStore } from "@/reducers/storeSlice";
// import { fetchWeddingCategories } from "@/reducers/weddingSlice";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const defaultStoreData = {
//   name: "",
//   categories: [],
//   wedding_category: "",
//   overview: "",
//   phone_number: "",
//   whats_app: "",
//   location: "",
// };

// const TextInput = ({
//   label,
//   value,
//   onChange,
//   id,
//   type = "text",
//   required = false,
// }: any) => (
//   <div className="mb-6">
//     <label htmlFor={id} className="block text-base font-medium text-gray-700">
//       {label}
//     </label>
//     <input
//       type={type}
//       id={id}
//       value={value}
//       onChange={(e) => onChange(id, e.target.value)}
//       className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       required={required}
//     />
//   </div>
// );

// const SelectInput = ({ label, value, options, onChange, id }: any) => (
//   <div className="mb-6">
//     <label htmlFor={id} className="block text-base font-medium text-gray-700">
//       {label}
//     </label>
//     <select
//       id={id}
//       className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//       value={value}
//       onChange={(e) => onChange(id, e.target.value)}
//     >
//       <option value="" disabled>
//         -- Select an option --
//       </option>
//       {options.map((option: any) => (
//         <option key={option.id} value={option.title}>
//           {option.title}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// const CreateStore: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();

//   const [storeData, setStoreData] = useState(defaultStoreData);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [errors, setErrors] = useState<any>({});

//   const categories = useSelector(
//     (state: RootState) => state.categories.categories
//   );
//   const weddingCategories = useSelector(
//     (state: RootState) => state.weddingProduct.wedding_categories
//   );

//   useEffect(() => {
//     dispatch(fetchCategories());
//     dispatch(fetchWeddingCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     if (categories.length > 0 && weddingCategories.length > 0) {
//       setIsLoading(false);
//     }
//   }, [categories, weddingCategories]);

//   const handleInputChange = (field: string, value: any) => {
//     setStoreData((prev) => ({ ...prev, [field]: value }));
//   };

//   const validateFields = () => {
//     const newErrors: any = {};
//     const phoneRegex = /^[+]*[0-9]{10,13}$/;
//     if (!phoneRegex.test(storeData.phone_number)) {
//       newErrors.phone_number = "Invalid phone number format.";
//     }
//     if (storeData.whats_app && !phoneRegex.test(storeData.whats_app)) {
//       newErrors.whats_app = "Invalid WhatsApp number format.";
//     }
//     if (!storeData.name) newErrors.name = "Store name is required.";
//     if (storeData.categories.length === 0)
//       newErrors.categories = "Category is required.";
//     return newErrors;
//   };

//   const sanitizePayload = (data: typeof storeData) => {
//     return {
//       ...(data.name && { name: data.name }),
//       ...(data.categories.length > 0 && {
//         categories: data.categories.map((cat) =>
//           typeof cat === "string" ? cat : ""
//         ),
//       }),
//       ...(data.wedding_category && { wedding_category: data.wedding_category }),
//       ...(data.overview && { overview: data.overview }),
//       ...(data.phone_number && { phone_number: data.phone_number }),
//       ...(data.location && { location: data.location }),
//       ...(data.whats_app && { whats_app: data.whats_app }),
//     };
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const validationErrors = validateFields();
//     setErrors(validationErrors);
//     if (Object.keys(validationErrors).length > 0) return;

//     const sanitizedData = sanitizePayload(storeData);

//     setIsSubmitting(true);
//     try {
//       await dispatch(addStore(sanitizedData)).unwrap();
//       router.push("/dashboard/stores-lists");
//     } catch (error) {
//       console.error("Error response:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
//       <h2 className="text-3xl font-semibold mb-8">Create Store</h2>
//       <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
//         <TextInput
//           label="Store Name"
//           value={storeData.name}
//           onChange={handleInputChange}
//           id="name"
//           required
//         />
//         {errors.name && (
//           <p className="text-red-500 text-sm mb-4">{errors.name}</p>
//         )}

//         <SelectInput
//           label="Category"
//           value={storeData.categories?.[0] || ""}
//           options={categories}
//           onChange={handleInputChange}
//           id="categories"
//         />
//         {errors.categories && (
//           <p className="text-red-500 text-sm mb-4">{errors.categories}</p>
//         )}

//         <SelectInput
//           label="Wedding Category"
//           value={storeData.wedding_category || ""}
//           options={weddingCategories}
//           onChange={handleInputChange}
//           id="wedding_category"
//         />

//         <div className="mb-6">
//           <label
//             htmlFor="overview"
//             className="block text-base font-medium text-gray-700"
//           >
//             Overview
//           </label>
//           <textarea
//             id="overview"
//             value={storeData.overview}
//             onChange={(e) => handleInputChange("overview", e.target.value)}
//             required
//             className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
//           />
//         </div>

//         <TextInput
//           label="Phone Number"
//           value={storeData.phone_number}
//           onChange={handleInputChange}
//           id="phone_number"
//         />
//         {errors.phone_number && (
//           <p className="text-red-500 text-sm mb-4">{errors.phone_number}</p>
//         )}

//         <TextInput
//           label="WhatsApp"
//           value={storeData.whats_app}
//           onChange={handleInputChange}
//           id="whats_app"
//         />
//         {errors.whats_app && (
//           <p className="text-red-500 text-sm mb-4">{errors.whats_app}</p>
//         )}

//         <TextInput
//           label="Location"
//           value={storeData.location}
//           onChange={handleInputChange}
//           id="location"
//         />

//         <div className="flex justify-between gap-4 mt-6">
//           <button
//             type="button"
//             onClick={() => router.push("/dashboard/stores-lists")}
//             className="px-6 py-3 bg-gray-500 text-white rounded-lg text-lg"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Creating..." : "Create Store"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateStore;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/reducers/store";
// import { addStore, fetchStoreById, updateStore } from "@/reducers/storeSlice";
// import dynamic from "next/dynamic";
// import { FormRow } from "@/components/FormRow";
// // import { StoreOnboardingProps } from "@/types/types";

// // Lazy load useRouter to avoid server-side rendering issues
// const DynamicRouter = dynamic(
//   () => import("next/router").then((mod) => mod.useRouter),
//   { ssr: false }
// );

// const StoreOnboarding: React.FC<StoreOnboardingProps> = ({ storeId }) => {
//   const dispatch = useDispatch();
//   const router = DynamicRouter ? DynamicRouter() : null;

//   // Select the store and loading state from Redux store
//   const store = useSelector((state: RootState) => state.stores.selectedStore);
//   const loading = useSelector((state: RootState) => state.stores.loading);
//   const error = useSelector((state: RootState) => state.stores.error);

//   // Form state for each step
//   const [step, setStep] = useState(1);
//   const [name, setName] = useState("");
//   const [overview, setOverview] = useState("");
//   const [location, setLocation] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [whatsappNumber, setWhatsappNumber] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [offerings, setOfferings] = useState([
//     { name: "", description: "", price: 0, image: null },
//   ]);
//   const [photos, setPhotos] = useState<File[]>([]);

//   // Load store data if updating
//   useEffect(() => {
//     if (storeId) {
//       dispatch(fetchStoreById(storeId));
//     }
//   }, [storeId, dispatch]);

//   // Populate form with existing data if store is loaded
//   useEffect(() => {
//     if (store && storeId) {
//       setName(store.name);
//       setOverview(store.overview);
//       setLocation(store.location);
//       setPhoneNumber(store.phoneNumber || "");
//       setWhatsappNumber(store.whatsappNumber || "");
//       setOfferings(store.offerings || []); // Changed offerings to offerings
//       setPhotos(store.photos || []);
//     }
//   }, [store, storeId]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const storeData = {
//       name,
//       overview,
//       location,
//       phoneNumber,
//       whatsappNumber,
//       image: image ? URL.createObjectURL(image) : "",
//       offerings, // Changed offerings to offerings
//       photos: photos.map((photo) => URL.createObjectURL(photo)),
//       rating: 0, // Default rating
//       reviewDetails: [], // Empty review details
//     };

//     if (storeId) {
//       dispatch(updateStore({ storeId, storeData }));
//     } else {
//       dispatch(addStore(storeData));
//     }
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setPhotos([...photos, ...Array.from(e.target.files)]);
//     }
//   };

//   // Function to handle adding a new offering
//   const addOffering = () => {
//     setOfferings([
//       ...offerings,
//       { name: "", description: "", price: 0, image: null },
//     ]);
//   };

//   // Function to handle removing an offering
//   const removeOffering = (index: number) => {
//     const updatedOfferings = offerings.filter((_, i) => i !== index);
//     setOfferings(updatedOfferings);
//   };

//   // Function to handle changes in offering fields
//   const handleOfferingChange = (
//     index: number,
//     field: string,
//     value: string | number | File | null
//   ) => {
//     const updatedOfferings = [...offerings];
//     updatedOfferings[index] = {
//       ...updatedOfferings[index],
//       [field]: value,
//     };
//     setOfferings(updatedOfferings);
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-8">
//       <div className="flex justify-between mb-4">
//         <button
//           className="bg-gray-300 py-2 px-4 rounded disabled:opacity-50"
//           onClick={() => setStep(step - 1)}
//           disabled={step === 1}
//         >
//           Previous
//         </button>
//         <button
//           className="bg-[#B8902E] text-white py-2 px-4 rounded"
//           onClick={() => setStep(step + 1)}
//           disabled={step === 4}
//         >
//           Next
//         </button>
//       </div>

//       <form onSubmit={handleSubmit}>
//         {/* Step 1: Store Information */}
//         {step === 1 && (
//           <div>
//             <h2 className="text-lg font-bold mb-4">Store Information</h2>
//             <FormRow
//               type="text"
//               name="name"
//               value={name}
//               handleChange={(e) => setName(e.target.value)}
//               labelText="Store Name"
//               placeholder="Enter store name"
//             />
//             <FormRow
//               type="textarea"
//               name="overview"
//               value={overview}
//               handleChange={(e) => setOverview(e.target.value)}
//               labelText="Store Overview"
//               placeholder="Enter a brief description"
//             />
//             <FormRow
//               type="text"
//               name="location"
//               value={location}
//               handleChange={(e) => setLocation(e.target.value)}
//               labelText="Location"
//               placeholder="Enter location"
//             />
//             <FormRow
//               type="text"
//               name="phoneNumber"
//               value={phoneNumber}
//               handleChange={(e) => setPhoneNumber(e.target.value)}
//               labelText="Phone Number"
//               placeholder="Enter phone number"
//             />
//             <FormRow
//               type="text"
//               name="whatsappNumber"
//               value={whatsappNumber}
//               handleChange={(e) => setWhatsappNumber(e.target.value)}
//               labelText="WhatsApp Number"
//               placeholder="Enter WhatsApp number"
//             />
//             <div className="form-row">
//               <label htmlFor="image" className="form-label">
//                 Store Image
//               </label>
//               <input
//                 type="file"
//                 id="image"
//                 className="form-input"
//                 onChange={handleImageChange}
//               />
//             </div>
//           </div>
//         )}

//         {/* Step 2: Photos */}
//         {step === 2 && (
//           <div>
//             <h2 className="text-lg font-bold mb-4">Store Photos</h2>
//             <input type="file" multiple onChange={handlePhotoChange} />
//             <div className="flex mt-2">
//               {photos.map((photo, index) => (
//                 <img
//                   key={index}
//                   src={URL.createObjectURL(photo)}
//                   alt={`Store photo ${index}`}
//                   className="w-24 h-24 object-cover mr-2"
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Step 3: Offerings */}
//         {step === 3 && (
//           <div>
//             <h2 className="text-lg font-bold mb-4">Offerings</h2>
//             {offerings.map((offering, index) => (
//               <div key={index} className="border p-4 mb-4 rounded">
//                 <FormRow
//                   type="text"
//                   name={`offering-name-${index}`}
//                   value={offering.name}
//                   handleChange={(e) =>
//                     handleOfferingChange(index, "name", e.target.value)
//                   }
//                   labelText="Offering Name"
//                   placeholder="Enter offering name"
//                 />
//                 <FormRow
//                   type="textarea"
//                   name={`offering-description-${index}`}
//                   value={offering.description}
//                   handleChange={(e) =>
//                     handleOfferingChange(index, "description", e.target.value)
//                   }
//                   labelText="Offering Description"
//                   placeholder="Enter offering description"
//                 />
//                 <FormRow
//                   type="number"
//                   name={`offering-price-${index}`}
//                   value={offering.price}
//                   handleChange={(e) =>
//                     handleOfferingChange(
//                       index,
//                       "price",
//                       parseFloat(e.target.value)
//                     )
//                   }
//                   labelText="Price"
//                   placeholder="Enter offering price"
//                 />
//                 <div className="form-row mb-4">
//                   <label
//                     htmlFor={`offering-image-${index}`}
//                     className="form-label block text-gray-700 font-bold mb-2"
//                   >
//                     Offering Image
//                   </label>
//                   <input
//                     type="file"
//                     id={`offering-image-${index}`}
//                     className="form-input w-full p-2 border rounded"
//                     onChange={(e) =>
//                       handleOfferingChange(
//                         index,
//                         "image",
//                         e.target.files?.[0] || null
//                       )
//                     }
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   className="bg-red-500 text-white py-1 px-2 rounded"
//                   onClick={() => removeOffering(index)}
//                 >
//                   Remove Offering
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               className="bg-green-500 text-white py-2 px-4 rounded"
//               onClick={addOffering}
//             >
//               Add Offering
//             </button>
//           </div>
//         )}

//         {/* Step 4: Preview and Submit */}
//         {step === 4 && (
//           <div>
//             <h2 className="text-lg font-bold mb-4">Preview</h2>
//             <pre className="bg-gray-100 p-4 rounded">
//               {JSON.stringify(
//                 {
//                   name,
//                   overview,
//                   location,
//                   phoneNumber,
//                   whatsappNumber,
//                   offerings, // Changed offerings to offerings
//                   photos,
//                 },
//                 null,
//                 2
//               )}
//             </pre>
//             <button
//               type="submit"
//               className="bg-[#B8902E] text-white py-2 px-4 rounded mt-4"
//             >
//               {loading
//                 ? "Saving..."
//                 : storeId
//                 ? "Update Store"
//                 : "Create Store"}
//             </button>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default StoreOnboarding;
