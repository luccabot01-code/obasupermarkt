// ============================================
// MOCK DATA - Categories
// ============================================
// TODO: Replace with Supabase/Database integration
// When migrating to real backend:
// 1. Remove this file
// 2. Import from @/lib/services/categoryService instead
// 3. Update all imports in components

import { Category } from "@/types";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedCategoryValue } from "@/lib/i18n/content";
import { findCategoryIdBySlug, getCanonicalCategorySlug } from "@/lib/i18n/routing";

/** Pexels CDN — `next.config` → images.pexels.com */
export function pexelsPhoto(id: number, w = 800): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}

export const mockCategories: Category[] = [
  {
    id: "cat-001",
    name: "Meyve & Sebze",
    slug: "meyve-sebze",
    description: "Taze ve organik meyve ve sebzeler",
    image: pexelsPhoto(1300972),
    parentId: null,
    sortOrder: 1,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-002",
    name: "Et & Tavuk",
    slug: "et-tavuk",
    description: "Taze et ve tavuk ürünleri",
    image: pexelsPhoto(1207978),
    parentId: null,
    sortOrder: 2,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-003",
    name: "Süt & Kahvaltılık",
    slug: "sut-kahvaltilik",
    description: "Süt ürünleri ve kahvaltılıklar",
    image: pexelsPhoto(4057656),
    parentId: null,
    sortOrder: 3,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-004",
    name: "Ekmek & Fırın",
    slug: "ekmek-firin",
    description: "Taze ekmek ve fırın ürünleri",
    image: pexelsPhoto(209206),
    parentId: null,
    sortOrder: 4,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-005",
    name: "İçecekler",
    slug: "icecekler",
    description: "Meşrubat, su ve diğer içecekler",
    image: pexelsPhoto(4394612),
    parentId: null,
    sortOrder: 5,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-006",
    name: "Atıştırmalık",
    slug: "atistirmalik",
    description: "Cips, çikolata ve atıştırmalıklar",
    image: pexelsPhoto(1908675),
    parentId: null,
    sortOrder: 6,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-007",
    name: "Temel Gıda",
    slug: "temel-gida",
    description: "Pirinç, makarna, yağ ve temel gıda ürünleri",
    image: pexelsPhoto(628728),
    parentId: null,
    sortOrder: 7,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "cat-008",
    name: "Temizlik",
    slug: "temizlik",
    description: "Ev ve kişisel temizlik ürünleri",
    image: pexelsPhoto(4239037),
    parentId: null,
    sortOrder: 8,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

function localizeCategory(category: Category, locale?: Locale): Category {
  return {
    ...category,
    slug: getCanonicalCategorySlug(category.id) ?? category.slug,
    name: getLocalizedCategoryValue(category.id, "name", locale) ?? category.name,
    description:
      getLocalizedCategoryValue(category.id, "description", locale) ?? category.description,
  };
}

export function getAllCategories(locale?: Locale): Category[] {
  return [...mockCategories]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((category) => localizeCategory(category, locale));
}

// Helper function to get category by slug
export function getCategoryBySlug(slug: string, locale?: Locale): Category | undefined {
  const categoryId =
    mockCategories.find((cat) => cat.slug === slug)?.id ??
    (locale ? findCategoryIdBySlug(slug, locale) : undefined);
  const category = categoryId
    ? mockCategories.find((cat) => cat.id === categoryId)
    : undefined;
  return category ? localizeCategory(category, locale) : undefined;
}

// Helper function to get category by ID
export function getCategoryById(id: string, locale?: Locale): Category | undefined {
  const category = mockCategories.find((cat) => cat.id === id);
  return category ? localizeCategory(category, locale) : undefined;
}

// Helper function to get active categories
export function getActiveCategories(locale?: Locale): Category[] {
  return mockCategories
    .filter((cat) => cat.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((category) => localizeCategory(category, locale));
}

/** Ürün sayısı kontrolü server action’da yapılır (`countProductsInCategory` @ products). */
export function adminRemoveCategoryRecord(id: string): boolean {
  const i = mockCategories.findIndex((c) => c.id === id);
  if (i === -1) return false;
  mockCategories.splice(i, 1);
  return true;
}

export function adminPatchCategoryById(id: string, patch: Partial<Pick<Category, "isActive" | "sortOrder">>): boolean {
  const c = mockCategories.find((x) => x.id === id);
  if (!c) return false;
  if (patch.isActive !== undefined) c.isActive = patch.isActive;
  if (patch.sortOrder !== undefined) c.sortOrder = patch.sortOrder;
  c.updatedAt = new Date().toISOString();
  return true;
}
