import React from "react";
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaShare } from "react-icons/fa";
import ImageSlider from "./ImageSlider";

interface ServiceDetailsHeaderProps {
  service: {
    name: string;
    rating: number;
    reviews: number;
    location: string;
    overview: string;
    image: string;
    phoneNumber?: string;
    whatsappNumber?: string;
    photos: string[]; // Array of photo URLs
  };
}

export default function ServiceDetailsHeader({
  service,
}: ServiceDetailsHeaderProps) {
  return (
    <div className="flex flex-col-reverse md:flex-row md:space-x-8 mb-8">
      {/* Left Section */}
      <div className="md:w-1/2">
        <h1 className="text-2xl md:text-6xl font-bold text-gray-900 mb-2.5">
          {service.name}
        </h1>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-green-800 text-white px-3 py-1 rounded-md text-base md:text-lg">
            {service.rating} ★
          </span>
          <span className="text-base md:text-lg text-gray-600">
            {service.reviews} Reviews
          </span>
        </div>
        <p className="text-gray-600 mb-0.5">{service.location}</p>
        <p className="mb-0.5 text-sm">{service.overview}</p>
        <div className="flex flex-col md:flex-row-reverse items-center md:space-x-4 ">
          {/* Check Availability Button */}
          <button className="w-full md:w-[33%] bg-amber-600 text-white py-2.5 rounded-md font-medium hover:bg-amber-700 transition">
            Check Availability
          </button>

          {/* Contact Options */}
          <div className="grid grid-cols-4 gap-4 my-6 w-full md:w-2/3">
            <ContactButton
              icon={FaPhone}
              label="Call"
              onClick={() =>
                (window.location.href = `tel:${service.phoneNumber}`)
              }
            />
            <ContactButton
              icon={FaWhatsapp}
              label="WhatsApp"
              onClick={() => {
                const cleanNumber = service.whatsappNumber?.replace(/\D/g, "");
                window.open(
                  `https://wa.me/${cleanNumber}?text=Hi,%20I'm%20interested%20in%20your%20services`,
                  "_blank"
                );
              }}
            />
            <ContactButton
              icon={FaMapMarkerAlt}
              label="Directions"
              onClick={() =>
                window.open(
                  `https://maps.google.com/?q=${encodeURIComponent(
                    service.location
                  )}`,
                  "_blank"
                )
              }
            />
            <ContactButton
              icon={FaShare}
              label="Share"
              onClick={() =>
                navigator.share?.({
                  title: service.name,
                  text: service.name,
                  url: window.location.href,
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Image Section */}
      <ImageSlider photos={service.photos} />
    </div>
  );
}

function ContactButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col h-16 w-16 md:h-24 md:w-24 items-center justify-center p-4 rounded-lg bg-gray-100 sm:rounded-md sm:border sm:border-gray-300"
    >
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-1">
        <Icon className="text-xl md:text-3xl" />
      </div>
      <span className="text-[10px] md:text-base">{label}</span>
    </button>
  );
}
