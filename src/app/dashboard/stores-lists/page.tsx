"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/reducers/store";
import { fetchStoresByUserId } from "@/reducers/storeSlice";
import StoreCardAdmin from "@/components/StoreCardAdmin";

const StorePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Fetch stores and state from the Redux store
  const { stores, loading, error } = useSelector(
    (state: RootState) => state.stores
  );

  // Fetch user data from the auth slice
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?.user_id) {
      // Fetch the stores for the logged-in user
      dispatch(fetchStoresByUserId(user.user_id.toString()));
    }
  }, [dispatch, user?.id]);
  console.log("stores demo in admin", stores);
  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">My Stores</h1>
        <button className="bg-[#B8902E] text-white py-2 px-4 rounded">
          Add Store
        </button>
      </div>
      {/* Loading State */}
      {loading && <p>Loading stores...</p>}
      {/* Error State */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Store List */}
      {stores.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store) => (
            <StoreCardAdmin
              key={store.id}
              id={store.id}
              name={store.name}
              image={store.image}
              rating={store.rating || 0} // Default values if missing
              review_count={store.review_count || 0}
              location={store.location}
              wedding_category={store.wedding_category || "N/A"} // Default value if missing
            />
          ))}
        </div>
      ) : (
        !loading && <p>No stores available.</p>
      )}
    </div>
  );
};

export default StorePage;

// "use client";

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/reducers/store";
// import { fetchStoresWithOfferings } from "@/reducers/storeSlice";
// import StoreCard from "@/components/StoreCard"; // Adjust path as needed

// const StorePage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   // Fetch stores and state from the Redux store
//   const { stores, loading, error } = useSelector(
//     (state: RootState) => state.stores
//   );

//   // Fetch user data from the auth slice
//   const { user } = useSelector((state: RootState) => state.auth);

//   console.log("User:", user);
//   useEffect(() => {
//     // Fetch the stores on component mount
//     dispatch(fetchStoresWithOfferings());
//   }, [dispatch]);

//   return (
//     <div className="container mx-auto p-8">
//       <div className="flex justify-between mb-4">
//         <h1 className="text-2xl font-bold mb-4">My Stores</h1>
//         <button className="bg-[#B8902E] text-white py-2 px-4 rounded">
//           Add Store
//         </button>
//       </div>

//       {/* Loading State */}
//       {loading && <p>Loading stores...</p>}

//       {/* Error State */}
//       {error && <p className="text-red-500">Error: {error}</p>}

//       {/* Store List */}
//       {stores.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {stores.map((store) => (
//             <StoreCard
//               key={store.id}
//               id={store.id}
//               name={store.name}
//               image={store.image}
//               rating={store.rating || "N/A"} // Default values if missing
//               review_count={store.review_count || 0}
//               location={store.location}
//             />
//           ))}
//         </div>
//       ) : (
//         !loading && <p>No stores available.</p>
//       )}
//     </div>
//   );
// };

// export default StorePage;
