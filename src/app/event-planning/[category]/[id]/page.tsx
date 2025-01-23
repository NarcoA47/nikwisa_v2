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
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const StoreDetailPage: React.FC = () => {
  // Always call hooks at the top
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

  const tabContentRef = useRef<HTMLDivElement>(null); // Ref to measure content height

  // Fetch stores and reviews only once during component mount
  useEffect(() => {
    dispatch(fetchStoresWithOfferings());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchReviewsByStoreId(parseInt(id, 10))); // Fetch reviews for the selected store
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (tabContentRef.current) {
      // Automatically adjust height based on content
      tabContentRef.current.style.maxHeight = `${window.innerHeight - 200}px`;
    }
  }, [activeTab]); // Re-run whenever the active tab changes

  // useEffect(() => {
  //   if (tabContentRef.current) {
  //     const contentHeight = tabContentRef.current.scrollHeight;
  //     tabContentRef.current.style.maxHeight = `${contentHeight}px`;
  //   }
  // }, [activeTab]); // Only depend on activeTab for height updates

  // Wait for category and id to be available before rendering the page
  if (!category || !id) {
    return <div>Loading store details...</div>;
  }

  // Ensure id is a number
  const storeId = parseInt(id as string, 10); // Convert id to a number

  // Decode the category and trim any spaces to match the store data
  const decodedCategory = decodeURIComponent(category).trim();

  // Filter the store based on the  event_planning_categories and id
  const filteredStore = stores.find(
    (store) =>
      store.id === storeId &&
      store.event_planning_categories.some(
        (eventCategory: string) =>
          eventCategory.toLowerCase().replace(/\s+/g, "-") ===
          decodedCategory.toLowerCase().replace(/\s+/g, "-")
      )
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

  // Render the correct tab content based on the activeTab state
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview overview={filteredStore.overview} />;
      case "reviews":
        return (
          <div>
            <Reviews reviews={reviews} storeId={filteredStore.id} />
            {/* Add Review Section */}
            <button
              onClick={() => setShowAddReviewForm((prev) => !prev)}
              className="bg-[#B8902E] text-white py-2 px-4 rounded mt-4"
            >
              {showAddReviewForm ? "Cancel" : "Add a Review"}
            </button>
            {showAddReviewForm && <AddReview storeId={filteredStore.id} />}
          </div>
        );
      case "offerings":
        return <Offerings storeId={filteredStore.id} />;
      case "photos":
        return <PhotosGallery storeId={filteredStore.id} />;
      default:
        return <Overview overview={filteredStore.overview} />;
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 my-8 mt-10">
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
                  ? "border-[#B8902E]  text-[#B8902E] "
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content with Animation */}
      <div
        className="tab-content-container mt-6 overflow-y-auto transition-all duration-500 ease-in-out"
        ref={tabContentRef}
      >
        {renderTabContent()}
      </div>
    </div>
  );
};

export default StoreDetailPage;
