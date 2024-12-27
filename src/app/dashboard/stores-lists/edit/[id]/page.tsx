"use client";

import { fetchCategories } from "@/reducers/categorySlice";
import { AppDispatch, RootState } from "@/reducers/store";
import { fetchStoresByUserId, partialUpdateStore } from "@/reducers/storeSlice";
import { fetchWeddingCategories } from "@/reducers/weddingSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Define default store data
const defaultStoreData = {
  name: "",
  categories: [],
  wedding_category: "",
  overview: "",
  phone_number: "",
  whats_app: "",
  location: "",
};

const TextInput = ({
  label,
  value,
  onChange,
  id,
  type = "text",
  required = false,
}: any) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-semibold">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      className="w-full p-2 border border-gray-300 rounded"
      required={required}
    />
  </div>
);

const SelectInput = ({ label, value, options, onChange, id }: any) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-semibold">
      {label}
    </label>
    <select
      id={id}
      className="w-full p-2 border border-gray-300 rounded-md"
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
    >
      <option value="" disabled>
        -- Select an option --
      </option>
      {options.map((option: any) => (
        <option key={option.id} value={option.title}>
          {option.title}
        </option>
      ))}
    </select>
  </div>
);

const EditStore: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = useParams();

  const [storeData, setStoreData] = useState(defaultStoreData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const { stores } = useSelector((state: RootState) => state.stores);
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const weddingCategories = useSelector(
    (state: RootState) => state.weddingProduct.wedding_category
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const storeId = parseInt(id as string, 10);
  const storeArray = stores ? Object.values(stores) : [];
  const store = storeArray.find((store) => store.id === storeId);

  useEffect(() => {
    if (user?.user_id) {
      dispatch(fetchStoresByUserId(user.user_id.toString()));
    }
    dispatch(fetchCategories());
    dispatch(fetchWeddingCategories());
  }, [dispatch, user?.user_id]);

  useEffect(() => {
    if (store) {
      setStoreData({ ...defaultStoreData, ...store });
      setIsLoading(false);
    }
  }, [store]);

  const handleInputChange = (field: string, value: any) => {
    setStoreData((prev) => ({ ...prev, [field]: value }));
  };

  const validateFields = () => {
    const newErrors: any = {};
    const phoneRegex = /^[+]*[0-9]{10,13}$/;
    if (!phoneRegex.test(storeData.phone_number)) {
      newErrors.phone_number = "Invalid phone number format.";
    }
    if (storeData.whats_app && !phoneRegex.test(storeData.whats_app)) {
      newErrors.whats_app = "Invalid WhatsApp number format.";
    }
    if (!storeData.name) newErrors.name = "Store name is required.";
    if (storeData.categories.length === 0)
      newErrors.categories = "Category is required.";
    return newErrors;
  };

  const sanitizePayload = (data: typeof storeData) => {
    return {
      ...(data.name && { name: data.name }),
      ...(data.categories.length > 0 && {
        categories: data.categories.map((cat) =>
          typeof cat === "string" ? cat : ""
        ),
      }),
      ...(data.wedding_category && { wedding_category: data.wedding_category }),
      ...(data.overview && { overview: data.overview }),
      ...(data.phone_number && { phone_number: data.phone_number }),
      ...(data.location && { location: data.location }),
      ...(data.whats_app && { whats_app: data.whats_app }),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateFields();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const sanitizedData = sanitizePayload(storeData);

    setIsSubmitting(true);
    try {
      await dispatch(
        partialUpdateStore({
          storeId: storeId.toString(),
          partialData: sanitizedData,
        })
      ).unwrap();
      alert("Store updated successfully!");
      router.push("/dashboard/stores-lists");
    } catch (error) {
      console.error("Error response:", error);
      alert("Failed to update store. Please check the input data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Store</h2>
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <TextInput
          label="Store Name"
          value={storeData.name}
          onChange={handleInputChange}
          id="name"
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <SelectInput
          label="Category"
          value={storeData.categories?.[0] || ""}
          options={categories}
          onChange={handleInputChange}
          id="categories"
        />
        {errors.categories && (
          <p className="text-red-500 text-sm">{errors.categories}</p>
        )}

        <SelectInput
          label="SubCategory"
          value={storeData.wedding_category || ""}
          options={weddingCategories}
          onChange={handleInputChange}
          id="wedding_category"
        />

        <div className="mb-4">
          <label htmlFor="overview" className="block text-sm font-semibold">
            Overview
          </label>
          <textarea
            id="overview"
            value={storeData.overview}
            onChange={(e) => handleInputChange("overview", e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md w-full h-32"
          />
        </div>

        <TextInput
          label="Phone Number"
          value={storeData.phone_number}
          onChange={handleInputChange}
          id="phone_number"
        />
        {errors.phone_number && (
          <p className="text-red-500 text-sm">{errors.phone_number}</p>
        )}

        <TextInput
          label="WhatsApp"
          value={storeData.whats_app}
          onChange={handleInputChange}
          id="whats_app"
        />
        {errors.whats_app && (
          <p className="text-red-500 text-sm">{errors.whats_app}</p>
        )}

        <TextInput
          label="Location"
          value={storeData.location}
          onChange={handleInputChange}
          id="location"
        />

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push("/dashboard/stores-lists")}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStore;

// "use client";

// import { fetchCategories } from "@/reducers/categorySlice";
// import { AppDispatch, RootState } from "@/reducers/store";
// import { fetchStoresByUserId, partialUpdateStore } from "@/reducers/storeSlice";
// import { fetchWeddingCategories } from "@/reducers/weddingSlice";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// // Define default store data
// const defaultStoreData = {
//   name: "",
//   categories: [],
//   wedding_category: "",
//   overview: "",
//   phone_number: "",
//   whats_app: "",
//   location: "",
// };

// const EditStore: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();
//   const { id } = useParams();

//   const [storeData, setStoreData] = useState(defaultStoreData);
//   const [isLoading, setIsLoading] = useState(true);

//   const { stores } = useSelector((state: RootState) => state.stores);
//   const categories = useSelector(
//     (state: RootState) => state.categories.categories
//   );
//   const weddingCategories = useSelector(
//     (state: RootState) => state.weddingProduct.wedding_category
//   );
//   const { user } = useSelector((state: RootState) => state.auth);

//   const storeId = parseInt(id as string, 10);
//   const storeArray = stores ? Object.values(stores) : [];
//   const store = storeArray.find((store) => store.id === storeId);

//   useEffect(() => {
//     if (user?.user_id) {
//       dispatch(fetchStoresByUserId(user.user_id.toString()));
//     }
//     dispatch(fetchCategories());
//     dispatch(fetchWeddingCategories());
//   }, [dispatch, user?.user_id]);

//   useEffect(() => {
//     if (store) {
//       setStoreData({ ...defaultStoreData, ...store });
//       setIsLoading(false);
//     }
//   }, [store]);

//   const handleInputChange = (field: string, value: any) => {
//     setStoreData((prev) => ({ ...prev, [field]: value }));
//   };

//   const sanitizePayload = (data: typeof storeData) => {
//     return {
//       ...(data.name && { name: data.name }), // Include only if not empty
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

//     const sanitizedData = sanitizePayload(storeData); // Clean the payload
//     console.log("Sanitized Payload:", sanitizedData);

//     try {
//       await dispatch(
//         partialUpdateStore({
//           storeId: storeId.toString(),
//           partialData: sanitizedData,
//         })
//       ).unwrap();

//       router.push("/dashboard/stores-lists");
//     } catch (error) {
//       console.error("Error response:", error);
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Edit Store</h2>
//       <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
//         {/* Store Name */}
//         <div className="mb-4">
//           <label htmlFor="storeName" className="block text-sm font-semibold">
//             Store Name
//           </label>
//           <input
//             type="text"
//             id="storeName"
//             value={storeData.name}
//             onChange={(e) => handleInputChange("name", e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Category */}
//         <div className="mb-4">
//           <label htmlFor="category" className="block text-sm font-semibold">
//             Category
//           </label>
//           <select
//             id="category"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             value={storeData.categories?.[0] || ""}
//             onChange={(e) => handleInputChange("categories", [e.target.value])}
//           >
//             <option value="" disabled>
//               -- Select an option --
//             </option>
//             {categories.map((category) => (
//               <option key={category.id} value={category.title}>
//                 {category.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Subcategory */}
//         <div className="mb-4">
//           <label htmlFor="subcategory" className="block text-sm font-semibold">
//             SubCategory
//           </label>
//           <select
//             id="subcategory"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             value={storeData.wedding_category || ""}
//             onChange={(e) =>
//               handleInputChange("wedding_category", e.target.value)
//             }
//           >
//             <option value="" disabled>
//               -- Select an option --
//             </option>
//             {weddingCategories.map((category) => (
//               <option key={category.id} value={category.title}>
//                 {category.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Overview */}
//         <div className="mb-4">
//           <label htmlFor="overview" className="block text-sm font-semibold">
//             Overview
//           </label>
//           <textarea
//             id="overview"
//             value={storeData.overview}
//             onChange={(e) => handleInputChange("overview", e.target.value)}
//             required
//             className="p-2 border border-gray-300 rounded-md w-full h-32"
//           />
//         </div>

//         {/* Phone Number */}
//         <div className="mb-4">
//           <label htmlFor="phoneNumber" className="block text-sm font-semibold">
//             Phone Number
//           </label>
//           <input
//             type="text"
//             id="phoneNumber"
//             value={storeData.phone_number}
//             onChange={(e) => handleInputChange("phone_number", e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         {/* WhatsApp */}
//         <div className="mb-4">
//           <label htmlFor="whatsApp" className="block text-sm font-semibold">
//             WhatsApp
//           </label>
//           <input
//             type="text"
//             id="whatsApp"
//             value={storeData.whats_app}
//             onChange={(e) => handleInputChange("whats_app", e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Location */}
//         <div className="mb-4">
//           <label htmlFor="location" className="block text-sm font-semibold">
//             Location
//           </label>
//           <input
//             type="text"
//             id="location"
//             value={storeData.location}
//             onChange={(e) => handleInputChange("location", e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-between gap-4">
//           <button
//             type="button"
//             onClick={() => router.push("/dashboard/stores-lists")}
//             className="px-4 py-2 bg-gray-500 text-white rounded"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditStore;
