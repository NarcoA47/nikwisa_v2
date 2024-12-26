import { ReactNode } from "react";

/* ================== PRODUCT TYPES ================== */
export interface Product {
  id: number;
  name: string;
  title?: string; // Optional if needed
  description: string;
  price: string;
  image: string;
  stock: number;
  rating: number;
  category: string;
  [x: string]: unknown; // Additional dynamic properties
}

export interface FetchProductsPayload {
  results: Product[];
}

export interface ProductState {
  selectedProduct: Product | null;
  products: Product[];
  topSellingProducts: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  selectedStore: Store | null;
}

/* ================== CATEGORY TYPES ================== */
export interface Category {
  id: number;
  title: string;
  name?: string; // Name if 'title' is unavailable
  slug: string;
  image: string;
}

export interface FetchCategoriesPayload {
  results: Category[];
}

export interface CategoryState {
  categories: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

/* ================== STORE TYPES ================== */
// export interface Store {
//   id: string;
//   name: string;
//   location: string;
//   phoneNumber?: string;
//   whatsappNumber?: string;
//   overview: string;
//   rating: number;
//   reviewsCount: number;
//   image: string;
//   photos: string[];
//   createdAt: string;
//   updatedAt: string;
//   offerings: Offering[];
//   reviews: Review[];
//   wedding_category: number;
// }
export interface Store {
  id: number;
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
  wedding_category: string; // Title of the wedding category, can be null
  categories: string[]; // Array of category titles
  owner: string; // Owner's username
}

export interface StoreState {
  stores: Store[];
  selectedStore: Store | null;
  loading: boolean;
  error: string | null;
}

export interface StoreDetailsHeaderProps {
  store: {
    id: number;
    name: string;
    rating: number;
    reviewsCount: number;
    location: string;
    overview: string;
    image: string;
    phoneNumber?: string;
    whatsappNumber?: string;
    photos: string[];
    reviews?: { id: string; reviewText: string }[];
  };
}

/* ================== REVIEW TYPES ================== */
// Updated Review Interface
export interface Review {
  id: number; // Review ID
  store: number; // Store ID
  user: {
    username: string; // User's username
    profile_image: string; // User's profile image URL
  }; // Nested user object
  rating: number; // Rating given in the review
  comment: string; // Review comment
  createdAt: string; // Date and time the review was created
}

// Updated ReviewState Interface
export interface ReviewState {
  reviews: Review[]; // Array of reviews
  loading: boolean; // Indicates whether the reviews are being fetched
  error: string | null; // Holds any error message, or null if no error
}

// Updated ReviewsTabProps Interface
export interface ReviewsTabProps {
  reviews: Review[]; // Always an array of reviews
}

export interface AddReviewProps {
  onSubmit: (newReview: { rating: number; reviewText: string }) => void;
}

/* ================== OFFERING TYPES ================== */
// export interface Offering {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   createdAt: string;
//   updatedAt: string;
//   phoneNumber?: string;
//   whatsappNumber?: string;
// }
// export interface Offering {
//   id: string; // Ensure IDs are strings
//   name: string;
//   description: string;
//   price: number;
//   image: string | null; // Allow 'image' to be null or a string
//   createdAt?: string;
//   updatedAt?: string;
//   phoneNumber?: string;
//   whatsappNumber?: string;
// }

export interface Offering {
  id: string; // ID as a string
  name: string;
  description: string;
  price: number;
  image: string | null; // Allow null for fallback
  phoneNumber?: string;
  whatsappNumber?: string;
}

export interface OfferingState {
  offerings: Offering[]; // Array of offerings
  loading: boolean; // To track the loading state while fetching, adding, updating, or deleting offerings
  error: string | null; // To store any error message if an action fails
}

// export interface OfferingsTabProps {
//   offerings: Offering[];
// }

export interface OfferingCardProps {
  offering: Offering;
}
export interface OfferingCardProps {
  offering: Offering;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export interface OfferingsCardProps {
  offering: Offering;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

/* ================== USER & AUTH TYPES ================== */

export interface UserProfile {
  id: string;
  user_id: number;
  username: string;
  email: string;
  profile_image: string; // Ensure profile_image is here
  role: string;
}

export interface AuthState {
  user: UserProfile | null;
  role: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

/* ================== SEARCH TYPES ================== */
export interface SearchResult {
  id: string;
  name: string;
  location: string;
  rating: number;
  services: string[];
  image: string;
}

export interface SearchState {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
}

/* ================== WEDDING TYPES ================== */
export interface WeddingProduct {
  location: ReactNode;
  contact: ReactNode;
  id: number;
  title: string;
  description: string;
  price: number;
  reaction: string | null;
  rating: string;
  services: string;
  send_inquiry: string | null;
  category: number;
  subcategory: string | null;
  related_products: number[];
}

export interface WeddingProductState {
  product: WeddingProduct | null;
  categories: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

/* ================== UI COMPONENT TYPES ================== */
export interface AlertProps {
  message: string;
  type: "success" | "danger";
}

export interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

export interface ImageSliderProps {
  photos: string[]; // Array of photo URLs
}

export interface CategoryCardProps {
  id: number;
  name: string;
  image: string;
  url: string;
}

export interface StoreCardProps {
  id: number;
  name: string;
  image: string;
  rating: string; // String rating format
  review_count: number;
  location: string;
  wedding_category: string;
}

export interface OverviewTabProps {
  overview: string;
}

export interface PhotosTabProps {
  serviceName: string;
  photos: string[];
}

export interface OfferingFormProps {
  initialData?: {
    id?: string;
    name: string;
    description: string;
    price: number;
    image: string;
  };
  isEdit?: boolean;
}

/* ================== SIDEBAR STATE ================== */
export interface SidebarState {
  showSidebar: boolean;
}

/* ================== PAGE PROPS ================== */
export interface PageProps {
  params: Promise<{
    category: string;
    id: string;
  }>;
}

export interface ServiceDetailProps {
  name: string;
  rating: number;
  reviews: number;
  location: string;
  mainImage: string;
  description: string;
  phone?: string;
  whatsapp?: string;
}

export interface EventCategory {
  id: number;
  title: string;
  slug: string;
  image: string;
}

export interface City {
  id: number;
  name: string;
  image: string;
  url: string;
}

// import { ReactNode } from "react";

// export interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: string;
//   image: string;
//   stock: number;
//   rating: number;
//   category: string;
// }

// export interface StoreOnboardingProps {
//   storeId?: string; // Optional for update, required for creating new store
// }
// export interface Review {
//   id: string;
//   storeId: string;
//   name: string;
//   image: string;
//   rating: number;
//   reviewText: string;
//   createdAt: string;
// }

// export interface ReviewsTabProps {
//   reviews: {
//     id: string;
//     storeId: string;
//     name: string;
//     image: string;
//     rating: number;
//     reviewText: string;
//     createdAt: string;
//   }[]; // Ensure this is always an array
// }

// export interface UserProfile {
//   id: string;
//   user_id: number;
//   username: string;
//   email: string;
//   role: string;
// }

// export interface Category {
//   id: number;
//   title: string;
//   slug: string;
//   image: string;
// }

// export interface CategoryState {
//   categories: Category[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// export interface Product {
//   [x: string]: unknown;
//   title: string | undefined;
//   id: number;
//   name: string;
//   description: string;
//   price: string;
//   image: string;
//   stock: number;
//   rating: number;
//   category: string;
// }

// export interface Category {
//   id: number;
//   name: string;
//   image: string;
// }

// export interface FetchProductsPayload {
//   results: Product[];
// }

// export interface FetchCategoriesPayload {
//   results: Category[];
// }

// export interface ProductState {
//   selectedProduct: unknown;
//   products: Product[];
//   topSellingProducts: Product[];
//   categories: Category[];
//   loading: boolean;
//   error: string | null;
//   selectedStore: Store | null;
// }

// // Interfaces
// export interface SearchResult {
//   id: string;
//   name: string;
//   location: string;
//   rating: number;
//   services: string[];
//   image: string;
// }

// export interface SearchState {
//   results: SearchResult[];
//   loading: boolean;
//   error: string | null;
// }

// export interface WeddingProduct {
//   location: ReactNode;
//   contact: ReactNode;
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   reaction: string | null;
//   rating: string;
//   services: string;
//   send_inquiry: string | null;
//   category: number;
//   subcategory: string | null;
//   related_products: number[];
// }
// export interface WeddingProductState {
//   product: WeddingProduct | null;
//   categories: Category[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }
// export interface StoreState {
//   stores: Store[];
//   selectedStore: Store | null;
//   loading: boolean;
//   error: string | null;
// }
// export interface SidebarState {
//   showSidebar: boolean;
// }
// export interface AuthState {
//   initialState: { user_id: number; username: string; email: string };
//   role: string | null;
//   access: unknown;
//   user: UserProfile | null;
//   accessToken: string | null;
//   refreshToken: string | null;
//   loading: boolean;
//   error: string | null;
// }

// export interface AlertProps {
//   message: string;
//   type: "success" | "danger";
// }
// export interface Offering {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   createdAt: string;
//   updatedAt: string;
//   phoneNumber?: string; // Optional
//   whatsappNumber?: string; // Optional
// }

// export interface OfferingCardProps {
//   offering: {
//     id: string;
//     name: string;
//     description: string;
//     price: number;
//     image: string;
//     phoneNumber?: string; // Optional property
//     whatsappNumber?: string; // Optional property
//   };
// }
// export interface OfferingsTabProps {
//   offerings: Offering[];
// }

// export interface Store {
//   id: string;
//   name: string;
//   location: string;
//   phoneNumber?: string;
//   whatsappNumber?: string;
//   overview: string;
//   rating: number;
//   reviewsCount: number;
//   image: string;
//   photos: string[];
//   createdAt: string;
//   updatedAt: string;
//   offerings: Offering[];
//   reviews: Review[];
// }

// export interface StoreDetailsHeaderProps {
//   store: {
//     id: string;
//     name: string;
//     rating: number;
//     reviewsCount: number;
//     location: string;
//     overview: string;
//     image: string;
//     phoneNumber?: string;
//     whatsappNumber?: string;
//     photos: string[]; // Array of photo URLs
//     reviewDetails?: { id: string; reviewText: string }[];
//   };
// }

// export interface AddReviewProps {
//   onSubmit: (newReview: { rating: number; reviewText: string }) => void;
// }

// export interface TabNavigationProps {
//   tabs: string[];
//   activeTab: string;
//   onTabClick: (tab: string) => void;
// }
// export interface PageProps {
//   params: Promise<{
//     category: string;
//     id: string;
//   }>;
// }

// export interface ServiceDetailProps {
//   name: string;
//   rating: number;
//   reviews: number;
//   location: string;
//   mainImage: string;
//   description: string;
//   phone?: string;
//   whatsapp?: string;
// }

// export interface EventCategory {
//   id: number;
//   title: string;
//   slug: string;
//   image: string;
// }

// export interface CategoryCardProps {
//   id: number;
//   name: string;
//   image: string;
//   url: string;
// }

// export interface City {
//   id: number;
//   name: string;
//   image: string;
//   url: string;
// }

// export interface OfferingFormProps {
//   initialData?: {
//     id?: string;
//     name: string;
//     description: string;
//     price: number;
//     image: string;
//   };
//   isEdit?: boolean;
// }

// export interface OverviewTabProps {
//   overview: string;
// }

// export interface PhotosTabProps {
//   serviceName: string;
//   photos: string[];
// }
// export interface OfferingsCardProps {
//   offering: {
//     id: string;
//     name: string;
//     description: string;
//     price: number;
//     image: string;
//     phoneNumber: string; // You can remove this if not needed anymore
//     whatsappNumber: string; // You can remove this if not needed anymore
//   };
//   onEdit: (id: string) => void;
//   onDelete: (id: string) => void;
// }

// export interface StoreCardProps {
//   id: number;
//   name: string;
//   image: string;
//   rating: string; // If you're using string for rating, keep it as string
//   review_count: number; // Use number for review count
//   location: string;
// }

// export interface EventCategory {
//   slug: string;
//   id: number;
//   title: string;
//   image: string;
// }

// export interface ImageSliderProps {
//   photos: string[]; // This is an array of photo URLs
// }
