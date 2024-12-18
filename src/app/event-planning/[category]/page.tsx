"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { fetchWeddingProduct } from "@/reducers/weddingSlice";
import { RootState, AppDispatch } from "@/reducers/store";

const CategoryPage = () => {
  const dispatch: AppDispatch = useDispatch();
  // const navigate = useNavigate();
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
    return null; 
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
        // onClick={() => navigate("/categories")}
        className="text-blue-500 hover:underline"
      >
        Back to Categories
      </button>
    </div>
  );
};

export default CategoryPage;
