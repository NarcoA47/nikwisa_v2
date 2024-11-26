"use client";

interface Review {
  name: string;
  image: string;
  rating: number;
  reviewCount?: number;
  reviewText: string;
}

interface ReviewsTabProps {
  reviewDetails: Review[];
}

export default function Reviews({ reviewDetails }: ReviewsTabProps) {
  return (
    <div className="space-y-6">
      {reviewDetails.map((review, index) => (
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

            {/* Review Count and Rating side by side */}
            <div className="flex items-center gap-3 text-gray-500 text-sm ">
              <p className="flex items-center mb-0">
                {review.reviewCount
                  ? `${review.reviewCount} reviews`
                  : "No reviews yet"}
              </p>
              <div className="flex items-center gap-1">
                <span className="text-green-600 font-semibold">
                  {review.rating}
                </span>
                <span className="text-green-600">★</span>
              </div>
            </div>

            {/* Review Text */}
            <p className="mt-2 text-gray-700 text-sm">{review.reviewText}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
