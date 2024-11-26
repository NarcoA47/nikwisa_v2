import { photos } from "@/data";
import HomeSlider from "./home/HomeSlider";

const EventSlider = () => {
  return (
    <section className="hidden md:flex">
      <div className="flex w-full  h-2/5 gap-5 mt-10">
        <HomeSlider photos={photos} />

        <div className="flex w-6/12 h-64 gap-5">
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
