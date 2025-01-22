import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface StoreCardProps {
  id: number;
  name: string;
  image: string | null; // Allow image to be null
  rating: number;
  reviews_count: number;
  location: string;
  working_hours: string;
  event_planning_categories: string[];
}

const StoreCard: React.FC<StoreCardProps> = ({
  id,
  name,
  image,
  rating,
  reviews_count,
  location,
  working_hours,
  event_planning_categories,
}) => {
  const router = useRouter();

  console.log("image", image);
  // Handle navigation to store page
  const handleNavigation = (category: string) => {
    router.push(`/event-planning/${category}/${id}`);
  };

  return (
    <div
      key={id}
      className="flex border-2 border-black rounded-lg overflow-hidden shadow-sm p-2"
    >
      <div className="w-1/3 relative">
        {image ? (
          <Image
            src={image} // Use the image URL if available
            alt={name}
            layout="fill" // Ensures the image covers the container
            objectFit="cover" // Ensures proper scaling
            className="rounded"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" // Specify sizes for performance
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>{" "}
            {/* Fallback text if no image */}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <h2 className="md:text-lg text-sm md:mt-2 mb-1 font-semibold text-gray-800">
          {name}
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-bold">
            {rating}
          </span>
          <span className="text-gray-500 text-sm">{reviews_count} Reviews</span>
        </div>
        <p className="text-sm text-gray-500 mt-1 mb-1">{location}</p>

        <div className="mt-4">
          <button
            className="bg-[#B8902E] text-white py-2 px-4 rounded mt-4"
            onClick={() => handleNavigation(event_planning_categories[0])} // Pass the clicked category
          >
            Enter Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
