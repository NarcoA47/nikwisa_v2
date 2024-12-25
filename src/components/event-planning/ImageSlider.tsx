"use client";

import { ImageSliderProps } from "@/types/types";
import React, { useEffect, useState } from "react";

const ImageSlider: React.FC<ImageSliderProps> = ({ photos }) => {
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
    <section className="w-full md:w-1/2 h-48 md:h-[320px] overflow-hidden rounded-lg shadow">
      {/* Image Slider Section with fixed height and width */}
      <div className="relative w-full h-full overflow-hidden rounded-lg shadow">
        {/* Loop through the photos and display the current one */}
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
      </div>
    </section>
  );
};

export default ImageSlider;
