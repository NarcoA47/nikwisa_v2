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
        <HomeSlider components={components} />

        <div className="flex w-6/12 h-64 gap-5">
          {/* You can add other content here */}
          <div className="flex w-1/4 bg-slate-300 rounded">1</div>
          <div className="flex w-1/4 bg-slate-400 rounded">2</div>
          <div className="flex w-1/4 bg-slate-500 rounded">3</div>
          <div className="flex w-1/4 bg-slate-600 rounded">4</div>
        </div>
      </div>
    </section>
  );
};

export default EventSlider;

// import HomeSlider from "./home/HomeSlider";

// const EventSlider = () => {
//   // Define the components to be used in the slider
//   const components = [
//     <div className="flex w-1/4 bg-slate-300 rounded">Component 1</div>,
//     <div className="flex w-1/4 bg-slate-400 rounded">Component 2</div>,
//     <div className="flex w-1/4 bg-slate-500 rounded">Component 3</div>,
//     <div className="flex w-1/4 bg-slate-600 rounded">Component 4</div>,
//   ];

//   return (
//     <section className="hidden md:flex">
//       <div className="flex w-full h-2/5 gap-5 mt-10">
//         {/* Pass the array of components to HomeSlider */}
//         <HomeSlider components={components} />

//         <div className="flex w-6/12 h-64 gap-5">
//           <div className="flex w-1/4 bg-slate-300 rounded">1</div>
//           <div className="flex w-1/4 bg-slate-400 rounded">2</div>
//           <div className="flex w-1/4 bg-slate-500 rounded">3</div>
//           <div className="flex w-1/4 bg-slate-600 rounded">4</div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EventSlider;

// import { photos } from "@/data";
// import HomeSlider from "./home/HomeSlider";

// const EventSlider = () => {
//   return (
//     <section className="hidden md:flex">
//       <div className="flex w-full  h-2/5 gap-5 mt-10">
//         <HomeSlider photos={photos} />

//         <div className="flex w-6/12 h-64 gap-5">
//           <div className="flex w-1/4 bg-slate-300 rounded">1</div>
//           <div className="flex w-1/4 bg-slate-400 rounded">2</div>
//           <div className="flex w-1/4 bg-slate-500 rounded">3</div>
//           <div className="flex w-1/4 bg-slate-600 rounded">4</div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EventSlider;
