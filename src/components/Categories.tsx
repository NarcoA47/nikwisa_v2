"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Alternative Energy",
    img: "/assets/home/solar-energy.png",
    url: "/energy",
  },
  {
    name: "Wedding/Event Planning",
    img: "/assets/home/wedding.png",
    url: "/event-planning",
  },
  {
    name: "Restaurant",
    img: "/assets/home/restuarant.png",
    url: "/restaurant",
  },
  {
    name: "Rent & Hire",
    img: "/assets/home/rental-car.png",
    url: "/rent-hire",
  },
  { name: "Gym", img: "/assets/home/workout.png", url: "/gym" },
  { name: "Automobile", img: "/assets/home/mechanic.png", url: "/automobile" },
  {
    name: "Contractors",
    img: "/assets/home/contractor.png",
    url: "/contractors",
  },
];

const Categories = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-10 gap-2 sm:gap-4 mt-8">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-2 sm:p-4"
        >
          <Link
            href={category.url}
            className="flex flex-col items-center group"
          >
            {/* Icon Container */}
            <div
              className={`w-8 h-8 sm:w-24 sm:h-24 flex items-center justify-center overflow-hidden 
                rounded-lg bg-gray-100 sm:rounded-md sm:border sm:border-gray-300 sm:hover:scale-105 sm:transition sm:duration-300`}
            >
              <Image
                src={category.img}
                alt={category.name}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>

            {/* Category Name */}
            <p className="mt-2 text-[10px] sm:text-xs lg:text-sm text-gray-800">
              {category.name}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Categories;
