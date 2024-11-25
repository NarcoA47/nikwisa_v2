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

export interface CategoryData {
  category: string;
  items: ServiceItem[];
}
