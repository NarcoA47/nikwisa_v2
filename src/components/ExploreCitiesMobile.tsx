"use client";

import React from "react";
import CategoryCard from "./CategoryCard";

interface City {
  id: number;
  name: string;
  img: string;
  url: string;
}

const ExploreCitiesMobile: React.FC = () => {
  const TopCities: City[] = [
    {
      id: 1,
      name: "Lusaka",
      img: "/assets/home/1.png",
      url: "/banquet-hall",
    },
    {
      id: 2,
      name: "Kitwe",
      img: "/assets/home/2.png",
      url: "/banquet-hall",
    },
    {
      id: 3,
      name: "Livingstone",
      img: "/assets/home/3.png",
      url: "/banquet-hall",
    },
    {
      id: 4,
      name: "Ndola",
      img: "/assets/home/4.png",
      url: "/banquet-hall",
    },
  ];
  return (
    <section className="md:hidden  space-y-6 mt-8">
      {/* Category Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Explore Top Cities
      </h2>

      {/* Grid for Cards - 4 per row */}
      <div className="grid grid-cols-4 gap-2">
        {TopCities.map((item) => (
          <CategoryCard
            key={item.id}
            id={item.id}
            name={item.name}
            img={item.img}
            url={item.url}
          />
        ))}
      </div>
    </section>
  );
};

export default ExploreCitiesMobile;
