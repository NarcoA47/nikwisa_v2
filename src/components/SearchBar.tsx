import { searchStores } from "@/reducers/searchSlice";
import { RootState } from "@/reducers/store";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-8/12 bg-white p-4 rounded-lg shadow-lg mt-10 gap-4">
      {/* Location Input */}
      <div className="relative w-full md:w-2/5 mb-4 md:mb-0 hidden md:block">
        <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded border border-black focus:outline-none focus:ring"
          placeholder="Enter location (e.g., Lusaka)"
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
        />
        <button
          onClick={handleSearch}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 bg-[#B8902E] text-white flex justify-center items-center rounded-md shadow-md"
        >
          {loading ? "..." : <FaSearch className="text-xl" />}
        </button>
      </div>

      {/* Results */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {results.length > 0 && (
        <div className="mt-4 w-full">
          <ul className="list-disc pl-6">
            {results.map((result) => (
              <li key={result.id}>
                <p className="font-bold">{result.name}</p>
                <p className="text-sm text-gray-600">{result.location}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
