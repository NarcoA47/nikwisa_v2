"use client";

import { ImageSliderProps } from "@/types/types";
import React, { useEffect, useState } from "react";

const HomeSlider: React.FC<ImageSliderProps> = ({ photos }) => {
  const [currentImage, setCurrentImage] = useState(0);

  // Automatically change images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [photos.length]);

  // Handle dot click to manually change the image
  const handleDotClick = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <section className="relative w-full md:w-1/2 h-64 overflow-hidden rounded-lg shadow">
      {/* Image Slider Section */}
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        {photos.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Service Photo ${index + 1}`}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              position: currentImage === index ? "static" : "absolute",
              top: 0,
              left: 0,
            }}
          />
        ))}

        {/* Dots inside the slider */}

        <div className="absolute bottom-4 w-full flex justify-center space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentImage === index ? "bg-[#B8902E]" : "bg-gray-300"
              }`}
              onClick={() => handleDotClick(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSlider;
