"use client";

import { events } from "@/data";
import React from "react";

interface EventCategory {
  id: number;
  name: string;
  image: string;
}

const Categories = () => {
  // Handle empty categories
  if (events.length === 0) {
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
        {events.map((category: EventCategory) => (
          <a
            href={`/categories/${category.name.toLowerCase()}`}
            key={category.id}
            className="flex flex-col items-center text-center"
          >
            {/* Image */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {/* Name */}
            <span className="mt-2 text-[8px] sm:text-[10px] lg:text-sm text-gray-700">
              {category.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Categories;
