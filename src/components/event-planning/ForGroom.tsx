import { bride, groom } from "@/data";
import React from "react";

const ForGroom = () => {
  const mobileItems = groom.slice(0, 6); // Max 9 items for mobile
  const desktopItems = groom.slice(0, 12); // Max 12 items for desktop

  return (
    <div className="w-full mt-8 bg-[#EDE2D4] p-3 md:p-8">
      <section>
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Wedding Planning For Groom
          </h3>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {desktopItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col items-center text-center ${
                index >= 9 ? "hidden lg:flex" : ""
              }`} // Hide extra items on mobile
            >
              {/* Image Section */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-40 lg:h-48">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              {/* Name Section */}
              <p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-700">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ForGroom;
