"use client"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import Header from '../components/home/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectFade } from 'swiper/modules';
import { useState } from 'react';

const Home: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Implement search functionality here
    console.log(`Searching for ${searchQuery} in ${searchLocation}`);
  };

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <section className="p-8">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Lusaka"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="border rounded-md px-4 py-2 w-1/4"
          />
          <input
            type="text"
            placeholder="Search in Lusaka"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-md px-4 py-2 w-1/2"
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-600 text-white px-6 py-2 rounded-lg"
          >
            Search
          </button>
        </div>
        <div className="mt-8">
          <Swiper
            modules={[Pagination, Navigation, EffectFade]}
            pagination={{ clickable: true }}
            navigation
            spaceBetween={50}
            slidesPerView={1}
            effect="fade"
          >
            <SwiperSlide>
              <div className="bg-gray-100 p-4 flex flex-col justify-center items-center">
                <img src="/assets/home/1.png" alt="Event" className="h-24 w-24 mb-4" />
                <h2 className="font-bold text-xl text-black text-center">Planning an Event/Wedding?</h2>
                <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg">
                  See More
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-gray-200 p-4 flex flex-col justify-center items-center">
                <img src="/assets/home/1.png" alt="Slide 2" className="h-24 w-24 mb-4" />
                <h2 className="font-bold text-xl text-black text-center">Slide 2</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-gray-200 p-4 flex flex-col justify-center items-center">
                <img src="/assets/home/1.png" alt="Slide 3" className="h-24 w-24 mb-4" />
                <h2 className="font-bold text-xl text-black text-center">Slide 3</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-gray-200 p-4 flex flex-col justify-center items-center">
                <img src="/assets/home/1.png" alt="Slide 4" className="h-24 w-24 mb-4" />
                <h2 className="font-bold text-xl text-black text-center">Slide 4</h2>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Categories Section */}
      <section className="p-8">
        <h2 className="text-xl font-bold mb-4 text-black">Categories</h2>
        <div className="grid grid-cols-6 gap-4">
          {[
            { name: 'Alternative Energy', img: '/assets/home/1.png' },
            { name: 'Wedding/Event Planning', img: '/assets/home/2.png' },
            { name: 'Restaurant', img: '/assets/home/3.png' },
            { name: 'Rent & Hire', img: '/assets/home/4.png' },
            { name: 'Gym', img: '/assets/home/5.png' },
            { name: 'Automobile', img: '/assets/home/6.png' },
            { name: 'Contractors', img: '/assets/home/6.png' }
          ].map((category) => (
            <div key={category.name} className=" text-black text-center">
              <img src={category.img} alt={category.name} className="h-24 w-24 mx-auto" />
              <p className="mt-2">{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Searches */}
      <section className="p-8 bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-black">Popular Searches</h2>
        <div className="grid grid-cols-4 gap-4">
          {['Construction Companies', 'Car Rental', 'Beauty Parlours', 'Mobile Phone Dealers'].map(
            (item) => (
              <div key={item} className="bg-white border rounded-md p-4 text-center text-black">
                <p>{item}</p>
                <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg">
                  Enquire Now
                </button>
              </div>
            )
          )}
        </div>
      </section>

      {/* Explore Cities */}
      <section className="p-8">
        <h2 className="text-xl font-bold mb-4 text-black">Explore Top Cities</h2>
        <div className="grid grid-cols-3 gap-4">
          {['Lusaka', 'Kitwe', 'Livingstone'].map((city) => (
            <div
              key={city}
              className="border rounded-md p-4 text-center text-black bg-gray-100"
            >
              <h3 className="font-bold">{city.toUpperCase()}</h3>
              <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg">
                Explore
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
