"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { fetchWeddingCategories } from "@/reducers/weddingSlice";
import { RootState, AppDispatch } from "@/reducers/store";
import { EventCategory } from "@/types/types";

const Categories = () => {
  const dispatch: AppDispatch = useDispatch();
  const wedding_category = useSelector(
    (state: RootState) => state.weddingProduct.wedding_category
  );
  const categoryStatus = useSelector(
    (state: RootState) => state.weddingProduct.status
  );
  const error = useSelector((state: RootState) => state.weddingProduct.error);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    dispatch(fetchWeddingCategories());
  }, [dispatch]);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  if (categoryStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (categoryStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  if (wedding_category.length === 0) {
    return <div>No categories available.</div>;
  }

  return (
    <section className="my-12">
      {/* Header */}
      <div className="flex justify-between items-center px-4 md:px-0">
        <h3 className="text-xl font-semibold text-gray-800">
          Wedding Planning
        </h3>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-10 gap-4 mt-4 px-4 md:px-0">
        {wedding_category.map((category: EventCategory) => (
          <Link
            href={
              category.slug
                ? `/event-planning/${category.slug
                    .toLowerCase()
                    .replace(/ /g, "-")}/`
                : "#"
            }
            key={category.id}
            className={`flex flex-col items-center text-center ${
              !category.slug ? "cursor-not-allowed opacity-50" : ""
            }`}
            aria-disabled={!category.slug} // Optional: Accessibility
          >
            {/* Image */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <Image
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover rounded-full"
                width={80} // Adjust width as needed
                height={80} // Adjust height as needed
              />
            </div>
            {/* Name */}
            <span className="mt-2 text-[8px] sm:text-[10px] lg:text-sm text-gray-700">
              {category.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
