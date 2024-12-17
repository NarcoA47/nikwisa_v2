"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/reducers/store";
import { addStore, fetchStoreById, updateStore } from "@/reducers/storeSlice";
import dynamic from "next/dynamic";
import { FormRow } from "@/components/FormRow";

// Lazy load useRouter to avoid server-side rendering issues
const DynamicRouter = dynamic(
  () => import("next/router").then((mod) => mod.useRouter),
  { ssr: false }
);

interface StoreOnboardingProps {
  storeId?: string; // Optional for update, required for creating new store
}

const StoreOnboarding: React.FC<StoreOnboardingProps> = ({ storeId }) => {
  const dispatch = useDispatch();
  const router = DynamicRouter ? DynamicRouter() : null;

  // Select the store and loading state from Redux store
  const store = useSelector((state: RootState) => state.stores.selectedStore);
  const loading = useSelector((state: RootState) => state.stores.loading);
  const error = useSelector((state: RootState) => state.stores.error);

  // Form state for each step
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [overview, setOverview] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [offerings, setOfferings] = useState([
    { name: "", description: "", price: 0, image: null },
  ]);
  const [photos, setPhotos] = useState<File[]>([]);

  // Load store data if updating
  useEffect(() => {
    if (storeId) {
      dispatch(fetchStoreById(storeId));
    }
  }, [storeId, dispatch]);

  // Populate form with existing data if store is loaded
  useEffect(() => {
    if (store && storeId) {
      setName(store.name);
      setOverview(store.overview);
      setLocation(store.location);
      setPhoneNumber(store.phoneNumber || "");
      setWhatsappNumber(store.whatsappNumber || "");
      setOfferings(store.offerings || []); // Changed offerings to offerings
      setPhotos(store.photos || []);
    }
  }, [store, storeId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storeData = {
      name,
      overview,
      location,
      phoneNumber,
      whatsappNumber,
      image: image ? URL.createObjectURL(image) : "",
      offerings, // Changed offerings to offerings
      photos: photos.map((photo) => URL.createObjectURL(photo)),
      rating: 0, // Default rating
      reviewDetails: [], // Empty review details
    };

    if (storeId) {
      dispatch(updateStore({ storeId, storeData }));
    } else {
      dispatch(addStore(storeData));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos([...photos, ...Array.from(e.target.files)]);
    }
  };

  // Function to handle adding a new offering
  const addOffering = () => {
    setOfferings([
      ...offerings,
      { name: "", description: "", price: 0, image: null },
    ]);
  };

  // Function to handle removing an offering
  const removeOffering = (index: number) => {
    const updatedOfferings = offerings.filter((_, i) => i !== index);
    setOfferings(updatedOfferings);
  };

  // Function to handle changes in offering fields
  const handleOfferingChange = (
    index: number,
    field: string,
    value: string | number | File | null
  ) => {
    const updatedOfferings = [...offerings];
    updatedOfferings[index] = {
      ...updatedOfferings[index],
      [field]: value,
    };
    setOfferings(updatedOfferings);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="flex justify-between mb-4">
        <button
          className="bg-gray-300 py-2 px-4 rounded disabled:opacity-50"
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
        >
          Previous
        </button>
        <button
          className="bg-[#B8902E] text-white py-2 px-4 rounded"
          onClick={() => setStep(step + 1)}
          disabled={step === 4}
        >
          Next
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Store Information */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Store Information</h2>
            <FormRow
              type="text"
              name="name"
              value={name}
              handleChange={(e) => setName(e.target.value)}
              labelText="Store Name"
              placeholder="Enter store name"
            />
            <FormRow
              type="textarea"
              name="overview"
              value={overview}
              handleChange={(e) => setOverview(e.target.value)}
              labelText="Store Overview"
              placeholder="Enter a brief description"
            />
            <FormRow
              type="text"
              name="location"
              value={location}
              handleChange={(e) => setLocation(e.target.value)}
              labelText="Location"
              placeholder="Enter location"
            />
            <FormRow
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              handleChange={(e) => setPhoneNumber(e.target.value)}
              labelText="Phone Number"
              placeholder="Enter phone number"
            />
            <FormRow
              type="text"
              name="whatsappNumber"
              value={whatsappNumber}
              handleChange={(e) => setWhatsappNumber(e.target.value)}
              labelText="WhatsApp Number"
              placeholder="Enter WhatsApp number"
            />
            <div className="form-row">
              <label htmlFor="image" className="form-label">
                Store Image
              </label>
              <input
                type="file"
                id="image"
                className="form-input"
                onChange={handleImageChange}
              />
            </div>
          </div>
        )}

        {/* Step 2: Photos */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Store Photos</h2>
            <input type="file" multiple onChange={handlePhotoChange} />
            <div className="flex mt-2">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(photo)}
                  alt={`Store photo ${index}`}
                  className="w-24 h-24 object-cover mr-2"
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Offerings */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Offerings</h2>
            {offerings.map((offering, index) => (
              <div key={index} className="border p-4 mb-4 rounded">
                <FormRow
                  type="text"
                  name={`offering-name-${index}`}
                  value={offering.name}
                  handleChange={(e) =>
                    handleOfferingChange(index, "name", e.target.value)
                  }
                  labelText="Offering Name"
                  placeholder="Enter offering name"
                />
                <FormRow
                  type="textarea"
                  name={`offering-description-${index}`}
                  value={offering.description}
                  handleChange={(e) =>
                    handleOfferingChange(index, "description", e.target.value)
                  }
                  labelText="Offering Description"
                  placeholder="Enter offering description"
                />
                <FormRow
                  type="number"
                  name={`offering-price-${index}`}
                  value={offering.price}
                  handleChange={(e) =>
                    handleOfferingChange(
                      index,
                      "price",
                      parseFloat(e.target.value)
                    )
                  }
                  labelText="Price"
                  placeholder="Enter offering price"
                />
                <div className="form-row mb-4">
                  <label
                    htmlFor={`offering-image-${index}`}
                    className="form-label block text-gray-700 font-bold mb-2"
                  >
                    Offering Image
                  </label>
                  <input
                    type="file"
                    id={`offering-image-${index}`}
                    className="form-input w-full p-2 border rounded"
                    onChange={(e) =>
                      handleOfferingChange(
                        index,
                        "image",
                        e.target.files?.[0] || null
                      )
                    }
                  />
                </div>
                <button
                  type="button"
                  className="bg-red-500 text-white py-1 px-2 rounded"
                  onClick={() => removeOffering(index)}
                >
                  Remove Offering
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={addOffering}
            >
              Add Offering
            </button>
          </div>
        )}

        {/* Step 4: Preview and Submit */}
        {step === 4 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Preview</h2>
            <pre className="bg-gray-100 p-4 rounded">
              {JSON.stringify(
                {
                  name,
                  overview,
                  location,
                  phoneNumber,
                  whatsappNumber,
                  offerings, // Changed offerings to offerings
                  photos,
                },
                null,
                2
              )}
            </pre>
            <button
              type="submit"
              className="bg-[#B8902E] text-white py-2 px-4 rounded mt-4"
            >
              {loading
                ? "Saving..."
                : storeId
                ? "Update Store"
                : "Create Store"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default StoreOnboarding;

// "use client";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/reducers/store";
// import { addStore, fetchStoreById, updateStore } from "@/reducers/storeSlice";
// import dynamic from "next/dynamic";
// import { FormRow } from "@/components/FormRow";

// // Lazy load useRouter to avoid server-side rendering issues
// const DynamicRouter = dynamic(
//   () => import("next/router").then((mod) => mod.useRouter),
//   { ssr: false }
// );

// interface StoreOnboardingProps {
//   storeId?: string; // Optional for update, required for creating new store
// }

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
//   const [offerings, setofferings] = useState([
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
//       setofferings(store.offerings || []);
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
//       offerings,
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
//   // Function to handle adding a new service
//   const addService = () => {
//     setofferings([
//       ...offerings,
//       { name: "", description: "", price: 0, image: null },
//     ]);
//   };

//   // Function to handle removing a service
//   const removeService = (index: number) => {
//     const updatedofferings = offerings.filter((_, i) => i !== index);
//     setofferings(updatedofferings);
//   };

//   // Function to handle changes in service fields
//   const handleServiceChange = (
//     index: number,
//     field: string,
//     value: string | number | File | null
//   ) => {
//     const updatedofferings = [...offerings];
//     updatedofferings[index] = {
//       ...updatedofferings[index],
//       [field]: value,
//     };
//     setofferings(updatedofferings);
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
//         {/* Step 3: offerings */}
//         {step === 3 && (
//           <div>
//             <h2 className="text-lg font-bold mb-4">offerings</h2>
//             {offerings.map((service, index) => (
//               <div key={index} className="border p-4 mb-4 rounded">
//                 <FormRow
//                   type="text"
//                   name={`service-name-${index}`}
//                   value={service.name}
//                   handleChange={(e) =>
//                     handleServiceChange(index, "name", e.target.value)
//                   }
//                   labelText="Service Name"
//                   placeholder="Enter service name"
//                 />
//                 <FormRow
//                   type="textarea"
//                   name={`service-description-${index}`}
//                   value={service.description}
//                   handleChange={(e) =>
//                     handleServiceChange(index, "description", e.target.value)
//                   }
//                   labelText="Service Description"
//                   placeholder="Enter service description"
//                 />
//                 <FormRow
//                   type="number"
//                   name={`service-price-${index}`}
//                   value={service.price}
//                   handleChange={(e) =>
//                     handleServiceChange(
//                       index,
//                       "price",
//                       parseFloat(e.target.value)
//                     )
//                   }
//                   labelText="Price"
//                   placeholder="Enter service price"
//                 />
//                 <div className="form-row mb-4">
//                   <label
//                     htmlFor={`service-image-${index}`}
//                     className="form-label block text-gray-700 font-bold mb-2"
//                   >
//                     Service Image
//                   </label>
//                   <input
//                     type="file"
//                     id={`service-image-${index}`}
//                     className="form-input w-full p-2 border rounded"
//                     onChange={(e) =>
//                       handleServiceChange(
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
//                   onClick={() => removeService(index)}
//                 >
//                   Remove Service
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               className="bg-green-500 text-white py-2 px-4 rounded"
//               onClick={addService}
//             >
//               Add Service
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
//                   offerings,
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
