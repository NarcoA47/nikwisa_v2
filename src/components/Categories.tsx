"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link"; // Import Next.js Link component

const categories = [
  {
    name: "Alternative Energy",
    img: "/assets/home/solar-energy.png",
    url: "/energy",
  },
  {
    name: "Wedding/Event Planning",
    img: "/assets/home/wedding.png",
    url: "/wedding-event-planning",
  },
  {
    name: "Restaurant",
    img: "/assets/home/restuarant.png",
    url: "/restaurant",
  },
  {
    name: "Rent & Hire",
    img: "/assets/home/rental-car.png",
    url: "/rent-hire",
  },
  { name: "Gym", img: "/assets/home/workout.png", url: "/gym" },
  { name: "Automobile", img: "/assets/home/mechanic.png", url: "/automobile" },
  {
    name: "Contractors",
    img: "/assets/home/contractor.png",
    url: "/contractors",
  },
];

const Categories = () => {
  return (
    <div className="grid grid-cols-4 lg:grid-cols-10 gap-1 sm:gap-4 mt-8 md:mt-16">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center rounded-lg p-4 mb-0"
        >
          {/* Wrap the category in a Link component */}
          <Link href={category.url} className="flex flex-col items-center">
            {/* Outer container with defined size */}
            <div className="w-16 md:w-24 h-16 md:h-24 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md overflow-hidden">
              {/* Inner div to handle image size */}
              <div className="relative w-full h-full">
                <Image
                  src={category.img}
                  alt={category.name}
                  layout="fill" // Ensures the image takes up the full width and height of the parent
                  objectFit="cover" // Crops the image to maintain aspect ratio
                  className="rounded-md"
                  sizes="100vw"
                />
              </div>
            </div>

            {/* Text under the photo/icon */}
            <p className="mt-2 text-[10px] sm:text-xs lg:text-sm text-gray-800">
              {category.name}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Categories;

// "use client";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link"; // Import Next.js Link component

// const categories = [
//   {
//     name: "Alternative Energy",
//     img: "/assets/home/solar-energy.png",
//     url: "/energy",
//   },
//   {
//     name: "Wedding/Event Planning",
//     img: "/assets/home/wedding.png",
//     url: "/wedding-event-planning",
//   },
//   {
//     name: "Restaurant",
//     img: "/assets/home/restuarant.png",
//     url: "/restaurant",
//   },
//   {
//     name: "Rent & Hire",
//     img: "/assets/home/rental-car.png",
//     url: "/rent-hire",
//   },
//   { name: "Gym", img: "/assets/home/workout.png", url: "/gym" },
//   { name: "Automobile", img: "/assets/home/mechanic.png", url: "/automobile" },
//   {
//     name: "Contractors",
//     img: "/assets/home/contractor.png",
//     url: "/contractors",
//   },
// ];

// const Categories = () => {
//   return (
//     <div className="grid grid-cols-4 lg:grid-cols-10 gap-1 sm-gap-4 mt-8 md:mt-16">
//       {categories.map((category, index) => (
//         <div
//           key={index}
//           className="flex flex-col items-center text-center rounded-lg p-4 mb-0"
//         >
//           {/* Wrap the category in a Link component */}
//           <Link href={category.url} className="flex flex-col items-center">
//             {/* Square container for photo or icon */}
//             <div className=" w-20 md:w-32 h-20 md:h-32 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md">
//               <div className="relative w-15 md:w-25 h-15 md:h-25 flex items-center ">
//                 <Image
//                   src={category.img}
//                   alt={category.name}
//                   layout="fill" // Ensures the image takes up the full width and height of the parent
//                   objectFit="cover" // Crops the image to maintain aspect ratio
//                   className="rounded-md"
//                   sizes="100vw"
//                 />
//               </div>
//             </div>

//             {/* Text under the photo/icon */}
//             <p className="mt-2 text-[10px] sm:text-xs lg:text-sm text-gray-800">
//               {category.name}
//             </p>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Categories;
