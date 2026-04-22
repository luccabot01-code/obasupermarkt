import type { Locale } from "./config";

type LocalizedText = Record<Locale, string>;
type LocalizedTags = Record<Locale, string[]>;

function pick<T>(localized: Record<Locale, T>, locale?: Locale): T {
  const effectiveLocale = locale ?? "tr";
  return localized[effectiveLocale] ?? localized.tr;
}

export const storeContent = {
  tagline: {
    tr: "Taze Ürünler, Haftalık İndirimler",
    de: "Frische Produkte, wöchentliche Rabatte",
  },
  description: {
    tr: "Oba Supermarkt olarak müşterilerimize kasap reyonundan günlük ekmek ve poğaça çeşitlerine, kahvaltılıklardan temizlik ürünlerine kadar geniş bir ürün yelpazesi sunuyoruz. Taze ürünler, düzenli reyonlar ve günlük ihtiyaçları tek yerde tamamlama kolaylığıyla hizmetinizdeyiz.",
    de: "Als Oba Supermarkt bieten wir unseren Kundinnen und Kunden ein breites Sortiment, von der Fleischtheke über täglich frisches Brot und Poğaça-Sorten bis hin zu Frühstücksartikeln und Reinigungsprodukten. Mit frischen Produkten, geordneten Regalen und der Möglichkeit, den täglichen Bedarf an einem Ort zu decken, sind wir für Sie da.",
  },
  country: {
    tr: "Avusturya",
    de: "Österreich",
  },
  metaTitle: {
    tr: "obasupermarkt",
    de: "obasupermarkt",
  },
  metaDescription: {
    tr: "Oba Supermarkt - Kasap, günlük fırın ürünleri, kahvaltılıklar, temizlik ürünleri ve daha fazlası. Online ürün kataloğumuzu keşfedin!",
    de: "Oba Supermarkt - Fleischtheke, tägliche Backwaren, Frühstücksartikel, Reinigungsprodukte und vieles mehr. Entdecken Sie unseren Online-Produktkatalog!",
  },
} satisfies Record<string, LocalizedText>;

export const categoryContent = {
  "cat-001": {
    name: {
      tr: "Meyve & Sebze",
      de: "Obst & Gemüse",
    },
    description: {
      tr: "Taze ve organik meyve ve sebzeler",
      de: "Frisches und biologisches Obst und Gemüse",
    },
  },
  "cat-002": {
    name: {
      tr: "Et & Tavuk",
      de: "Fleisch & Hähnchen",
    },
    description: {
      tr: "Taze et ve tavuk ürünleri",
      de: "Frische Fleisch- und Hähnchenprodukte",
    },
  },
  "cat-003": {
    name: {
      tr: "Süt & Kahvaltılık",
      de: "Milchprodukte & Frühstücksartikel",
    },
    description: {
      tr: "Süt ürünleri ve kahvaltılıklar",
      de: "Milchprodukte und Frühstücksartikel",
    },
  },
  "cat-004": {
    name: {
      tr: "Ekmek & Fırın",
      de: "Brot & Backwaren",
    },
    description: {
      tr: "Taze ekmek ve fırın ürünleri",
      de: "Frisches Brot und Backwaren",
    },
  },
  "cat-005": {
    name: {
      tr: "İçecekler",
      de: "Getränke",
    },
    description: {
      tr: "Meşrubat, su ve diğer içecekler",
      de: "Erfrischungsgetränke, Wasser und weitere Getränke",
    },
  },
  "cat-006": {
    name: {
      tr: "Atıştırmalık",
      de: "Snacks",
    },
    description: {
      tr: "Cips, çikolata ve atıştırmalıklar",
      de: "Chips, Schokolade und Snacks",
    },
  },
  "cat-007": {
    name: {
      tr: "Temel Gıda",
      de: "Grundnahrungsmittel",
    },
    description: {
      tr: "Pirinç, makarna, yağ ve temel gıda ürünleri",
      de: "Reis, Nudeln, Öl und Grundnahrungsmittel",
    },
  },
  "cat-008": {
    name: {
      tr: "Temizlik",
      de: "Reinigung",
    },
    description: {
      tr: "Ev ve kişisel temizlik ürünleri",
      de: "Reinigungsprodukte für Haushalt und Körperpflege",
    },
  },
} satisfies Record<string, { name: LocalizedText; description: LocalizedText }>;

