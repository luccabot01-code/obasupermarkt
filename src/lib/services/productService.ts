// ============================================
// SERVICE - Product Service
// ============================================
// This service layer abstracts data fetching logic.
// TODO: When migrating to real backend:
// 1. Replace mock data imports with actual API calls
// 2. Add error handling and loading states
// 3. Implement caching strategy (React Query/SWR)
// 4. Add pagination support

import {
  Product,
  ProductFilters,
  SortOption,
  PaginatedResponse,
} from "@/types";
import {
  getProductBySlug as mockGetProductBySlug,
  getProductById as mockGetProductById,
  getProductsByCategory as mockGetProductsByCategory,
  getFeaturedProducts as mockGetFeaturedProducts,
  getProductsOnSale as mockGetProductsOnSale,
  getRelatedProducts as mockGetRelatedProducts,
  filterProducts as mockFilterProducts,
  sortProducts as mockSortProducts,
  getAllProducts as mockGetAllProducts,
} from "@/lib/data/products";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get all products
 * TODO: Replace with actual API call
 */
export async function getAllProducts(): Promise<Product[]> {
  await delay(300); // Simulate network delay
  return mockGetAllProducts();
}

/**
 * Get product by slug
 * TODO: Replace with actual API call: GET /api/products/:slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  await delay(200);
  return mockGetProductBySlug(slug) || null;
}

/**
 * Get product by ID
 * TODO: Replace with actual API call: GET /api/products/:id
 */
export async function getProductById(id: string): Promise<Product | null> {
  await delay(200);
  return mockGetProductById(id) || null;
}

/**
 * Get products by category
 * TODO: Replace with actual API call: GET /api/products?category=:categoryId
 */
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  await delay(300);
  return mockGetProductsByCategory(categoryId);
}

/**
 * Get featured products
 * TODO: Replace with actual API call: GET /api/products?featured=true&limit=:limit
 */
export async function getFeaturedProducts(limit: number = 8): Promise<Product[]> {
  await delay(300);
  return mockGetFeaturedProducts(limit);
}

/**
 * Get products on sale
 * TODO: Replace with actual API call: GET /api/products?onSale=true&limit=:limit
 */
export async function getProductsOnSale(limit: number = 8): Promise<Product[]> {
  await delay(300);
  return mockGetProductsOnSale(limit);
}

/**
 * Get related products
 * TODO: Replace with actual API call: GET /api/products/:id/related?limit=:limit
 */
export async function getRelatedProducts(
  productId: string,
  limit: number = 4
): Promise<Product[]> {
  await delay(300);
  return mockGetRelatedProducts(productId, limit);
}

/**
 * Search and filter products with pagination
 * TODO: Replace with actual API call: GET /api/products?search=&category=&page=&limit=&sort=
 */
export async function searchProducts(
  filters: ProductFilters,
  sort: SortOption = "newest",
  page: number = 1,
  limit: number = 12
): Promise<PaginatedResponse<Product>> {
  await delay(400);
  
  let filtered = mockFilterProducts(filters);
  filtered = mockSortProducts(filtered, sort);
  
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = filtered.slice(start, end);
  
  return {
    data: paginatedData,
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

/**
 * Create product (Admin only)
 * TODO: Replace with actual API call: POST /api/admin/products
 */
export async function createProduct(
  productData: Omit<Product, "id" | "createdAt" | "updatedAt">
): Promise<Product> {
  await delay(500);
  // Mock implementation - in real app, this would call the API
  const newProduct: Product = {
    ...productData,
    id: `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return newProduct;
}

/**
 * Update product (Admin only)
 * TODO: Replace with actual API call: PATCH /api/admin/products/:id
 */
export async function updateProduct(
  id: string,
  productData: Partial<Product>
): Promise<Product> {
  await delay(500);
  // Mock implementation
  const existing = await getProductById(id);
  if (!existing) throw new Error("Product not found");
  
  return {
    ...existing,
    ...productData,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Delete product (Admin only)
 * TODO: Replace with actual API call: DELETE /api/admin/products/:id
 */
export async function deleteProduct(id: string): Promise<void> {
  await delay(400);
  // Mock implementation
  const existing = await getProductById(id);
  if (!existing) throw new Error("Product not found");
  // In real app, this would delete from database
}
