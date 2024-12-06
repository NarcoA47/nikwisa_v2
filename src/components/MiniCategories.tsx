"use client";

import Image from "next/image";
import React from "react";

// Data and Types
interface CategoryItem {
  name: string;
  img: string;
}

interface Category {
  title: string;
  items: CategoryItem[];
}

const miniCategories: Category[] = [
  {
    title: "Wedding Requisites",
    items: [
      { name: "Banquet Hall", img: "/assets/home/hall.png" },
      { name: "Wedding Rings", img: "/assets/home/rings.png" },
      { name: "Caterers", img: "/assets/home/cateres.png" },
    ],
  },
  {
    title: "Construction",
    items: [
      { name: "Plumber", img: "/assets/home/plumber.png" },
      { name: "Bricklayer", img: "/assets/home/bricklayer.png" },
      { name: "Electrician", img: "/assets/home/electrician.png" },
    ],
  },
  {
    title: "Rent & Hire",
    items: [
      { name: "Car Rental", img: "/assets/home/car rental.png" },
      { name: "Costume Rental", img: "/assets/home/costume hire.png" },
      { name: "Room Rental", img: "/assets/home/room hire.png" },
    ],
  },
  {
    title: "Restaurant",
    items: [
      { name: "Breakfast", img: "/assets/home/food 1.png" },
      { name: "Chinese", img: "/assets/home/food 2.png" },
      { name: "Italian", img: "/assets/home/food 3.png" },
    ],
  },
];

function MiniCategories() {
  return (
    <section className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {miniCategories.map((category, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            {category.title}
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {category.items.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-700 mt-2">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default MiniCategories;
