// ============================================
// TYPES - Core TypeScript Definitions
// ============================================
// NOTE: These types are designed to be compatible with future Supabase integration
// When connecting to real backend, these types should match your database schema

// --------------------------------------------
// Category Types
// --------------------------------------------
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryWithProductCount extends Category {
  productCount: number;
}

// --------------------------------------------
// Product Types
// --------------------------------------------
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  price: number;
  compareAtPrice: number | null; // Original price before discount
  sku: string;
  barcode: string | null;
  quantity: number;
  weight: number | null; // in grams
  unit: string; // kg, g, l, ml, piece, etc.
  images: string[];
  categoryId: string;
  category: Category;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductWithPromotion extends Product {
  activePromotion: Promotion | null;
  discountedPrice: number | null;
  discountPercentage: number | null;
}

// --------------------------------------------
// Promotion Types
// --------------------------------------------
export type PromotionType = 'percentage' | 'fixed_amount' | 'buy_x_get_y';

export interface Promotion {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  type: PromotionType;
  value: number; // percentage or fixed amount
  minQuantity: number | null; // for buy_x_get_y
  freeQuantity: number | null; // for buy_x_get_y
  startDate: string;
  endDate: string;
  image: string | null;
  isActive: boolean;
  isFeatured: boolean;
  productIds: string[]; // Products included in this promotion
  categoryIds: string[]; // Categories included in this promotion
  createdAt: string;
  updatedAt: string;
}

export interface PromotionWithProducts extends Promotion {
  products: Product[];
}

// --------------------------------------------
// Store Settings Types
// --------------------------------------------
export interface StoreSettings {
  id: string;
  storeName: string;
  storeTagline: string | null;
  description: string | null;
  logo: string | null;
  favicon: string | null;
  
  // Contact Information
  email: string;
  phone: string;
  whatsapp: string | null;
  
  // Address
  address: string;
  city: string;
  postalCode: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  
  // Business Hours
  businessHours: BusinessHours[];
  
  // Social Media
  socialMedia: SocialMedia;
  
  // SEO
  metaTitle: string | null;
  metaDescription: string | null;
  
  // Features
  features: StoreFeatures;
  
  createdAt: string;
  updatedAt: string;
}

export interface BusinessHours {
  day: number; // 0 = Sunday, 1 = Monday, etc.
  dayName: string;
  open: string; // HH:mm format
  close: string; // HH:mm format
  isOpen: boolean;
  is24Hours: boolean;
}

export interface SocialMedia {
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  youtube: string | null;
  tiktok: string | null;
}

export interface StoreFeatures {
  enableOnlineOrdering: boolean;
  enableReservations: boolean;
  enableDelivery: boolean;
  enablePickup: boolean;
  enableLoyaltyProgram: boolean;
}

// --------------------------------------------
// API Response Types
// --------------------------------------------
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// --------------------------------------------
// Filter & Sort Types
// --------------------------------------------
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  isOnSale?: boolean;
  isFeatured?: boolean;
  tags?: string[];
}

export type SortOption = 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc' | 'newest' | 'popular';

// --------------------------------------------
// Admin Types
// --------------------------------------------
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'editor';
  avatar: string | null;
  lastLoginAt: string | null;
  createdAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  activePromotions: number;
  totalOrders: number; // For future use
  revenue: number; // For future use
  lowStockProducts: number;
  recentOrders: number; // For future use
}

// --------------------------------------------
// Form Types
// --------------------------------------------
export interface ProductFormData {
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice: number | null;
  sku: string;
  barcode: string;
  quantity: number;
  weight: number | null;
  unit: string;
  categoryId: string;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  images: string[];
}

export interface PromotionFormData {
  title: string;
  description: string;
  type: PromotionType;
  value: number;
  minQuantity: number | null;
  freeQuantity: number | null;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isFeatured: boolean;
  productIds: string[];
  categoryIds: string[];
}

export interface CategoryFormData {
  name: string;
  description: string;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface StoreSettingsFormData {
  storeName: string;
  storeTagline: string;
  description: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  businessHours: BusinessHours[];
  socialMedia: SocialMedia;
}
