"use client";

interface ReviewsTabProps {
  reviews: {
    id: string;
    storeId: string;
    name: string;
    image: string;
    rating: number;
    reviewText: string;
    createdAt: string;
  }[]; // Ensure this is always an array
}

export default function Reviews({ reviews }: ReviewsTabProps) {
  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="flex items-start gap-4 p-4 border-b border-gray-300 bg-[#D9D9D9]"
        >
          {/* Reviewer Image */}
          <img
            src={review.image}
            alt={review.name}
            className="w-16 h-16 rounded-full object-cover"
          />

          {/* Review Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{review.name}</h3>

            {/* Rating */}
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <span className="text-green-600 font-semibold">
                {review.rating}
              </span>
              <span className="text-green-600">★</span>
            </div>

            {/* Review Text */}
            <p className="mt-2 text-gray-700 text-sm">{review.reviewText}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
