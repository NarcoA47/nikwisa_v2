"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/reducers/store";
import { fetchStoresByUserId } from "@/reducers/storeSlice";
import StoreCardAdmin from "@/components/StoreCardAdmin";
import { useRouter } from "next/navigation";

const StorePage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Fetch stores and state from the Redux store
  const { stores, loading, error } = useSelector(
    (state: RootState) => state.stores
  );

  // Fetch user data from the auth slice
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?.user_id) {
      // Fetch the stores for the logged-in user
      dispatch(fetchStoresByUserId(user.user_id.toString()));
    }
  }, [dispatch, user?.id]);

  const handleAddStoreClick = () => {
    router.push("/dashboard/create-store"); // Navigate to the dashboard/create-store page
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">My Stores</h1>
        <button
          className="bg-[#B8902E] text-white py-2 px-4 rounded mt-4"
          onClick={handleAddStoreClick}
        >
          Add Store
        </button>
      </div>
      {/* Loading State */}
      {loading && <p>Loading stores...</p>}
      {/* Error State */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Store List */}
      {stores.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store) => (
            <StoreCardAdmin
              key={store.id}
              id={store.id}
              name={store.name}
              image={store.image}
              rating={store.rating || 0} // Default values if missing
              reviews_count={store.reviews_count || 0}
              location={store.location}
              event_planning_categories={store.event_planning_categories || []} // Default value if missing
            />
          ))}
        </div>
      ) : (
        !loading && <p>No stores available.</p>
      )}
    </div>
  );
};

export default StorePage;
