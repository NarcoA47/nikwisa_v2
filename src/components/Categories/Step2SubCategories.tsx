import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventCategories } from "@/reducers/eventSlice";
import { RootState, AppDispatch } from "@/reducers/store";
import Image from "next/image";

const Step2SubCategories = ({
  selectedEventCategories,
  onPrevious,
  onNext,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const eventCategories = useSelector(
    (state: RootState) => state.eventProduct.event_categories
  );

  useEffect(() => {
    dispatch(fetchEventCategories());
  }, [dispatch]);

  const [selected, setSelected] = useState<string[]>(selectedEventCategories);

  // Toggle category selection by ID
  const toggleEventCategory = (categoryId: string) => {
    setSelected((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleNext = () => {
    if (selected.length === 0) {
      alert("Please select at least one event category.");
      return;
    }
    // Pass selected IDs
    onNext({ event_planning_categories: selected });
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">
        Select Event Planning Categories
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-4 px-4 md:px-0">
        {eventCategories.map((category) => (
          <div
            key={category.id}
            className={`flex flex-col items-center text-center cursor-pointer p-4 rounded-lg transition duration-300 border-2 ${
              selected.includes(category.id)
                ? "border-[#B8902E] bg-[#F5F5F5]" // Highlight selected category with border and background
                : "border-gray-300 bg-white"
            }`}
            onClick={() => toggleEventCategory(category.id)} // Use category.id
          >
            {/* Category Image */}
            <div
              className={`w-8 h-8 sm:w-24 sm:h-24 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100 sm:rounded-md sm:border sm:border-gray-300 hover:scale-105 transition duration-300`}
            >
              <Image
                src={category.image || "/fallback-image.png"} // Use a fallback image if none is provided
                alt={category.title}
                className="object-cover"
                width={80}
                height={80}
              />
            </div>

            {/* Category Name */}
            <span className="text-[8px] sm:text-[10px] lg:text-sm text-gray-700 mt-2">
              {category.title}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onPrevious}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-[#B8902E] text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2SubCategories;

// // components/Categories/Step2SubCategories.tsx
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEventCategories } from "@/reducers/eventSlice";
// import { RootState, AppDispatch } from "@/reducers/store";
// import Image from "next/image"; // Importing the Image component

// const Step2SubCategories = ({
//   selectedEventCategories,
//   onPrevious,
//   onNext,
// }: any) => {
//   const dispatch: AppDispatch = useDispatch();
//   const eventCategories = useSelector(
//     (state: RootState) => state.eventProduct.event_categories
//   );

//   useEffect(() => {
//     dispatch(fetchEventCategories());
//   }, [dispatch]);

//   const [selected, setSelected] = useState<string[]>(selectedEventCategories);

//   const toggleEventCategory = (eventSlug: string) => {
//     setSelected((prev) =>
//       prev.includes(eventSlug)
//         ? prev.filter((slug) => slug !== eventSlug)
//         : [...prev, eventSlug]
//     );
//   };

//   const handleNext = () => {
//     if (selected.length === 0) {
//       alert("Please select at least one event category.");
//       return;
//     }
//     onNext({ event_planning_categories: selected });
//   };

//   return (
//     <div>
//       <h2 className="text-lg font-bold mb-4">
//         Select Event Planning Categories
//       </h2>
//       <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-4 px-4 md:px-0">
//         {eventCategories.map((category) => (
//           <div
//             key={category.id}
//             className={`flex flex-col items-center text-center cursor-pointer p-4 rounded-lg transition duration-300 border-2 ${
//               selected.includes(category.slug)
//                 ? "border-[#B8902E] bg-[#F5F5F5]" // Highlight selected category with border and background
//                 : "border-gray-300 bg-white"
//             }`}
//             onClick={() => toggleEventCategory(category.slug)}
//           >
//             {/* Category Image */}
//             <div
//               className={`w-8 h-8 sm:w-24 sm:h-24 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100 sm:rounded-md sm:border sm:border-gray-300 hover:scale-105 transition duration-300`}
//             >
//               <Image
//                 src={category.image || "/fallback-image.png"} // Use a fallback image if none is provided
//                 alt={category.title}
//                 className="object-cover"
//                 width={80}
//                 height={80}
//               />
//             </div>

//             {/* Category Name */}
//             <span className="text-[8px] sm:text-[10px] lg:text-sm text-gray-700 mt-2">
//               {category.title}
//             </span>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-between mt-6">
//         <button
//           onClick={onPrevious}
//           className="bg-gray-500 text-white px-4 py-2 rounded"
//         >
//           Previous
//         </button>
//         <button
//           onClick={handleNext}
//           className="bg-[#B8902E] text-white px-4 py-2 rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Step2SubCategories;
