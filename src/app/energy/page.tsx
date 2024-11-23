"use client";

import CategoriesFilter from "@/components/energy/CategoriesFilter";
import ProductHome from "@/components/energy/ProductHome";
import SpecialOffer from "@/components/energy/SpecialOffer";
import TaskerHome from "@/components/energy/TaskerHome";
import React from "react";

const page = () => {
  return (
    <div>
      <CategoriesFilter />
      <SpecialOffer />
      <TaskerHome />
      <ProductHome />
    </div>
  );
};

export default page;
