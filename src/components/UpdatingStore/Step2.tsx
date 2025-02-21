import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventCategories } from "@/reducers/eventSlice";
import { RootState, AppDispatch } from "@/reducers/store";
import Image from "next/image";

const Step2 = ({ selectedEventCategories, onPrevious, onNext }: unknown) => {
  const dispatch: AppDispatch = useDispatch();
  const eventCategories = useSelector(
    (state: RootState) => state.eventProduct.event_categories
  );
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    console.log("Fetching event categories...");
    dispatch(fetchEventCategories());
  }, [dispatch]);

  useEffect(() => {
    // Map slugs to IDs after event categories are fetched
    if (eventCategories.length > 0) {
      console.log("Fetched Event Categories:", eventCategories); // Log fetched event categories
      console.log(
        "Selected Event Category Slugs (from Props):",
        selectedEventCategories
      ); // Log passed slugs
      const initialSelectedIds = selectedEventCategories
        .map(
          (slug: string) =>
            eventCategories.find((category) => category.slug === slug)?.id
        )
        .filter((id): id is string => Boolean(id)); // Filter out undefined IDs
      console.log("Mapped Event Category IDs:", initialSelectedIds); // Log mapped IDs
      setSelected(initialSelectedIds);
    }
  }, [eventCategories, selectedEventCategories]);

  const toggleEventCategory = (categoryId: string) => {
    setSelected((prev) => {
      const newSelected = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];
      console.log("Updated Selected Event Categories:", newSelected); // Log updated selection
      return newSelected;
    });
  };

  const handleNext = () => {
    if (selected.length === 0) {
      alert("Please select at least one event category.");
      return;
    }

    const selectedCategories = eventCategories
      .filter((category) => selected.includes(category.id))
      .map((category) => category.slug);

    console.log("Selected Event Categories:", selectedCategories); // Debug log

    onNext({ event_planning_categories: selectedCategories });
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">
        Select Event Planning Categories
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-4 px-4 md:px-0">
        {eventCategories.map((category) => (
          <div
            key={category.id}
            className={`flex flex-col items-center text-center cursor-pointer p-4 rounded-lg transition duration-300 border-2 ${
              selected.includes(category.id)
                ? "border-[#B8902E] bg-[#F5F5F5]" // Highlight selected category with border and background
                : "border-gray-300 bg-white"
            }`}
            onClick={() => toggleEventCategory(category.id)}
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
      <div className="flex justify-between mt-4">
        <button
          onClick={onPrevious}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-[#B8902E] text-white px-4 py-2 rounded hover:bg-[#9c7a1e]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;
