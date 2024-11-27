"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeddingProduct } from "@/reducers/weddingSlice";
import { RootState, AppDispatch } from "@/reducers/store";
// import Category from "@/components/event-planning/Category";

type Params = {
  category: string;
};

const CategoryPage = ({ params }: { params: Params }) => {
  const dispatch: AppDispatch = useDispatch();
  const { category } = params;

  const product = useSelector((state: RootState) => state.weddingProduct.product);
  const productStatus = useSelector((state: RootState) => state.weddingProduct.status);
  const error = useSelector((state: RootState) => state.weddingProduct.error);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const productId = parseInt(category, 4);
    if (!isNaN(productId)) {
      dispatch(fetchWeddingProduct(productId));
    }
  }, [dispatch, category]);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  if (productStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (productStatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold text-red-500">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="p-1 md:p-6 bg-gray-50 my-8">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-700">
        {product.product_title.replace("-", " ").toUpperCase()}
      </h1>

      {/* Product Details */}
      <div className="mt-6">
        <p>Location: {product.location}</p>
        <p>Contact: {product.contact}</p>
        <p>Services: {product.services}</p>
        <p>Rating: {product.rating}</p>
        {/* Add more product details as needed */}
      </div>
    </div>
  );
};

export default CategoryPage;