export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  stock: number;
  rating: number;
  category: string;
}

export interface ServiceItem {
  id: string; // Add this if not already present
  name: string;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  services: string[];
  phoneNumber?: string;
  whatsappNumber?: string;
}
export interface ServiceItem {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  overview: string; // A brief description of the store or service.
  photos: string[]; // An array of image URLs for the store gallery.
  reviewDetails: {
    name: string; // Name of the reviewer.
    image: string; // Profile image of the reviewer.
    rating: number; // Rating given by the reviewer.
    reviewCount: number; // Number of reviews submitted by the reviewer.
    reviewText: string; // The actual review text.
  }[];
  srvices: {
    id: string; // Unique identifier for the package.
    name: string; // Name of the package.
    description: string; // Description of the package.
    price: number; // Price of the package.
    image: string; // URL of the package image.
  }[];
}

export interface CategoryData {
  category: string;
  items: ServiceItem[];
}
