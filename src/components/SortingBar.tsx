import React, { useState, useEffect } from "react";
import { title } from "process";
import { Product } from "@/reducers/productSlice";
// import { Product } from './products/products';

interface SortingBarProps {
  items: Product[];
  callback: (sortedItems: Product[]) => void;
}

const SortingBar: React.FC<SortingBarProps> = ({ items, callback }) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const categories = [
    { id: "1", name: "Category 1" },
    { id: "2", name: "Category 2" },
    { id: "3", name: "Category 3" },
    // Add more categories as needed
  ];

  useEffect(() => {
    let filteredItems = [...items];
    if (selectedCategory !== "all") {
      filteredItems = items.filter(
        (item) => item.category.toString() === selectedCategory
      );
    }
    callback(filteredItems);
  }, [selectedCategory, items, callback]);

  return (
    <div className="flex items-center justify-between bg-[#FAF4EB] py-2 sm:py-4 px-4 sm:px-8 rounded-md shadow-sm my-8">
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Grid and List view toggles */}
        <button
          onClick={() => setView("grid")}
          className={`p-1 sm:p-2 rounded ${
            view === "grid" ? "bg-black text-white" : "text-black"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 sm:w-6 sm:h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 3h6v6H3V3zm12 0h6v6h-6V3zm-12 12h6v6H3v-6zm12 0h6v6h-6v-6z" />
          </svg>
        </button>
        <button
          onClick={() => setView("list")}
          className={`p-1 sm:p-2 rounded ${
            view === "list" ? "bg-black text-white" : "text-black"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 sm:w-6 sm:h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
          </svg>
        </button>
      </div>

      {/* Sort by section */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <span className="text-sm sm:text-base text-black font-medium">
          {title ?? "Filter by Category"}
        </span>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border bg-white text-xs sm:text-sm text-gray-500 p-1 sm:p-2 rounded-md shadow-sm"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id.toString()}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortingBar;
