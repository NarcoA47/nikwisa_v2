"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import OfferingsCardAdmin from "@/components/OfferingsCardAdmin";

// Simulated offerings data
const simulatedOfferings = [
  {
    id: "1",
    name: "Solar Panel Installation",
    description:
      "We offer professional solar panel installation for homes and businesses.",
    price: 5000,
    image: "https://via.placeholder.com/150",
    phoneNumber: "123456789",
    whatsappNumber: "987654321",
  },
  {
    id: "2",
    name: "Biogas System Setup",
    description: "Eco-friendly biogas systems for sustainable energy.",
    price: 3000,
    image: "https://via.placeholder.com/150",
    phoneNumber: "234567890",
    whatsappNumber: "876543210",
  },
  {
    id: "3",
    name: "LED Lighting Solutions",
    description:
      "Energy-efficient LED lighting solutions for residential and commercial spaces.",
    price: 150,
    image: "https://via.placeholder.com/150",
    phoneNumber: "345678901",
    whatsappNumber: "765432109",
  },
  {
    id: "4",
    name: "Solar Panel Installation",
    description:
      "We offer professional solar panel installation for homes and businesses.",
    price: 5000,
    image: "https://via.placeholder.com/150",
    phoneNumber: "123456789",
    whatsappNumber: "987654321",
  },
  {
    id: "5",
    name: "Biogas System Setup",
    description: "Eco-friendly biogas systems for sustainable energy.",
    price: 3000,
    image: "https://via.placeholder.com/150",
    phoneNumber: "234567890",
    whatsappNumber: "876543210",
  },
  {
    id: "6",
    name: "LED Lighting Solutions",
    description:
      "Energy-efficient LED lighting solutions for residential and commercial spaces.",
    price: 150,
    image: "https://via.placeholder.com/150",
    phoneNumber: "345678901",
    whatsappNumber: "765432109",
  },
];

export default function OfferingsManagement() {
  const [offerings, setOfferings] = useState(simulatedOfferings);
  const router = useRouter(); // Initialize useRouter

  // Edit service handler
  const handleEdit = (id: string) => {
    // Redirect to the edit page with the service ID
    router.push(`/dashboard/all-offerings/edit/${id}`);
  };

  // Delete service handler
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setOfferings((prev) => prev.filter((offering) => offering.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Offerings</h2>

        <button
          onClick={() => router.push("/dashboard/all-offerings/add")}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Offering
        </button>
      </div>

      {/* Offerings List */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {offerings.map((offering) => (
          <OfferingsCardAdmin
            key={offering.id}
            offering={offering}
            onEdit={handleEdit} // Passing handleEdit to onEdit prop
            onDelete={handleDelete} // Passing handleDelete to onDelete prop
          />
        ))}
      </div>
    </div>
  );
}
