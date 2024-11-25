"use client";

import { use } from "react"; // Import React.use
import Category from "@/components/event-planning/Category";
import { mockData } from "@/data";

type Params = {
  category: string;
};

const CategoryPage = ({ params }: { params: Params }) => {
  // Use React.use() to unwrap the promise and cast params to the correct type
  const { category } = use(params); // Now params is of type Params

  const currentCategory = mockData.find((cat) => cat.category === category);

  if (!currentCategory) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold text-red-500">Category not found</h1>
      </div>
    );
  }

  return (
    <div className="p-1 md:p-6 bg-gray-50 my-8">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-700">
        {currentCategory.category.replace("-", " ").toUpperCase()}
      </h1>

      {/* Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {currentCategory.items.map((item, index) => (
          <Category
            key={item.id || index}
            id={item.id || `${index}`}
            categorySlug={category}
            name={item.name}
            rating={item.rating}
            reviews={item.reviews}
            location={item.location}
            image={item.image}
            services={item.services}
            phone={item.phoneNumber}
            whatsapp={item.whatsappNumber}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
