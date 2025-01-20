"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/reducers/store";
import { fetchStoresByUserId } from "@/reducers/storeSlice";
import StoreCardAdmin from "@/components/StoreCardAdmin";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  username: string;
  email: string;
}

const StorePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [userId, setUserId] = useState<number | null>(null);

  // Fetch stores and state from the Redux store
  const { stores, loading, error } = useSelector(
    (state: RootState) => state.stores
  );

  // Extract user ID from token
  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    console.log("accessToken", accessToken); // Check if the token exists
    if (accessToken) {
      try {
        const decodedToken: User = jwtDecode(accessToken); // Correct decoding
        console.log("Decoded token:", decodedToken); // Log decoded token to verify user info
        setUserId(decodedToken.user_id); // Set the user ID from the decoded token
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    } else {
      console.log("No access token found");
    }
  }, []);

  console.log("userId", userId); // Check if userId is being set correctly

  // Fetch stores for the logged-in user only if userId is set
  useEffect(() => {
    if (userId !== null) {
      dispatch(fetchStoresByUserId()); // Dispatch fetchStoresByUserId without passing userId, it's handled in the thunk
    }
  }, [dispatch, userId]);

  const handleAddStoreClick = () => {
    console.log("Redirect to Add Store page");
    // Handle redirection to the Add Store page if necessary
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">My Stores</h1>
        <button
          className="bg-[#B8902E] text-white py-2 px-4 rounded mt-4"
          onClick={handleAddStoreClick}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store) => (
            <StoreCardAdmin
              key={store.id}
              id={store.id}
              name={store.name}
              image={store.image}
              rating={store.rating || 0} // Default value if missing
              reviews_count={store.reviews_count || 0}
              location={store.location}
              event_planning_categories={store.event_planning_categories || []} // Default value if missing
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

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/reducers/store";
// import { fetchStoresByUserId } from "@/reducers/storeSlice";
// import StoreCardAdmin from "@/components/StoreCardAdmin";
// import { useRouter } from "next/navigation";
// import { User } from "@/types/types";

// const StorePage: React.FC = () => {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const [user, setUser] = useState<User | null>(null);

//   // Fetch stores and state from the Redux store
//   const { stores, loading, error } = useSelector(
//     (state: RootState) => state.stores
//   );

//   useEffect(() => {
//     const fetchUserData = () => {
//       const accessToken = Cookies.get('access_token');
//       if (!accessToken) {
//         router.push("/signin");
//         return;
//       }

//       try {
//         const decodedToken: { id: number; username: string; email: string } = jwtDecode(accessToken);
//         setUser(decodedToken);
//       } catch (err) {
//         console.error('Failed to decode token', err);
//         router.push("/signin");
//       }
//     };

//     fetchUserData();
//   }, [router]);
//   // Fetch user data from the auth slice
//   // const { user } = useSelector((state: RootState) => state.auth);
//   console.log("user", user);

//   useEffect(() => {
//     if (user?.id) {
//       // Fetch the stores for the logged-in user
//       dispatch(fetchStoresByUserId(user.id.toString()));
//     }
//   }, [dispatch, user?.id]);

//   const handleAddStoreClick = () => {
//     router.push("/dashboard/create-store"); // Navigate to the dashboard/create-store page
//   };

//   return (
//     <div className="container mx-auto p-8">
//       <div className="flex justify-between mb-4">
//         <h1 className="text-2xl font-bold mb-4">My Stores</h1>
//         <button
//           className="bg-[#B8902E] text-white py-2 px-4 rounded mt-4"
//           onClick={handleAddStoreClick}
//         >
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
//             <StoreCardAdmin
//               key={store.id}
//               id={store.id}
//               name={store.name}
//               image={store.image}
//               rating={store.rating || 0} // Default values if missing
//               reviews_count={store.reviews_count || 0}
//               location={store.location}
//               event_planning_categories={store.event_planning_categories || []} // Default value if missing
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
