import React from "react";
import HomeSlider from "./home/HomeSlider"; // Import HomeSlider
import HairAdd from "./event-planning/HairAdd";
import HoneymoonAdd from "./event-planning/HoneyMoonAdd";
import PhotographyAd from "./event-planning/PhotographyAdd";

const EventSlider = () => {
  // Create the array of components
  const components = [<HairAdd />, <HoneymoonAdd />, <PhotographyAd />];

  return (
    <section className="hidden md:flex">
      <div className="flex w-full h-2/5 gap-5 mt-10">
        {/* Pass the components array to HomeSlider */}
        <div className="flex bg-slate-800 flex-1">
          {" "}
          <HomeSlider components={components} />
        </div>
        <div className="flex bg-red-800 flex-1">
          <div className="flex w-1/4 bg-slate-300 rounded">1</div>
          <div className="flex w-1/4 bg-slate-400 rounded">2</div>
          <div className="flex w-1/4 bg-slate-500 rounded">3</div>
          <div className="flex w-1/4 bg-slate-600 rounded">4</div>
        </div>

        {/* <div className="flex w-6/12 h-64 gap-5">
         
          <div className="flex w-1/4 bg-slate-300 rounded">1</div>
          <div className="flex w-1/4 bg-slate-400 rounded">2</div>
          <div className="flex w-1/4 bg-slate-500 rounded">3</div>
          <div className="flex w-1/4 bg-slate-600 rounded">4</div>
        </div> */}
      </div>
    </section>
  );
};

export default EventSlider;
