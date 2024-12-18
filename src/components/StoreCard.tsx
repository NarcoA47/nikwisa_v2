import React from "react";

interface StoreCardProps {
  id: number;
  name: string;
  image: string;
  rating: string; // If you're using string for rating, keep it as string
  review_count: number; // Use number for review count
  location: string;
}

const StoreCard: React.FC<StoreCardProps> = ({
  id,
  name,
  image,
  rating,
  review_count,
  location,
}) => {
  return (
    <div
      key={id}
      className="flex border-2 border-black rounded-lg overflow-hidden shadow-sm p-2"
    >
      {/* Image Section - Left 1/3 */}
      <div className="w-1/3">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Content Section - Right 2/3 */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        {/* Name */}
        <h2 className="md:text-lg text-base md:mt-2 mb-1 font-semibold text-gray-800">
          {name}
        </h2>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-bold">
            {rating}
          </span>
          <span className="text-gray-500 text-sm">{review_count} Reviews</span>
        </div>

        {/* Location */}
        <p className="text-sm text-gray-500 mt-1 mb-1">{location}</p>

        {/* Button */}
        <div className="mt-4">
          <button
            className="w-32 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded text-sm font-medium transition"
            onClick={() => alert(`See details for ${name}`)}
          >
            Enter Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
