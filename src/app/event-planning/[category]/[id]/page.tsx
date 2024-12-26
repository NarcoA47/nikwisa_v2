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

  const { stores, selectedStore, loading, error } = useSelector(
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

  // Filter the store based on the wedding_category and id
  const filteredStore = stores.find(
    (store) => store.id === storeId && store.wedding_category === category // Match with wedding_category
  );

  useEffect(() => {
    if (filteredStore) {
      console.log("Filtered store:", filteredStore);
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

//   const { stores, selectedStore, loading, error } = useSelector(
//     (state: RootState) => state.stores
//   );

//   const { reviews, loadingReviews, errorReviews } = useSelector(
//     (state: RootState) => state.reviews
//   );

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
//       console.log("Filtered store:", filteredStore);
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
//               <AddReview
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
//         return <Offerings offerings={filteredStore.offerings} />;
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

// "use client";

// import StoreDetailsHeader from "@/components/event-planning/StoreDetailsHeader";
// import AddReview from "@/components/event-planning/tabs/AddReview";
// import Offerings from "@/components/event-planning/tabs/Offerings";
// import Overview from "@/components/event-planning/tabs/Overview";
// import PhotosGallery from "@/components/event-planning/tabs/PhotoGallery";
// import Reviews from "@/components/event-planning/tabs/Reviews";
// import { AppDispatch, RootState } from "@/reducers/store";
// import { fetchStoresWithOfferings } from "@/reducers/storeSlice";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const StoreDetailPage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { category, id } = useParams(); // Get category and id from the URL params

//   const { stores, selectedStore, loading, error } = useSelector(
//     (state: RootState) => state.stores
//   );

//   const [activeTab, setActiveTab] = useState("overview");

//   useEffect(() => {
//     // Fetch all stores with offerings when the component mounts
//     dispatch(fetchStoresWithOfferings());
//   }, [dispatch]);

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
//       console.log("Filtered store:", filteredStore);
//     } else {
//       console.log("No store found for the given category and ID.");
//     }
//   }, [filteredStore]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{`Error: ${error}`}</div>;
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
//             <Reviews storeId={filteredStore.id} />
//             <AddReview
//               onSubmit={(newReview) => {
//                 // Handle the new review submission
//                 console.log(newReview);
//               }}
//             />
//           </div>
//         ); // Pass the storeId
//       case "offerings":
//         return <Offerings offerings={filteredStore.offerings} />;
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
//       <div className="mt-6 border-b ">
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

// "use client";

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import TabNavigation from "@/components/event-planning/TabNavigation";
// import Overview from "@/components/event-planning/tabs/Overview";
// import Reviews from "@/components/event-planning/tabs/Reviews";
// import PhotosGallery from "@/components/event-planning/tabs/PhotoGallery";
// import StoreDetailsHeader from "@/components/event-planning/StoreDetailsHeader";
// import Offerings from "@/components/event-planning/tabs/Offerings";
// import AddReview from "@/components/event-planning/tabs/AddReview";
// import { Store, PageProps } from "@/types/types";
// import { fetchStoresByWeddingCategory } from "@/reducers/storeSlice";

// export default function StoreDetailPage({ params }: PageProps) {
//   const dispatch = useDispatch();
//   const [resolvedParams, setResolvedParams] = useState<{
//     category: string;
//     id: string;
//   } | null>(null);

//   const [activeTab, setActiveTab] = useState<
//     "overview" | "reviews" | "offerings" | "photos"
//   >("overview");

//   const { stores, loading, error } = useSelector((state: any) => state.stores); // Adjust state selector according to your store setup
//   const storeData = stores.find(
//     (store: Store) =>
//       store.id === resolvedParams?.id &&
//       store.categories.includes(resolvedParams?.category)
//   );

//   useEffect(() => {
//     // Resolve params asynchronously
//     const resolveParams = async () => {
//       const unwrappedParams = await params; // Resolve the promise to get the actual params
//       setResolvedParams(unwrappedParams);
//     };

//     resolveParams();
//   }, [params]);

//   useEffect(() => {
//     // Fetch the stores once resolvedParams is set
//     if (resolvedParams) {
//       const { category, id } = resolvedParams;
//       dispatch(
//         fetchStoresByWeddingCategory({ storeId: id, weddingCategory: category })
//       );
//     }
//   }, [resolvedParams, dispatch]);

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">{error}</div>;
//   }

//   if (!storeData) {
//     return <div className="text-center">Store not found.</div>;
//   }

//   const tabContent = {
//     overview: <Overview overview={storeData.overview} />,
//     reviews: (
//       <>
//         <Reviews reviews={storeData.reviews} />
//         <AddReview
//           onSubmit={(newReview) => {
//             const updatedReviews = [
//               ...storeData.reviews,
//               {
//                 id: Date.now().toString(),
//                 storeId: storeData.id,
//                 name: "Logged In User", // You can use the logged-in user's name here
//                 image: "default-image-url",
//                 rating: newReview.rating,
//                 reviewText: newReview.reviewText,
//                 createdAt: new Date().toISOString(),
//               },
//             ];

//             const updatedReviewsCount = updatedReviews.length;
//             const updatedRating =
//               updatedReviews.reduce((acc, review) => acc + review.rating, 0) /
//               updatedReviewsCount;

//             const updatedStore = {
//               ...storeData,
//               reviews: updatedReviews,
//               reviewsCount: updatedReviewsCount,
//               rating: updatedRating,
//             };

//             // Update the storeData in the Redux store or use local state to manage it
//           }}
//         />
//       </>
//     ),
//     offerings:
//       storeData.offerings.length > 0 ? (
//         <Offerings offerings={storeData.offerings} />
//       ) : (
//         <div>No offerings available.</div>
//       ),
//     photos:
//       storeData.photos.length > 0 ? (
//         <PhotosGallery serviceName={storeData.name} photos={storeData.photos} />
//       ) : (
//         <div>No photos available.</div>
//       ),
//   };

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 my-8">
//       <StoreDetailsHeader store={storeData} />
//       <TabNavigation
//         tabs={Object.keys(tabContent) as Array<keyof typeof tabContent>}
//         activeTab={activeTab}
//         onTabClick={(tab) =>
//           setActiveTab(tab as "overview" | "reviews" | "offerings" | "photos")
//         }
//         aria-label="Store tabs"
//       />
//       <div className="py-6">{tabContent[activeTab]}</div>
//     </div>
//   );
// }

// "use client";

// import React, { useEffect, useState } from "react";
// import TabNavigation from "@/components/event-planning/TabNavigation";
// import { mockData } from "@/data";
// import Overview from "@/components/event-planning/tabs/Overview";
// import Reviews from "@/components/event-planning/tabs/Reviews";
// import PhotosGallery from "@/components/event-planning/tabs/PhotoGallery";
// import StoreDetailsHeader from "@/components/event-planning/StoreDetailsHeader";
// import Offerings from "@/components/event-planning/tabs/Offerings";
// import AddReview from "@/components/event-planning/tabs/AddReview";
// import { Store, PageProps } from "@/types/types";

// export default function StoreDetailPage({ params }: PageProps) {
//   const [resolvedParams, setResolvedParams] = useState<{
//     category: string;
//     id: string;
//   } | null>(null);

//   const [activeTab, setActiveTab] = useState<
//     "overview" | "reviews" | "offerings" | "photos"
//   >("overview");

//   const [storeData, setStoreData] = useState<Store | null>(null);

//   useEffect(() => {
//     const resolveParams = async () => {
//       const unwrappedParams = await params;
//       setResolvedParams(unwrappedParams);
//     };

//     resolveParams();
//   }, [params]);

//   useEffect(() => {
//     if (resolvedParams) {
//       const { category, id } = resolvedParams;
//       const categoryData = mockData.find((cat) => cat.category === category);
//       if (categoryData) {
//         const store = categoryData.items.find((item) => item.id === id);
//         if (store) {
//           setStoreData(store);
//         }
//       }
//     }
//   }, [resolvedParams]);

//   if (!resolvedParams || !storeData) {
//     return <div className="text-center">Loading...</div>;
//   }

//   const { category, id } = resolvedParams;

//   const tabContent = {
//     overview: <Overview overview={storeData.overview} />,
//     reviews: (
//       <>
//         <Reviews reviews={storeData.reviews} />
//         <AddReview
//           onSubmit={(newReview) => {
//             const updatedReviews = [
//               ...storeData.reviews,
//               {
//                 id: Date.now().toString(),
//                 storeId: storeData.id,
//                 name: "Logged In User", // You can use the logged-in user's name here
//                 image: "default-image-url",
//                 rating: newReview.rating,
//                 reviewText: newReview.reviewText,
//                 createdAt: new Date().toISOString(),
//               },
//             ];

//             // Update the reviewsCount
//             const updatedReviewsCount = updatedReviews.length;

//             // Update the rating - calculate the average rating
//             const updatedRating =
//               updatedReviews.reduce((acc, review) => acc + review.rating, 0) /
//               updatedReviewsCount;

//             const updatedStore = {
//               ...storeData,
//               reviews: updatedReviews,
//               reviewsCount: updatedReviewsCount,
//               rating: updatedRating, // Update the rating with the new average
//             };

//             setStoreData(updatedStore); // Update store data with new review and updated count/rating
//           }}
//         />
//       </>
//     ),
//     offerings:
//       storeData.offerings.length > 0 ? (
//         <Offerings offerings={storeData.offerings} />
//       ) : (
//         <div>No offerings available.</div>
//       ),
//     photos:
//       storeData.photos.length > 0 ? (
//         <PhotosGallery serviceName={storeData.name} photos={storeData.photos} />
//       ) : (
//         <div>No photos available.</div>
//       ),
//   };

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 my-8">
//       <StoreDetailsHeader store={storeData} />
//       <TabNavigation
//         tabs={Object.keys(tabContent) as Array<keyof typeof tabContent>}
//         activeTab={activeTab}
//         onTabClick={(tab) =>
//           setActiveTab(tab as "overview" | "reviews" | "offerings" | "photos")
//         } // Assert correct type here
//         aria-label="Store tabs"
//       />
//       <div className="py-6 ">{tabContent[activeTab]}</div>
//     </div>
//   );
// }
