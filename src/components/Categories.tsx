import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { fetchCategories } from "@/reducers/categorySlice";
import { RootState, AppDispatch } from "@/reducers/store";

interface EventCategory {
  id: number;
  title: string;
  slug: string;
  image: string;
}

const Categories = () => {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const categoryStatus = useSelector(
    (state: RootState) => state.categories.status
  );
  const error = useSelector((state: RootState) => state.categories.error);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (categoryStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (categoryStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!categories || categories.length === 0) {
    return <div>No categories available.</div>;
  }

  return (
    <section className="my-12">
      {/* Header */}
      <div className="flex justify-between items-center px-4 md:px-0">
        <h3 className="text-xl font-semibold text-gray-800">
          Wedding Planning
        </h3>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-10 gap-4 mt-4 px-4 md:px-0">
        {categories.map((category: EventCategory) => (
          <Link
            href={`/${category.slug}`}
            key={category.id}
            className="flex flex-col items-center text-center"
          >
            {/* Image */}
            <div
              className={`w-8 h-8 sm:w-24 sm:h-24 flex items-center justify-center overflow-hidden
      rounded-lg bg-gray-100 sm:rounded-md sm:border sm:border-gray-300 sm:hover:scale-105 sm:transition sm:duration-300`}
            >
              {/* <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 bg-gray-200 rounded-full flex items-center justify-center"> */}
              <Image
                src={`${category.image}`}
                alt={category.title}
                // className="w-full h-full object-cover rounded-full"
                className="object-cover"
                width={80} // Adjust width as needed
                height={80} // Adjust height as needed
              />
            </div>
            {/* Name */}
            <span className="mt-2 text-[8px] sm:text-[10px] lg:text-sm text-gray-700">
              {category.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
