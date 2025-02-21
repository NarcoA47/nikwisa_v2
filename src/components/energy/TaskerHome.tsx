//

import { taskers } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const TaskerHome = () => {
  // State to track the active "slide"
  const [activeIndex, setActiveIndex] = useState(0);

  // Handler for the tasker slide change
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = (e.target as HTMLDivElement).scrollLeft;
    const width = (e.target as HTMLDivElement).clientWidth;

    // Update activeIndex based on the scroll position
    setActiveIndex(Math.round(scrollLeft / width) % 3); // Dots only for 3 slides
  };

  return (
    <>
      <section className="my-20 w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">
            Recommended Taskers
          </h3>
          <a
            href="#recommended-taskers"
            className="text-yellow-500 font-medium"
          >
            See All
          </a>
        </div>

        {/* Taskers Section */}
        <div
          className="flex space-x-4 overflow-x-auto no-scrollbar mt-4"
          onScroll={handleScroll}
        >
          {taskers.map((tasker, index) => (
            <Link
              href={`/taskers/${tasker.name.toLowerCase().replace(" ", "-")}`} // Adjust this route accordingly
              key={index}
              className="bg-[#FAF3EA] p-4 rounded-lg shadow-md flex items-center w-full md:w-1/2 lg:w-1/3 hover:bg-gray-100 transition flex-shrink-0"
            >
              {/* Tasker Image */}
              <Image
                src="/ExpI1.jpg"
                alt={tasker.name}
                className="w-24 h-24 rounded-full object-cover mr-4"
                width={128}
                height={128}
              />

              {/* Tasker Details */}
              <div className="flex-1">
                <h4 className="font-bold text-base text-gray-600 mb-0">
                  {tasker.name}
                </h4>
                <p className="text-gray-600 text-xs">{tasker.job}</p>
                <div className="flex items-center  align-baseline">
                  <p className="text-yellow-500 text-sm font-bold">
                    ★ {tasker.rating}
                  </p>
                  <p className="text-gray-500 text-sm ml-2">
                    {tasker.jobs} Jobs
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4">
          {[0, 1, 2].map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 mx-1 rounded-full ${
                index === activeIndex ? "bg-yellow-500" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>

        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}</style>
      </section>
    </>
  );
};

export default TaskerHome;
