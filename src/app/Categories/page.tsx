"use client";

import { useRouter } from "next/router";

const categories = [
  { id: "energy", name: "Energy" },
  { id: "event-planning", name: "Event Planning" },
  { id: "gym", name: "Gym" },
  { id: "mechanic", name: "Mechanic" },
];

const CategoriesPage = () => {
  const router = useRouter();

  const handleCategoryClick = (id: string) => {
    router.push(`/categories/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
