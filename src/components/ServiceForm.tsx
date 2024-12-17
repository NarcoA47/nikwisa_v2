"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormRow } from "./FormRow"; // Assuming FormRow is the same for both forms

interface ServiceFormProps {
  initialData?: {
    id?: string;
    name: string;
    description: string;
    price: number;
    image: string;
  };
  isEdit?: boolean;
}

export default function ServiceForm({
  initialData,
  isEdit = false,
}: ServiceFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    image: initialData?.image || "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEdit ? `/api/services/${initialData?.id}` : "/api/services";
    const method = isEdit ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      router.push("/services"); // Go back to the services page
    } catch (error) {
      console.error("Failed to save service", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {/* Service Form */}
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-4">
          {isEdit ? "Edit Service" : "Add Service"}
        </h2>

        <FormRow
          type="text"
          name="name"
          value={formData.name}
          handleChange={handleChange}
          labelText="Service Name"
          placeholder="Enter service name"
        />

        <FormRow
          type="textarea"
          name="description"
          value={formData.description}
          handleChange={handleChange}
          labelText="Description"
          placeholder="Enter service description"
        />

        <FormRow
          type="number"
          name="price"
          value={formData.price}
          handleChange={handleChange}
          labelText="Price"
          placeholder="Enter service price"
        />

        <div className="form-row">
          <label htmlFor="image" className="form-label">
            Store Image
          </label>
          <input type="file" id="image" className="form-input" />
        </div>

        <button
          type="submit"
          className="bg-[#B8902E] text-white py-2 px-4 rounded mt-4"
        >
          {isEdit ? "Update Service" : "Add Service"}
        </button>
      </form>
    </div>
  );
}

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FormRow } from "./FormRow"; // Assuming FormRow is the same for both forms

// interface ServiceFormProps {
//   initialData?: {
//     id?: string;
//     name: string;
//     description: string;
//     price: number;
//     image: string;
//   };
//   isEdit?: boolean;
// }

// export default function ServiceForm({
//   initialData,
//   isEdit = false,
// }: ServiceFormProps) {
//   const [formData, setFormData] = useState({
//     name: initialData?.name || "",
//     description: initialData?.description || "",
//     price: initialData?.price || 0,
//     image: initialData?.image || "",
//   });

//   const router = useRouter();

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const url = isEdit ? `/api/services/${initialData?.id}` : "/api/services";
//     const method = isEdit ? "PUT" : "POST";

//     try {
//       await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       router.push("/services"); // Go back to the services page
//     } catch (error) {
//       console.error("Failed to save service", error);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-8">
//       {/* Step Buttons */}
//       <div className="flex justify-between mb-4">
//         <button
//           className="bg-gray-300 py-2 px-4 rounded disabled:opacity-50"
//           onClick={() => {} /* Add step decrement logic here */}
//           disabled={false} // Adjust this based on your step logic
//         >
//           Previous
//         </button>
//         <button
//           className="bg-[#B8902E] text-white py-2 px-4 rounded"
//           onClick={() => {} /* Add step increment logic here */}
//           disabled={false} // Adjust this based on your step logic
//         >
//           Next
//         </button>
//       </div>

//       <form onSubmit={handleSubmit}>
//         {/* Step 1: Service Information */}
//         <div>
//           <h2 className="text-lg font-bold mb-4">
//             {isEdit ? "Edit Service" : "Add Service"}
//           </h2>

//           <FormRow
//             type="text"
//             name="name"
//             value={formData.name}
//             handleChange={handleChange}
//             labelText="Service Name"
//             placeholder="Enter service name"
//           />

//           <FormRow
//             type="textarea"
//             name="description"
//             value={formData.description}
//             handleChange={handleChange}
//             labelText="Description"
//             placeholder="Enter service description"
//           />

//           <FormRow
//             type="number"
//             name="price"
//             value={formData.price}
//             handleChange={handleChange}
//             labelText="Price"
//             placeholder="Enter service price"
//           />

//           <FormRow
//             type="text"
//             name="image"
//             value={formData.image}
//             handleChange={handleChange}
//             labelText="Image URL"
//             placeholder="Enter image URL"
//           />
//         </div>

//         {/* Step 2: Upload Photos (if applicable) */}
//         <div>
//           <h2 className="text-lg font-bold mb-4">Upload Photos</h2>
//           <input
//             type="file"
//             multiple
//             onChange={() => {} /* Handle photo upload */}
//             className="py-2 px-4 rounded border border-gray-300"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-[#B8902E] text-white px-4 py-3 rounded-md hover:bg-[#B8902E] focus:outline-none focus:ring-2 focus:ring-[#B8902E]"
//         >
//           {isEdit ? "Update Service" : "Add Service"}
//         </button>
//       </form>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FormRow } from "./FormRow"; // Assuming FormRow is the same for both forms

// interface ServiceFormProps {
//   initialData?: {
//     id?: string;
//     name: string;
//     description: string;
//     price: number;
//     image: string;
//   };
//   isEdit?: boolean;
// }

// export default function ServiceForm({
//   initialData,
//   isEdit = false,
// }: ServiceFormProps) {
//   const [formData, setFormData] = useState({
//     name: initialData?.name || "",
//     description: initialData?.description || "",
//     price: initialData?.price || 0,
//     image: initialData?.image || "",
//   });

