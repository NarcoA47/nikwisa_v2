"use client";

import { fetchImagesByStoreId } from "@/reducers/imageSlice";
import { AppDispatch, RootState } from "@/reducers/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image"; // Import next/image for optimized images

const ImageSlider = ({ storeId }: { storeId: number }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { images, loading, error } = useSelector(
    (state: RootState) => state.images
  );
  const [currentImage, setCurrentImage] = useState(0);

  // Fetch images when the component mounts or storeId changes
  useEffect(() => {
    dispatch(fetchImagesByStoreId(storeId));
  }, [storeId, dispatch]);

  // Automatically change images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000); // Change interval to 10 seconds (10000 milliseconds)
    return () => clearInterval(interval); // Cleanup the interval when the component unmounts
  }, [images.length]);

  // Handle dot click to manually change the image
  const handleDotClick = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <section className="w-full md:w-1/2 h-48 md:h-[320px] overflow-hidden rounded-lg shadow">
      {/* Image Slider Section with fixed height and width */}
      <div className="relative w-full h-full overflow-hidden rounded-lg shadow">
        {/* Loop through the photos and display the current one */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-full h-full absolute top-0 left-0 transition-opacity duration-1000 ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              position: currentImage === index ? "static" : "absolute",
            }}
          >
            <Image
              src={image.image} // Use `image.image` to access the image URL
              alt={`Service Photo ${index + 1}`}
              width={800} // Adjust width as needed
              height={320} // Adjust height as needed
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dots for manual navigation, positioned above the image slider */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)} // On dot click, set the current image
            className={`h-2 w-2 rounded-full ${
              currentImage === index ? "bg-blue-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ImageSlider;

// "use client";

// import { fetchImagesByStoreId } from "@/reducers/imageSlice";
// import { AppDispatch, RootState } from "@/reducers/store";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Image from "next/image"; // Import next/image for optimized images

// const ImageSlider = ({ storeId }: { storeId: number }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { images, loading, error } = useSelector(
//     (state: RootState) => state.images
//   );
//   const [currentImage, setCurrentImage] = useState(0);

//   // Fetch images when the component mounts or storeId changes
//   useEffect(() => {
//     dispatch(fetchImagesByStoreId(storeId));
//   }, [storeId, dispatch]);

//   // Automatically change images every 10 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % images.length);
//     }, 10000); // Change interval to 10 seconds (10000 milliseconds)
//     return () => clearInterval(interval); // Cleanup the interval when the component unmounts
//   }, [images.length]);

//   // Handle dot click to manually change the image
//   const handleDotClick = (index: number) => {
//     setCurrentImage(index);
//   };

//   return (
//     <section className="w-full md:w-1/2 h-48 md:h-[320px] overflow-hidden rounded-lg shadow">
//       {/* Image Slider Section with fixed height and width */}
//       <div className="relative w-full h-full overflow-hidden rounded-lg shadow">
//         {/* Loop through the photos and display the current one */}
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className={`w-full h-full absolute top-0 left-0 transition-opacity duration-1000 ${
//               currentImage === index ? "opacity-100" : "opacity-0"
//             }`}
//             style={{
//               position: currentImage === index ? "static" : "absolute",
//             }}
//           >
//             <Image
//               src={image.image} // Use `image.image` to access the image URL
//               alt={`Service Photo ${index + 1}`}
//               width={800} // Adjust width as needed
//               height={320} // Adjust height as needed
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Dots for manual navigation */}
//       <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handleDotClick(index)} // On dot click, set the current image
//             className={`h-2 w-2 rounded-full ${
//               currentImage === index ? "bg-blue-500" : "bg-gray-400"
//             }`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ImageSlider;
