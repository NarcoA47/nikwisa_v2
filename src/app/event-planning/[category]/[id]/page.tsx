"use client";

import React, { useEffect, useState } from "react";
import TabNavigation from "@/components/event-planning/TabNavigation";
import { mockData } from "@/data";
import Overview from "@/components/event-planning/tabs/Overview";
import Reviews from "@/components/event-planning/tabs/Reviews";
import PhotosGallery from "@/components/event-planning/tabs/PhotoGallery";
import StoreDetailsHeader from "@/components/event-planning/StoreDetailsHeader";
import Offerings from "@/components/event-planning/tabs/Offerings";
import AddReview from "@/components/event-planning/tabs/AddReview";

interface Review {
  id: string;
  storeId: string;
  name: string;
  image: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

interface Offering {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Store {
  id: string;
  name: string;
  location: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  overview: string;
  rating: number;
  reviewsCount: number;
  image: string;
  photos: string[];
  createdAt: string;
  updatedAt: string;
  offerings: Offering[];
  reviews: Review[];
}

interface PageProps {
  params: Promise<{
    category: string;
    id: string;
  }>;
}

export default function StoreDetailPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = useState<{
    category: string;
    id: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<
    "overview" | "reviews" | "offerings" | "photos"
  >("overview");

  const [storeData, setStoreData] = useState<Store | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const unwrappedParams = await params;
      setResolvedParams(unwrappedParams);
    };

    resolveParams();
  }, [params]);

  useEffect(() => {
    if (resolvedParams) {
      const { category, id } = resolvedParams;
      const categoryData = mockData.find((cat) => cat.category === category);
      if (categoryData) {
        const store = categoryData.items.find((item) => item.id === id);
        if (store) {
          setStoreData(store);
        }
      }
    }
  }, [resolvedParams]);

  if (!resolvedParams || !storeData) {
    return <div className="text-center">Loading...</div>;
  }

  const { category, id } = resolvedParams;

  const tabContent = {
    overview: <Overview overview={storeData.overview} />,
    reviews: (
      <>
        <Reviews reviews={storeData.reviews} />
        <AddReview
          onSubmit={(newReview) => {
            const updatedReviews = [
              ...storeData.reviews,
              {
                id: Date.now().toString(),
                storeId: storeData.id,
                name: "Logged In User", // You can use the logged-in user's name here
                image: "default-image-url",
                rating: newReview.rating,
                reviewText: newReview.reviewText,
                createdAt: new Date().toISOString(),
              },
            ];

            // Update the reviewsCount
            const updatedReviewsCount = updatedReviews.length;

            // Update the rating - calculate the average rating
            const updatedRating =
              updatedReviews.reduce((acc, review) => acc + review.rating, 0) /
              updatedReviewsCount;

            const updatedStore = {
              ...storeData,
              reviews: updatedReviews,
              reviewsCount: updatedReviewsCount,
              rating: updatedRating, // Update the rating with the new average
            };

            setStoreData(updatedStore); // Update store data with new review and updated count/rating
          }}
        />
      </>
    ),
    offerings:
      storeData.offerings.length > 0 ? (
        <Offerings offerings={storeData.offerings} />
      ) : (
        <div>No offerings available.</div>
      ),
    photos:
      storeData.photos.length > 0 ? (
        <PhotosGallery serviceName={storeData.name} photos={storeData.photos} />
      ) : (
        <div>No photos available.</div>
      ),
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 my-8">
      <StoreDetailsHeader store={storeData} />
      <TabNavigation
        tabs={Object.keys(tabContent) as Array<keyof typeof tabContent>}
        activeTab={activeTab}
        onTabClick={(tab) =>
          setActiveTab(tab as "overview" | "reviews" | "offerings" | "photos")
        } // Assert correct type here
        aria-label="Store tabs"
      />
      <div className="py-6 ">{tabContent[activeTab]}</div>
    </div>
  );
}
