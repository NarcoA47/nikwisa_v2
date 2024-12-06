"use client";

import Image from "next/image";
import React from "react";

interface CategoryCardProps {
  id: number;
  name: string;
  img: string;
  url: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, img, url }) => {
  return (
    <a
      href={url}
      className="relative w-full h-32 aspect-square rounded-lg overflow-hidden shadow-md"
    >
      {/* Background Image */}
      <Image src={img} alt={name} fill className="object-cover" />

      {/* Bottom Half Shadow Overlay */}
      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent">
        {/* Text at the Very Bottom */}
        <p className="absolute bottom-2 mb-0 inset-x-0 text-center text-[10px] text-white ">
          {name}
        </p>
      </div>
    </a>
  );
};

export default CategoryCard;

// "use client";

// import Image from "next/image";
// import React from "react";

// interface CategoryCardProps {
//   id: number;
//   name: string;
//   img: string;
//   url: string;
// }

// const CategoryCard: React.FC<CategoryCardProps> = ({ name, img, url }) => {
//   return (
//     <a
//       href={url}
//       className="relative w-full h-32 aspect-square rounded-lg overflow-hidden shadow-md"
//     >
//       {/* Background Image */}
//       <Image src={img} alt={name} fill className="object-cover" />

//       {/* Text at the Bottom */}
//       <div className="absolute bottom-0 inset-x-0 bg-black/50 p-2">
//         <p className="text-xs text-white font-medium text-center">{name}</p>
//       </div>
//     </a>
//   );
// };

// export default CategoryCard;
