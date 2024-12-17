"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/reducers/store";
import { fetchStoresWithOfferings } from "@/reducers/storeSlice";

const StorePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Fetch stores and state from the Redux store
  const { stores, loading, error } = useSelector((state: RootState) => state.stores);

  useEffect(() => {
    // Fetch the stores on component mount
    dispatch(fetchStoresWithOfferings());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between mb-4">
      <h1 className="text-2xl font-bold mb-4">My Stores</h1>
      <button
          className="bg-[#B8902E] text-white py-2 px-4 rounded"
        >
          Add Store
        </button>
      </div>


      {/* Loading State */}
      {loading && <p>Loading stores...</p>}

      {/* Error State */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Store List */}
      {stores.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store) => (
            <li
              key={store.id}
              className="border rounded p-4 shadow hover:shadow-lg"
            >
              <h2 className="text-lg font-semibold">{store.name}</h2>
              <p>{store.overview}</p>
              <p>
                <strong>Location:</strong> {store.location}
              </p>
              <img
                src={store.image}
                alt={store.name}
                className="w-full h-32 object-cover mt-2"
              />
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No stores available.</p>
      )}
    </div>
  );
};

export default StorePage;

// "use client";

// import Link from "next/link";
// import { FaEdit } from "react-icons/fa"; // Edit icon from react-icons library
// import { useSelector } from "react-redux";
// import { RootState } from "@/reducers/store";

// const StoreList: React.FC = () => {
//   const { stores, loading, error } = useSelector(
//     (state: RootState) => state.stores
//   );

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
//       {stores.map((store) => (
//         <Link href={`/store/${store.id}`} key={store.id}>
//           <div className="border rounded-lg shadow hover:shadow-lg cursor-pointer relative group">
//             {/* Store Image */}
//             <img
//               src={store.image}
//               alt={store.name}
//               className="w-full h-40 object-cover rounded-t-lg"
//             />

//             {/* Edit Icon */}
//             <div className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <FaEdit size={18} />
//             </div>

//             {/* Store Info */}
//             <div className="p-4">
//               <h2 className="text-lg font-semibold mb-1">{store.name}</h2>
//               <p className="text-sm text-gray-700 mb-2">{store.overview}</p>
//               <p className="text-sm text-gray-600">
//                 <strong>Location:</strong> {store.location}
//               </p>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default StoreList;