export const productContent = {
  "prod-001": {
    name: { tr: "Organik Elma (Granny Smith)", de: "Bio-Apfel (Granny Smith)"},
    description: {
      tr: "Taze ve organik Granny Smith elmalar. Vitamin deposu, sağlıklı atıştırmalık.",
      de: "Frische und biologische Granny-Smith-Äpfel. Reich an Vitaminen, ein gesunder Snack.",
    },
    shortDescription: { tr: "Taze organik elma", de: "Frischer Bio-Apfel"},
    tags: {
      tr: ["organik", "meyve", "sağlıklı"],
      de: ["bio", "obst", "gesund"],
    },
    metaTitle: { tr: "Organik Elma - Oba Supermarkt", de: "Bio-Apfel - Oba Supermarkt"},
    metaDescription: { tr: "Taze organik Granny Smith elmalar", de: "Frische biologische Granny-Smith-Äpfel"},
  },
  "prod-002": {
    name: { tr: "Muz (Cavendish)", de: "Banane (Cavendish)"},
    description: {
      tr: "Olgun ve tatlı Cavendish muzları. Potasyum kaynağı.",
      de: "Reife und süße Cavendish-Bananen. Eine Kaliumquelle.",
    },
    shortDescription: { tr: "Taze muz", de: "Frische Banane"},
    tags: { tr: ["meyve", "potasyum", "enerji"], de: ["obst", "kalium", "energie"]},
    metaTitle: { tr: "Muz - Oba Supermarkt", de: "Banane - Oba Supermarkt"},
    metaDescription: { tr: "Taze Cavendish muzları", de: "Frische Cavendish-Bananen"},
  },
  "prod-003": {
    name: { tr: "Domates (Salkım)", de: "Rispentomaten"},
    description: {
      tr: "Taze salkım domatesler. Salata ve yemekler için ideal.",
      de: "Frische Rispentomaten. Ideal für Salate und Gerichte.",
    },
    shortDescription: { tr: "Taze salkım domates", de: "Frische Rispentomaten"},
    tags: { tr: ["sebze", "domates", "taze"], de: ["gemüse", "tomate", "frisch"]},
    metaTitle: { tr: "Domates - Oba Supermarkt", de: "Rispentomaten - Oba Supermarkt"},
    metaDescription: { tr: "Taze salkım domatesler", de: "Frische Rispentomaten"},
  },
  "prod-004": {
    name: { tr: "Salatalık", de: "Gurke"},
    description: {
      tr: "Taze ve gevrek salatalıklar. Yaz salatalarının vazgeçilmezi.",
      de: "Frische und knackige Gurken. Unverzichtbar für Sommersalate.",
    },
    shortDescription: { tr: "Taze salatalık", de: "Frische Gurke"},
    tags: { tr: ["sebze", "salatalık", "taze"], de: ["gemüse", "gurke", "frisch"]},
    metaTitle: { tr: "Salatalık - Oba Supermarkt", de: "Gurke - Oba Supermarkt"},
    metaDescription: { tr: "Taze gevrek salatalıklar", de: "Frische knackige Gurken"},
  },
  "prod-005": {
    name: { tr: "Dana Kıyma (Az Yağlı)", de: "Rinderhackfleisch (fettarm)"},
    description: {
      tr: "Taze dana kıyma, az yağlı. Günlük çekim.",
      de: "Frisches Rinderhackfleisch, fettarm. Täglich frisch gewolft.",
    },
    shortDescription: { tr: "Az yağlı dana kıyma", de: "Fettarmes Rinderhackfleisch"},
    tags: { tr: ["et", "dana", "kıyma"], de: ["fleisch", "rind", "hackfleisch"]},
    metaTitle: { tr: "Dana Kıyma - Oba Supermarkt", de: "Rinderhackfleisch - Oba Supermarkt"},
    metaDescription: { tr: "Az yağlı taze dana kıyma", de: "Frisches fettarmes Rinderhackfleisch"},
  },
  "prod-006": {
    name: { tr: "Tavuk Göğsü Fileto", de: "Hähnchenbrustfilet"},
    description: {
      tr: "Hijyenik koşullarda hazırlanmış tavuk göğsü fileto.",
      de: "Hähnchenbrustfilet, unter hygienischen Bedingungen vorbereitet.",
    },
    shortDescription: { tr: "Tavuk göğsü fileto", de: "Hähnchenbrustfilet"},
    tags: { tr: ["tavuk", "et", "protein"], de: ["hähnchen", "fleisch", "protein"]},
    metaTitle: { tr: "Tavuk Göğsü - Oba Supermarkt", de: "Hähnchenbrustfilet - Oba Supermarkt"},
    metaDescription: { tr: "Taze tavuk göğsü fileto", de: "Frisches Hähnchenbrustfilet"},
  },
  "prod-007": {
    name: { tr: "Tam Yağlı Süt (1L)", de: "Vollmilch (1L)"},
    description: {
      tr: "Pastörize tam yağlı inek sütü. 1 litre.",
      de: "Pasteurisierte Vollmilch. 1 Liter.",
    },
    shortDescription: { tr: "Tam yağlı süt 1L", de: "Vollmilch 1L"},
    tags: { tr: ["süt", "içecek", "kahvaltı"], de: ["milch", "getränk", "frühstück"]},
    metaTitle: { tr: "Tam Yağlı Süt - Oba Supermarkt", de: "Vollmilch - Oba Supermarkt"},
    metaDescription: { tr: "Pastörize tam yağlı süt 1L", de: "Pasteurisierte Vollmilch 1L"},
  },
  "prod-008": {
    name: { tr: "Beyaz Peynir (Tam Yağlı)", de: "Weißkäse (vollfett)"},
    description: {
      tr: "Geleneksel yöntemlerle üretilmiş tam yağlı beyaz peynir.",
      de: "Vollfetter Weißkäse, der nach traditionellen Methoden hergestellt wurde.",
    },
    shortDescription: { tr: "Tam yağlı beyaz peynir", de: "Vollfetter Weißkäse"},
    tags: { tr: ["peynir", "kahvaltı", "süt ürünü"], de: ["käse", "frühstück", "molkerei"]},
    metaTitle: { tr: "Beyaz Peynir - Oba Supermarkt", de: "Weißkäse - Oba Supermarkt"},
    metaDescription: { tr: "Tam yağlı beyaz peynir", de: "Vollfetter Weißkäse"},
  },
  "prod-009": {
    name: { tr: "Somun Ekmek", de: "Laibbrot"},
    description: {
      tr: "Günlük taze somun ekmek. İçi yumuşak, dışı çıtır.",
      de: "Täglich frisches Brot mit weicher Krume und knuspriger Kruste.",
    },
    shortDescription: { tr: "Taze somun ekmek", de: "Frisches Laibbrot"},
    tags: { tr: ["ekmek", "fırın", "taze"], de: ["brot", "backwaren", "frisch"]},
    metaTitle: { tr: "Somun Ekmek - Oba Supermarkt", de: "Laibbrot - Oba Supermarkt"},
    metaDescription: { tr: "Günlük taze somun ekmek", de: "Täglich frisches Brot"},
  },
  "prod-010": {
    name: { tr: "Kruvasan (Tereyağlı)", de: "Buttercroissant"},
    description: {
      tr: "Fransız usulü tereyağlı kruvasan. Kahvaltının yıldızı.",
      de: "Croissant mit Butter nach französischer Art. Der Star des Frühstücks.",
    },
    shortDescription: { tr: "Tereyağlı kruvasan", de: "Buttercroissant"},
    tags: { tr: ["kruvasan", "fırın", "kahvaltı"], de: ["croissant", "backwaren", "frühstück"]},
    metaTitle: { tr: "Kruvasan - Oba Supermarkt", de: "Buttercroissant - Oba Supermarkt"},
    metaDescription: { tr: "Tereyağlı kruvasan", de: "Buttercroissant"},
  },
  "prod-011": {
    name: { tr: "Su (5L)", de: "Wasser (5L)"},
    description: {
      tr: "Doğal kaynak suyu. 5 litrelik pratik ambalaj.",
      de: "Natürliches Quellwasser. Praktische 5-Liter-Verpackung.",
    },
    shortDescription: { tr: "Doğal kaynak suyu 5L", de: "Natürliches Quellwasser 5L"},
    tags: { tr: ["su", "içecek", "doğal"], de: ["wasser", "getränk", "natürlich"]},
    metaTitle: { tr: "Su 5L - Oba Supermarkt", de: "Wasser 5L - Oba Supermarkt"},
    metaDescription: { tr: "Doğal kaynak suyu 5L", de: "Natürliches Quellwasser 5L"},
  },
  "prod-012": {
    name: { tr: "Cola (1L)", de: "Cola (1L)"},
    description: {
      tr: "Klasik cola tadı. 1 litre.",
      de: "Klassischer Cola-Geschmack. 1 Liter.",
    },
    shortDescription: { tr: "Cola 1L", de: "Cola 1L"},
    tags: { tr: ["meşrubat", "cola", "içecek"], de: ["erfrischungsgetränk", "cola", "getränk"]},
    metaTitle: { tr: "Cola - Oba Supermarkt", de: "Cola - Oba Supermarkt"},
    metaDescription: { tr: "Klasik cola 1L", de: "Klassische Cola 1L"},
  },
  "prod-013": {
    name: { tr: "Cips (Klasik)", de: "Kartoffelchips (klassisch)"},
    description: {
      tr: "Klasik patates cipsi. Aile boyu paket.",
      de: "Klassische Kartoffelchips. Familienpackung.",
    },
    shortDescription: { tr: "Klasik cips", de: "Klassische Kartoffelchips"},
    tags: { tr: ["cips", "atıştırmalık", "abur cubur"], de: ["kartoffelchips", "knabberei", "salzig"]},
    metaTitle: { tr: "Cips - Oba Supermarkt", de: "Kartoffelchips - Oba Supermarkt"},
    metaDescription: { tr: "Klasik patates cipsi", de: "Klassische Kartoffelchips"},
  },
  "prod-014": {
    name: { tr: "Çikolata (Sütlü)", de: "Milchschokolade"},
    description: {
      tr: "Sütlü çikolata. %30 kakao içeriği.",
      de: "Milchschokolade. 30 % Kakaoanteil.",
    },
    shortDescription: { tr: "Sütlü çikolata", de: "Milchschokolade"},
    tags: { tr: ["çikolata", "tatlı", "atıştırmalık"], de: ["schokolade", "süß", "nascherei"]},
    metaTitle: { tr: "Çikolata - Oba Supermarkt", de: "Milchschokolade - Oba Supermarkt"},
    metaDescription: { tr: "Sütlü çikolata", de: "Milchschokolade"},
  },
  "prod-015": {
    name: { tr: "Pirinç (Osmancık)", de: "Reis (Osmancık)"},
    description: {
      tr: "Osmancık pirinç. 1 kg.",
      de: "Osmancık-Reis. 1 kg.",
    },
    shortDescription: { tr: "Osmancık pirinç 1kg", de: "Osmancık-Reis 1kg"},
    tags: { tr: ["pirinç", "bakliyat", "temel gıda"], de: ["reis", "vorrat", "grundnahrungsmittel"]},
    metaTitle: { tr: "Pirinç - Oba Supermarkt", de: "Reis - Oba Supermarkt"},
    metaDescription: { tr: "Osmancık pirinç 1kg", de: "Osmancık-Reis 1kg"},
  },
  "prod-016": {
    name: { tr: "Zeytinyağı (Naturel Sızma)", de: "Olivenöl (nativ extra)"},
    description: {
      tr: "Soğuk sıkım naturel sızma zeytinyağı. 1 litre.",
      de: "Kaltgepresstes natives Olivenöl extra. 1 Liter.",
    },
    shortDescription: { tr: "Naturel sızma zeytinyağı", de: "Natives Olivenöl extra"},
    tags: { tr: ["zeytinyağı", "yağ", "sağlıklı"], de: ["olivenöl", "öl", "gesund"]},
    metaTitle: { tr: "Zeytinyağı - Oba Supermarkt", de: "Olivenöl - Oba Supermarkt"},
    metaDescription: { tr: "Naturel sızma zeytinyağı", de: "Natives Olivenöl extra"},
  },
  "prod-017": {
    name: { tr: "Sıvı Sabun (500ml)", de: "Flüssigseife (500ml)"},
    description: {
      tr: "Antibakteriyel sıvı sabun. 500ml.",
      de: "Antibakterielle Flüssigseife. 500 ml.",
    },
    shortDescription: { tr: "Sıvı sabun 500ml", de: "Flüssigseife 500 ml"},
    tags: { tr: ["sabun", "temizlik", "hijyen"], de: ["seife", "reinigung", "hygiene"]},
    metaTitle: { tr: "Sıvı Sabun - Oba Supermarkt", de: "Flüssigseife - Oba Supermarkt"},
    metaDescription: { tr: "Antibakteriyel sıvı sabun", de: "Antibakterielle Flüssigseife"},
  },
  "prod-018": {
    name: { tr: "Çamaşır Deterjanı", de: "Waschmittel"},
    description: {
      tr: "Konsantre çamaşır deterjanı. 2 kg.",
      de: "Konzentriertes Waschmittel. 2 kg.",
    },
    shortDescription: { tr: "Çamaşır deterjanı 2kg", de: "Waschmittel 2 kg"},
    tags: { tr: ["deterjan", "temizlik", "çamaşır"], de: ["waschmittel", "reinigung", "wäsche"]},
    metaTitle: { tr: "Çamaşır Deterjanı - Oba Supermarkt", de: "Waschmittel - Oba Supermarkt"},
    metaDescription: { tr: "Konsantre çamaşır deterjanı", de: "Konzentriertes Waschmittel"},
  },
} satisfies Record<
  string,
  {
    name: LocalizedText;
    description: LocalizedText;
    shortDescription: LocalizedText;
    tags: LocalizedTags;
    metaTitle: LocalizedText;
    metaDescription: LocalizedText;
  }
