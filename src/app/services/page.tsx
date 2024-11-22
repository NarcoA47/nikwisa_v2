"use client";
import React from "react";
import Link from "next/link";

const experts = [
  {
    name: "John Doe",
    title: "Software Engineer",
    rating: 4.5,
    jobs: 29,
    image: "/ExpI1.jpg",
  },
  {
    name: "John Doe",
    title: "Software Engineer",
    rating: 4.5,
    jobs: 29,
    image: "/ExpI1.jpg",
  },
  {
    name: "John Doe",
    title: "Software Engineer",
    rating: 4.5,
    jobs: 29,
    image: "/ExpI1.jpg",
  },
  {
    name: "John Doe",
    title: "Software Engineer",
    rating: 4.5,
    jobs: 29,
    image: "/ExpI1.jpg",
  },
  // Add more experts as needed
];

export default function FindExperts() {
  return (
    <div className="min-h-screen  p-4 mt-8">
      {/* <SortingBar items={[{label: 'Default'}, {label: 'Price: Low to High'}, {label: 'Price: High to Low'}]} callback={(arg) => console.log(arg)} /> */}
      <div className="flex justify-center mb-[4rem]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full ">
          {experts.map((expert, index) => (
            <Link href={"/single-service"} key={index}>
              <div className="bg-[#FAF4EB] p-4 sm:p-6 shadow-lg flex flex-row items-center text-lg cursor-pointer">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-32 h-32 sm:w-48 sm:h-48 object-cover mr-6"
                />
                <div className="flex flex-col justify-center text-left">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-black">
                    {expert.name}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 mb-2">
                    {expert.title}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm sm:text-xl font-medium text-black">
                      Rating: {expert.rating} ⭐
                    </p>
                    <p className="text-sm sm:text-lg text-gray-600">
                      Jobs: {expert.jobs}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
