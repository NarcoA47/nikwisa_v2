"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/reducers/store";
import { fetchReviewsByStoreId } from "@/reducers/reviewSlice";
import { ReviewsProps } from "@/types/types"; // Make sure this imports ReviewsProps correctly

const Reviews: React.FC<ReviewsProps> = ({ storeId }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Get reviews from the Redux store
  const { reviews, loading, error } = useSelector(
    (state: RootState) => state.reviews
  );

  useEffect(() => {
    if (storeId) {
      // Fetch reviews when storeId is available and reviews are not already loaded
      dispatch(fetchReviewsByStoreId(storeId));
    }
  }, [dispatch, storeId]);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>Error loading reviews: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {reviews.length === 0 ? (
        <div>No reviews for this store yet.</div>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            className="flex items-start gap-4 p-4 border-b border-gray-300 bg-[#D9D9D9] max-w-3xl mx-auto md:ml-0 md:mr-auto rounded-lg"
          >
            <img
              src={review.user.profile_image}
              alt={review.user.username}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{review.user.username}</h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <span className="text-green-600 font-semibold">
                  {review.rating}
                </span>
                <span className="text-green-600">★</span>
              </div>
              <p className="mt-2 text-gray-700 text-sm">{review.comment}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Reviews;

// "use client";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/reducers/store";
// import { fetchReviewsByStoreId } from "@/reducers/reviewSlice";
// import { ReviewsProps } from "@/types/types";

// const Reviews: React.FC<ReviewsProps> = ({ storeId }: { storeId: number }) {
//   const dispatch = useDispatch<AppDispatch>();

//   // Get reviews from the Redux store
//   const { reviews, loading, error } = useSelector(
//     (state: RootState) => state.reviews
//   );

//   useEffect(() => {
//     if (storeId) {
//       // Fetch reviews when storeId is available and reviews are not already loaded
//       dispatch(fetchReviewsByStoreId(storeId));
//     }
//   }, [dispatch, storeId]);

//   if (loading) {
//     return <div>Loading reviews...</div>;
//   }

//   if (error) {
//     return <div>Error loading reviews: {error}</div>;
//   }

//   return (
//     <div className="space-y-6">
//       {reviews.length === 0 ? (
//         <div>No reviews for this store yet.</div>
//       ) : (
//         reviews.map((review) => (
//           <div
//             key={review.id}
//             className="flex items-start gap-4 p-4 border-b border-gray-300 bg-[#D9D9D9]"
//           >
//             <img
//               src={review.user.profile_image}
//               alt={review.user.username}
//               className="w-16 h-16 rounded-full object-cover"
//             />
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold">{review.user.username}</h3>
//               <div className="flex items-center gap-1 text-gray-500 text-sm">
//                 <span className="text-green-600 font-semibold">
//                   {review.rating}
//                 </span>
//                 <span className="text-green-600">★</span>
//               </div>
//               <p className="mt-2 text-gray-700 text-sm">{review.comment}</p>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// "use client";

// import { ReviewsTabProps } from "@/types/types";

// export default function Reviews({ reviews }: ReviewsTabProps) {
//   return (
//     <div className="space-y-6">
//       {reviews.map((review, index) => (
//         <div
//           key={index}
//           className="flex items-start gap-4 p-4 border-b border-gray-300 bg-[#D9D9D9]"
//         >
//           {/* Reviewer Image */}
//           <img
//             src={review.image}
//             alt={review.name}
//             className="w-16 h-16 rounded-full object-cover"
//           />

//           {/* Review Content */}
//           <div className="flex-1">
//             <h3 className="text-lg font-semibold">{review.name}</h3>

//             {/* Rating */}
//             <div className="flex items-center gap-1 text-gray-500 text-sm">
//               <span className="text-green-600 font-semibold">
//                 {review.rating}
//               </span>
//               <span className="text-green-600">★</span>
//             </div>

//             {/* Review Text */}
//             <p className="mt-2 text-gray-700 text-sm">{review.reviewText}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
