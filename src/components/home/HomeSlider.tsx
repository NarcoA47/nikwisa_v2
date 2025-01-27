"use client";

import React, { useEffect, useState } from "react";

type HomeSliderProps = {
  components: JSX.Element[]; // Array of components
};

const HomeSlider: React.FC<HomeSliderProps> = ({ components }) => {
  const [currentComponent, setCurrentComponent] = useState(0);

  useEffect(() => {
    if (!components || components.length === 0) return;
    const interval = setInterval(() => {
      setCurrentComponent((prev) => (prev + 1) % components.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [components]);

  const handleDotClick = (index: number) => {
    setCurrentComponent(index);
  };

  return (
    <section className="bg-red-600 relative w-full md:w-1/2 h-64 overflow-hidden rounded-lg shadow m-0 p-0">
      {/* Slider Section */}
      <div
        className="relative w-full h-full flex transition-transform duration-1000"
        style={{
          transform: `translateX(-${currentComponent * 100}%)`,
        }}
      >
        {components.map((component, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 flex items-stretch overflow-hidden"
          >
            {component}
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2 z-10">
        {components.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentComponent === index ? "bg-[#B8902E]" : "bg-gray-300"
            }`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HomeSlider;

// "use client";

// import React, { useEffect, useState } from "react";

// type HomeSliderProps = {
//   components: JSX.Element[]; // Array of components
// };

// const HomeSlider: React.FC<HomeSliderProps> = ({ components }) => {
//   const [currentComponent, setCurrentComponent] = useState(0);

//   // Automatically change components every 3 seconds
//   useEffect(() => {
//     if (!components || components.length === 0) return; // Prevent errors if components are empty or undefined
//     const interval = setInterval(() => {
//       setCurrentComponent((prev) => (prev + 1) % components.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [components]);

//   // Handle dot click to manually change the component
//   const handleDotClick = (index: number) => {
//     setCurrentComponent(index);
//   };

//   return (
//     <section className="relative w-full md:w-1/2 h-64 overflow-hidden rounded-lg shadow">
//       {/* Component Slider Section */}
//       <div className="relative w-full h-full overflow-hidden rounded-lg">
//         {components.map((component, index) => (
//           <div
//             key={index}
//             className={`w-full h-full transition-opacity duration-1000 ${
//               currentComponent === index ? "opacity-100" : "opacity-0"
//             }`}
//             style={{
//               position: currentComponent === index ? "static" : "absolute",
//               top: 0,
//               left: 0,
//             }}
//           >
//             {component}
//           </div>
//         ))}

//         {/* Dots inside the slider */}
//         <div className="absolute bottom-4 w-full flex justify-center space-x-2">
//           {components.map((_, index) => (
//             <button
//               key={index}
//               className={`w-3 h-3 rounded-full ${
//                 currentComponent === index ? "bg-[#B8902E]" : "bg-gray-300"
//               }`}
//               onClick={() => handleDotClick(index)}
//             ></button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HomeSlider;

// "use client";

// import { ImageSliderProps } from "@/types/types";
// import React, { useEffect, useState } from "react";

// const HomeSlider: React.FC<ImageSliderProps> = ({ photos }) => {
//   const [currentImage, setCurrentImage] = useState(0);

//   // Automatically change images every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % photos.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [photos.length]);

//   // Handle dot click to manually change the image
//   const handleDotClick = (index: number) => {
//     setCurrentImage(index);
//   };

//   return (
//     <section className="relative w-full md:w-1/2 h-64 overflow-hidden rounded-lg shadow">
//       {/* Image Slider Section */}
//       <div className="relative w-full h-full overflow-hidden rounded-lg">
//         {photos.map((image, index) => (
//           <img
//             key={index}
//             src={image}
//             alt={`Service Photo ${index + 1}`}
//             className={`w-full h-full object-cover transition-opacity duration-1000 ${
//               currentImage === index ? "opacity-100" : "opacity-0"
//             }`}
//             style={{
//               position: currentImage === index ? "static" : "absolute",
//               top: 0,
//               left: 0,
//             }}
//           />
//         ))}

//         {/* Dots inside the slider */}

//         <div className="absolute bottom-4 w-full flex justify-center space-x-2">
//           {photos.map((_, index) => (
//             <button
//               key={index}
//               className={`w-3 h-3 rounded-full ${
//                 currentImage === index ? "bg-[#B8902E]" : "bg-gray-300"
//               }`}
//               onClick={() => handleDotClick(index)}
//             ></button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HomeSlider;
