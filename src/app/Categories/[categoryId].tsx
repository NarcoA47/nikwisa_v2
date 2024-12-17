"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Mock data for demonstration
const mockCategoryData = {
  energy: { title: "Energy Solutions", description: "Details about energy..." },
  "event-planning": {
    title: "Event Planning",
    description: "Details about event planning...",
  },
  gym: { title: "Gym Services", description: "Details about gyms..." },
  mechanic: {
    title: "Mechanic Services",
    description: "Details about mechanics...",
  },
};

const CategoryDetailsPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const [categoryData, setCategoryData] = useState<any>(null);

  useEffect(() => {
    if (categoryId) {
      // Simulate fetching data based on `categoryId`
      const data = mockCategoryData[categoryId as string];
      setCategoryData(data);
    }
  }, [categoryId]);

  if (!categoryData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{categoryData.title}</h1>
      <p className="mt-4">{categoryData.description}</p>
      <button
        onClick={() => router.push("/categories")}
        className="mt-6 text-blue-500 hover:underline"
      >
        Back to Categories
      </button>
    </div>
  );
};

export default CategoryDetailsPage;
