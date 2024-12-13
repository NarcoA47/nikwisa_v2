"use client";

import { FormRow } from "@/components/FormRow";
// /app/dashboard/create-service/page.tsx
import React, { useState } from "react";

const CreateServicePage: React.FC = () => {
  const [service, setService] = useState({
    name: "",
    description: "",
    price: 0,
    image: null,
    phoneNumber: "",
    whatsappNumber: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call to save service
    setTimeout(() => {
      setLoading(false);
      alert("Service added successfully!");
      // Reset form
      setService({
        name: "",
        description: "",
        price: 0,
        image: null,
        phoneNumber: "",
        whatsappNumber: "",
      });
    }, 1000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setService({ ...service, image: file });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-lg font-bold mb-4">Add New Service</h2>
      <form onSubmit={handleSubmit}>
        <FormRow
          type="text"
          name="name"
          value={service.name}
          handleChange={(e) => setService({ ...service, name: e.target.value })}
          labelText="Service Name"
          placeholder="Enter service name"
        />
        <FormRow
          type="textarea"
          name="description"
          value={service.description}
          handleChange={(e) =>
            setService({ ...service, description: e.target.value })
          }
          labelText="Service Description"
          placeholder="Enter service description"
        />
        <FormRow
          type="number"
          name="price"
          value={service.price}
          handleChange={(e) =>
            setService({ ...service, price: parseFloat(e.target.value) })
          }
          labelText="Service Price"
          placeholder="Enter service price"
        />
        <FormRow
          type="text"
          name="phoneNumber"
          value={service.phoneNumber}
          handleChange={(e) =>
            setService({ ...service, phoneNumber: e.target.value })
          }
          labelText="Phone Number"
          placeholder="Enter phone number"
        />
        <FormRow
          type="text"
          name="whatsappNumber"
          value={service.whatsappNumber}
          handleChange={(e) =>
            setService({ ...service, whatsappNumber: e.target.value })
          }
          labelText="WhatsApp Number"
          placeholder="Enter WhatsApp number"
        />

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Service Image
          </label>
          <input
            type="file"
            id="image"
            className="w-full p-2 border rounded"
            onChange={handleImageChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#B8902E] text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Adding Service..." : "Add Service"}
        </button>
      </form>
    </div>
  );
};

export default CreateServicePage;
