import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/reducers/categorySlice";
import { RootState, AppDispatch } from "@/reducers/store";
import Image from "next/image";
import { Store } from "@/types/types";

const Step1 = ({ selectedCategories, onNext }: { selectedCategories: string[]; onNext: (data: Store) => void }) => {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  // Convert slugs to IDs based on fetched categories
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    console.log("Fetching categories...");
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      console.log("Fetched Categories:", categories); // Log fetched categories
      console.log("Selected Slugs (from Props):", selectedCategories); // Log passed slugs
      const initialSelectedIds = selectedCategories
        .map(
          (slug: string) =>
            categories.find((category) => category.slug === slug)?.id
        )
        .filter((id): id is number => Boolean(id)); // Filter out undefined IDs
      console.log("Mapped IDs:", initialSelectedIds); // Log IDs after mapping
      setSelected(initialSelectedIds.map(String));
    }
  }, [categories, selectedCategories]);

  const toggleCategory = (categoryId: string) => {
    setSelected((prev) => {
      const newSelected = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];
      console.log("Updated Selected Categories:", newSelected); // Log updated selection
      return newSelected;
    });
  };

  const handleNext = () => {
    if (selected.length === 0) {
      alert("Please select at least one category.");
      return;
    }
    console.log("Categories Passed to onNext:", selected); // Log data passed to onNext
    onNext({
      categories: selected,
      id: 0,
      name: "",
      location: "",
      overview: "",
      rating: 0,
      reviews_count: 0,
      image: null,
      photos: [],
      createdAt: "",
      updatedAt: "",
      offerings: [],
      reviews: [],
      event_planning_categories: [],
      rent_hire_categories: [],
      owner: "",
      working_hours: null,
      is_verified: false,
      is_responsive: false
    });
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Select Categories</h2>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-4 px-4 md:px-0">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`flex flex-col items-center text-center cursor-pointer p-4 rounded-lg transition duration-300 border-2 ${
              selected.includes(category.id.toString())
                ? "border-[#B8902E] bg-[#F5F5F5]" // Highlight selected category with border and background
                : "border-gray-300 bg-white"
            }`}
            onClick={() => toggleCategory(category.id.toString())} // Use category.id
          >
            {/* Image */}
            <div
              className={`w-8 h-8 sm:w-24 sm:h-24 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100 sm:rounded-md sm:border sm:border-gray-300 hover:scale-105 transition duration-300`}
            >
              <Image
                src={category.image || "/fallback-image.png"}
                alt={category.title}
                className="object-cover"
                width={80}
                height={80}
              />
            </div>

            {/* Name */}
            <span className="mt-2 text-[8px] sm:text-[10px] lg:text-sm text-gray-700">
              {category.title}
            </span>
          </div>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="bg-[#B8902E] text-white px-4 py-2 mt-4 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Step1;
