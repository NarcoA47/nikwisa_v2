import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface StoreCardProps {
  id: string;
  name: string;
  image: string;
  rating: number; // If you're using string for rating, keep it as string
  review_count: number; // Use number for review count
  location: string;
  wedding_category: string;
}

const StoreCard: React.FC<StoreCardProps> = ({
  id,
  name,
  image,
  rating,
  review_count,
  location,
  wedding_category,
}) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/event-planning/${wedding_category}/${id}`);
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
          <span className="text-gray-500 text-sm">{review_count} Reviews</span>
        </div>
        <p className="text-sm text-gray-500 mt-1 mb-1">{location}</p>
        <div className="mt-4">
          <button
            className="w-32 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded text-sm font-medium transition"
            onClick={handleNavigation}
          >
            Enter Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
