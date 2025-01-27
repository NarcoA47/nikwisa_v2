"use client";

import { fetchEventSubcategories } from "@/reducers/eventSlice";
import { RootState, AppDispatch } from "@/reducers/store";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const TheBigDay = () => {
  const dispatch: AppDispatch = useDispatch();

  // Retrieve event subcategories and status from the Redux store
  const { event_subcategories, status, error } = useSelector(
    (state: RootState) => state.eventProduct
  );

  useEffect(() => {
    // Fetch all event subcategories when the component mounts
    if (status === "idle") {
      dispatch(fetchEventSubcategories());
    }
  }, [dispatch, status]);

  // Filter subcategories containing "for big day" or "for-big-day" (case-insensitive)
  const filteredSubcategories = event_subcategories.filter(
    (subcategory) =>
      subcategory.title.toLowerCase().includes("for big day") ||
      subcategory.title.toLowerCase().includes("for-big-day")
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (filteredSubcategories.length === 0) {
    return <div>No subcategories found containing "For Big Day".</div>;
  }

  return (
    <div className="w-full my-8">
      <section>
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            {filteredSubcategories[0]?.title}
          </h3>
        </div>

        {/* Grid to display categories */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredSubcategories.map((subcategory) =>
            subcategory.categories?.map((category) => (
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
                {/* Image Section */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-40 lg:h-48 bg-gray-200 rounded-full flex items-center justify-center">
                  <Image
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover rounded-md"
                    width={80} // Adjust width as needed
                    height={80} // Adjust height as needed
                  />
                </div>
                {/* Name Section */}
                <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-700">
                  {category.title}
                </p>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default TheBigDay;
