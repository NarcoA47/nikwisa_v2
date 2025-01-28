"use client";

import { fetchEventCategories } from "@/reducers/eventSlice";
import { AppDispatch, RootState } from "@/reducers/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

const EventCategory = () => {
  const dispatch: AppDispatch = useDispatch();

  // Retrieve event categories from Redux store
  const { event_categories, status, error } = useSelector(
    (state: RootState) => state.eventProduct
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEventCategories());
    }
  }, [dispatch, status]);

  // Automatically change the displayed categories every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const totalSets = Math.ceil(event_categories.length / 3); // Adjusted for 3 items per set
        return (prev + 1) % totalSets;
      });
    }, 10000); // Change interval to 10 seconds (10000 milliseconds)
    return () => clearInterval(interval); // Cleanup the interval when the component unmounts
  }, [event_categories.length]);

  // Handle dot click to manually change the current set of categories
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Break the categories into chunks of 3 for mobile display
  const chunks = [];
  for (let i = 0; i < event_categories.length; i += 3) {
    chunks.push(event_categories.slice(i, i + 3));
  }

  // Ensure exactly 3 dots are shown, even if there are fewer sets of categories
  const totalDots = Math.max(3, chunks.length); // If there are fewer than 3 chunks, fill the remaining with empty slots
  const visibleDots = new Array(totalDots).fill(0); // Array to ensure exactly 3 dots are always shown

  return (
    <section>
      {/* Desktop View - Carousel */}
      <div className="hidden md:block mt-8 w-full border border-gray-300 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 col-span-3">
          Event Categories
        </h2>
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-1000"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`, // Move by one set of categories
            }}
          >
            {/* Map over chunks to display 3 categories at a time */}
            {chunks.map((chunk, chunkIndex) => (
              <div
                key={chunkIndex}
                className="w-full flex-shrink-0 flex justify-around items-center transition-all duration-1000"
              >
                {chunk.map((category) => (
                  <div
                    key={category.id}
                    className="w-1/3 flex items-center justify-center"
                  >
                    <Link
                      href={
                        category.slug
                          ? `/event-planning/${category.slug
                              .toLowerCase()
                              .replace(/ /g, "-")}/`
                          : "#"
                      }
                      className={`flex flex-col items-center text-center ${
                        !category.slug ? "cursor-not-allowed opacity-50" : ""
                      }`}
                      aria-disabled={!category.slug}
                    >
                      <div className="w-48 h-48 bg-gray-200 rounded flex items-center justify-center p-4">
                        <Image
                          src={category.image}
                          alt={category.title}
                          width={100} // Maintain the aspect ratio of the image
                          height={100} // Adjust the height accordingly
                          className="w-full h-full object-contain rounded p-2"
                        />
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        {category.title}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {visibleDots.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => handleDotClick(dotIndex)}
                className={`h-3 w-3 rounded-full border-2 border-white ${
                  currentIndex === dotIndex ? "bg-[#B8902E]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-6 mt-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-4">
          Event Categories
        </h4>
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-1000"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`, // Move by one set of categories (3 items at a time)
            }}
          >
            {/* Map over chunks to display 3 categories at a time */}
            {chunks.map((chunk, chunkIndex) => (
              <div
                key={chunkIndex}
                className="w-full flex-shrink-0 flex justify-around items-center"
              >
                {chunk.map((category) => (
                  <div
                    key={category.id}
                    className="w-1/3 flex items-center justify-center"
                  >
                    <Link
                      href={
                        category.slug
                          ? `/event-planning/${category.slug
                              .toLowerCase()
                              .replace(/ /g, "-")}/`
                          : "#"
                      }
                      className={`flex flex-col items-center text-center p-4  ${
                        !category.slug ? "cursor-not-allowed opacity-50" : ""
                      }`}
                      aria-disabled={!category.slug}
                    >
                      <div className="w-26 h-26 bg-gray-200 rounded flex items-center justify-center p-4">
                        <Image
                          src={category.image}
                          alt={category.title}
                          width={60}
                          height={60}
                          className="w-full h-full object-contain rounded "
                        />
                      </div>
                      <p className="text-xs text-gray-700 mt-2">
                        {category.title}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {visibleDots.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => handleDotClick(dotIndex)}
                className={`h-3 w-3 rounded-full border-2 border-white ${
                  currentIndex === dotIndex ? "bg-[#B8902E]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCategory;

// "use client";

// import { fetchEventCategories } from "@/reducers/eventSlice";
// import { AppDispatch, RootState } from "@/reducers/store";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Image from "next/image";
// import Link from "next/link";

// const EventCategory = () => {
//   const dispatch: AppDispatch = useDispatch();

//   // Retrieve event categories from Redux store
//   const { event_categories, status, error } = useSelector(
//     (state: RootState) => state.eventProduct
//   );

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchEventCategories());
//     }
//   }, [dispatch, status]);

//   // Automatically change the displayed categories every 10 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => {
//         const totalSets = Math.ceil(event_categories.length / 3);
//         return (prev + 1) % totalSets;
//       });
//     }, 10000); // Change interval to 10 seconds (10000 milliseconds)
//     return () => clearInterval(interval); // Cleanup the interval when the component unmounts
//   }, [event_categories.length]);

//   // Handle dot click to manually change the current set of categories
//   const handleDotClick = (index: number) => {
//     setCurrentIndex(index);
//   };

//   // Break the categories into chunks of 3, but always show 3 dots
//   const chunks = [];
//   for (let i = 0; i < event_categories.length; i += 3) {
//     chunks.push(event_categories.slice(i, i + 3));
//   }

//   // Ensure exactly 3 dots are shown, even if there are fewer sets of categories
//   const totalDots = Math.max(3, chunks.length); // If there are fewer than 3 chunks, fill the remaining with empty slots
//   const visibleDots = new Array(totalDots).fill(0); // Array to ensure exactly 3 dots are always shown

//   return (
//     <section>
//       {/* Desktop View - Carousel */}
//       <div className="hidden md:block mt-8 w-full border border-gray-300 rounded-lg p-6 shadow-sm">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4 col-span-3">
//           Event Categories
//         </h2>
//         <div className="relative w-full overflow-hidden">
//           <div
//             className="flex transition-transform duration-1000"
//             style={{
//               transform: `translateX(-${currentIndex * 100}%)`, // Move by one set of categories
//             }}
//           >
//             {/* Map over chunks to display 3 categories at a time */}
//             {chunks.map((chunk, chunkIndex) => (
//               <div
//                 key={chunkIndex}
//                 className="w-full flex-shrink-0 flex justify-around items-center transition-all duration-1000"
//               >
//                 {chunk.map((category) => (
//                   <div
//                     key={category.id}
//                     className="w-1/3 flex items-center justify-center"
//                   >
//                     <Link
//                       href={
//                         category.slug
//                           ? `/event-planning/${category.slug
//                               .toLowerCase()
//                               .replace(/ /g, "-")}/`
//                           : "#"
//                       }
//                       className={`flex flex-col items-center text-center ${
//                         !category.slug ? "cursor-not-allowed opacity-50" : ""
//                       }`}
//                       aria-disabled={!category.slug}
//                     >
//                       <div className="w-48 h-48 bg-gray-200 rounded flex items-center justify-center p-4">
//                         <Image
//                           src={category.image}
//                           alt={category.title}
//                           width={100} // Maintain the aspect ratio of the image
//                           height={100} // Adjust the height accordingly
//                           className="w-full h-full object-contain rounded p-2"
//                         />
//                       </div>
//                       <p className="text-sm text-gray-700 mt-2">
//                         {category.title}
//                       </p>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>

//           {/* Dots Navigation */}
//           <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
//             {visibleDots.map((_, dotIndex) => (
//               <button
//                 key={dotIndex}
//                 onClick={() => handleDotClick(dotIndex)}
//                 className={`h-3 w-3 rounded-full border-2 border-white ${
//                   currentIndex === dotIndex ? "bg-[#B8902E]" : "bg-gray-300"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Mobile View */}
//       <div className="md:hidden space-y-6 mt-4">
//         <h4 className="text-sm font-semibold text-gray-800 mb-4">
//           Event Categories
//         </h4>
//         <div className="grid grid-cols-4 gap-2">
//           {event_categories.map((category) => (
//             <Link
//               href={
//                 category.slug
//                   ? `/event-planning/${category.slug
//                       .toLowerCase()
//                       .replace(/ /g, "-")}/`
//                   : "#"
//               }
//               key={category.id}
//               className={`flex flex-col items-center text-center ${
//                 !category.slug ? "cursor-not-allowed opacity-50" : ""
//               }`}
//               aria-disabled={!category.slug}
//             >
//               <div className="relative w-full h-32 aspect-square rounded-lg overflow-hidden shadow-md ">
//                 {category.image ? (
//                   <Image
//                     src={category.image}
//                     alt={category.title}
//                     fill
//                     sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
//                     className="object-contain p-2"
//                   />
//                 ) : (
//                   <div className="bg-gray-200 w-full h-full flex items-center justify-center">
//                     <span className="text-gray-500 text-sm">No Image</span>
//                   </div>
//                 )}
//                 <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent">
//                   <p className="absolute bottom-2 mb-0 inset-x-0 text-center text-[10px] text-white">
//                     {category.title}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EventCategory;
