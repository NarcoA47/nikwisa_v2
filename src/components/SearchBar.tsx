"use client";

import React, { useState } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Implement search functionality here
    console.log(`Searching for ${searchQuery} in ${searchLocation}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-8/12 bg-white p-4 rounded-lg shadow-lg mt-10 gap-4">
      {/* Location Input with Icon */}
      <div className="relative w-full md:w-2/5 mb-4 md:mb-0 hidden md:block">
        <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded border border-black focus:outline-none focus:ring "
          placeholder="Enter location (e.g., Lusaka)"
        />
      </div>

      {/* Search Input with Icon */}
      <div className="relative w-full md:w-2/3">
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-l border border-black focus:outline-none "
          placeholder="Search for services, products, or stores"
        />
      </div>
    </div>
  );
};

export default SearchBar;

// import React, { useState } from "react";

// const SearchBar = () => {
//   const [searchLocation, setSearchLocation] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = () => {
//     // Implement search functionality here
//     console.log(`Searching for ${searchQuery} in ${searchLocation}`);
//   };
//   return (
//     <div className="flex items-center form-row w-full md:w-8/12 bg-red-600 mt-10">
//       <div className="  w-1/3 hidden md:block">
//         <input
//           type="text"
//           className="px-5 py-1.5 mr-10 mb-4 h-9 w-full  rounded border border-grey-200 bg-grey-8"
//           placeholder="Lusaka"
//         />
//       </div>
//       <div className="  w-full md:w-2/3">
//         <input
//           type="text"
//           className="px-3 py-1.5 mb-4 h-9 w-full  rounded border border-grey-200 bg-grey-50"
//           placeholder="search"
//         />
//       </div>
//     </div>
//   );
// };
// export default SearchBar;
