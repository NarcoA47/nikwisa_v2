"use client";

import { useState, useEffect } from "react";

interface Offering {
  id: number; // Use an ID for editing and deleting
  name: string;
  description: string;
  price: number;
  image: File | null | string; // String for existing images, File for new uploads
}

export default function OfferingsPage() {
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [newOffering, setNewOffering] = useState<Offering>({
    id: Date.now(),
    name: "",
    description: "",
    price: 0,
    image: null,
  });

  // Simulated fetch to load existing offering
  useEffect(() => {
    // TODO: Replace with API call to fetch store offerings
    const fetchOfferings = async () => {
      const response = [
        {
          id: 1,
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

  // Handle new offering field changes
  const handleNewOfferingChange = (field: string, value: any) => {
    setNewOffering({ ...newOffering, [field]: value });
  };

  // Add a new offering
  const addOffering = () => {
    setOfferings([...offerings, { ...newOffering, id: Date.now() }]);
    setNewOffering({
      id: Date.now(),
      name: "",
      description: "",
      price: 0,
      image: null,
    });
  };

  // Edit an existing offering
  const editOffering = (id: number, field: string, value: any) => {
    const updatedOfferings = offerings.map((offering) =>
      offering.id === id ? { ...offering, [field]: value } : offering
    );
    setOfferings(updatedOfferings);
  };

  // Remove a offering
  const removeOffering = (id: number) => {
    setOfferings(offerings.filter((offering) => offering.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Offering</h1>

      {/* List of Existing offering */}
      {offerings.map((offering) => (
        <div key={offering.id} className="border p-4 mb-4 rounded">
          <input
            type="text"
            value={offering.name}
            onChange={(e) => editOffering(offering.id, "name", e.target.value)}
            placeholder="Offering Name"
            className="border p-2 mb-2 w-full"
          />
          <textarea
            value={offering.description}
            onChange={(e) =>
              editOffering(offering.id, "description", e.target.value)
            }
            placeholder="Service Description"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            value={offering.price}
            onChange={(e) =>
              editOffering(offering.id, "price", parseFloat(e.target.value))
            }
            placeholder="Price"
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={() => removeOffering(offering.id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Offering
          </button>
        </div>
      ))}

      {/* Add New Service Form */}
      <div className="border p-4 rounded">
        <h2 className="text-lg font-bold mb-4">Add New Offering</h2>
        <input
          type="text"
          value={newOffering.name}
          onChange={(e) => handleNewOfferingChange("name", e.target.value)}
          placeholder="Service Name"
          className="border p-2 mb-2 w-full"
        />
        <textarea
          value={newOffering.description}
          onChange={(e) =>
            handleNewOfferingChange("description", e.target.value)
          }
          placeholder="Offering Description"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          value={newOffering.price}
          onChange={(e) =>
            handleNewOfferingChange("price", parseFloat(e.target.value))
          }
          placeholder="Price"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="file"
          onChange={(e) =>
            handleNewOfferingChange("image", e.target.files?.[0] || null)
          }
          className="mb-4"
        />
        <button
          onClick={addOffering}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Offering
        </button>
      </div>
    </div>
  );
}
