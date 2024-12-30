"use client";
import { RootState } from "@/reducers/store";
import { AddReviewProps } from "@/types/types";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const AddReview: React.FC<AddReviewProps> = ({ storeId, onSubmit }) => {
  const [rating, setRating] = useState(1); // Default rating is 1
  const [reviewText, setReviewText] = useState("");

  const { user } = useSelector((state: RootState) => state.auth);
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const review = {
      rating,
      comment: reviewText,
      store: storeId, // Pass store ID
      user: user?.user_id, // Pass user ID, not the user object
    };
    onSubmit(review); // Call the onSubmit function passed from parent
    setReviewText(""); // Reset the review text after submission
  };

  // Handle star click to set rating
  const handleStarClick = (star: number, event: React.MouseEvent) => {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const clickPosition = event.clientX - boundingRect.left;
    const starWidth = boundingRect.width;

    // Fractional rating logic
    const fraction = clickPosition / starWidth;
    let newRating = star + (fraction < 0.5 ? 0 : 0.5); // Either a whole or half point
    setRating(parseFloat(newRating.toFixed(1))); // Set rating as float (1.5, 2.0, etc.)
  };

  return (
    <div className="space-y-4 mt-6 md:w-1/3">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                fill={
                  star <= Math.floor(rating)
                    ? "#F57C00" // Full color for integer stars
                    : star - rating === 0.5
                    ? "#F57C00"
                    : "gray" // Half color for fractional rating
                }
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="cursor-pointer"
                onClick={(e) => handleStarClick(star, e)}
              >
                <path d="M12 17.27l5.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
              </svg>
            ))}
          </div>
          <div className="text-xs text-gray-500">{rating.toFixed(1)} / 5</div>
        </div>
        <div>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Your Review"
            required
            className="p-2 border border-gray-300 rounded-md w-full h-32"
          />
        </div>
        <button
          type="submit"
          className=" bg-[#B8902E] hover:bg-yellow-600 text-white py-2 px-6 rounded text-sm font-medium transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
