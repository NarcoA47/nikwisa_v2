"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
// import { useState } from "react";
import HeroFilter from "@/components/HeroFilter";
import Categories from "@/components/Categories";
import MiniCategories from "@/components/MiniCategories";
import PopularSearches from "@/components/PopularSearches";
import ExploreCities from "@/components/ExploreCities";
import MobileCategories from "@/components/MobileCategories";
import Services from "@/components/Services";
import ExploreCitiesMobile from "@/components/ExploreCitiesMobile";

const Home: React.FC = () => {
  // const [searchLocation, ] = useState("");
  // const [searchQuery, ] = useState("");

  // const handleSearch = () => {
  //   // Implement search functionality here
  //   console.log(`Searching for ${searchQuery} in ${searchLocation}`);
  // };

  return (
    <div>
      {/* <SearchBar /> */}
      <HeroFilter />
      <Categories />
      <MiniCategories />
      <MobileCategories />
      <PopularSearches />
      <ExploreCities />
      <ExploreCitiesMobile />
    </div>
  );
};

export default Home;
