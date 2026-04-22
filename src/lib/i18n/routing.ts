import { locales, type Locale } from "./config";

type LocalizedRouteMap = Record<Locale, string>;
type LocalizedSlugEntry = { canonical: string } & Record<Locale, string>;
type LocalizedSlugMap = Record<string, LocalizedSlugEntry>;
type StaticRouteDefinition = {
  canonical: string;
  localized: LocalizedRouteMap;
  aliases?: string[];
};

function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  let normalizedInput = path;
  try {
    normalizedInput = decodeURIComponent(path);
  } catch {
    normalizedInput = path;
  }
  const withLeading = normalizedInput.startsWith("/") ? normalizedInput : `/${normalizedInput}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

function normalizeSlugValue(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[ıİ]/g, "i")
    .replace(/ß/g, "ss")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function slugMatches(localizedSlug: string | undefined, slug: string): boolean {
  if (!localizedSlug) return false;
  return localizedSlug === slug || normalizeSlugValue(localizedSlug) === normalizeSlugValue(slug);
}

const staticRouteMap: Record<string, StaticRouteDefinition> = {
  "/public/products/": {
    canonical: "/products/",
    localized: {
      tr: "/products/",
      de: "/products/",
    },
    aliases: ["/urunler/", "/ürünler/", "/produkte/"],
  },
  "/public/about/": {
    canonical: "/about/",
    localized: {
      tr: "/about/",
      de: "/about/",
    },
    aliases: ["/hakkimizda/", "/hakkımızda/", "/uber-uns/", "/über-uns/"],
  },
  "/public/contact/": {
    canonical: "/contact/",
    localized: {
      tr: "/contact/",
      de: "/contact/",
    },
    aliases: ["/iletisim/", "/iletişim/", "/kontakt/"],
  },
  "/public/privacy-policy/": {
    canonical: "/privacy-policy/",
    localized: {
      tr: "/privacy-policy/",
      de: "/privacy-policy/",
    },
    aliases: ["/gizlilik-politikasi/", "/gizlilik-politikası/", "/datenschutz/"],
  },
  "/public/terms-of-use/": {
    canonical: "/terms-of-use/",
    localized: {
      tr: "/terms-of-use/",
      de: "/terms-of-use/",
    },
    aliases: ["/kullanim-kosullari/", "/kullanım-koşulları/", "/nutzungsbedingungen/"],
  },
  "/public/faq/": {
    canonical: "/faq/",
    localized: {
      tr: "/faq/",
      de: "/faq/",
    },
    aliases: ["/sss/", "/haeufige-fragen/", "/häufige-fragen/"],
  },
};

const categorySlugMap = {
  "cat-001": { canonical: "meyve-sebze", tr: "meyve-sebze", de: "obst-gemuese" },
  "cat-002": { canonical: "et-tavuk", tr: "et-tavuk", de: "fleisch-gefluegel" },
  "cat-003": { canonical: "sut-kahvaltilik", tr: "sut-kahvaltilik", de: "molkerei-fruehstueck" },
  "cat-004": { canonical: "ekmek-firin", tr: "ekmek-firin", de: "brot-backwaren" },
  "cat-005": { canonical: "icecekler", tr: "icecekler", de: "getraenke" },
  "cat-006": { canonical: "atistirmalik", tr: "atistirmalik", de: "knabbereien" },
  "cat-007": { canonical: "temel-gida", tr: "temel-gida", de: "basisprodukte" },
  "cat-008": { canonical: "temizlik", tr: "temizlik", de: "reinigung" },
} satisfies LocalizedSlugMap;

const productSlugMap = {
  "prod-001": { canonical: "organic-apple-granny-smith", tr: "organik-elma-granny-smith", de: "bio-apfel-granny-smith" },
  "prod-002": { canonical: "banana-cavendish", tr: "muz-cavendish", de: "banane-cavendish" },
  "prod-003": { canonical: "vine-tomatoes", tr: "domates-salkım", de: "rispentomaten" },
  "prod-004": { canonical: "cucumber", tr: "salatalık", de: "gurke" },
  "prod-005": { canonical: "lean-ground-beef", tr: "dana-kıyma-az-yağlı", de: "rinderfaschiertes-mager" },
  "prod-006": { canonical: "chicken-breast-fillet", tr: "tavuk-göğsü-fileto", de: "hendlbrustfilet" },
  "prod-007": { canonical: "whole-milk-1l", tr: "tam-yağlı-süt-1l", de: "vollmilch-1l" },
  "prod-008": { canonical: "white-cheese-full-fat", tr: "beyaz-peynir-tam-yağlı", de: "weißkäse-vollfett" },
  "prod-009": { canonical: "bread-loaf", tr: "somun-ekmek", de: "laib-brot" },
  "prod-010": { canonical: "butter-croissant", tr: "kruvasan-tereyağlı", de: "buttercroissant" },
  "prod-011": { canonical: "water-5l", tr: "su-5l", de: "wasser-5l" },
  "prod-012": { canonical: "cola-1l", tr: "cola-1l", de: "cola-1l" },
  "prod-013": { canonical: "potato-chips-classic", tr: "cips-klasik", de: "kartoffelchips-klassisch" },
  "prod-014": { canonical: "milk-chocolate", tr: "çikolata-sütlü", de: "milchschokolade" },
  "prod-015": { canonical: "rice-osmancık", tr: "pirinç-osmancık", de: "reis-osmancık" },
  "prod-016": { canonical: "olive-oil-extra-virgin", tr: "zeytinyağı-naturel-sızma", de: "olivenöl-nativ-extra" },
  "prod-017": { canonical: "liquid-soap-500ml", tr: "sıvı-sabun-500ml", de: "flüssigseife-500ml" },
  "prod-018": { canonical: "laundry-detergent", tr: "çamaşır-deterjanı", de: "waschmittel" },
} satisfies LocalizedSlugMap;

const promotionSlugMap = {
  "promo-001": { canonical: "weekend-discount", tr: "hafta-sonu-indirimi", de: "wochenendrabatt" },
  "promo-002": { canonical: "fruit-vegetable-deal", tr: "meyve-sebze-fırsatı", de: "obst-gemüse-angebot" },
  "promo-003": { canonical: "breakfast-bundle-promotion", tr: "kahvaltı-paketi-kampanyası", de: "frühstückspaket-aktion" },
  "promo-004": { canonical: "big-discount-on-cleaning-products", tr: "temizlik-ürünlerinde-büyük-indirim", de: "großer-rabatt-auf-reinigungsprodukte" },
  "promo-005": { canonical: "snack-festival", tr: "atıştırmalık-festivali", de: "knabberfestival" },
  "promo-006": { canonical: "new-year-cleaning-promotion", tr: "yeni-yıl-temizlik-kampanyası", de: "neujahrsaktion-reinigung" },
  "promo-007": { canonical: "wednesday-meat-day", tr: "çarşamba-et-günü", de: "fleisch-mittwoch" },
  "promo-008": { canonical: "dairy-products-deal", tr: "süt-ürünleri-fırsatı", de: "milchprodukte-angebot" },
  "promo-009": { canonical: "basket-discount-on-drinks", tr: "içeceklerde-sepet-indirimi", de: "warenkorbrabatt-auf-getränke" },
  "promo-010": { canonical: "ice-cream-festival", tr: "dondurma-festivali", de: "eis-festival" },
} satisfies LocalizedSlugMap;

const staticRouteEntries = Object.entries(staticRouteMap)
  .map(([appPath, route]) => {
    const aliases = Array.from(
      new Set(
        [route.canonical, ...Object.values(route.localized), ...(route.aliases ?? [])].map((alias) =>
          normalizePath(alias)
        )
      )
    );

    return {
      appPath: normalizePath(appPath),
      canonical: normalizePath(route.canonical),
      localized: route.localized,
      aliases,
    };
  })
  .sort((a, b) => b.appPath.length - a.appPath.length);

function matchPrefix(path: string, prefix: string): boolean {
  return path === prefix || path.startsWith(prefix);
}

function localizeDetailRemainder(appBase: string, remainder: string, locale: Locale): string {
  const trimmed = remainder.replace(/^\/+|\/+$/g, "");
  if (!trimmed) return remainder;

  const segments = trimmed.split("/").filter(Boolean);
  if (segments.length !== 1) return remainder;

  const [encodedSlug] = segments;
  let rawSlug = encodedSlug;

  try {
    rawSlug = decodeURIComponent(encodedSlug);
  } catch {
    rawSlug = encodedSlug;
  }

  let canonicalSlug: string | undefined;

  if (appBase === "/public/products/") {
    const productId = findProductIdBySlug(rawSlug, locale);
    canonicalSlug = productId ? getCanonicalProductSlug(productId) : undefined;
  }

  return canonicalSlug ? `${canonicalSlug}/` : remainder;
}

export function appPathToExternalPath(path: string, locale: Locale): string {
  const normalized = normalizePath(path);
  if (normalized === "/") return "/";

  for (const route of staticRouteEntries) {
    if (matchPrefix(normalized, route.appPath)) {
      const remainder = localizeDetailRemainder(route.appPath, normalized.slice(route.appPath.length), locale);
      return normalizePath(`${route.canonical}${remainder}`);
    }
  }

  return normalized;
}

export function externalPathToAppPath(path: string, locale: Locale): string {
  const normalized = normalizePath(path);
  if (normalized === "/") return "/";

  for (const route of staticRouteEntries) {
    if (matchPrefix(normalized, route.appPath)) {
      return normalized;
    }
  }

  for (const route of staticRouteEntries) {
    const prioritizedAliases = Array.from(
      new Set([normalizePath(route.localized[locale]), ...route.aliases])
    );

    for (const alias of prioritizedAliases) {
      if (matchPrefix(normalized, alias)) {
        const remainder = normalized.slice(alias.length);
        return normalizePath(`${route.appPath}${remainder}`);
      }
    }
  }

  return normalized;
}

function getCanonicalSlug(map: LocalizedSlugMap, id: string): string | undefined {
  return map[id]?.canonical;
}

function getLocalizedSlug(map: LocalizedSlugMap, id: string, locale: Locale): string | undefined {
  return map[id]?.canonical ?? map[id]?.[locale] ?? getCanonicalSlug(map, id);
}

function findIdByLocalizedSlug(map: LocalizedSlugMap, slug: string, locale: Locale): string | undefined {
  const exactCanonical = Object.entries(map).find(([, localized]) => slugMatches(localized.canonical, slug))?.[0];
  if (exactCanonical) return exactCanonical;

  const exactLocale = Object.entries(map).find(([, localized]) => slugMatches(localized[locale], slug))?.[0];
  if (exactLocale) return exactLocale;

  return Object.entries(map).find(([, localized]) =>
    slugMatches(localized.canonical, slug) ||
    locales.some((activeLocale) => slugMatches(localized[activeLocale], slug))
  )?.[0];
}

export function getCanonicalCategorySlug(id: string): string | undefined {
  return getCanonicalSlug(categorySlugMap, id);
}

export function getCanonicalProductSlug(id: string): string | undefined {
  return getCanonicalSlug(productSlugMap, id);
}

export function getCanonicalPromotionSlug(id: string): string | undefined {
  return getCanonicalSlug(promotionSlugMap, id);
}

export function getLocalizedCategorySlug(id: string, locale: Locale): string | undefined {
  return getLocalizedSlug(categorySlugMap, id, locale);
}

export function getLocalizedProductSlug(id: string, locale: Locale): string | undefined {
  return getLocalizedSlug(productSlugMap, id, locale);
}

export function getLocalizedPromotionSlug(id: string, locale: Locale): string | undefined {
  return getLocalizedSlug(promotionSlugMap, id, locale);
}

export function findCategoryIdBySlug(slug: string, locale: Locale): string | undefined {
  return findIdByLocalizedSlug(categorySlugMap, slug, locale);
}

export function findProductIdBySlug(slug: string, locale: Locale): string | undefined {
  return findIdByLocalizedSlug(productSlugMap, slug, locale);
}

export function findPromotionIdBySlug(slug: string, locale: Locale): string | undefined {
  return findIdByLocalizedSlug(promotionSlugMap, slug, locale);
}
