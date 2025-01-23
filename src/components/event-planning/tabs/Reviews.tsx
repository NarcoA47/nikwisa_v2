import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/reducers/store";
import {
  fetchReviewsByStoreId,
  deleteReview,
  partialUpdateReview,
} from "@/reducers/reviewSlice";
import { ReviewsProps } from "@/types/types";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReviewForm from "@/components/forms/ReviewForm";

const Reviews: React.FC<ReviewsProps> = ({ storeId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { reviews, loading, error } = useSelector(
    (state: RootState) => state.reviews
  );

  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (storeId) {
      dispatch(fetchReviewsByStoreId(storeId));
    }
  }, [dispatch, storeId]);

  const handleDelete = async (reviewId: string) => {
    try {
      await dispatch(deleteReview(reviewId));
      toast.success("Review deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete review. Please try again.");
    }
  };

  const handleEdit = (reviewId: string, rating: string, comment: string) => {
    setEditingReviewId(reviewId);
  };

  const handleUpdate = async (data: { rating: number; comment: string }) => {
    if (!editingReviewId) return;

    setIsSubmitting(true);
    try {
      await dispatch(
        partialUpdateReview({
          reviewId: editingReviewId,
          partialData: data,
        })
      );
      toast.success("Review updated successfully!");
      setEditingReviewId(null); // Exit edit mode
    } catch (error) {
      toast.error("Failed to update review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              {editingReviewId === review.id ? (
                <ReviewForm
                  initialData={{
                    rating: review.rating,
                    comment: review.comment,
                  }}
                  onSubmit={handleUpdate}
                  isSubmitting={isSubmitting}
                />
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      handleEdit(review.id, review.rating, review.comment)
                    }
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:text-blue-700 hover:shadow-lg transition-all duration-200 ease-in-out"
                  >
                    <MdEdit className="w-5 h-5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(review.id.toString())}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:text-red-700 hover:shadow-lg transition-all duration-200 ease-in-out"
                  >
                    <MdDeleteForever className="w-5 h-5" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Reviews;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/reducers/store";
// import {
//   fetchReviewsByStoreId,
//   deleteReview,
//   partialUpdateReview,
// } from "@/reducers/reviewSlice";
// import { ReviewsProps } from "@/types/types";
// import { MdDeleteForever, MdEdit } from "react-icons/md";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Reviews: React.FC<ReviewsProps> = ({ storeId }) => {
//   const dispatch = useDispatch<AppDispatch>();

//   const { reviews, loading, error } = useSelector(
//     (state: RootState) => state.reviews
//   );

//   const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
//   const [formData, setFormData] = useState({ rating: "", comment: "" });

//   useEffect(() => {
//     if (storeId) {
//       dispatch(fetchReviewsByStoreId(storeId));
//     }
//   }, [dispatch, storeId]);

//   const handleDelete = async (reviewId: string) => {
//     try {
//       await dispatch(deleteReview(reviewId));
//       toast.success("Review deleted successfully!");
//     } catch (error) {
//       toast.error("Failed to delete review. Please try again.");
//     }
//   };

//   const handleEdit = (reviewId: string, rating: string, comment: string) => {
//     setEditingReviewId(reviewId);
//     setFormData({ rating, comment });
//   };

//   const handleUpdate = async () => {
//     if (!editingReviewId) return;

//     try {
//       await dispatch(
//         partialUpdateReview({
//           reviewId: editingReviewId,
//           partialData: formData,
//         })
//       );
//       toast.success("Review updated successfully!");
//       setEditingReviewId(null); // Exit edit mode
//     } catch (error) {
//       toast.error("Failed to update review. Please try again.");
//     }
//   };

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
//             className="flex items-start gap-4 p-4 border-b border-gray-300 bg-[#D9D9D9] max-w-3xl mx-auto md:ml-0 md:mr-auto rounded-lg"
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
//               {editingReviewId === review.id ? (
//                 <div className="mt-2 space-y-2">
//                   <input
//                     type="text"
//                     value={formData.rating}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         rating: e.target.value,
//                       }))
//                     }
//                     placeholder="Rating"
//                     className="border border-gray-300 rounded p-1"
//                   />
//                   <textarea
//                     value={formData.comment}
//                     onChange={(e) =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         comment: e.target.value,
//                       }))
//                     }
//                     placeholder="Comment"
//                     className="border border-gray-300 rounded p-1 w-full"
//                   ></textarea>
//                   <button
//                     onClick={handleUpdate}
//                     className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                   >
//                     Save
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex gap-4">
//                   <button
//                     onClick={() =>
//                       handleEdit(review.id, review.rating, review.comment)
//                     }
//                     className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:text-blue-700 hover:shadow-lg transition-all duration-200 ease-in-out"
//                   >
//                     <MdEdit className="w-5 h-5" />
//                     <span>Edit</span>
//                   </button>
//                   <button
//                     onClick={() => handleDelete(review.id.toString())}
//                     className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:text-red-700 hover:shadow-lg transition-all duration-200 ease-in-out"
//                   >
//                     <MdDeleteForever className="w-5 h-5" />
//                     <span>Delete</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Reviews;
