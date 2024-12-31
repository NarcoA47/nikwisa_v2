"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/reducers/store";
import { fetchCategories, fetchProducts } from "@/reducers/productSlice";
import SortingBar from "@/components/SortingBar";
import { Product } from "@/types/types";
import Link from "next/link";
// import { RootState, AppDispatch } from '../../../reducers/store';
// import { fetchCategories, fetchProducts } from '../../../reducers/productSlice';
// import SortingBar from '../SortingBar';
// import { Product } from '../../../reducers/productSlice';

export interface Category {
  id: number;
  name: string;
}

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const categories = useSelector(
    (state: RootState) => state.product.categories
  );
  const products = useSelector((state: RootState) => state.product.products);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[0].id); // Set the first category as the default active category
    }
  }, [categories]);

  const handleProductClick = (productId: number) => {
    router.push(`/single-product/${productId}`);
  };

  return (
    <>
      <SortingBar
        items={products}
        callback={(sortedItems: Product[]) => console.log(sortedItems)}
      />
      <div className="flex justify-center py-6">
        <div className="max-w-screen-lg w-full px-4">
          {/* Filter Buttons on Top */}
          <div className="flex flex-wrap justify-center mb-6 gap-2">
            {categories.map((category: Category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 w-auto min-w-[120px] text-center rounded-md border ${
                  activeCategory === category.id
                    ? "bg-yellow-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Render Products Here */}
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
                            i < product.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          className="bg-[#B8902E] text-white py-2 px-4 rounded
                          mt-4" ★
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
        </div>
      </div>
    </>
  );
};

export default Products;
