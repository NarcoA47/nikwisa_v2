"use client";
import { OfferingCardProps } from "@/types/types";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import Edit and Delete icons

const OfferingsCardAdmin = ({
  offering,
  onEdit,
  onDelete,
}: OfferingCardProps) => {
  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-4 border border-gray-200">
      {/* Image Section */}
      <div className="relative w-full h-40 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={offering.image || "/placeholder-image.jpg"} // Fallback image
          alt={offering.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="mt-4 flex flex-col flex-grow">
        <h3 className="text-base md:text-lg font-bold text-gray-800">
          {offering.name}
        </h3>
        <p className="text-xs text-gray-500 mb-0.5">{offering.description}</p>
        <p className="text-base font-bold text-gray-900 mb-1">
          K{offering.price.toFixed(2)}
        </p>

        {/* Buttons Section */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEdit(offering.id)}
            className="flex items-center justify-center bg-yellow-500 text-white text-sm p-2 rounded hover:bg-yellow-600 transition"
            aria-label="Edit Offering"
          >
            <FaEdit className="mr-2" /> Edit
          </button>

          <button
            onClick={() => onDelete(offering.id)}
            className="flex items-center justify-center bg-red-500 text-white text-sm p-2 rounded hover:bg-red-600 transition"
            aria-label="Delete Offering"
          >
            <FaTrashAlt className="mr-2" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferingsCardAdmin;

// "use client";
// import { OfferingCardProps } from "@/types/types";
// import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import Edit and Delete icons

// const OfferingsCardAdmin = ({
//   offering,
//   onEdit,
//   onDelete,
// }: OfferingCardProps) => {
//   return (
//     <div className="w-full bg-white shadow-lg rounded-lg p-4 border border-gray-200">
//       {/* Image Section */}
//       <div className="relative w-full h-40 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
//         <img
//           src={offering.image}
//           alt={offering.name}
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//       </div>

//       {/* Content Section */}
//       <div className="mt-4 flex flex-col flex-grow">
//         {/* Title */}
//         <h3 className="text-base md:text-lg font-bold text-gray-800">
//           {offering.name}
//         </h3>
//         <p className="text-xs text-gray-500 mb-0.5">{offering.description}</p>

//         {/* Price */}
//         <p className="text-base font-bold text-gray-900 mb-1">
//           K{offering.price.toFixed(2)}
//         </p>

//         {/* Buttons Section */}
//         <div className="flex gap-2 mt-4">
//           {/* Edit Button with Icon */}
//           <button
//             onClick={() => onEdit(offering.id)}
//             className="flex items-center justify-center bg-yellow-500 text-white text-sm p-2 rounded hover:bg-yellow-600 transition"
//           >
//             <FaEdit className="mr-2" /> Edit
//           </button>

//           {/* Delete Button with Icon */}
//           <button
//             onClick={() => onDelete(offering.id)}
//             className="flex items-center justify-center bg-red-500 text-white text-sm p-2 rounded hover:bg-red-600 transition"
//           >
//             <FaTrashAlt className="mr-2" /> Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OfferingsCardAdmin;
