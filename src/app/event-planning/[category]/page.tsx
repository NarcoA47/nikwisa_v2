"use client";

import React, { useEffect } from "react";
import StoreCard from "@/components/StoreCard"; // Adjust the import path if needed
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { fetchWeddingProduct } from "@/reducers/weddingSlice";
import { RootState, AppDispatch } from "@/reducers/store";

const CategoryPage = () => {
  const dispatch: AppDispatch = useDispatch();
  // const navigate = useNavigate();
  const product = useSelector(
    (state: RootState) => state.weddingProduct.product
  );

  useEffect(() => {
    // Fetch the stores on component mount
    dispatch(fetchStoresWithOfferings());
  }, [dispatch]);

  return (
    <div className="p-4 md:p-6 my-4">
      {/* Loading State */}
      {loading && (
        <p className="text-gray-500 text-center">Loading stores...</p>
      )}

      {/* Error State */}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      {/* Store Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {stores.length > 0
          ? stores.map((store) => (
              <StoreCard
                key={store.id}
                id={store.id}
                name={store.name}
                image={store.image}
                rating={store.rating}
                reviews={store.reviews}
                location={store.location}
              />
            ))
          : !loading && (
              <p className="text-center text-gray-600">
                No stores available at the moment.
              </p>
            )}
      </div>

      {/* Back to Categories Link */}
      <button
        // onClick={() => navigate("/categories")}
        className="text-blue-500 hover:underline"
      >
        Back to Categories
      </button>
    </div>
  );
};

export default CategoryPage;
