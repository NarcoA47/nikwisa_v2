import { searchStores } from "@/reducers/searchSlice";
import { RootState } from "@/reducers/store";
import React, { useState, useRef, useEffect } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);

  const dispatch = useDispatch();
  const { results, loading, error } = useSelector(
    (state: RootState) => state.search
  );

  const handleSearch = () => {
    if (!searchQuery && !searchLocation) {
      alert("Please enter at least a search query or location.");
      return;
    }
    dispatch(searchStores({ query: searchQuery, location: searchLocation }));
    setShowResults(true);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between w-full md:w-8/12 bg-white p-4 rounded-lg shadow-lg mt-10 gap-4">
      {/* Location Input */}
      <div className="relative w-full md:w-2/5 mb-4 md:mb-0 hidden md:block">
        <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded border border-black focus:outline-none focus:ring"
          placeholder="Enter location (e.g., Lusaka)"
          onFocus={() => setShowResults(true)}
        />
      </div>

      {/* Search Input */}
      <div className="relative w-full md:w-2/3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-16 py-2 w-full rounded-l border border-gray-700 focus:outline-none focus:ring"
          placeholder="Search for services, products, or stores"
          onFocus={() => setShowResults(true)}
        />
        <button
          onClick={handleSearch}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 bg-[#B8902E] text-white flex justify-center items-center rounded-md shadow-md"
        >
          {loading ? "..." : <FaSearch className="text-xl" />}
        </button>

        {/* Results Dropdown */}
        {showResults && (
          <div
            ref={resultsRef}
            className="absolute left-0 w-full bg-white mt-2 border border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto z-50"
          >
            {loading && <p className="p-4 text-gray-500">Loading...</p>}
            {error && <p className="p-4 text-red-500">{error}</p>}
            {results.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {results.map((result) => (
                  <li
                    key={result.id}
                    className="p-4 hover:bg-gray-100 cursor-pointer"
                  >
                    <p className="font-bold">{result.name}</p>
                    <p className="text-sm text-gray-600">{result.location}</p>
                  </li>
                ))}
              </ul>
            ) : (
              !loading && <p className="p-4 text-gray-500">No results found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

// import { searchStores } from "@/reducers/searchSlice";
// import { RootState } from "@/reducers/store";
// import React, { useState, useCallback, useEffect, useRef } from "react";
// import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import _ from "lodash";

// const SearchBar = () => {
//   const [searchLocation, setSearchLocation] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showResults, setShowResults] = useState(false);
//   const resultsRef = useRef(null); // To manage clicks outside the results modal
//   const dispatch = useDispatch();

//   const { results, loading, error } = useSelector(
//     (state: RootState) => state.search
//   );

//   // Debounced search function
//   const debouncedSearch = useCallback(
//     _.debounce((location, query) => {
//       if (query || location) {
//         dispatch(searchStores({ query, location }));
//         setShowResults(true); // Show results modal
//       } else {
//         setShowResults(false); // Hide modal if inputs are empty
//       }
//     }, 500),
//     [dispatch]
//   );

//   useEffect(() => {
//     debouncedSearch(searchLocation, searchQuery);
//     return () => debouncedSearch.cancel();
//   }, [searchLocation, searchQuery, debouncedSearch]);

//   // Close modal when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (resultsRef.current && !resultsRef.current.contains(e.target)) {
//         setShowResults(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative w-full md:w-8/12 bg-white p-4 rounded-lg shadow-lg mt-10">
//       {/* Location Input */}
//       <div className="relative w-full md:w-2/5 mb-4 md:mb-0 hidden md:block">
//         <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
//         <input
//           type="text"
//           value={searchLocation}
//           onChange={(e) => setSearchLocation(e.target.value)}
//           className="pl-10 pr-4 py-2 w-full rounded border border-gray-300 focus:outline-none focus:ring"
//           placeholder="Enter location (e.g., Lusaka)"
//         />
//       </div>

//       {/* Search Input */}
//       <div className="relative w-full md:w-2/3">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="pl-10 pr-16 py-2 w-full rounded-l border border-gray-300 focus:outline-none focus:ring"
//           placeholder="Search for services, products, or stores"
//           onFocus={() => setShowResults(true)} // Show modal when user clicks
//         />
//         <button
//           className="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 bg-[#B8902E] text-white flex justify-center items-center rounded-md shadow-md"
//           disabled={loading}
//         >
//           {loading ? "..." : <FaSearch className="text-xl" />}
//         </button>
//       </div>

//       {/* Modal-Style Results Dropdown */}
//       {showResults && (
//         <div
//           ref={resultsRef}
//           className="absolute left-0 w-full md:w-[95%] bg-white mt-2 border border-gray-200 rounded shadow-lg max-h-72 overflow-y-auto z-50"
//         >
//           {loading && <p className="p-4 text-gray-500">Loading...</p>}
//           {error && <p className="p-4 text-red-500">{error}</p>}
//           {results.length > 0 ? (
//             <ul className="divide-y divide-gray-200">
//               {results.map((result) => (
//                 <li
//                   key={result.id}
//                   className="p-4 hover:bg-gray-100 cursor-pointer"
//                 >
//                   <p className="font-bold">{result.name}</p>
//                   <p className="text-sm text-gray-600">{result.location}</p>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             !loading && <p className="p-4 text-gray-500">No results found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

// import { searchStores } from "@/reducers/searchSlice";
// import { RootState } from "@/reducers/store";
// import React, { useState, useCallback, useEffect } from "react";
// import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import _ from "lodash"; // Import lodash for debounce

// const SearchBar = () => {
//   const [searchLocation, setSearchLocation] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const dispatch = useDispatch();

//   const { results, loading, error } = useSelector(
//     (state: RootState) => state.search
//   );

//   // Debounced search function
//   const debouncedSearch = useCallback(
//     _.debounce((location, query) => {
//       if (query || location) {
//         dispatch(searchStores({ query, location }));
//       }
//     }, 500), // Delay of 500ms
//     [dispatch]
//   );

//   // Trigger debounced search when inputs change
//   useEffect(() => {
//     debouncedSearch(searchLocation, searchQuery);
//     // Cleanup debounce on unmount to avoid memory leaks
//     return () => debouncedSearch.cancel();
//   }, [searchLocation, searchQuery, debouncedSearch]);

//   return (
//     <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-8/12 bg-white p-4 rounded-lg shadow-lg mt-10 gap-4">
//       {/* Location Input */}
//       <div className="relative w-full md:w-2/5 mb-4 md:mb-0">
//         <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
//         <input
//           type="text"
//           value={searchLocation}
//           onChange={(e) => setSearchLocation(e.target.value)}
//           className="pl-10 pr-4 py-2 w-full rounded border border-gray-300 focus:outline-none focus:ring"
//           placeholder="Enter location (e.g., Lusaka)"
//         />
//       </div>

//       {/* Search Input */}
//       <div className="relative w-full md:w-2/3">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="pl-10 pr-16 py-2 w-full rounded-l border border-gray-300 focus:outline-none focus:ring"
//           placeholder="Search for services, products, or stores"
//         />
//         <button
//           className="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 bg-[#B8902E] text-white flex justify-center items-center rounded-md shadow-md"
//           disabled={loading}
//         >
//           {loading ? "..." : <FaSearch className="text-xl" />}
//         </button>
//       </div>

//       {/* Results */}
//       <div className="mt-4 w-full">
//         {error && <p className="text-red-500 mt-2">{error}</p>}
//         {results.length > 0 && (
//           <ul className="list-disc pl-6">
//             {results.map((result) => (
//               <li key={result.id} className="mb-2">
//                 <p className="font-bold">{result.name}</p>
//                 <p className="text-sm text-gray-600">{result.location}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//         {results.length === 0 && !loading && (
//           <p className="text-gray-500 text-sm">No results found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

// import { searchStores } from "@/reducers/searchSlice";
// import { RootState } from "@/reducers/store";
// import React, { useState } from "react";
// import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";

// const SearchBar = () => {
//   const [searchLocation, setSearchLocation] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const dispatch = useDispatch();

//   const { results, loading, error } = useSelector(
//     (state: RootState) => state.search
//   );

//   const handleSearch = () => {
//     if (!searchQuery && !searchLocation) {
//       alert("Please enter at least a search query or location.");
//       return;
//     }
//     dispatch(searchStores({ query: searchQuery, location: searchLocation }));
//   };

//   return (
//     <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-8/12 bg-white p-4 rounded-lg shadow-lg mt-10 gap-4">
//       {/* Location Input */}
//       <div className="relative w-full md:w-2/5 mb-4 md:mb-0 hidden md:block">
//         <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
//         <input
//           type="text"
//           value={searchLocation}
//           onChange={(e) => setSearchLocation(e.target.value)}
//           className="pl-10 pr-4 py-2 w-full rounded border border-black focus:outline-none focus:ring"
//           placeholder="Enter location (e.g., Lusaka)"
//         />
//       </div>

//       {/* Search Input */}
//       <div className="relative w-full md:w-2/3">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="pl-10 pr-16 py-2 w-full rounded-l border border-gray-700 focus:outline-none focus:ring"
//           placeholder="Search for services, products, or stores"
//         />
//         <button
//           onClick={handleSearch}
//           className="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 bg-[#B8902E] text-white flex justify-center items-center rounded-md shadow-md"
//         >
//           {loading ? "..." : <FaSearch className="text-xl" />}
//         </button>
//       </div>

//       {/* Results */}
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//       {results.length > 0 && (
//         <div className="mt-4 w-full">
//           <ul className="list-disc pl-6">
//             {results.map((result) => (
//               <li key={result.id}>
//                 <p className="font-bold">{result.name}</p>
//                 <p className="text-sm text-gray-600">{result.location}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchBar;
