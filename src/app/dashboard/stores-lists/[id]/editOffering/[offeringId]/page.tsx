"use client";

import { fetchOfferingById, updateOffering } from "@/reducers/offeringsSlice";
import { AppDispatch, RootState } from "@/reducers/store";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { offerings, loading, error } = useSelector(
    (state: RootState) => state.offerings
  );

  const [offeringData, setOfferingData] = useState<{
    name: string;
    description: string;
    price: number;
    image: File | null;
    phone_number: string;
    whatsapp_number: string;
  }>({
    name: "",
    description: "",
    price: 0,
    image: null, // Now this will be the file object
    phone_number: "",
    whatsapp_number: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null); // For displaying the image preview

  // Fetch offering by ID on component mount
  useEffect(() => {
    if (id) {
      dispatch(fetchOfferingById(id));
    }
  }, [id, dispatch]);

  // Update local state when offering data changes
  useEffect(() => {
    if (offerings && offerings.length > 0) {
      const currentOffering = offerings[0];
      setOfferingData((prevState) => ({
        ...prevState,
        name: currentOffering.name || "",
        description: currentOffering.description || "",
        price: currentOffering.price || 0,
        phone_number: currentOffering.phone_number || "",
        whatsapp_number: currentOffering.whatsapp_number || "",
        image: null, // Reset the image state
      }));

      // Set preview image if the offering has an image
      if (currentOffering.image) {
        setImagePreview(currentOffering.image);
      }
    }
  }, [offerings]);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setOfferingData((prevState) => ({
        ...prevState,
        image: file, // Store the file object in the state
      }));

      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // You can now handle image upload through FormData or as part of the offeringData
      await dispatch(
        updateOffering({
          offeringId: id,
          offeringData,
        })
      );

      // Navigate to the dashboard after successful save
      router.push("/dashboard/all-offerings");
    } catch (err) {
      console.error("Failed to update offering:", err);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setOfferingData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  if (loading) {
    return <div>Loading offering...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!offerings || offerings.length === 0) {
    return <div>No offering found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Offering</h2>
      <form onSubmit={handleSave}>
        {[
          // Input fields as before
          {
            label: "Offering Name",
            id: "name",
            type: "text",
            value: offeringData.name,
          },
          {
            label: "Description",
            id: "description",
            type: "textarea",
            value: offeringData.description,
          },
          {
            label: "Price",
            id: "price",
            type: "number",
            value: offeringData.price,
          },
          {
            label: "Phone Number",
            id: "phone_number",
            type: "text",
            value: offeringData.phone_number,
          },
          {
            label: "WhatsApp Number",
            id: "whatsapp_number",
            type: "text",
            value: offeringData.whatsapp_number,
          },
        ].map((field) => (
          <div className="mb-6" key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-base font-medium text-gray-700"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                value={field.value as string}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <input
                type={field.type}
                id={field.id}
                value={field.value}
                onChange={(e) =>
                  handleChange(
                    field.id,
                    field.type === "number"
                      ? parseFloat(e.target.value)
                      : e.target.value
                  )
                }
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}

        {/* Image Upload Field */}
        <div className="mb-6">
          <label
            htmlFor="image"
            className="block text-base font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full p-4 mt-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push("/dashboard/all-offerings")}
            className="bg-gray-500 text-white py-2 px-4 rounded mt-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#B8902E] text-white py-2 px-4 rounded mt-4"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
