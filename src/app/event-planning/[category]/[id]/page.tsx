"use client";

import React, { useEffect, useState } from "react";
import ServiceDetailsHeader from "@/components/event-planning/ServiceDetailsHeader";
import TabNavigation from "@/components/event-planning/TabNavigation";
import { mockData } from "@/data";
import Overview from "@/components/event-planning/tabs/Overview";
import Reviews from "@/components/event-planning/tabs/Reviews";
import Services from "@/components/event-planning/tabs/Services";
import PhotosGallery from "@/components/event-planning/tabs/PhotoGallery";

interface PageProps {
  params: Promise<{
    category: string;
    id: string;
  }>;
}

export default function ServiceDetailPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = useState<{
    category: string;
    id: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<
    "overview" | "reviews" | "services" | "photos"
  >("overview");

  useEffect(() => {
    params.then((unwrappedParams) => setResolvedParams(unwrappedParams));
  }, [params]);

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  const { category, id } = resolvedParams;

  const categoryData = mockData.find((cat) => cat.category === category);
  const service = categoryData?.items.find((item) => item.id === id);

  if (!service) {
    return <div>Service not found</div>;
  }

  // Use the new components for tab content
  const tabContent = {
    overview: <Overview overview={service.overview} />,
    reviews: <Reviews reviewDetails={service.reviewDetails} />,
    services: <Services services={service.services} />,
    photos: (
      <PhotosGallery serviceName={service.name} photos={service.photos} />
    ),
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 my-8">
      <ServiceDetailsHeader service={service} />

      <TabNavigation
        tabs={Object.keys(tabContent) as Array<keyof typeof tabContent>}
        activeTab={activeTab}
        onTabClick={(tab) => setActiveTab(tab)}
      />

      <div className="py-6">{tabContent[activeTab]}</div>
    </div>
  );
}