//   const router = useRouter();

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const url = isEdit ? `/api/services/${initialData?.id}` : "/api/services";
//     const method = isEdit ? "PUT" : "POST";

//     try {
//       await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       router.push("/services"); // Go back to the services page
//     } catch (error) {
//       console.error("Failed to save service", error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <h2 className="text-2xl font-bold text-center">
//           {isEdit ? "Edit Service" : "Add Service"}
//         </h2>

//         <FormRow
//           labelText="Service Name"
//           type="text"
//           name="name"
//           value={formData.name}
//           handleChange={handleChange}
//         />

//         <FormRow
//           labelText="Description"
//           type="textarea"
//           name="description"
//           value={formData.description}
//           handleChange={handleChange}
//         />

//         <FormRow
//           labelText="Price"
//           type="number"
//           name="price"
//           value={formData.price}
//           handleChange={handleChange}
//         />

//         <FormRow
//           labelText="Image URL"
//           type="text"
//           name="image"
//           value={formData.image}
//           handleChange={handleChange}
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white px-4 py-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//         >
//           {isEdit ? "Update Service" : "Add Service"}
//         </button>
//       </form>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FormRow } from "./FormRow"; // Assuming FormRow is the same for both forms

// interface ServiceFormProps {
//   initialData?: {
//     id?: string;
//     name: string;
//     description: string;
//     price: number;
//     image: string;
//   };
//   isEdit?: boolean;
// }

// export default function ServiceForm({
//   initialData,
//   isEdit = false,
// }: ServiceFormProps) {
//   const [formData, setFormData] = useState({
//     name: initialData?.name || "",
//     description: initialData?.description || "",
//     price: initialData?.price || 0,
//     image: initialData?.image || "",
//   });

//   const router = useRouter();

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const url = isEdit ? `/api/services/${initialData?.id}` : "/api/services";
//     const method = isEdit ? "PUT" : "POST";

//     try {
//       await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       router.push("/services"); // Go back to the services page
//     } catch (error) {
//       console.error("Failed to save service", error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <h2 className="text-2xl font-bold text-center">
//           {isEdit ? "Edit Service" : "Add Service"}
//         </h2>

//         <FormRow label="Service Name">
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </FormRow>

//         <FormRow label="Description">
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </FormRow>

//         <FormRow label="Price">
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </FormRow>

//         <FormRow label="Image URL">
//           <input
//             type="text"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </FormRow>

//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white px-4 py-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//         >
//           {isEdit ? "Update Service" : "Add Service"}
//         </button>
//       </form>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// interface ServiceFormProps {
//   initialData?: {
//     id?: string;
//     name: string;
//     description: string;
//     price: number;
//     image: string;
//   };
//   isEdit?: boolean;
// }

// export default function ServiceForm({
//   initialData,
//   isEdit = false,
// }: ServiceFormProps) {
//   const [formData, setFormData] = useState({
//     name: initialData?.name || "",
//     description: initialData?.description || "",
//     price: initialData?.price || 0,
//     image: initialData?.image || "",
//   });

//   const router = useRouter();

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const url = isEdit ? `/api/services/${initialData?.id}` : "/api/services";
//     const method = isEdit ? "PUT" : "POST";

//     try {
//       await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       router.push("/services");
//     } catch (error) {
//       console.error("Failed to save service", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <h2 className="text-2xl font-bold">
//         {isEdit ? "Edit Service" : "Add Service"}
//       </h2>
//       <div>
//         <label>Service Name</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//       </div>
//       <div>
//         <label>Description</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//       </div>
//       <div>
//         <label>Price</label>
//         <input
//           type="number"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//       </div>
//       <div>
//         <label>Image URL</label>
//         <input
//           type="text"
//           name="image"
//           value={formData.image}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//       </div>
//       <button
//         type="submit"
//         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//       >
//         {isEdit ? "Update Service" : "Add Service"}
//       </button>
//     </form>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { FormRow } from "./FormRow";
// // Assuming you have a reusable FormRow component

// interface ServiceFormProps {
//   initialData?: {
//     id?: string;
//     name: string;
//     description: string;
//     price: number;
//     image: string;
//   };
//   isEdit?: boolean;
// }

// export default function ServiceForm({
//   initialData,
//   isEdit = false,
// }: ServiceFormProps) {
//   const [formData, setFormData] = useState({
//     name: initialData?.name || "",
//     description: initialData?.description || "",
//     price: initialData?.price || 0,
//     image: initialData?.image || "",
//   });

//   const router = useRouter();

//   // Handle input change
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const url = isEdit ? `/api/services/${initialData?.id}` : "/api/services";
//     const method = isEdit ? "PUT" : "POST";

//     try {
//       await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       router.push("/services"); // Go back to the services page
//     } catch (error) {
//       console.error("Failed to save service", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <h2 className="text-2xl font-bold">
//         {isEdit ? "Edit Service" : "Add Service"}
//       </h2>

//       <FormRow label="Service Name">
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//       </FormRow>

//       <FormRow label="Description">
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//       </FormRow>

//       <FormRow label="Price">
//         <input
//           type="number"
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//       </FormRow>

//       <FormRow label="Image URL">
//         <input
//           type="text"
//           name="image"
//           value={formData.image}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//       </FormRow>

//       <button
//         type="submit"
//         className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//       >
//         {isEdit ? "Update Service" : "Add Service"}
//       </button>
//     </form>
//   );
// }
