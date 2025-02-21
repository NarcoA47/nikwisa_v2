import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventCategories } from "@/reducers/eventSlice";
import { RootState, AppDispatch } from "@/reducers/store";
import Image from "next/image";
import { fetchRentHireCategories } from "@/reducers/rent&hireSlice";

export interface Step2Payload {
  event_planning_categories?: string[];
  rent_hire_categories?: string[];
}

const Step2SubCategories = ({
  selectedCategories,
  selectedEventCategories,
  selectedRentHireCategories,
  onPrevious,
  onNext,
}: {
  selectedCategories: number[];
  selectedEventCategories: string[];
  selectedRentHireCategories: string[];
  onPrevious: () => void;
  onNext: (payload: Step2Payload) => void;
}) => {
  const dispatch: AppDispatch = useDispatch();

  // Fetch both event categories and rent-hire categories
  useEffect(() => {
    dispatch(fetchEventCategories());
    dispatch(fetchRentHireCategories());
  }, [dispatch]);

  const eventCategories = useSelector(
    (state: RootState) => state.eventProduct.event_categories
  );
  const rentHireCategories = useSelector(
    (state: RootState) => state.rentHireProduct.rent_hire_categories
  );

  const [selectedEvents, setSelectedEvents] = useState<string[]>(
    selectedEventCategories
  );
  const [selectedRentals, setSelectedRentals] = useState<string[]>(
    selectedRentHireCategories
  );

  // Filter event categories based on selected categories
  const filteredEventCategories = useMemo(() => {
    return eventCategories.filter((eventCategory) =>
      eventCategory.categories.some((categoryId: number) =>
        selectedCategories.includes(categoryId)
      )
    );
  }, [eventCategories, selectedCategories]);

  // Filter rent-hire categories based on selected categories
  const filteredRentHireCategories = useMemo(() => {
    return rentHireCategories.filter((rentCategory) =>
      rentCategory.categories.some((categoryId: number) =>
        selectedCategories.includes(categoryId)
      )
    );
  }, [rentHireCategories, selectedCategories]);

  const toggleEventCategory = (categoryId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleRentHireCategory = (categoryId: string) => {
    setSelectedRentals((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleNext = () => {
    // Ensure we only include the selected categories
    const eventCategoriesSelected =
      selectedEvents.length > 0 ? selectedEvents : null;
    const rentHireCategoriesSelected =
      selectedRentals.length > 0 ? selectedRentals : null;

    // If both categories are empty, show an alert
    if (!eventCategoriesSelected && !rentHireCategoriesSelected) {
      alert("Please select at least one category.");
      return;
    }

    // Create the payload object with the correct type
    const payload: Step2Payload = {};

    if (eventCategoriesSelected) {
      payload["event_planning_categories"] = eventCategoriesSelected;
    }

    if (rentHireCategoriesSelected) {
      payload["rent_hire_categories"] = rentHireCategoriesSelected;
    }

    onNext(payload); // Send the payload to the next step
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Select Subcategories</h2>

      {/* Conditional rendering based on selected category */}
      {selectedCategories.some((id: number) =>
        eventCategories.some((cat: unknown) => cat.id === id)
      ) && (
        <div className="border border-gray-300 rounded-lg my-4 p-0 md:p-6 py-6 shadow-sm">
          <span className="md:text-md text-base font-normal m-4">
            Event Planning Categories
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-4 px-4 md:px-0">
            {filteredEventCategories.map((category) => (
              <div
                key={category.id}
                className={`flex flex-col items-center text-center cursor-pointer p-4 rounded-lg transition duration-300 border-2 ${
                  selectedEvents.includes(category.id)
                    ? "border-[#B8902E] bg-[#F5F5F5]"
                    : "border-gray-300 bg-white"
                }`}
                onClick={() => toggleEventCategory(category.id)}
              >
                <div className="w-8 h-8 sm:w-24 sm:h-24 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100 sm:rounded-md sm:border sm:border-gray-300 hover:scale-105 transition duration-300">
                  <Image
                    src={category.image || "/fallback-image.png"}
                    alt={category.title}
                    className="object-cover"
                    width={80}
                    height={80}
                  />
                </div>
                <span className="text-[8px] sm:text-[10px] lg:text-sm text-gray-700 mt-2">
                  {category.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedCategories.some((id: number) =>
        rentHireCategories.some((cat: unknown) => cat.id === id)
      ) && (
        <div className="border border-gray-300 rounded-lg my-4 p-0 md:p-6 py-6 shadow-sm">
          <span className="md:text-md text-base font-normal m-4">
            Rent & Hire Categories
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-4 px-4 md:px-0">
            {filteredRentHireCategories.map((category) => (
              <div
                key={category.id}
                className={`flex flex-col items-center text-center cursor-pointer p-4 rounded-lg transition duration-300 border-2 ${
                  selectedRentals.includes(category.id)
                    ? "border-[#B8902E] bg-[#F5F5F5]"
                    : "border-gray-300 bg-white"
                }`}
                onClick={() => toggleRentHireCategory(category.id)}
              >
                <div className="w-8 h-8 sm:w-24 sm:h-24 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100 sm:rounded-md sm:border sm:border-gray-300 hover:scale-105 transition duration-300">
                  <Image
                    src={category.image || "/fallback-image.png"}
                    alt={category.title}
                    className="object-cover"
                    width={80}
                    height={80}
                  />
                </div>
                <span className="text-[8px] sm:text-[10px] lg:text-sm text-gray-700 mt-2">
                  {category.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrevious}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-[#B8902E] text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2SubCategories;
