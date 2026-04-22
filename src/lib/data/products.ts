// ============================================
// MOCK DATA - Products
// ============================================
// TODO: Replace with Supabase/Database integration
// When migrating to real backend:
// 1. Remove this file
// 2. Import from @/lib/services/productService instead
// 3. Update all imports in components

import { Product, ProductFilters, SortOption } from "@/types";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedProductValue } from "@/lib/i18n/content";
import { findProductIdBySlug, getCanonicalProductSlug } from "@/lib/i18n/routing";
import { getCategoryById, mockCategories, pexelsPhoto } from "./categories";

export const mockProducts: Product[] = [
  // Meyve & Sebze
  {
    id: "prod-001",
    name: "Organik Elma (Granny Smith)",
    slug: "organik-elma-granny-smith",
    description: "Taze ve organik Granny Smith elmalar. Vitamin deposu, sağlıklı atıştırmalık.",
    shortDescription: "Taze organik elma",
    price: 4.29,
    compareAtPrice: null,
    sku: "ELM-001",
    barcode: "1234567890123",
    quantity: 150,
    weight: 1000,
    unit: "kg",
    images: [pexelsPhoto(6944171)],
    categoryId: "cat-001",
    category: mockCategories[0],
    tags: ["organik", "meyve", "sağlıklı"],
    isActive: true,
    isFeatured: true,
    metaTitle: "Organik Elma - Oba Supermarkt",
    metaDescription: "Taze organik Granny Smith elmalar",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "prod-002",
    name: "Muz (Cavendish)",
    slug: "muz-cavendish",
    description: "Olgun ve tatlı Cavendish muzları. Potasyum kaynağı.",
    shortDescription: "Taze muz",
    price: 1.99,
    compareAtPrice: 2.49,
    sku: "MUZ-001",
    barcode: "1234567890124",
    quantity: 200,
    weight: 1000,
    unit: "kg",
    images: [pexelsPhoto(61127)],
    categoryId: "cat-001",
    category: mockCategories[0],
    tags: ["meyve", "potasyum", "enerji"],
    isActive: true,
    isFeatured: true,
    metaTitle: "Muz - Oba Supermarkt",
    metaDescription: "Taze Cavendish muzları",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "prod-003",
    name: "Domates (Salkım)",
    slug: "domates-salkim",
    description: "Taze salkım domatesler. Salata ve yemekler için ideal.",
    shortDescription: "Taze salkım domates",
    price: 3.29,
    compareAtPrice: null,
    sku: "DOM-001",
    barcode: "1234567890125",
    quantity: 100,
    weight: 1000,
    unit: "kg",
    images: [pexelsPhoto(533360)],
    categoryId: "cat-001",
    category: mockCategories[0],
    tags: ["sebze", "domates", "taze"],
    isActive: true,
    isFeatured: false,
    metaTitle: "Domates - Oba Supermarkt",
    metaDescription: "Taze salkım domatesler",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "prod-004",
    name: "Salatalık",
    slug: "salatalik",
    description: "Taze ve gevrek salatalıklar. Yaz salatalarının vazgeçilmezi.",
    shortDescription: "Taze salatalık",
    price: 2.19,
    compareAtPrice: null,
    sku: "SAL-001",
    barcode: "1234567890126",
    quantity: 80,
    weight: 1000,
    unit: "kg",
    images: [pexelsPhoto(2329440)],
    categoryId: "cat-001",
    category: mockCategories[0],
    tags: ["sebze", "salatalık", "taze"],
    isActive: true,
    isFeatured: false,
    metaTitle: "Salatalık - Oba Supermarkt",
    metaDescription: "Taze gevrek salatalıklar",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  // Et & Tavuk
  {
    id: "prod-005",
    name: "Dana Kıyma (Az Yağlı)",
    slug: "dana-kiyma-az-yagli",
    description: "Taze dana kıyma, az yağlı. Günlük çekim.",
    shortDescription: "Az yağlı dana kıyma",
    price: 11.99,
    compareAtPrice: 13.99,
    sku: "KIY-001",
    barcode: "1234567890127",
    quantity: 50,
    weight: 1000,
    unit: "kg",
    images: [pexelsPhoto(11898916)],
    categoryId: "cat-002",
    category: mockCategories[1],
    tags: ["et", "dana", "kıyma"],
    isActive: true,
    isFeatured: true,
    metaTitle: "Dana Kıyma - Oba Supermarkt",
    metaDescription: "Az yağlı taze dana kıyma",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "prod-006",
    name: "Tavuk Göğsü Fileto",
    slug: "tavuk-gogsu-fileto",
    description: "Hijyenik koşullarda hazırlanmış tavuk göğsü fileto.",
    shortDescription: "Tavuk göğsü fileto",
    price: 10.49,
    compareAtPrice: null,
    sku: "TVK-001",
    barcode: "1234567890128",
    quantity: 75,
    weight: 1000,
    unit: "kg",
    images: [pexelsPhoto(8141334)],
    categoryId: "cat-002",
    category: mockCategories[1],
    tags: ["tavuk", "et", "protein"],
    isActive: true,
    isFeatured: true,
    metaTitle: "Tavuk Göğsü - Oba Supermarkt",
    metaDescription: "Taze tavuk göğsü fileto",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  // Süt & Kahvaltılık
  {
    id: "prod-007",
    name: "Tam Yağlı Süt (1L)",
    slug: "tam-yagli-sut-1l",
    description: "Pastörize tam yağlı inek sütü. 1 litre.",
    shortDescription: "Tam yağlı süt 1L",
    price: 1.29,
    compareAtPrice: null,
    sku: "SUT-001",
    barcode: "1234567890129",
    quantity: 200,
    weight: 1000,
    unit: "piece",
    images: [pexelsPhoto(248412)],
    categoryId: "cat-003",
    category: mockCategories[2],
    tags: ["süt", "içecek", "kahvaltı"],
    isActive: true,
    isFeatured: false,
    metaTitle: "Tam Yağlı Süt - Oba Supermarkt",
    metaDescription: "Pastörize tam yağlı süt 1L",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "prod-008",
    name: "Beyaz Peynir (Tam Yağlı)",
    slug: "beyaz-peynir-tam-yagli",
    description: "Geleneksel yöntemlerle üretilmiş tam yağlı beyaz peynir.",
    shortDescription: "Tam yağlı beyaz peynir",
    price: 9.99,
    compareAtPrice: 11.99,
    sku: "PEY-001",
    barcode: "1234567890130",
    quantity: 60,
    weight: 1000,
    unit: "kg",
    images: [pexelsPhoto(821365)],
    categoryId: "cat-003",
    category: mockCategories[2],
    tags: ["peynir", "kahvaltı", "süt ürünü"],
    isActive: true,
    isFeatured: true,
    metaTitle: "Beyaz Peynir - Oba Supermarkt",
    metaDescription: "Tam yağlı beyaz peynir",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  // Ekmek & Fırın
  {
    id: "prod-009",
    name: "Somun Ekmek",
    slug: "somun-ekmek",
    description: "Günlük taze somun ekmek. İçi yumuşak, dışı çıtır.",
    shortDescription: "Taze somun ekmek",
    price: 2.29,
    compareAtPrice: null,
    sku: "EKM-001",
    barcode: "1234567890131",
    quantity: 100,
    weight: 400,
    unit: "piece",
    images: [pexelsPhoto(1775043)],
    categoryId: "cat-004",
    category: mockCategories[3],
    tags: ["ekmek", "fırın", "taze"],
    isActive: true,
    isFeatured: false,
    metaTitle: "Somun Ekmek - Oba Supermarkt",
    metaDescription: "Günlük taze somun ekmek",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "prod-010",
    name: "Kruvasan (Tereyağlı)",
    slug: "kruvasan-tereyagli",
    description: "Fransız usulü tereyağlı kruvasan. Kahvaltının yıldızı.",
    shortDescription: "Tereyağlı kruvasan",
    price: 1.19,
    compareAtPrice: 1.49,
    sku: "KRV-001",
    barcode: "1234567890132",
    quantity: 40,
    weight: 80,
    unit: "piece",
    images: [pexelsPhoto(4828314)],
    categoryId: "cat-004",
    category: mockCategories[3],
    tags: ["kruvasan", "fırın", "kahvaltı"],
    isActive: true,
    isFeatured: true,
    metaTitle: "Kruvasan - Oba Supermarkt",
    metaDescription: "Tereyağlı kruvasan",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  // İçecekler
  {
    id: "prod-011",
    name: "Su (5L)",
    slug: "su-5l",
    description: "Doğal kaynak suyu. 5 litrelik pratik ambalaj.",
    shortDescription: "Doğal kaynak suyu 5L",
    price: 1.99,
    compareAtPrice: null,
    sku: "SU-001",
    barcode: "1234567890133",
    quantity: 150,
    weight: 5000,
    unit: "piece",
    images: [pexelsPhoto(327096)],
    categoryId: "cat-005",
    category: mockCategories[4],
    tags: ["su", "içecek", "doğal"],
    isActive: true,
    isFeatured: false,
    metaTitle: "Su 5L - Oba Supermarkt",
    metaDescription: "Doğal kaynak suyu 5L",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "prod-012",
    name: "Cola (1L)",
    slug: "cola-1l",
    description: "Klasik cola tadı. 1 litre.",
    shortDescription: "Cola 1L",
    price: 1.09,
    compareAtPrice: 1.49,
    sku: "COL-001",
    barcode: "1234567890134",
    quantity: 120,
    weight: 1000,
    unit: "piece",
    images: [pexelsPhoto(3819965)],
    categoryId: "cat-005",
    category: mockCategories[4],
    tags: ["meşrubat", "cola", "içecek"],
    isActive: true,
    isFeatured: true,
    metaTitle: "Cola - Oba Supermarkt",
    metaDescription: "Klasik cola 1L",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  // Atıştırmalık
  {
    id: "prod-013",
    name: "Cips (Klasik)",
    slug: "cips-klasik",
    description: "Klasik patates cipsi. Aile boyu paket.",
    shortDescription: "Klasik cips",
    price: 2.99,
    compareAtPrice: null,
    sku: "CPS-001",
    barcode: "1234567890135",
    quantity: 80,
    weight: 150,
    unit: "piece",
    images: [pexelsPhoto(1984232)],
    categoryId: "cat-006",
    category: mockCategories[5],
    tags: ["cips", "atıştırmalık", "abur cubur"],
    isActive: true,
    isFeatured: false,
    metaTitle: "Cips - Oba Supermarkt",
    metaDescription: "Klasik patates cipsi",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "prod-014",
    name: "Çikolata (Sütlü)",
    slug: "cikolata-sutlu",
    description: "Sütlü çikolata. %30 kakao içeriği.",
    shortDescription: "Sütlü çikolata",
    price: 1.39,
    compareAtPrice: 1.79,
    sku: "CKL-001",
    barcode: "1234567890136",
    quantity: 100,
    weight: 80,
    unit: "piece",
    images: [pexelsPhoto(918328)],
    categoryId: "cat-006",
    category: mockCategories[5],
    tags: ["çikolata", "tatlı", "atıştırmalık"],
    isActive: true,
    isFeatured: true,
    metaTitle: "Çikolata - Oba Supermarkt",
    metaDescription: "Sütlü çikolata",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  // Temel Gıda
  {
    id: "prod-015",
    name: "Pirinç (Osmancık)",
    slug: "pirinc-osmancik",
    description: "Osmancık pirinç. 1 kg.",
    shortDescription: "Osmancık pirinç 1kg",
    price: 2.49,
    compareAtPrice: null,
    sku: "PRN-001",
    barcode: "1234567890137",
    quantity: 90,
    weight: 1000,
    unit: "piece",
    images: [pexelsPhoto(6118187)],
    categoryId: "cat-007",
    category: mockCategories[6],
    tags: ["pirinç", "bakliyat", "temel gıda"],
    isActive: true,
    isFeatured: false,
    metaTitle: "Pirinç - Oba Supermarkt",
    metaDescription: "Osmancık pirinç 1kg",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "prod-016",
    name: "Zeytinyağı (Naturel Sızma)",
    slug: "zeytinyagi-naturel-sizma",
    description: "Soğuk sıkım naturel sızma zeytinyağı. 1 litre.",
    shortDescription: "Naturel sızma zeytinyağı",
    price: 12.99,
    compareAtPrice: 14.99,
    sku: "ZYA-001",
    barcode: "1234567890138",
    quantity: 50,
    weight: 1000,
    unit: "piece",
    images: [pexelsPhoto(5629986)],
    categoryId: "cat-007",
    category: mockCategories[6],
    tags: ["zeytinyağı", "yağ", "sağlıklı"],
    isActive: true,
    isFeatured: true,
    metaTitle: "Zeytinyağı - Oba Supermarkt",
    metaDescription: "Naturel sızma zeytinyağı",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  // Temizlik
  {
    id: "prod-017",
    name: "Sıvı Sabun (500ml)",
    slug: "sivi-sabun-500ml",
    description: "Antibakteriyel sıvı sabun. 500ml.",
    shortDescription: "Sıvı sabun 500ml",
    price: 2.79,
    compareAtPrice: null,
    sku: "SBN-001",
    barcode: "1234567890139",
    quantity: 120,
    weight: 500,
    unit: "piece",
    images: [pexelsPhoto(4041392)],
    categoryId: "cat-008",
    category: mockCategories[7],
    tags: ["sabun", "temizlik", "hijyen"],
    isActive: true,
    isFeatured: false,
    metaTitle: "Sıvı Sabun - Oba Supermarkt",
    metaDescription: "Antibakteriyel sıvı sabun",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "prod-018",
    name: "Çamaşır Deterjanı",
    slug: "camasir-deterjani",
    description: "Konsantre çamaşır deterjanı. 2 kg.",
    shortDescription: "Çamaşır deterjanı 2kg",
    price: 12.49,
    compareAtPrice: 15.99,
    sku: "DET-001",
    barcode: "1234567890140",
    quantity: 70,
    weight: 2000,
    unit: "piece",
    images: [pexelsPhoto(5217926)],
    categoryId: "cat-008",
    category: mockCategories[7],
    tags: ["deterjan", "temizlik", "çamaşır"],
    isActive: true,
    isFeatured: true,
    metaTitle: "Çamaşır Deterjanı - Oba Supermarkt",
    metaDescription: "Konsantre çamaşır deterjanı",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

function localizeProduct(product: Product, locale?: Locale): Product {
  return {
    ...product,
    slug: getCanonicalProductSlug(product.id) ?? product.slug,
    name: (getLocalizedProductValue(product.id, "name", locale) as string | undefined) ?? product.name,
    description:
      (getLocalizedProductValue(product.id, "description", locale) as string | undefined) ??
      product.description,
    shortDescription:
      (getLocalizedProductValue(product.id, "shortDescription", locale) as string | undefined) ??
      product.shortDescription,
    tags: (getLocalizedProductValue(product.id, "tags", locale) as string[] | undefined) ?? product.tags,
    metaTitle:
      (getLocalizedProductValue(product.id, "metaTitle", locale) as string | undefined) ??
      product.metaTitle,
    metaDescription:
      (getLocalizedProductValue(product.id, "metaDescription", locale) as string | undefined) ??
      product.metaDescription,
    category: getCategoryById(product.categoryId, locale) ?? product.category,
  };
}

// Helper functions
export function getProductBySlug(slug: string, locale?: Locale): Product | undefined {
  const productId =
    mockProducts.find((p) => p.slug === slug)?.id ??
    (locale ? findProductIdBySlug(slug, locale) : undefined);
  const product = productId
    ? mockProducts.find((p) => p.id === productId)
    : undefined;
  return product ? localizeProduct(product, locale) : undefined;
}

export function getProductById(id: string, locale?: Locale): Product | undefined {
  const product = mockProducts.find((p) => p.id === id);
  return product ? localizeProduct(product, locale) : undefined;
}

export function getProductsByCategory(categoryId: string, locale?: Locale): Product[] {
  return mockProducts
    .filter((p) => p.categoryId === categoryId && p.isActive)
    .map((product) => localizeProduct(product, locale));
}

export function getFeaturedProducts(limit: number = 8, locale?: Locale): Product[] {
  return mockProducts
    .filter((p) => p.isFeatured && p.isActive)
    .slice(0, limit)
    .map((product) => localizeProduct(product, locale));
}

export function getProductsOnSale(limit: number = 8, locale?: Locale): Product[] {
  return mockProducts
    .filter((p) => p.compareAtPrice && p.isActive)
    .slice(0, limit)
    .map((product) => localizeProduct(product, locale));
}

export function getRelatedProducts(productId: string, limit: number = 4, locale?: Locale): Product[] {
  return mockProducts
    .filter((p) => p.id !== productId && p.isActive)
    .map((related) => localizeProduct(related, locale))
    .slice(0, limit);
}

export function filterProducts(filters: ProductFilters, locale?: Locale): Product[] {
  let filtered = mockProducts.filter((p) => p.isActive).map((product) => localizeProduct(product, locale));
  
  if (filters.category) {
    filtered = filtered.filter((p) => p.categoryId === filters.category || p.category.slug === filters.category);
  }
  
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= filters.minPrice!);
  }
  
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }
  
  if (filters.isOnSale) {
    filtered = filtered.filter((p) => p.compareAtPrice !== null);
  }
  
  if (filters.isFeatured) {
    filtered = filtered.filter((p) => p.isFeatured);
  }
  
  return filtered;
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  
  switch (sort) {
    case "name_asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name_desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "price_asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "popular":
    default:
      return sorted;
  }
}

export function getAllProducts(locale?: Locale): Product[] {
  const activeProducts = mockProducts.filter((p) => p.isActive);
  return locale ? activeProducts.map((product) => localizeProduct(product, locale)) : activeProducts;
}

export function getProductsForAdmin(locale?: Locale): Product[] {
  return locale ? mockProducts.map((product) => localizeProduct(product, locale)) : [...mockProducts];
}

function touchProductUpdatedAt(p: Product) {
  p.updatedAt = new Date().toISOString();
}

/** Kalıcı silme — bellek içi katalog (Supabase öncesi). */
export function adminDeleteProductById(id: string): boolean {
  const i = mockProducts.findIndex((p) => p.id === id);
  if (i === -1) return false;
  mockProducts.splice(i, 1);
  return true;
}

export function adminDeleteProductsByIds(ids: readonly string[]): number {
  let n = 0;
  for (const id of ids) {
    if (adminDeleteProductById(id)) n += 1;
  }
  return n;
}

export function adminPatchProductById(
  id: string,
  patch: Partial<Pick<Product, "isActive" | "isFeatured" | "quantity" | "price" | "compareAtPrice">>,
): boolean {
  const p = mockProducts.find((x) => x.id === id);
  if (!p) return false;
  if (patch.isActive !== undefined) p.isActive = patch.isActive;
  if (patch.isFeatured !== undefined) p.isFeatured = patch.isFeatured;
  if (patch.quantity !== undefined) p.quantity = patch.quantity;
  if (patch.price !== undefined) p.price = patch.price;
  if (patch.compareAtPrice !== undefined) p.compareAtPrice = patch.compareAtPrice;
  touchProductUpdatedAt(p);
  return true;
}

export function countProductsInCategory(categoryId: string): number {
  return mockProducts.filter((p) => p.categoryId === categoryId).length;
}
