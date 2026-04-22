// ============================================
// SERVICE - Promotion Service
// ============================================
// This service layer abstracts data fetching logic.
// TODO: When migrating to real backend:
// 1. Replace mock data imports with actual API calls
// 2. Add error handling and loading states
// 3. Implement caching strategy

import { Promotion, PromotionWithProducts } from "@/types";
import {
  getActivePromotions as mockGetActivePromotions,
  getFeaturedPromotions as mockGetFeaturedPromotions,
  getPromotionBySlug as mockGetPromotionBySlug,
  getPromotionById as mockGetPromotionById,
  getPromotionWithProducts as mockGetPromotionWithProducts,
  getAllPromotions as mockGetAllPromotions,
  calculateDiscountedPrice as mockCalculateDiscountedPrice,
  formatPromotionValue as mockFormatPromotionValue,
} from "@/lib/data/promotions";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get all promotions
 * TODO: Replace with actual API call: GET /api/promotions
 */
export async function getAllPromotions(): Promise<Promotion[]> {
  await delay(200);
  return mockGetAllPromotions();
}

/**
 * Get active promotions
 * TODO: Replace with actual API call: GET /api/promotions?active=true
 */
export async function getActivePromotions(): Promise<Promotion[]> {
  await delay(200);
  return mockGetActivePromotions();
}

/**
 * Get featured promotions
 * TODO: Replace with actual API call: GET /api/promotions?featured=true&limit=:limit
 */
export async function getFeaturedPromotions(limit: number = 3): Promise<Promotion[]> {
  await delay(200);
  return mockGetFeaturedPromotions(limit);
}

/**
 * Get promotion by slug
 * TODO: Replace with actual API call: GET /api/promotions/:slug
 */
export async function getPromotionBySlug(slug: string): Promise<Promotion | null> {
  await delay(150);
  return mockGetPromotionBySlug(slug) || null;
}

/**
 * Get promotion by ID
 * TODO: Replace with actual API call: GET /api/promotions/:id
 */
export async function getPromotionById(id: string): Promise<Promotion | null> {
  await delay(150);
  return mockGetPromotionById(id) || null;
}

/**
 * Get promotion with products
 * TODO: Replace with actual API call: GET /api/promotions/:slug?includeProducts=true
 */
export async function getPromotionWithProducts(
  slug: string
): Promise<PromotionWithProducts | null> {
  await delay(300);
  return mockGetPromotionWithProducts(slug) || null;
}

/**
 * Calculate discounted price for a product
 * TODO: Replace with actual API call: POST /api/promotions/calculate
 */
export async function calculateDiscountedPrice(
  productId: string,
  quantity: number = 1
): Promise<{ price: number; discount: number; promotion: Promotion | null }> {
  await delay(100);
  return mockCalculateDiscountedPrice(productId, quantity);
}

/**
 * Format promotion value for display
 */
export function formatPromotionValue(promotion: Promotion): string {
  return mockFormatPromotionValue(promotion);
}

/**
 * Create promotion (Admin only)
 * TODO: Replace with actual API call: POST /api/admin/promotions
 */
export async function createPromotion(
  promotionData: Omit<Promotion, "id" | "createdAt" | "updatedAt">
): Promise<Promotion> {
  await delay(400);
  
  const newPromotion: Promotion = {
    ...promotionData,
    id: `promo-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return newPromotion;
}

/**
 * Update promotion (Admin only)
 * TODO: Replace with actual API call: PATCH /api/admin/promotions/:id
 */
export async function updatePromotion(
  id: string,
  promotionData: Partial<Promotion>
): Promise<Promotion> {
  await delay(400);
  
  const existing = await getPromotionById(id);
  if (!existing) throw new Error("Promotion not found");
  
  return {
    ...existing,
    ...promotionData,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Delete promotion (Admin only)
 * TODO: Replace with actual API call: DELETE /api/admin/promotions/:id
 */
export async function deletePromotion(id: string): Promise<void> {
  await delay(300);
  
  const existing = await getPromotionById(id);
  if (!existing) throw new Error("Promotion not found");
}
