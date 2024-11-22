"use client";
import React, { useState } from "react";
import Image from "next/image";

const ProductPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className=" px-4 pt-8 pb-16">
      {/* Main Product Section */}
      <div className="flex flex-wrap lg:flex-nowrap gap-8 mt-8">
        <div className="flex flex-col w-full lg:w-1/2 space-y-4">
          {/* Thumbnails */}
          <div className="flex space-x-4">
            <Image
              src="/solar-panel.webp"
              alt="Thumbnail"
              width={50}
              height={50}
            />
            <Image
              src="/solar-panel.webp"
              alt="Thumbnail"
              width={50}
              height={50}
            />
            <Image
              src="/solar-panel.webp"
              alt="Thumbnail"
              width={50}
              height={50}
            />
          </div>
          {/* Main Product Image */}
          <Image
            src="/solar-panel.webp"
            alt="Product Image"
            width={500}
            height={600}
          />
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 space-y-4">
          <h1 className="text-4xl font-semibold">415w Jinko Solar Panel</h1>
          <p className="text-2xl font-bold text-gray-700">K2900</p>
          <div className="flex items-center space-x-2">
            <div className="text-yellow-400">★★★★☆</div>
            <p className="text-gray-500">5 Customer Reviews</p>
          </div>
          <p className="text-gray-600 mt-2">
            Setting the bar as one of the loudest speakers in its class, the
            Kilburn is a compact, stout-hearted hero with a well-balanced audio
            which boasts a clear midrange and extended highs for a sound.
          </p>
          <button className="mt-4 px-6 py-2 border border-gray-800 rounded hover:bg-gray-800 hover:text-white transition">
            Add To Cart
          </button>
        </div>
      </div>

      {/* Store Info */}
      <div className="mt-16 flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
        <div className="flex items-center space-x-4 mb-8 lg:mb-0">
          <Image
            src="/solar-panel.webp"
            alt="Store Logo"
            width={300}
            height={300}
          />
          <div>
            <h3 className="text-xl font-semibold">Green Belt Africa</h3>
            <p className="text-gray-500">37 Customer Reviews</p>
            <button className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-500 transition">
              Enter Store
            </button>
          </div>
        </div>

        {/* Tab Section: Description and Reviews */}
        <div className="flex-1">
          <div className="flex space-x-8 border-b-2 pb-2 mb-8">
            <button
              className={`text-xl font-semibold ${
                activeTab === "description"
                  ? "text-yellow-600 border-b-2 border-yellow-600"
                  : ""
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`text-xl font-semibold ${
                activeTab === "reviews"
                  ? "text-yellow-600 border-b-2 border-yellow-600"
                  : ""
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews [5]
            </button>
          </div>

          {/* Description Section */}
          {activeTab === "description" && (
            <div className="text-gray-600">
              <p>
                Setting the bar as one of the loudest speakers in its class, the
                Kilburn is a compact, stout-hearted hero with a well-balanced
                audio which boasts a clear midrange and extended highs for a
                sound.
              </p>
            </div>
          )}

          {/* Reviews Section */}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-bold">Jabulani Charinga</h4>
                <div className="text-yellow-400">★★★★★</div>
                <p className="text-gray-600 mt-2">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form...
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-bold">Ihano Yowela</h4>
                <div className="text-yellow-400">★★★★★</div>
                <p className="text-gray-600 mt-2">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form...
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-bold">Sitatha Kaseba</h4>
                <div className="text-yellow-400">★★★★★</div>
                <p className="text-gray-600 mt-2">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Leave a Comment Section */}
      <div className="mt-16 bg-gray-200 p-8 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold">Leave a Comment</h2>
        <label className="block">
          <span className="text-gray-700">Rating</span>
          <input
            type="number"
            className="mt-1 block w-full p-2 border rounded"
            placeholder="5"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Feedback</span>
          <textarea
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Hi! I'd like to ask about..."
          ></textarea>
        </label>
        <button className="w-full lg:w-1/4 px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
