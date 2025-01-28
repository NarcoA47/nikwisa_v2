"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import HeroFilter from "@/components/HeroFilter";
import Categories from "@/components/Categories";
import PopularSearches from "@/components/PopularSearches";
import ExploreCities from "@/components/ExploreCities";
import ExploreCitiesMobile from "@/components/ExploreCitiesMobile";
import EventCategory from "@/components/event-planning/EventCategory";
import RentCategory from "@/components/rent-hire/RentCategory";

const Home: React.FC = () => {
  return (
    <div>
      {/* <SearchBar /> */}
      <HeroFilter />
      <Categories />

      <EventCategory />
      <RentCategory />

      {/* <MiniCategories />
      <MobileCategories /> */}
      <PopularSearches />
      <ExploreCities />
      <ExploreCitiesMobile />
    </div>
  );
};

export default Home;
