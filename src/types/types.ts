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

export interface User {
  id: number;
  username: string;
  email: string;
}
export interface Store {
  id: number;
  name: string;
  location: string;
  phone_number?: string;
  whats_app?: string;
  overview: string;
  rating: number;
  reviews_count: number;
  image: string;
  photos: string[]; // If you plan to use photos for the store
  createdAt: string;
  updatedAt: string;
  offerings: Offering[]; // Assuming you have an Offering interface
  reviews: Review[]; // Assuming you have a Review interface
  event_planning_categories: string[]; // Array of event planning category titles
  categories: string[]; // Array of category titles
  owner: string; // Owner's username
  working_hours: string | null; // New field for working hours
  is_verified: boolean; // Boolean indicating if the business is verified
  is_responsive: boolean; // Boolean indicating if the business is responsive
}

export interface StoreState {
  stores: Store[];
  selectedStore: Store | null;
  loading: boolean;
  error: string | null;
  store: Store | null;
}

export interface StoreDetailsHeaderProps {
  store: {
    id: number;
    name: string;
    rating: number;
    reviews_count: number;
    location: string;
    overview: string;
    image: string;
    phone_number?: string;
    whats_app?: string;
    working_hours: string | null; // Adding working_hours
    is_verified: boolean; // Adding is_verified
    is_responsive: boolean; // Adding is_responsive
    event_planning_categories: string[]; // Array of event planning categories
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

export interface ReviewsProps {
  reviews: Review[];
  storeId: number;
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
  storeId: number;
  onSubmit: (newReview: { rating: number; reviewText: string }) => void;
}

/* ================== OFFERING TYPES ================== */

export interface Offering {
  id: number; // ID as a string
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
  storeId: number;
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
  initialState: {
    id: string;
    user_id: number;
    store_id: number;
    username: string;
    email: string;
    role: string;
  };
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

export interface EvenPlanningProductState {
  product: WeddingProduct | null;
  event_categories: Category[];
  stores: Store[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

/* ================== UI COMPONENT TYPES ================== */
// export interface AlertProps {
//   message: string;
//   type: "success" | "danger";
// }

export interface AlertProps {
  message: string;

  type: "success" | "danger" | "error";
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
  rating: number; // String rating format
  reviews_count: number;
  location: string;
  event_planning_categories: string[];
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
    id?: number;
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
