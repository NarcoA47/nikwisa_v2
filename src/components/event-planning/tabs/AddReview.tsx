import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/reducers/store";
import { useDispatch } from "react-redux";
import { addReview } from "@/reducers/reviewSlice";
import ReviewForm from "@/components/forms/ReviewForm";

const AddReview: React.FC<{ storeId: number }> = ({ storeId }) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: { rating: number; comment: string }) => {
    setIsSubmitting(true);
    try {
      await dispatch(addReview({ storeId, reviewData: data }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ReviewForm
      initialData={{ rating: 0, comment: "" }}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

export default AddReview;

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { AppDispatch } from "@/reducers/store";
// import { useDispatch } from "react-redux";
// import { addReview } from "@/reducers/reviewSlice";
// import { FormRow } from "@/components/FormRow";
// import FormRowSelect from "@/components/forms/FormRowSelect";
// import Alert from "@/components/forms/Alert"; // Import the Alert component

// interface AddReviewProps {
//   storeId: number;
// }

// const AddReview: React.FC<AddReviewProps> = ({ storeId }) => {
//   const dispatch: AppDispatch = useDispatch();
//   const router = useRouter();
//   const [reviewData, setReviewData] = useState({
//     rating: 0,
//     comment: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [alertMessage, setAlertMessage] = useState<string | null>(null);
//   const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

//   const handleInputChange = (field: string, value: any) => {
//     setReviewData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     try {
//       const response = await dispatch(
//         addReview({
//           storeId, // Pass storeId as expected by the backend
//           reviewData,
//         })
//       );

//       if (response.meta.requestStatus === "fulfilled") {
//         // Set success alert
//         setAlertMessage("Review submitted successfully!");
//         setAlertType("success");

//         // Reset the form after submission
//         setReviewData({ rating: 0, comment: "" });
//       } else {
//         // Set error alert
//         setAlertMessage("Failed to submit review. Please try again.");
//         setAlertType("error");
//       }
//     } catch (error) {
//       setAlertMessage("An unexpected error occurred.");
//       setAlertType("error");
//     } finally {
//       setIsSubmitting(false);

//       // Clear the alert message after 3 seconds
//       setTimeout(() => {
//         setAlertMessage(null);
//         setAlertType(null);
//       }, 3000);
//     }
//   };

//   const ratingOptions = [1, 2, 3, 4, 5].map((value) => ({
//     id: value,
//     slug: value.toString(),
//     title: value.toString(),
//   }));

//   return (
//     <div className="max-w-3xl mx-auto md:ml-0 md:mr-auto mt-8">
//       {/* Display Alert based on success or error */}
//       {alertMessage && <Alert message={alertMessage} type={alertType!} />}

//       <FormRowSelect
//         label="Rating"
//         id="rating"
//         value={reviewData.rating || ""}
//         options={ratingOptions}
//         onChange={(id, value) => handleInputChange("rating", value)}
//       />

//       <FormRow
//         type="textarea"
//         name="comment"
//         value={reviewData.comment}
//         handleChange={(e) => handleInputChange("comment", e.target.value)}
//         labelText="Store Review"
//         placeholder="Enter a brief Store Review"
//       />

//       <button
//         onClick={handleSubmit}
//         className={`bg-[#B8902E] text-white px-4 py-2 rounded mt-4 ${
//           isSubmitting ? "opacity-50" : ""
//         }`}
//         disabled={isSubmitting}
//       >
//         {isSubmitting ? "Submitting..." : "Submit Review"}
//       </button>
//     </div>
//   );
// };

// export default AddReview;
