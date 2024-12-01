"use client";

import React, { useState } from "react";

type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

type StoreData = {
  name: string;
  location: string;
  phoneNumber: string;
  whatsappNumber: string;
  overview: string;
  image: string;
  photos: File[];
  services: Service[];
};

const StoreOnboarding = () => {
  const [step, setStep] = useState(1);
  const [storeData, setStoreData] = useState<StoreData>({
    name: "",
    location: "",
    phoneNumber: "",
    whatsappNumber: "",
    overview: "",
    image: "",
    photos: [],
    services: [],
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStoreData((prev) => ({ ...prev, [name]: value }));
  };

  const addService = () => {
    setStoreData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        { id: Date.now(), name: "", description: "", price: 0, image: "" },
      ],
    }));
  };

  const removeService = (id: number) => {
    setStoreData((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service.id !== id),
    }));
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {/* Step Navigation */}
      <div className="flex justify-between mb-4">
        <button
          className="bg-gray-300 py-2 px-4 rounded disabled:opacity-50"
          onClick={handlePrevious}
          disabled={step === 1}
        >
          Previous
        </button>
        <button
          className="bg-[#B8902E] text-white py-2 px-4 rounded"
          onClick={handleNext}
          disabled={step === 4}
        >
          Next
        </button>
      </div>

      {/* Steps */}
      {step === 1 && (
        <div>
          <h2 className="text-lg font-bold mb-4">Store Information</h2>
          <input
            type="text"
            name="name"
            placeholder="Store Name"
            className="w-full mb-4 p-2 border"
            value={storeData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full mb-4 p-2 border"
            value={storeData.location}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            className="w-full mb-4 p-2 border"
            value={storeData.phoneNumber}
            onChange={handleChange}
          />
          <textarea
            name="overview"
            placeholder="Store Overview"
            className="w-full mb-4 p-2 border"
            value={storeData.overview}
            onChange={handleChange}
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-lg font-bold mb-4">Photos</h2>
          <input
            type="file"
            multiple
            onChange={(e) =>
              setStoreData((prev) => ({
                ...prev,
                photos: Array.from(e.target.files || []),
              }))
            }
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-lg font-bold mb-4">Services</h2>
          {storeData.services.map((service, index) => (
            <div key={service.id} className="mb-4 border p-2 rounded">
              <input
                type="text"
                placeholder="Service Name"
                value={service.name}
                className="w-full mb-2 p-2 border"
                onChange={(e) =>
                  setStoreData((prev) => {
                    const updatedServices = [...prev.services];
                    updatedServices[index].name = e.target.value;
                    return { ...prev, services: updatedServices };
                  })
                }
              />
              <textarea
                placeholder="Description"
                value={service.description}
                className="w-full mb-2 p-2 border"
                onChange={(e) =>
                  setStoreData((prev) => {
                    const updatedServices = [...prev.services];
                    updatedServices[index].description = e.target.value;
                    return { ...prev, services: updatedServices };
                  })
                }
              />
              <input
                type="number"
                placeholder="Price"
                value={service.price}
                className="w-full mb-2 p-2 border"
                onChange={(e) =>
                  setStoreData((prev) => {
                    const updatedServices = [...prev.services];
                    updatedServices[index].price = parseFloat(e.target.value);
                    return { ...prev, services: updatedServices };
                  })
                }
              />
              <button
                className="bg-red-500 text-white py-1 px-2 rounded"
                onClick={() => removeService(service.id)}
              >
                Remove Service
              </button>
            </div>
          ))}
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={addService}
          >
            Add Service
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-lg font-bold mb-4">Preview</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(storeData, null, 2)}
          </pre>
          <button className="bg-[#B8902E] text-white py-2 px-4 rounded mt-4">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default StoreOnboarding;
