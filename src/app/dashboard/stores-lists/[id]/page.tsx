"use client";

import StoreDetailsHeader from "@/components/event-planning/StoreDetailsHeader";
import AddReview from "@/components/event-planning/tabs/AddReview";
import Offerings from "@/components/event-planning/tabs/Offerings";
import Overview from "@/components/event-planning/tabs/Overview";
import PhotosGallery from "@/components/event-planning/tabs/PhotoGallery";
import Reviews from "@/components/event-planning/tabs/Reviews";
import { AppDispatch, RootState } from "@/reducers/store";
import { fetchStoresByUserId } from "@/reducers/storeSlice";
import { fetchReviewsByStoreId } from "@/reducers/reviewSlice";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OfferingsAdmin from "@/components/event-planning/tabs/OfferingsAdmin";

const StoreDetailPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { category, id } = useParams(); // Get category and id from the URL params

  const { stores, loading, error } = useSelector(
    (state: RootState) => state.stores
  );

  const { reviews } = useSelector((state: RootState) => state.reviews);

  const { user } = useSelector((state: RootState) => state.auth); // Access logged-in user

  const [activeTab, setActiveTab] = useState("overview");
  const [showAddReviewForm, setShowAddReviewForm] = useState(false);

  // Dispatch action to fetch stores by user ID
  useEffect(() => {
    if (user?.user_id) {
      dispatch(fetchStoresByUserId(user.user_id.toString())); // Make sure user.id is available
    }
  }, [dispatch, user]);

  // Fetch reviews based on the store ID
  useEffect(() => {
    if (id) {
      dispatch(fetchReviewsByStoreId(parseInt(id as string, 10))); // Fetch reviews for the selected store
    }
  }, [dispatch, id]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading store details and reviews...</div>;
  }

  if (error) {
    return <div>Something went wrong: {error}. Please try again later.</div>;
  }

  // Ensure id is a number and find the store based on the ID
  const storeId = parseInt(id as string, 10); // Convert id to a number
  const store = stores.find((store) => store.id === storeId);

  if (!store) {
    return <div>No store found for the given ID.</div>;
  }

  // Render tab content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview overview={store.overview} />;
      case "reviews":
        return (
          <div>
            <Reviews reviews={reviews} storeId={store.id} />
            {/* Add Review Section */}
            {!showAddReviewForm ? (
              <button
                onClick={() => setShowAddReviewForm(true)}
                className="bg-[#B8902E] text-white py-2 px-4 rounded mt-4"
              >
                Add a Review
              </button>
            ) : (
              // Pass user data to AddReview component
              <AddReview
                storeId={store.id} // Pass storeId to AddReview
                user={
                  user
                    ? {
                        username: user.username,
                        profile_image: user.profile_image,
                      }
                    : {}
                }
                onSubmit={(newReview) => {
                  // Dispatch action to add the review
                  dispatch(fetchReviewsByStoreId(store.id)); // Refresh reviews after adding
                  setShowAddReviewForm(false); // Hide form after submission
                }}
              />
            )}
          </div>
        );
      case "offerings":
        return <OfferingsAdmin storeId={store.id} />;
      case "photos":
        return <PhotosGallery storeId={store.id} />;
      default:
        return <Overview overview={store.overview} />;
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 my-8">
      <StoreDetailsHeader store={store} />

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
                  ? " border-[#b8902e] text--[#B8902E]"
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
