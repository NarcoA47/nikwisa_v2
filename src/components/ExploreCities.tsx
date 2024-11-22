"use client";
import Image from "next/image";
import React from "react";

const ExploreCities = () => {
  const TopCities = [
    {
      id: 1,
      title: "Lusaka",
      image: "/assets/home/1.png",
    },
    { id: 2, title: "Kitwe", image: "/assets/home/2.png" },
    { id: 3, title: "Livingstone", image: "/assets/home/3.png" },
  ];

  return (
    <section className="my-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Explore Top Cities
      </h2>
      <div className="flex w-full border border-black rounded gap-1 md:gap-4 items-center h-38 md:h-64 p-1 md:p-6">
        {TopCities.map((item) => (
          <div
            key={item.id}
            className="rounded-lg overflow-hidden flex flex-col md:flex-row w-full md:w-1/3 h-20 md:h-40 border border-black"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Content */}
            <div className="p-4 flex-1 flex flex-col items-center bg-white bg-opacity-70 md:bg-transparent">
              <h3 className="text-sm md:text-3xl font-bold text-gray-800 mb-2">
                {item.title}
              </h3>
              <button className="mt-auto text-[#D1B898] text-xs md:text-2xl font-bold rounded-md">
                Explore Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCities;
