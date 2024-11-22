"use client";
import { fetchProducts } from "@/reducers/productSlice";
import { AppDispatch, RootState } from "@/reducers/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductHome = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.product.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className="mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Alternative Energy Products
      </h3>

      {/* Desktop Grid (6 products per row) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-4">
        {products.map((product, index) => (
          <Link href={`/single-product/${product.id}`} key={index}>
            {/* Product Card */}
            <div className="  overflow-hidden flex flex-col border border-gray-500">
              <div className="relative w-full h-1/2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover "
                />
              </div>
              <div className="flex flex-col h-1/2 items-center">
                <h3 className="font-semibold text-sm md:text-xl text-gray-800 mt-2 leading-3">
                  {product.title}
                </h3>
                <h4 className="text-lg text-blue-800 leading-3 ">
                  K{product.price}
                </h4>
                <div className="flex justify-center ">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-400 ${
                        i < product.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* <button className="mt-auto bg-white text-[#D1B898] text-[8px] font-semibold py-1 px-4 rounded-md">
                  Enquire Now
                </button> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductHome;
