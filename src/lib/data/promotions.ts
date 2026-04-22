// ============================================
// MOCK DATA - Promotions
// ============================================
// TODO: Replace with Supabase/Database integration
// When migrating to real backend:
// 1. Remove this file
// 2. Import from @/lib/services/promotionService instead
// 3. Update all imports in components

import { Promotion, PromotionWithProducts } from "@/types";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedPromotionValue } from "@/lib/i18n/content";
import { findPromotionIdBySlug, getCanonicalPromotionSlug } from "@/lib/i18n/routing";
import { pexelsPhoto } from "./categories";
import { getProductById, mockProducts } from "./products";

export const mockPromotions: Promotion[] = [
  {
    id: "promo-001",
    title: "Hafta Sonu İndirimi",
    slug: "hafta-sonu-indirimi",
    description: "Seçili ürünlerde %20'ye varan indirimler! Bu hafta sonu kaçırmayın.",
    type: "percentage",
    value: 20,
    minQuantity: null,
    freeQuantity: null,
    startDate: "2026-04-01T00:00:00Z",
    endDate: "2026-12-31T23:59:59Z",
    image: pexelsPhoto(3735189, 1200),
    isActive: true,
    isFeatured: true,
    productIds: ["prod-002", "prod-005", "prod-008", "prod-012"],
    categoryIds: [],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "promo-002",
    title: "Meyve & Sebze Fırsatı",
    slug: "meyve-sebze-firsati",
    description: "Taze meyve ve sebzelerde özel fiyatlar! Sağlıklı beslenmeyi uygun fiyata yakalayın.",
    type: "percentage",
    value: 15,
    minQuantity: null,
    freeQuantity: null,
    startDate: "2026-04-01T00:00:00Z",
    endDate: "2026-11-30T23:59:59Z",
    image: pexelsPhoto(264636, 1200),
    isActive: true,
    isFeatured: true,
    productIds: [],
    categoryIds: ["cat-001"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "promo-003",
    title: "Kahvaltı Paketi Kampanyası",
    slug: "kahvalti-paketi-kampanyasi",
    description: "Kahvaltılık ürünlerde 3 al 2 öde! Peynir, zeytin, reçel ve daha fazlası.",
    type: "buy_x_get_y",
    value: 0,
    minQuantity: 3,
    freeQuantity: 1,
    startDate: "2026-04-10T00:00:00Z",
    endDate: "2026-10-31T23:59:59Z",
    image: pexelsPhoto(6294358, 1200),
    isActive: true,
    isFeatured: true,
    productIds: ["prod-007", "prod-008", "prod-009", "prod-010"],
    categoryIds: ["cat-003", "cat-004"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "promo-004",
    title: "Temizlik Ürünlerinde Büyük İndirim",
    slug: "temizlik-urunlerinde-buyuk-indirim",
    description: "Tüm temizlik ürünlerinde 25 EUR ve üzeri alışverişe 5 EUR indirim!",
    type: "fixed_amount",
    value: 5,
    minQuantity: null,
    freeQuantity: null,
    startDate: "2026-04-05T00:00:00Z",
    endDate: "2026-09-30T23:59:59Z",
    image: pexelsPhoto(4239037, 1200),
    isActive: true,
    isFeatured: false,
    productIds: [],
    categoryIds: ["cat-008"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "promo-005",
    title: "Atıştırmalık Festivali",
    slug: "atistirmalik-festivali",
    description: "Cips, çikolata ve atıştırmalıklarda %25 indirim! Film gecelerinin vazgeçilmezi.",
    type: "percentage",
    value: 25,
    minQuantity: null,
    freeQuantity: null,
    startDate: "2026-04-01T00:00:00Z",
    endDate: "2026-08-31T23:59:59Z",
    image: pexelsPhoto(2982177, 1200),
    isActive: true,
    isFeatured: true,
    productIds: ["prod-013", "prod-014"],
    categoryIds: ["cat-006"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "promo-006",
    title: "Yeni Yıl Temizlik Kampanyası",
    slug: "yeni-yil-temizlik-kampanyasi",
    description: "Yeni yıla özel temizlik ürünlerinde %30 indirim!",
    type: "percentage",
    value: 30,
    minQuantity: null,
    freeQuantity: null,
    startDate: "2023-12-25T00:00:00Z",
    endDate: "2024-01-05T23:59:59Z",
    image: pexelsPhoto(6195123, 1200),
    isActive: false,
    isFeatured: false,
    productIds: [],
    categoryIds: ["cat-008"],
    createdAt: "2023-12-01T00:00:00Z",
    updatedAt: "2023-12-01T00:00:00Z",
  },
  {
    id: "promo-007",
    title: "Çarşamba Et Günü",
    slug: "carsamba-et-gunu",
    description:
      "Her çarşamba taze kırmızı et ve tavukta %18 indirim. Kasap reyonunda geçerli.",
    type: "percentage",
    value: 18,
    minQuantity: null,
    freeQuantity: null,
    startDate: "2026-04-01T00:00:00Z",
    endDate: "2026-12-31T23:59:59Z",
    image: pexelsPhoto(1207978, 1200),
    isActive: true,
    isFeatured: true,
    productIds: [],
    categoryIds: ["cat-002"],
    createdAt: "2026-04-01T00:00:00Z",
    updatedAt: "2026-04-01T00:00:00Z",
  },
  {
    id: "promo-008",
    title: "Süt Ürünleri Fırsatı",
    slug: "sut-urunleri-firsati",
    description: "Yoğurt, peynir ve sütte 3 al 2 öde. Kahvaltıyı tamamlayın.",
    type: "buy_x_get_y",
    value: 0,
    minQuantity: 3,
    freeQuantity: 1,
    startDate: "2026-04-01T00:00:00Z",
    endDate: "2026-12-15T23:59:59Z",
    image: pexelsPhoto(773253, 1200),
    isActive: true,
    isFeatured: true,
    productIds: [],
    categoryIds: ["cat-003"],
    createdAt: "2026-04-01T00:00:00Z",
    updatedAt: "2026-04-01T00:00:00Z",
  },
  {
    id: "promo-009",
    title: "İçeceklerde Sepet İndirimi",
    slug: "iceceklerde-sepet-indirimi",
    description: "Gazlı içecek ve meyve suyunda 35 EUR ve üzeri alışverişe 6 EUR anında indirim.",
    type: "fixed_amount",
    value: 6,
    minQuantity: null,
    freeQuantity: null,
    startDate: "2026-04-01T00:00:00Z",
    endDate: "2026-11-15T23:59:59Z",
    image: pexelsPhoto(4394612, 1200),
    isActive: true,
    isFeatured: false,
    productIds: [],
    categoryIds: ["cat-005"],
    createdAt: "2026-04-01T00:00:00Z",
    updatedAt: "2026-04-01T00:00:00Z",
  },
  {
    id: "promo-010",
    title: "Dondurma Festivali",
    slug: "dondurma-festivali",
    description: "Seçili dondurma ve tatlılarda %22 indirim. Yaz lezzetleri raflarda.",
    type: "percentage",
    value: 22,
    minQuantity: null,
    freeQuantity: null,
    startDate: "2026-04-15T00:00:00Z",
    endDate: "2026-09-15T23:59:59Z",
    image: pexelsPhoto(1352274, 1200),
    isActive: true,
    isFeatured: false,
    productIds: [],
    categoryIds: ["cat-006"],
    createdAt: "2026-04-01T00:00:00Z",
    updatedAt: "2026-04-01T00:00:00Z",
  },
];

function localizePromotion(promotion: Promotion, locale?: Locale): Promotion {
  return {
    ...promotion,
    slug: getCanonicalPromotionSlug(promotion.id) ?? promotion.slug,
    title:
      getLocalizedPromotionValue(promotion.id, "title", locale) ?? promotion.title,
    description:
      getLocalizedPromotionValue(promotion.id, "description", locale) ?? promotion.description,
  };
}

// Helper functions
export function getActivePromotions(locale?: Locale): Promotion[] {
  const now = new Date().toISOString();
  return mockPromotions.filter(
    (p) => p.isActive && p.startDate <= now && p.endDate >= now
  ).map((promotion) => localizePromotion(promotion, locale));
}

export function getFeaturedPromotions(limit: number = 3, locale?: Locale): Promotion[] {
  const active = getActivePromotions(locale);
  return active.filter((p) => p.isFeatured).slice(0, limit);
}

export function getPromotionBySlug(slug: string, locale?: Locale): Promotion | undefined {
  const promotionId =
    mockPromotions.find((p) => p.slug === slug)?.id ??
    (locale ? findPromotionIdBySlug(slug, locale) : undefined);
  const promotion = promotionId
    ? mockPromotions.find((p) => p.id === promotionId)
    : undefined;
  return promotion ? localizePromotion(promotion, locale) : undefined;
}

export function getPromotionById(id: string, locale?: Locale): Promotion | undefined {
  const promotion = mockPromotions.find((p) => p.id === id);
  return promotion ? localizePromotion(promotion, locale) : undefined;
}

export function getPromotionWithProducts(slug: string, locale?: Locale): PromotionWithProducts | undefined {
  const promotion = getPromotionBySlug(slug, locale);
  if (!promotion) return undefined;
  
  const products = promotion.productIds
    .map((id) => getProductById(id, locale))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);
  
  // Also include products from categories
  const categoryProducts = promotion.categoryIds.flatMap((catId) =>
    mockProducts
      .filter((p) => p.categoryId === catId && !promotion.productIds.includes(p.id))
      .map((product) => getProductById(product.id, locale))
      .filter((product): product is NonNullable<typeof product> => product !== undefined)
  );
  
  return {
    ...promotion,
    products: [...products, ...categoryProducts],
  };
}

export function getAllPromotions(locale?: Locale): Promotion[] {
  return mockPromotions.map((promotion) => localizePromotion(promotion, locale));
}

// Calculate discounted price for a product
export function calculateDiscountedPrice(
  productId: string,
  quantity: number = 1
): { price: number; discount: number; promotion: Promotion | null } {
  const product = getProductById(productId);
  if (!product) return { price: 0, discount: 0, promotion: null };
  
  const activePromotions = getActivePromotions();
  let bestDiscount = 0;
  let appliedPromotion: Promotion | null = null;
  
  for (const promo of activePromotions) {
    const appliesToProduct = promo.productIds.includes(productId);

    if (!appliesToProduct) continue;
    
    let discount = 0;
    
    switch (promo.type) {
      case "percentage":
        discount = product.price * (promo.value / 100) * quantity;
        break;
      case "fixed_amount":
        discount = Math.min(promo.value * quantity, product.price * quantity);
        break;
      case "buy_x_get_y":
        if (promo.minQuantity && promo.freeQuantity && quantity >= promo.minQuantity) {
          const freeItems = Math.floor(quantity / promo.minQuantity) * promo.freeQuantity;
          discount = product.price * freeItems;
        }
        break;
    }
    
    if (discount > bestDiscount) {
      bestDiscount = discount;
      appliedPromotion = promo;
    }
  }
  
  return {
    price: product.price * quantity - bestDiscount,
    discount: bestDiscount,
    promotion: appliedPromotion,
  };
}

// Format promotion value for display
export function formatPromotionValue(promotion: Promotion): string {
  switch (promotion.type) {
    case "percentage":
      return `%${promotion.value} İndirim`;
    case "fixed_amount":
      return `${promotion.value} EUR Indirim`;
    case "buy_x_get_y":
      return `${promotion.minQuantity} Al ${promotion.freeQuantity} Bedava`;
    default:
      return "";
  }
}

export function adminDeletePromotionById(id: string): boolean {
  const i = mockPromotions.findIndex((p) => p.id === id);
  if (i === -1) return false;
  mockPromotions.splice(i, 1);
  return true;
}

export function adminPatchPromotionById(
  id: string,
  patch: Partial<Pick<Promotion, "isActive" | "isFeatured">>,
): boolean {
  const p = mockPromotions.find((x) => x.id === id);
  if (!p) return false;
  if (patch.isActive !== undefined) p.isActive = patch.isActive;
  if (patch.isFeatured !== undefined) p.isFeatured = patch.isFeatured;
  p.updatedAt = new Date().toISOString();
  return true;
}
