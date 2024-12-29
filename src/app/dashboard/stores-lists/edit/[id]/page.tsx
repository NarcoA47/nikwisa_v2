"use client";

import { fetchCategories } from "@/reducers/categorySlice";
import { AppDispatch, RootState } from "@/reducers/store";
import { fetchStoresByUserId, partialUpdateStore } from "@/reducers/storeSlice";
import { fetchWeddingCategories } from "@/reducers/weddingSlice";
import { useParams, useRouter } from "next/navigation";
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
};

const TextInput = ({
  label,
  value,
  onChange,
  id,
  type = "text",
  required = false,
}: any) => (
  <div className="mb-6">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      required={required}
    />
  </div>
);

const SelectInput = ({ label, value, options, onChange, id }: any) => (
  <div className="mb-6">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <select
      id={id}
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
    (state: RootState) => state.weddingProduct.wedding_categories
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
      router.push("/dashboard/stores-lists");
    } catch (error) {
      console.error("Error response:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Edit Store</h2>
      <form onSubmit={handleSubmit}>
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

        <div className="mb-6">
          <label
            htmlFor="overview"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Overview
          </label>
          <textarea
            id="overview"
            value={storeData.overview}
            onChange={(e) => handleInputChange("overview", e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 h-32"
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

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push("/dashboard/stores-lists")}
            className="bg-[#cac8c3] text-white py-2 px-4 rounded mt-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`bg-[#B8902E] text-white py-2 px-4 rounded mt-4 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
