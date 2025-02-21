"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SpecialOffer = () => {
  const heroImages = [
    "/lead.png",
    "/battery.jpg",
    "/computer.jpg",
    "bill-mead.jpg",
  ];
  const [, setCurrentHeroImage] = useState(0);

  const specialImages = ["/sale.png", "/pexels.jpeg", "/Gas.jpg", "/ExpI2.jpg"];
  const [currentSpecialImage, setCurrentSpecialImage] = useState(0);

  // Automatically change hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Automatically change special offer images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpecialImage((prev) => (prev + 1) % specialImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [specialImages.length]);

  // Handle dot click
  const handleDotClick = (index: React.SetStateAction<number>) => {
    setCurrentSpecialImage(index);
  };

  return (
    <section className="my-12 md:my-20">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">#SpecialForYou</h3>
        <a href="#special-offer" className="text-yellow-500 font-medium">
          See All
        </a>
      </div>
      <div className="relative mt-4 w-full h-[10rem] sm:h-[10rem] md:h-[25rem] overflow-hidden rounded-lg shadow">
        {/* Displaying images */}
        {specialImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Sale ${index + 1}`}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              currentSpecialImage === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              position: currentSpecialImage === index ? "static" : "absolute",
              top: 0,
              left: 0,
              objectFit: "cover",
            }}
            width={128}
            height={128}
          />
        ))}
      </div>

      {/* Dots for carousel navigation */}
      <div className="flex justify-center mt-4 space-x-2">
        {specialImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentSpecialImage === index ? "bg-[#B8902E" : "bg-gray-300"
            }`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffer;