>;

export const promotionContent = {
  "promo-001": {
    title: { tr: "Hafta Sonu İndirimi", de: "Wochenendrabatt"},
    description: {
      tr: "Seçili ürünlerde %20'ye varan indirimler! Bu hafta sonu kaçırmayın.",
      de: "Bis zu 20 % Rabatt auf ausgewählte Produkte! Verpassen Sie es dieses Wochenende nicht.",
    },
  },
  "promo-002": {
    title: { tr: "Meyve & Sebze Fırsatı", de: "Obst- & Gemüseangebot"},
    description: {
      tr: "Taze meyve ve sebzelerde özel fiyatlar! Sağlıklı beslenmeyi uygun fiyata yakalayın.",
      de: "Sonderpreise auf frisches Obst und Gemüse! Profitieren Sie von gesunder Ernährung zu einem günstigen Preis.",
    },
  },
  "promo-003": {
    title: { tr: "Kahvaltı Paketi Kampanyası", de: "Frühstückspaket-Aktion"},
    description: {
      tr: "Kahvaltılık ürünlerde 3 al 2 öde! Peynir, zeytin, reçel ve daha fazlası.",
      de: "3 kaufen, 2 bezahlen bei Frühstücksprodukten! Käse, Oliven, Marmelade und mehr.",
    },
  },
  "promo-004": {
    title: { tr: "Temizlik Ürünlerinde Büyük İndirim", de: "Großer Rabatt auf Reinigungsprodukte"},
    description: {
      tr: "Tüm temizlik ürünlerinde 25 EUR ve üzeri alışverişe 5 EUR indirim!",
      de: "5 EUR Rabatt auf alle Reinigungsprodukte bei einem Einkauf ab 25 EUR!",
    },
  },
  "promo-005": {
    title: { tr: "Atıştırmalık Festivali", de: "Snack-Festival"},
    description: {
      tr: "Cips, çikolata ve atıştırmalıklarda %25 indirim! Film gecelerinin vazgeçilmezi.",
      de: "25 % Rabatt auf Chips, Schokolade und Snacks! Unverzichtbar für Filmabende.",
    },
  },
  "promo-006": {
    title: { tr: "Yeni Yıl Temizlik Kampanyası", de: "Neujahrs-Aktion für Reinigungsprodukte"},
    description: {
      tr: "Yeni yıla özel temizlik ürünlerinde %30 indirim!",
      de: "30 % Rabatt auf Reinigungsprodukte zum neuen Jahr!",
    },
  },
  "promo-007": {
    title: { tr: "Çarşamba Et Günü", de: "Mittwoch ist Fleischtag"},
    description: {
      tr: "Her çarşamba taze kırmızı et ve tavukta %18 indirim. Kasap reyonunda geçerli.",
      de: "Jeden Mittwoch 18 % Rabatt auf frisches rotes Fleisch und Hähnchen. Gültig an der Fleischtheke.",
    },
  },
  "promo-008": {
    title: { tr: "Süt Ürünleri Fırsatı", de: "Angebot für Milchprodukte"},
    description: {
      tr: "Yoğurt, peynir ve sütte 3 al 2 öde. Kahvaltıyı tamamlayın.",
      de: "3 kaufen, 2 bezahlen bei Joghurt, Käse und Milch. Machen Sie das Frühstück komplett.",
    },
  },
  "promo-009": {
    title: { tr: "İçeceklerde Sepet İndirimi", de: "Warenkorb-Rabatt auf Getränke"},
    description: {
      tr: "Gazlı içecek ve meyve suyunda 35 EUR ve üzeri alışverişe 6 EUR anında indirim.",
      de: "Sofort 6 EUR Rabatt auf kohlensäurehaltige Getränke und Fruchtsaft bei einem Einkauf ab 35 EUR.",
    },
  },
  "promo-010": {
    title: { tr: "Dondurma Festivali", de: "Eiscreme-Festival"},
    description: {
      tr: "Seçili dondurma ve tatlılarda %22 indirim. Yaz lezzetleri raflarda.",
      de: "22 % Rabatt auf ausgewähltes Eis und Desserts. Sommergeschmack in den Regalen.",
    },
  },
} satisfies Record<string, { title: LocalizedText; description: LocalizedText }>;

