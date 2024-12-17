"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchWeddingProduct } from "@/reducers/weddingSlice";
import { RootState, AppDispatch } from "@/reducers/store";

const CategoryPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(
    (state: RootState) => state.weddingProduct.product
  );
  const productStatus = useSelector(
    (state: RootState) => state.weddingProduct.status
  );
  const error = useSelector((state: RootState) => state.weddingProduct.error);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      dispatch(fetchWeddingProduct());
    }
  }, [dispatch, isClient]);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  if (productStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (productStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold text-red-500">Product not found</h1>
        <button
          onClick={() => navigate("/categories")}
          className="text-blue-500 hover:underline"
        >
          Back to Categories
        </button>
      </div>
    );
  }

  return (
    <div className="p-1 md:p-6 bg-gray-50 my-8">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-700">
        {product.title
          ? product.title.replace("-", " ").toUpperCase()
          : "No Title"}
      </h1>

      {/* Product Details */}
      <div className="mt-6">
        <p>Location: {product.location}</p>
        <p>Contact: {product.contact}</p>
        <p>Offerings: {product.offerings}</p>
        <p>Rating: {product.rating}</p>
        {/* Add more product details as needed */}
      </div>

      {/* Back to Categories Link */}
      <button
        onClick={() => navigate("/categories")}
        className="text-blue-500 hover:underline"
      >
        Back to Categories
      </button>
    </div>
  );
};

export default CategoryPage;

// "use client";

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";
// import { fetchWeddingProduct } from "@/reducers/weddingSlice";
// import { RootState, AppDispatch } from "@/reducers/store";
// import Head from "next/head";

// const CategoryPage = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const router = useRouter();
//   const product = useSelector(
//     (state: RootState) => state.weddingProduct.product
//   );
//   const productStatus = useSelector(
//     (state: RootState) => state.weddingProduct.status
//   );
//   const error = useSelector((state: RootState) => state.weddingProduct.error);

//   useEffect(() => {
//     dispatch(fetchWeddingProduct());
//   }, [dispatch]);

//   if (productStatus === "loading") {
//     return (
//       <div className="p-4">
//         <div className="animate-pulse">
//           <div className="h-6 bg-gray-200 rounded mb-4"></div>
//           <div className="h-4 bg-gray-200 rounded mb-2"></div>
//         </div>
//       </div>
//     );
//   }

//   if (productStatus === "failed") {
//     return (
//       <div className="p-4">
//         <h1 className="text-xl font-bold text-red-500">
//           Failed to Load Product
//         </h1>
//         <p className="text-gray-600">{error}</p>
//         <button
//           onClick={() => dispatch(fetchWeddingProduct())}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="p-4">
//         <h1 className="text-xl font-bold text-red-500">Product not found</h1>
//         <button
//           onClick={() => router.push("/categories")}
//           className="text-blue-500 hover:underline"
//         >
//           Back to Categories
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-1 md:p-6 bg-gray-50 my-8">
//       <Head>
//         <title>{product.title || "Wedding Product"} - My Website</title>
//       </Head>
//       <h1 className="text-2xl font-bold text-gray-700">
//         {product.title.replace("-", " ").toUpperCase()}
//       </h1>
//       <div className="mt-6">
//         <p>Location: {product.location}</p>
//         <p>Contact: {product.contact}</p>
//         <p>Rating: {product.rating}</p>
//         <div>
//           <h2 className="font-semibold mt-4">Offerings:</h2>
//           {Array.isArray(product.offerings) ? (
//             product.offerings.map((service, index) => (
//               <div key={index} className="p-2 border-b">
//                 <p className="font-medium">{service.name}</p>
//                 <p>{service.description}</p>
//                 <p>Price: ${service.price}</p>
//               </div>
//             ))
//           ) : (
//             <p>No offerings available</p>
//           )}
//         </div>
//       </div>
//       <button
//         onClick={() => router.push("/categories")}
//         className="text-blue-500 hover:underline"
//       >
//         Back to Categories
//       </button>
//     </div>
//   );
// };

// export default CategoryPage;
