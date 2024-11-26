import React from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface CategoryProps {
  id: string;
  categorySlug: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  services: string[];
  phone?: string;
  whatsapp?: string;
}

const Category: React.FC<CategoryProps> = ({
  id,
  categorySlug,
  name,
  rating,
  reviews,
  location,
  image,
  services = [],
  phone,
  whatsapp,
}) => {
  const router = useRouter();

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking phone button
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking WhatsApp button
    if (whatsapp) {
      const cleanNumber = whatsapp.replace(/\D/g, "");
      const whatsappUrl = `https://wa.me/${cleanNumber}?text=Hi,%20I%20found%20you%20on%20the%20website%20and%20I'm%20interested%20in%20your%20services`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const handleCardClick = () => {
    router.push(`/event-planning/${categorySlug}/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden flex flex-col lg:flex-row p-3 md:p-6 cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="lg:w-1/3">
        <img
          src={image}
          alt={name}
          className="w-full h-48 lg:h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 lg:w-2/3 flex flex-col justify-between">
        {/* Name */}
        <h3 className="text-lg md:text-2xl font-semibold text-gray-800">
          {name}
        </h3>
        {/* Location */}
        <p className="text-sm text-gray-500 leading-3">{location}</p>
        {/* Rating and Reviews */}
        <div className="flex items-center gap-2">
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md">
            {rating.toFixed(1)} ★
          </span>
          <span className="text-sm text-gray-600">{reviews} Reviews</span>
        </div>
        {/* Services */}
        {services.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Services:
            </h4>
            <ul className="flex flex-wrap gap-2 text-sm text-gray-600">
              {services.map((service, index) => (
                <li key={index} className="px-3 py-1 bg-gray-100 rounded-md">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={handlePhoneClick}
            disabled={!phone}
            className={`w-1/2 py-2 rounded-md transition flex items-center justify-center gap-2
              ${
                phone
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            <FaPhone size={16} />
            <span>Call</span>
          </button>
          <button
            onClick={handleWhatsAppClick}
            disabled={!whatsapp}
            className={`w-1/2 py-2 rounded-md transition flex items-center justify-center gap-2
              ${
                whatsapp
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            <FaWhatsapp size={16} />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
