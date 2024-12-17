"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const offeringsData = [
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

const EditServicePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [offering, setOffering] = useState(null);

  useEffect(() => {
    const selectedOffering = offeringsData.find(
      (offering) => offering.id === id
    );
    if (selectedOffering) {
      setOffering(selectedOffering);
    } else {
      router.push("/dashboard/all-offerings"); // Redirect if no service is found
    }
  }, [id, router]);

  const handleSave = () => {
    alert("Offering updated!");
    router.push("/dashboard/all-offerings"); // Navigate back to offering list after saving
  };

  if (!offering) {
    return <p>Loading offering details...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Offering</h2>
      <form onSubmit={handleSave} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold">
            Offering Name
          </label>
          <input
            type="text"
            id="name"
            value={offering.name}
            onChange={(e) => setOffering({ ...offering, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold">
            Description
          </label>
          <textarea
            id="description"
            value={offering.description}
            onChange={(e) =>
              setOffering({ ...offering, description: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-semibold">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={offering.price}
            onChange={(e) =>
              setOffering({ ...offering, price: parseFloat(e.target.value) })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push("/dashboard/all-offerings")}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditServicePage;