export function getLocalizedStoreValue(key: keyof typeof storeContent, locale?: Locale): string {
  return pick(storeContent[key], locale);
}

export function getLocalizedCategoryValue(
  id: string,
  key: keyof (typeof categoryContent)[keyof typeof categoryContent],
  locale?: Locale
): string | undefined {
  if (!locale || locale === "tr") return undefined;
  const entry = categoryContent[id as keyof typeof categoryContent];
  if (!entry) return undefined;
  return pick(entry[key], locale);
}

export function getLocalizedProductValue(
  id: string,
  key: keyof (typeof productContent)[keyof typeof productContent],
  locale?: Locale
): string | string[] | undefined {
  if (!locale || locale === "tr") return undefined;
  const entry = productContent[id as keyof typeof productContent];
  if (!entry) return undefined;
  const localizedValue = entry[key] as Record<Locale, string | string[]>;
  return pick(localizedValue, locale);
}

export function getLocalizedPromotionValue(
  id: string,
  key: keyof (typeof promotionContent)[keyof typeof promotionContent],
  locale?: Locale
): string | undefined {
  if (!locale || locale === "tr") return undefined;
  const entry = promotionContent[id as keyof typeof promotionContent];
  if (!entry) return undefined;
  return pick(entry[key], locale);
}
