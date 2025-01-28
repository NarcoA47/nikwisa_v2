import { fetchRentHireCategories } from "@/reducers/rent&hireSlice";
import { AppDispatch, RootState } from "@/reducers/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RentCategory = () => {
  const dispatch: AppDispatch = useDispatch();

  // Retrieve rent & hire categories from Redux store
  const { rent_hire_categories, status, error } = useSelector(
    (state: RootState) => state.rentHireProduct
  );

  useEffect(() => {
    // Fetch all rent & hire categories when the component mounts
    if (status === "idle") {
      dispatch(fetchRentHireCategories());
    }
  }, [dispatch, status]);

  console.log("Rent Hire Categories:", rent_hire_categories);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (rent_hire_categories.length === 0) {
    return <div>No additional categories available.</div>;
  }

  return (
    <section>
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="border border-gray-300 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Rent & Hire Categories
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {rent_hire_categories.map((category) => (
              <Link
                href={
                  category.slug
                    ? `/rent-hire/${category.slug
                        .toLowerCase()
                        .replace(/ /g, "-")}/`
                    : "#"
                }
                key={category.id}
                className={`flex flex-col items-center text-center ${
                  !category.slug ? "cursor-not-allowed opacity-50" : ""
                }`}
                aria-disabled={!category.slug}
              >
                <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-700 mt-2">{category.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-6 mt-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-4">
          Rent & Hire Categories
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {rent_hire_categories.map((category) => (
            <Link
              href={
                category.slug
                  ? `/rent-hire/${category.slug
                      .toLowerCase()
                      .replace(/ /g, "-")}/`
                  : "#"
              }
              key={category.id}
              className={`flex flex-col items-center text-center ${
                !category.slug ? "cursor-not-allowed opacity-50" : ""
              }`}
              aria-disabled={!category.slug}
            >
              <div className="relative w-full h-32 aspect-square rounded-lg overflow-hidden shadow-md">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No Image</span>
                  </div>
                )}
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="absolute bottom-2 mb-0 inset-x-0 text-center text-[10px] text-white">
                    {category.title}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RentCategory;

// import { fetchRentHireCategories } from "@/reducers/rent&hireSlice";
// import { AppDispatch, RootState } from "@/reducers/store";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const RentCategory = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const rent_hire_categories = useSelector(
//     (state: RootState) => state.rentHireProduct.rent_hire_categories
//   );
//   const status = useSelector(
//     (state: RootState) => state.rentHireProduct.status
//   );
//   const error = useSelector((state: RootState) => state.rentHireProduct.error);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     dispatch(fetchRentHireCategories());
//   }, [dispatch]);

//   if (!isClient) return null;
//   if (status === "loading") return <div>Loading...</div>;
//   if (status === "failed") return <div>Error: {error}</div>;
//   if (rent_hire_categories.length === 0)
//     return <div>No additional categories available.</div>;

//   console.log("Rent categories:", rent_hire_categories);
//   return <div>RentCategory</div>;
// };

// export default RentCategory;
