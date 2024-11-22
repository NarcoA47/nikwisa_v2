"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Header from "../components/home/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import HeroFilter from "@/components/HeroFilter";
import Categories from "@/components/Categories";
import MiniCategories from "@/components/MiniCategories";
import PopularSearches from "@/components/PopularSearches";
import ExploreCities from "@/components/ExploreCities";

const Home: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Implement search functionality here
    console.log(`Searching for ${searchQuery} in ${searchLocation}`);
  };

  return (
    <div>
      {/* <SearchBar /> */}
      <HeroFilter />
      <Categories />
      <MiniCategories />
      <PopularSearches />
      <ExploreCities />
    </div>
  );
};

export default Home;
