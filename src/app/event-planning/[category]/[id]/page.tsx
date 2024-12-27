"use client";

import StoreDetailsHeader from "@/components/event-planning/StoreDetailsHeader";
import AddReview from "@/components/event-planning/tabs/AddReview";
import Offerings from "@/components/event-planning/tabs/Offerings";
import Overview from "@/components/event-planning/tabs/Overview";
import PhotosGallery from "@/components/event-planning/tabs/PhotoGallery";
import Reviews from "@/components/event-planning/tabs/Reviews";
import { AppDispatch, RootState } from "@/reducers/store";
import { fetchStoresWithOfferings } from "@/reducers/storeSlice";
import { fetchReviewsByStoreId } from "@/reducers/reviewSlice";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const StoreDetailPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { category, id } = useParams(); // Get category and id from the URL params

  const { stores, loading, error } = useSelector(
    (state: RootState) => state.stores
  );

  const { reviews, loadingReviews, errorReviews } = useSelector(
    (state: RootState) => state.reviews
  );

  const { user } = useSelector((state: RootState) => state.auth); // Access logged-in user

  const [activeTab, setActiveTab] = useState("overview");
  const [showAddReviewForm, setShowAddReviewForm] = useState(false);

  useEffect(() => {
    // Fetch all stores with offerings when the component mounts
    dispatch(fetchStoresWithOfferings());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchReviewsByStoreId(parseInt(id, 10))); // Fetch reviews for the selected store
    }
  }, [dispatch, id]);

  // Wait for category and id to be available before rendering the page
  if (!category || !id) {
    return <div>Loading store details...</div>;
  }

  // Ensure id is a number
  const storeId = parseInt(id as string, 10); // Convert id to a number

  // Decode the category and trim any spaces to match the store data
  const decodedCategory = decodeURIComponent(category).trim();

  // Filter the store based on the wedding_category and id
  const filteredStore = stores.find(
    (store) =>
      store.id === storeId && store.wedding_category.trim() === decodedCategory // Match with wedding_category
  );

  useEffect(() => {
    if (filteredStore) {
      console.log("Filtered store:", filteredStore); // Debugging: Show the filtered store
    } else {
      console.log("No store found for the given category and ID.");
    }
  }, [filteredStore]);

  if (loading || loadingReviews) {
    return <div>Loading...</div>;
  }

  if (error || errorReviews) {
    return <div>{`Error: ${error || errorReviews}`}</div>;
  }

  if (!filteredStore) {
    return <div>No store found for the given category and ID.</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview overview={filteredStore.overview} />;
      case "reviews":
        return (
          <div>
            <Reviews reviews={reviews} storeId={filteredStore.id} />
            {/* Add Review Section */}
            {!showAddReviewForm ? (
              <button
                onClick={() => setShowAddReviewForm(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
              >
                Add a Review
              </button>
            ) : (
              // Pass user data to AddReview component
              <AddReview
                storeId={filteredStore.id} // Pass storeId to AddReview
                user={
                  user
                    ? {
                        username: user.username,
                        profile_image: user.profile_image,
                      }
                    : {}
                }
                onSubmit={(newReview) => {
                  // Handle new review submission here (dispatch an action to add the review)
                  console.log(newReview);
                  setShowAddReviewForm(false); // Hide form after submission
                  dispatch(fetchReviewsByStoreId(filteredStore.id)); // Refresh reviews after adding
                }}
              />
            )}
          </div>
        );
      case "offerings":
        return <Offerings storeId={filteredStore.id} />;

      case "photos":
        return <PhotosGallery photos={filteredStore.photos} />;
      default:
        return <Overview store={filteredStore} />;
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 my-8">
      <StoreDetailsHeader store={filteredStore} />

      {/* Tab Navigation */}
      <div className="mt-6 border-b">
        <nav className="flex space-x-6">
          {[
            { label: "Overview", value: "overview" },
            { label: "Reviews", value: "reviews" },
            { label: "Offerings", value: "offerings" },
            { label: "Photos", value: "photos" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`pb-2 text-sm md:text-lg font-medium border-b-2 transition-colors duration-300 ${
                activeTab === tab.value
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="mt-6">{renderTabContent()}</div>
    </div>
  );
};

export default StoreDetailPage;

// "use client";

// import StoreDetailsHeader from "@/components/event-planning/StoreDetailsHeader";
// import AddReview from "@/components/event-planning/tabs/AddReview";
// import Offerings from "@/components/event-planning/tabs/Offerings";
// import Overview from "@/components/event-planning/tabs/Overview";
// import PhotosGallery from "@/components/event-planning/tabs/PhotoGallery";
// import Reviews from "@/components/event-planning/tabs/Reviews";
// import { AppDispatch, RootState } from "@/reducers/store";
// import { fetchStoresWithOfferings } from "@/reducers/storeSlice";
// import { fetchReviewsByStoreId } from "@/reducers/reviewSlice";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const StoreDetailPage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { category, id } = useParams(); // Get category and id from the URL params

//   const { stores, loading, error } = useSelector(
//     (state: RootState) => state.stores
//   );

//   const { reviews, loadingReviews, errorReviews } = useSelector(
//     (state: RootState) => state.reviews
//   );

//   const { user } = useSelector((state: RootState) => state.auth); // Access logged-in user

//   const [activeTab, setActiveTab] = useState("overview");
//   const [showAddReviewForm, setShowAddReviewForm] = useState(false);

//   useEffect(() => {
//     // Fetch all stores with offerings when the component mounts
//     dispatch(fetchStoresWithOfferings());
//   }, [dispatch]);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchReviewsByStoreId(parseInt(id, 10))); // Fetch reviews for the selected store
//     }
//   }, [dispatch, id]);

//   // Wait for category and id to be available before rendering the page
//   if (!category || !id) {
//     return <div>Loading store details...</div>;
//   }

//   // Ensure id is a number
//   const storeId = parseInt(id as string, 10); // Convert id to a number

//   // Filter the store based on the wedding_category and id
//   const filteredStore = stores.find(
//     (store) => store.id === storeId && store.wedding_category === category // Match with wedding_category
//   );

//   useEffect(() => {
//     if (filteredStore) {
//       console.log("Filtered store:", filteredStore); // Debugging: Show the filtered store
//     } else {
//       console.log("No store found for the given category and ID.");
//     }
//   }, [filteredStore]);

//   if (loading || loadingReviews) {
//     return <div>Loading...</div>;
//   }

//   if (error || errorReviews) {
//     return <div>{`Error: ${error || errorReviews}`}</div>;
//   }

//   if (!filteredStore) {
//     return <div>No store found for the given category and ID.</div>;
//   }

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "overview":
//         return <Overview overview={filteredStore.overview} />;
//       case "reviews":
//         return (
//           <div>
//             <Reviews reviews={reviews} storeId={filteredStore.id} />
//             {/* Add Review Section */}
//             {!showAddReviewForm ? (
//               <button
//                 onClick={() => setShowAddReviewForm(true)}
//                 className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
//               >
//                 Add a Review
//               </button>
//             ) : (
//               // Pass user data to AddReview component
//               <AddReview
//                 storeId={filteredStore.id} // Pass storeId to AddReview
//                 user={
//                   user
//                     ? {
//                         username: user.username,
//                         profile_image: user.profile_image,
//                       }
//                     : {}
//                 }
//                 onSubmit={(newReview) => {
//                   // Handle new review submission here (dispatch an action to add the review)
//                   console.log(newReview);
//                   setShowAddReviewForm(false); // Hide form after submission
//                   dispatch(fetchReviewsByStoreId(filteredStore.id)); // Refresh reviews after adding
//                 }}
//               />
//             )}
//           </div>
//         );
//       case "offerings":
//         return <Offerings storeId={filteredStore.id} />;

//       case "photos":
//         return <PhotosGallery photos={filteredStore.photos} />;
//       default:
//         return <Overview store={filteredStore} />;
//     }
//   };

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 my-8">
//       <StoreDetailsHeader store={filteredStore} />

//       {/* Tab Navigation */}
//       <div className="mt-6 border-b">
//         <nav className="flex space-x-6">
//           {[
//             { label: "Overview", value: "overview" },
//             { label: "Reviews", value: "reviews" },
//             { label: "Offerings", value: "offerings" },
//             { label: "Photos", value: "photos" },
//           ].map((tab) => (
//             <button
//               key={tab.value}
//               onClick={() => setActiveTab(tab.value)}
//               className={`pb-2 text-sm md:text-lg font-medium border-b-2 transition-colors duration-300 ${
//                 activeTab === tab.value
//                   ? "border-green-600 text-green-600"
//                   : "border-transparent text-gray-600 hover:text-gray-800"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </nav>
//       </div>
//       {/* Tab Content */}
//       <div className="mt-6">{renderTabContent()}</div>
//     </div>
//   );
// };

// export default StoreDetailPage;
