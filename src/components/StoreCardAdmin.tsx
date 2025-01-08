"use client";
import { StoreCardProps } from "@/types/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const StoreCardAdmin: React.FC<StoreCardProps> = ({
  id,
  name,
  image,
  rating,
  reviews_count,
  location,
  event_planning_categories,
}) => {
  const router = useRouter();

  // Handle navigation to the view store page
  const handleViewNavigation = () => {
    router.push(`/dashboard/stores-lists/${id}`);
  };

  // Handle navigation to the edit store page

  const handleEditNavigation = () => {
    router.push(`/dashboard/stores-lists/edit/${id}`);
  };

  return (
    <div
      key={id}
      className="flex border-2 border-black rounded-lg overflow-hidden shadow-sm p-2"
    >
      <div className="w-1/3 relative">
        <Image
          src={image}
          alt={name}
          layout="fill" // Ensures the image covers the container
          objectFit="cover" // Ensures proper scaling
          className="rounded "
        />
      </div>

      {/* Content Section */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <h2 className="md:text-lg text-base md:mt-2 mb-1 font-semibold text-gray-800">
          {name}
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-bold">
            {rating}
          </span>
          <span className="text-gray-500 text-sm">{reviews_count} Reviews</span>
        </div>
        <p className="text-sm text-gray-500 mt-1 mb-1">{location}</p>
        <div className="mt-4 flex gap-2">
          {/* Button to view the store */}
          <button
            className="w-32 bg-[#B8902E] hover:bg-yellow-600 text-white py-2 px-4 rounded text-sm font-medium transition"
            onClick={handleViewNavigation}
          >
            View Store
          </button>
          {/* Button to edit the store */}
          <button
            className="w-32 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition"
            onClick={handleEditNavigation}
          >
            Edit Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreCardAdmin;
