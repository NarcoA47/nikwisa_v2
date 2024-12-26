"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StoreCard from "@/components/StoreCard";
import { RootState, AppDispatch } from "@/reducers/store";
import { fetchStoresWithOfferings } from "@/reducers/storeSlice";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { stores, loading, error } = useSelector(
    (state: RootState) => state.stores
  );

  // Extract the category from the URL using useParams
  const { category } = useParams();

  useEffect(() => {
    // Fetch all stores with offerings when the component mounts
    dispatch(fetchStoresWithOfferings());
  }, [dispatch]);

  // Filter stores based on the wedding_category from the URL
  const filteredStores = stores.filter(
    (store) => store.wedding_category === category
  );

  // Loading and Error States
  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-4 md:p-8 space-y-6">
      {filteredStores.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <StoreCard
              key={store.id}
              id={Number(store.id)}
              name={store.name}
              image={store.image}
              rating={store.rating}
              reviews={store.reviewsCount}
              location={store.location}
              wedding_category={store.wedding_category}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          No stores available for the category: {category}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
