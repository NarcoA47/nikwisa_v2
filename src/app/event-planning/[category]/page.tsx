"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchWeddingProduct } from "@/reducers/weddingSlice";
import { RootState, AppDispatch } from "@/reducers/store";

const CategoryPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter(); // Use useRouter instead of useNavigation
  const { id } = router.query; // Access query parameters
  const product = useSelector(
    (state: RootState) => state.weddingProduct.product
  );
  const productStatus = useSelector(
    (state: RootState) => state.weddingProduct.status
  );
  const error = useSelector((state: RootState) => state.weddingProduct.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchWeddingProduct(Number(id)));
    }
  }, [dispatch, id]);

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
      </div>
    );
  }

  return (
    <div className="p-1 md:p-6 bg-gray-50 my-8">
      {/* Page Title */}
      {/* <h1 className="text-2xl font-bold text-gray-700">
        {product.title.replace("-", " ").toUpperCase()}
      </h1>

      <div className="mt-6">
        <p>Location: {product.location}</p>
        <p>Contact: {product.contact}</p>
        <p>Services: {product.services}</p>
        <p>Rating: {product.rating}</p>
      </div>

      <Link href="/categories">
        <span className="text-blue-500 hover:underline">Back to Categories</span>
      </Link> */}
    </div>
  );
};

export default CategoryPage;
