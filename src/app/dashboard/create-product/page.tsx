"use client";

import { Offering } from "@/types/types";
import { useState, useEffect, ChangeEvent } from "react";

export default function OfferingsPage() {
  const [offerings, setOfferings] = useState<Offering[]>([]);

  // const defaultOffering: Offering = {
  //   id: Date.now(),
  //   name: "",
  //   description: "",
  //   price: 0,
  //   image: null,
  // };

  const defaultOffering: Offering = {
    id: Date.now().toString(), // Convert number to string
    name: "",
    description: "",
    price: 0,
    image: null,
  };
  const [newOffering, setNewOffering] = useState<Offering>(defaultOffering);

  // Simulated API fetch to load existing offerings
  useEffect(() => {
    const fetchOfferings = async () => {
      const response: Offering[] = [
        {
          id: "1",
          name: "Solar Installation",
          description: "Professional solar panel installation",
          price: 500,
          image: "existing-image.jpg",
        },
      ];
      setOfferings(response);
    };

    fetchOfferings();
  }, []);

  // Utility function to handle changes in input fields
  const handleInputChange = (
    id: number | null,
    field: keyof Offering,
    value: any
  ) => {
    if (id === null) {
      setNewOffering({ ...newOffering, [field]: value });
    } else {
      const updatedOfferings = offerings.map((offering) =>
        offering.id === id ? { ...offering, [field]: value } : offering
      );
      setOfferings(updatedOfferings);
    }
  };

  // Add a new offering
  const addOffering = () => {
    setOfferings([...offerings, { ...newOffering, id: Date.now() }]);
    setNewOffering(defaultOffering);
  };

  // Remove an offering
  const removeOffering = (id: number) => {
    setOfferings(offerings.filter((offering) => offering.id !== id));
  };

  // Rendering Input Field Component
  const InputField = ({
    label,
    value,
    onChange,
    type = "text",
    placeholder,
  }: {
    label?: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    type?: string;
    placeholder: string;
  }) => (
    <div className="mb-4">
      {label && <label className="block font-medium mb-1">{label}</label>}
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border p-2 w-full"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border p-2 w-full"
        />
      )}
    </div>
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Offerings</h1>

      {/* List of Existing Offerings */}
      {offerings.map((offering) => (
        <div key={offering.id} className="border p-4 mb-4 rounded">
          <InputField
            value={offering.name}
            placeholder="Offering Name"
            onChange={(e) =>
              handleInputChange(offering.id, "name", e.target.value)
            }
          />
          <InputField
            value={offering.description}
            placeholder="Offering Description"
            type="textarea"
            onChange={(e) =>
              handleInputChange(offering.id, "description", e.target.value)
            }
          />
          <InputField
            value={offering.price}
            type="number"
            placeholder="Price"
            onChange={(e) =>
              handleInputChange(
                offering.id,
                "price",
                parseFloat(e.target.value) || 0
              )
            }
          />
          <button
            onClick={() => removeOffering(offering.id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Offering
          </button>
        </div>
      ))}

      {/* Add New Offering Form */}
      <div className="border p-4 rounded">
        <h2 className="text-lg font-bold mb-4">Add New Offering</h2>
        <InputField
          value={newOffering.name}
          placeholder="Offering Name"
          onChange={(e) => handleInputChange(null, "name", e.target.value)}
        />
        <InputField
          value={newOffering.description}
          placeholder="Offering Description"
          type="textarea"
          onChange={(e) =>
            handleInputChange(null, "description", e.target.value)
          }
        />
        <InputField
          value={newOffering.price}
          placeholder="Price"
          type="number"
          onChange={(e) =>
            handleInputChange(null, "price", parseFloat(e.target.value) || 0)
          }
        />
        <input
          type="file"
          onChange={(e) =>
            handleInputChange(null, "image", e.target.files?.[0] || null)
          }
          className="mb-4"
        />
        <button
          onClick={addOffering}
          className="bg-[#B8902E] text-white py-2 px-4 rounded mt-4"
        >
          Add Offering
        </button>
      </div>
    </div>
  );
}
