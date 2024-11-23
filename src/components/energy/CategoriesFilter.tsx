"use client";

import { fetchCategories } from "@/reducers/productSlice";
import { AppDispatch, RootState } from "@/reducers/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Category {
  id: number;
  name: string;
  image: string;
}

const CategoriesFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.product.categories
  );
  const loading = useSelector((state: RootState) => state.product.loading);
  const error = useSelector((state: RootState) => state.product.error);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle empty categories
  if (categories.length === 0) {
    return <div>No categories available.</div>;
  }

  return (
    <div className="md:flex w-full">
      <section className="my-12 text-center items-center">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Categories</h3>
          <a href="#categories" className="text-yellow-500 font-medium">
            See All
          </a>
        </div>
        {/* Horizontal Scrollable Container */}
        <div className="flex items-center justify-center overflow-x-auto space-x-6 mt-4 no-scrollbar">
          {categories.map((category: Category) => (
            <a
              href={`/categories/${category.name.toLowerCase()}`}
              key={category.id} // Ensure the key is unique
              className="flex flex-col items-center text-center"
            >
              <div className="md:w-24 md:h-24 w-12 h-12  bg-gray-200 rounded-full flex items-center justify-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="mt-2 text-[8px] md:text-sm tex text-gray-700">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoriesFilter;
