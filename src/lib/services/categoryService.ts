// ============================================
// SERVICE - Category Service
// ============================================
// This service layer abstracts data fetching logic.
// TODO: When migrating to real backend:
// 1. Replace mock data imports with actual API calls
// 2. Add error handling and loading states
// 3. Implement caching strategy

import { Category, CategoryWithProductCount } from "@/types";
import {
  mockCategories,
  getCategoryBySlug as mockGetCategoryBySlug,
  getCategoryById as mockGetCategoryById,
  getActiveCategories as mockGetActiveCategories,
} from "@/lib/data/categories";
import { mockProducts } from "@/lib/data/products";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get all categories
 * TODO: Replace with actual API call: GET /api/categories
 */
export async function getAllCategories(): Promise<Category[]> {
  await delay(200);
  return mockCategories;
}

/**
 * Get active categories
 * TODO: Replace with actual API call: GET /api/categories?active=true
 */
export async function getActiveCategories(): Promise<Category[]> {
  await delay(200);
  return mockGetActiveCategories();
}

/**
 * Get category by slug
 * TODO: Replace with actual API call: GET /api/categories/:slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  await delay(150);
  return mockGetCategoryBySlug(slug) || null;
}

/**
 * Get category by ID
 * TODO: Replace with actual API call: GET /api/categories/:id
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  await delay(150);
  return mockGetCategoryById(id) || null;
}

/**
 * Get categories with product count
 * TODO: Replace with actual API call: GET /api/categories?includeCount=true
 */
export async function getCategoriesWithProductCount(): Promise<
  CategoryWithProductCount[]
> {
  await delay(300);
  
  return mockCategories.map((category) => ({
    ...category,
    productCount: mockProducts.filter(
      (p) => p.categoryId === category.id && p.isActive
    ).length,
  }));
}

/**
 * Create category (Admin only)
 * TODO: Replace with actual API call: POST /api/admin/categories
 */
export async function createCategory(
  categoryData: Omit<Category, "id" | "createdAt" | "updatedAt">
): Promise<Category> {
  await delay(400);
  
  const newCategory: Category = {
    ...categoryData,
    id: `cat-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return newCategory;
}

/**
 * Update category (Admin only)
 * TODO: Replace with actual API call: PATCH /api/admin/categories/:id
 */
export async function updateCategory(
  id: string,
  categoryData: Partial<Category>
): Promise<Category> {
  await delay(400);
  
  const existing = await getCategoryById(id);
  if (!existing) throw new Error("Category not found");
  
  return {
    ...existing,
    ...categoryData,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Delete category (Admin only)
 * TODO: Replace with actual API call: DELETE /api/admin/categories/:id
 */
export async function deleteCategory(id: string): Promise<void> {
  await delay(300);
  
  const existing = await getCategoryById(id);
  if (!existing) throw new Error("Category not found");
  
  // Check if category has products
  const hasProducts = mockProducts.some((p) => p.categoryId === id);
  if (hasProducts) {
    throw new Error("Cannot delete category with existing products");
  }
}
