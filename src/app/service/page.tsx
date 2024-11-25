import React from "react";
import Image from "next/image";
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaShare } from "react-icons/fa";

interface ServiceDetailProps {
  name: string;
  rating: number;
  reviews: number;
  location: string;
  mainImage: string;
  description: string;
  phone?: string;
  whatsapp?: string;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({
  name,
  rating,
  reviews,
  location,
  mainImage,
  description,
  phone,
  whatsapp,
}) => {
  const handlePhoneClick = () => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleWhatsAppClick = () => {
    if (whatsapp) {
      const cleanNumber = whatsapp.replace(/\D/g, "");
      const whatsappUrl = `https://wa.me/${cleanNumber}?text=Hi,%20I%20found%20you%20on%20the%20website%20and%20I'm%20interested%20in%20your%20services`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const handleDirections = () => {
    // Open in Google Maps - you'll need to add proper coordinates
    window.open(
      `https://maps.google.com/?q=${encodeURIComponent(location)}`,
      "_blank"
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: name,
          text: `Check out ${name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-green-800 text-white px-3 py-1 rounded-md text-lg">
            {rating} ★
          </span>
          <span className="text-lg text-gray-600">{reviews} Reviews</span>
        </div>
        <p className="text-gray-600">{location}</p>
      </div>

      {/* Main Image */}
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
        <Image
          src={mainImage}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <button
          onClick={handlePhoneClick}
          className="flex flex-col items-center justify-center p-4"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
            <FaPhone className="text-xl" />
          </div>
          <span className="text-sm">Call Now</span>
        </button>

        <button
          onClick={handleWhatsAppClick}
          className="flex flex-col items-center justify-center p-4"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
            <FaWhatsapp className="text-xl" />
          </div>
          <span className="text-sm">Whatsapp</span>
        </button>

        <button
          onClick={handleDirections}
          className="flex flex-col items-center justify-center p-4"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
            <FaMapMarkerAlt className="text-xl" />
          </div>
          <span className="text-sm">Directions</span>
        </button>

        <button
          onClick={handleShare}
          className="flex flex-col items-center justify-center p-4"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
            <FaShare className="text-xl" />
          </div>
          <span className="text-sm">Share</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex space-x-8">
          <button className="border-b-2 border-black px-4 py-2 text-sm font-medium">
            Overview
          </button>
          <button className="text-gray-500 px-4 py-2 text-sm font-medium">
            Reviews
          </button>
          <button className="text-gray-500 px-4 py-2 text-sm font-medium">
            Services
          </button>
          <button className="text-gray-500 px-4 py-2 text-sm font-medium">
            Photos
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="prose max-w-none">
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* Check Availability Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <button className="w-full bg-amber-600 text-white py-3 rounded-md font-medium hover:bg-amber-700 transition">
          Check Availability
        </button>
      </div>
    </div>
  );
};

// export default ServiceDetail;
// // app/event-planning/[category]/[id]/[serviceId]/page.tsx
// import ServiceDetail from '@/components/ServiceDetail';

// export default function ServiceDetailPage() {
//   // In a real app, you'd fetch this data based on the serviceId
//   const serviceData = {
//     name: "Tifany's Canyon",
//     rating: 4.4,
//     reviews: 13,
//     location: "Plot No 14349 Shimabala, Lusaka",
//     mainImage: "/path-to-your-image.jpg",
//     description: "Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.",
//     phone: "+1234567890",
//     whatsapp: "1234567890"
//   };

//   return <ServiceDetail {...serviceData} />;
// }
