"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { fetchStoreById, refreshAccessToken } from "@/reducers/storeSlice";
import { AppDispatch, RootState } from "@/reducers/store";
import StoreCardAdmin from "@/components/StoreCardAdmin"; // Adjust the import path as necessary

interface User {
  id: number;
  username: string;
  email: string;
  user_id: number; // Ensure this matches the structure of your decoded token
  store_id: number; // Ensure this matches the structure of your decoded token
}

const StorePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [userId, setUserId] = useState<number | null>(null);
  const [storeId, setStoreId] = useState<number | null>(null); // Add storeId state

  const { store, loading, error } = useSelector(
    (state: RootState) => state.stores
  );

  // Extract user ID and store ID from token
  useEffect(() => {
    const fetchUserData = async () => {
      let accessToken = Cookies.get("access_token");
      console.log("accessToken", accessToken); // Check if the token exists
      if (!accessToken) {
        console.log("No access token found");
        router.push("/signin"); // Redirect to sign-in if no token is found
        return;
      }

      try {
        const decodedToken: User = jwtDecode(accessToken); // Correct decoding
        console.log("Decoded token:", decodedToken); // Log decoded token to verify user info
        setUserId(decodedToken.user_id); // Set the user ID from the decoded token
        setStoreId(decodedToken.store_id); // Set the store ID from the decoded token if available
      } catch (err) {
        console.error("Failed to decode token", err);
        try {
          accessToken = await refreshAccessToken(); // Refresh the access token
          if (!accessToken) throw new Error("No access token available");
          const decodedToken: User = jwtDecode(accessToken); // Decode the new token
          console.log("Decoded token after refresh:", decodedToken); // Log decoded token to verify user info
          setUserId(decodedToken.user_id); // Set the user ID from the decoded token
          setStoreId(decodedToken.store_id); // Set the store ID from the decoded token if available
        } catch (refreshError) {
          console.error("Failed to refresh access token", refreshError);
          router.push("/signin"); // Redirect to sign-in if token refresh fails
        }
      }
    };

    fetchUserData();
  }, [router]);

  console.log("userId", userId); // Check if userId is being set correctly
  console.log("storeId", storeId); // Check if storeId is being set correctly

  // Fetch store by storeId only if storeId is set
  useEffect(() => {
    if (storeId !== null) {
      dispatch(fetchStoreById(storeId)); // Dispatch fetchStoreById with storeId
    }
  }, [dispatch, storeId]);

  console.log("store", store);
  const handleAddStoreClick = () => {
    router.push("/dashboard/create-store");
  };

  return (
    <div className="container mx-auto p-0 md:p-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">My Stores</h1>
        {/* Conditionally render Add Store button */}
        {!store && (
          <button
            className="bg-[#B8902E] text-white py-2 px-4 rounded mt-4"
            onClick={handleAddStoreClick}
          >
            Add Store
          </button>
        )}
      </div>
      {/* Loading State */}
      {loading && <p>Loading store...</p>}{" "}
      {/* Show loading while waiting for store data */}
      {error && <p className="text-red-500">Error: {error}</p>}{" "}
      {/* Show error if there's an issue */}
      {store ? (
        <StoreCardAdmin
          key={store.id}
          id={store.id}
          name={store.name}
          image={store.image}
          rating={store.rating || 0} // Default value if missing
          reviews_count={store.reviews_count || 0}
          location={store.location}
          event_planning_categories={store.event_planning_categories || []} // Default value if missing
        />
      ) : (
        !loading && <p>No store available.</p> // Show this if store is null and loading is complete
      )}
    </div>
  );
};

export default StorePage;
