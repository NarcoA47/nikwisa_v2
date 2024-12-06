"use client";

import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "@/reducers/productSlice";
import { AppDispatch, RootState } from "@/reducers/store";
import { useDispatch, useSelector } from "react-redux";

const ProductHome = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, error, loading } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center text-lg">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <section>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Alternative Energy Products
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.length === 0 ? (
          <div className="text-center text-lg">No products available</div>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  );
};

export default ProductHome;

// "use client";

// import React, { useEffect } from "react";
// import ProductCard from "./ProductCard";
// import { fetchProducts } from "@/reducers/productSlice";
// import { AppDispatch, RootState } from "@/reducers/store";
// import { useDispatch, useSelector } from "react-redux";

// const ProductHome = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { products, error } = useSelector((state: RootState) => state.product);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   // Loading and Error State Handling
//   if (error) {
//     return <div className="text-center text-lg text-red-500">{error}</div>;
//   }

//   return (
//     <section>
//       <h3 className="text-2xl font-bold text-gray-800 mb-4">
//         Alternative Energy Products
//       </h3>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//         {products.length === 0 ? (
//           <div className="text-center text-lg">No products available</div>
//         ) : (
//           products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         )}
//       </div>
//     </section>
//   );
// };

// export default ProductHome;

// "use client";

// import React, { useEffect } from "react";
// import ProductCard from "./ProductCard";
// import { fetchProducts } from "@/reducers/productSlice";
// import { AppDispatch, RootState } from "@/reducers/store";
// import { useDispatch, useSelector } from "react-redux";

// const ProductHome = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { products, status, error } = useSelector(
//     (state: RootState) => state.product
//   );

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   // Loading, Error, and Empty State Handling
//   if (status === "loading") {
//     return <div className="text-center text-lg">Loading products...</div>;
//   }

//   if (status === "failed") {
//     return <div className="text-center text-lg text-red-500">{error}</div>;
//   }

//   return (
//     <section>
//       <h3 className="text-2xl font-bold text-gray-800 mb-4">
//         Alternative Energy Products
//       </h3>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ProductHome;
