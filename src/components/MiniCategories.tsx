"use client";
import Image from "next/image";
import React from "react";

const miniCategories = [
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
      { name: "Car Rental ", img: "/assets/home/car rental.png" },
      { name: "constume Rental ", img: "/assets/home/costume hire.png" },
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
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      {miniCategories.map((category, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg p-4 shadow-sm"
        >
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {category.title}
          </h2>

          {/* Horizontal Scrollable Section */}
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {category.items.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center  md:w-24 shrink-0"
                >
                  <div className="relative w-20 h-20">
                    {/* Next.js Image Component */}
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

            {/* Scroll Indicator for Mobile */}
            <div className="mt-2 flex justify-center items-center gap-1 md:hidden">
              {category.items.map((_, i) => (
                <div key={i} className="w-2 h-2 bg-gray-400 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default MiniCategories;

// function MiniCategories() {
//   return (
//     <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
//       {miniCategories.map((category, index) => (
//         <div
//           key={index}
//           className="border border-gray-300 rounded-lg p-4 shadow-sm"
//         >
//           {/* Title */}
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">
//             {category.title}
//           </h2>

//           {/* Horizontal Scrollable Section */}
//           <div className="flex gap-4 overflow-x-auto scrollbar-hide">
//             {category.items.map((item, i) => (
//               <div
//                 key={i}
//                 className="flex flex-col items-center text-center w-32 md:w-24 shrink-0"
//               >
//                 <div className="relative w-20 h-20">
//                   {/* Next.js Image Component */}
//                   <Image
//                     src={item.img}
//                     alt={item.name}
//                     fill
//                     className="object-cover rounded-lg"
//                   />
//                 </div>
//                 <p className="text-sm text-gray-700 mt-2">{item.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// }

// export default MiniCategories;

// function MiniCategories() {
//   return (
//     <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
//       {miniCategories.map((category, index) => (
//         <div
//           key={index}
//           className="border border-gray-300 rounded-lg p-4 shadow-sm"
//         >
//           {/* Title */}
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">
//             {category.title}
//           </h2>

//           {/* Horizontal Scrollable Section */}
//           <div className="flex gap-4 overflow-x-auto scrollbar-hide">
//             {category.items.map((item, i) => (
//               <div
//                 key={i}
//                 className="flex flex-col items-center text-center w-32 md:w-24 shrink-0"
//               >
//                 <img
//                   src={item.img}
//                   alt={item.name}
//                   className="w-20 h-20 object-cover rounded-lg mb-2"
//                 />
//                 <p className="text-sm text-gray-700">{item.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// }

// export default MiniCategories;

// import React from "react";

// function MiniCategories() {
//   return (
//     <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 ">
//       <div className="border border-black rounded h-40 md:h-64">1</div>
//       <div className="border border-black rounded h-40 md:h-64">2</div>
//       <div className="border border-black rounded h-40 md:h-64">3</div>
//       <div className="border border-black rounded h-40 md:h-64">4</div>
//     </section>
//   );
// }

// export default MiniCategories;
