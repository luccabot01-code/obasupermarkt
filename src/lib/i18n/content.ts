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
    de: "Frische Produkte, Aktionen für jeden Tag",
  },
  description: {
    tr: "Oba Supermarkt olarak müşterilerimize kasap reyonundan günlük ekmek ve poğaça çeşitlerine, kahvaltılıklardan temizlik ürünlerine kadar geniş bir ürün yelpazesi sunuyoruz. Taze ürünler, düzenli reyonlar ve günlük ihtiyaçları tek yerde tamamlama kolaylığıyla hizmetinizdeyiz.",
    de: "Oba Supermarkt bietet ein breites Sortiment – von der Fleischtheke über täglich frisches Brot und Gebäck bis zu Frühstücksartikeln und Reinigungsprodukten. Mit frischen Waren, geordneten Regalen und allem für den täglichen Bedarf sind wir in Wien für Sie da.",
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
    de: "Oba Supermarkt - Fleischtheke, tägliche Backwaren, Frühstücksartikel, Reinigungsprodukte und vieles mehr. Entdecken Sie unseren Produktkatalog online.",
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
      de: "Frisches und organisches Obst und Gemüse",
    },
  },
  "cat-002": {
    name: {
      tr: "Et & Tavuk",
      de: "Fleisch & Geflügel",
    },
    description: {
      tr: "Taze et ve tavuk ürünleri",
      de: "Frische Fleisch- und Geflügelprodukte",
    },
  },
  "cat-003": {
    name: {
      tr: "Süt & Kahvaltılık",
      de: "Molkerei & Frühstück",
    },
    description: {
      tr: "Süt ürünleri ve kahvaltılıklar",
      de: "Molkereiprodukte und Frühstücksartikel",
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
      de: "Knabbereien",
    },
    description: {
      tr: "Cips, çikolata ve atıştırmalıklar",
      de: "Chips, Schokolade und weitere Knabbereien",
    },
  },
  "cat-007": {
    name: {
      tr: "Temel Gıda",
      de: "Basisprodukte",
    },
    description: {
      tr: "Pirinç, makarna, yağ ve temel gıda ürünleri",
      de: "Reis, Pasta, Öle und weitere Basisprodukte",
    },
  },
  "cat-008": {
    name: {
      tr: "Temizlik",
      de: "Reinigung",
    },
    description: {
      tr: "Ev ve kişisel temizlik ürünleri",
      de: "Produkte für Haushalt und persönliche Hygiene",
    },
  },
} satisfies Record<string, { name: LocalizedText; description: LocalizedText }>;

export const productContent = {
  "prod-001": {
    name: { tr: "Organik Elma (Granny Smith)", de: "Bio-Apfel (Granny Smith)"},
    description: {
      tr: "Taze ve organik Granny Smith elmalar. Vitamin deposu, sağlıklı atıştırmalık.",
      de: "Frische Bio-Granny-Smith-Äpfel. Vitaminreich und ideal als gesunde Zwischenmahlzeit.",
    },
    shortDescription: { tr: "Taze organik elma", de: "Frischer Bio-Apfel"},
    tags: {
      tr: ["organik", "meyve", "sağlıklı"],
      de: ["bio", "obst", "gesund"],
    },
    metaTitle: { tr: "Organik Elma - Oba Supermarkt", de: "Bio-Apfel - Oba Supermarkt"},
    metaDescription: { tr: "Taze organik Granny Smith elmalar", de: "Frische Bio-Granny-Smith-Äpfel"},
  },
  "prod-002": {
    name: { tr: "Muz (Cavendish)", de: "Banane (Cavendish)"},
    description: {
      tr: "Olgun ve tatlı Cavendish muzları. Potasyum kaynağı.",
      de: "Reife und süße Cavendish-Bananen. Reich an Kalium.",
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
      de: "Frische Rispentomaten. Ideal für Salate und warme Gerichte.",
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
      de: "Frische und knackige Gurken. Perfekt für sommerliche Salate.",
    },
    shortDescription: { tr: "Taze salatalık", de: "Frische Gurke"},
    tags: { tr: ["sebze", "salatalık", "taze"], de: ["gemüse", "gurke", "frisch"]},
    metaTitle: { tr: "Salatalık - Oba Supermarkt", de: "Gurke - Oba Supermarkt"},
    metaDescription: { tr: "Taze gevrek salatalıklar", de: "Frische knackige Gurken"},
  },
  "prod-005": {
    name: { tr: "Dana Kıyma (Az Yağlı)", de: "Rinderfaschiertes (mager)"},
    description: {
      tr: "Taze dana kıyma, az yağlı. Günlük çekim.",
      de: "Frisches mageres Rinderfaschiertes, täglich frisch vorbereitet.",
    },
    shortDescription: { tr: "Az yağlı dana kıyma", de: "Mageres Rinderfaschiertes"},
    tags: { tr: ["et", "dana", "kıyma"], de: ["fleisch", "rind", "faschiertes"]},
    metaTitle: { tr: "Dana Kıyma - Oba Supermarkt", de: "Rinderfaschiertes - Oba Supermarkt"},
    metaDescription: { tr: "Az yağlı taze dana kıyma", de: "Frisches mageres Rinderfaschiertes"},
  },
  "prod-006": {
    name: { tr: "Tavuk Göğsü Fileto", de: "Hendlbrustfilet"},
    description: {
      tr: "Hijyenik koşullarda hazırlanmış tavuk göğsü fileto.",
      de: "Hendlbrustfilet, hygienisch vorbereitet und frisch verpackt.",
    },
    shortDescription: { tr: "Tavuk göğsü fileto", de: "Hendlbrustfilet"},
    tags: { tr: ["tavuk", "et", "protein"], de: ["geflügel", "fleisch", "protein"]},
    metaTitle: { tr: "Tavuk Göğsü - Oba Supermarkt", de: "Hendlbrustfilet - Oba Supermarkt"},
    metaDescription: { tr: "Taze tavuk göğsü fileto", de: "Frisches Hendlbrustfilet"},
  },
  "prod-007": {
    name: { tr: "Tam Yağlı Süt (1L)", de: "Vollmilch (1L)"},
    description: {
      tr: "Pastörize tam yağlı inek sütü. 1 litre.",
      de: "Pasteurisierte Vollmilch aus Kuhmilch. 1 Liter.",
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
      de: "Vollfetter Weißkäse nach traditioneller Art hergestellt.",
    },
    shortDescription: { tr: "Tam yağlı beyaz peynir", de: "Vollfetter Weißkäse"},
    tags: { tr: ["peynir", "kahvaltı", "süt ürünü"], de: ["käse", "frühstück", "molkerei"]},
    metaTitle: { tr: "Beyaz Peynir - Oba Supermarkt", de: "Weißkäse - Oba Supermarkt"},
    metaDescription: { tr: "Tam yağlı beyaz peynir", de: "Vollfetter Weißkäse"},
  },
  "prod-009": {
    name: { tr: "Somun Ekmek", de: "Laib Brot"},
    description: {
      tr: "Günlük taze somun ekmek. İçi yumuşak, dışı çıtır.",
      de: "Täglich frisches Brot mit weicher Krume und knuspriger Kruste.",
    },
    shortDescription: { tr: "Taze somun ekmek", de: "Frisches Laibbrot"},
    tags: { tr: ["ekmek", "fırın", "taze"], de: ["brot", "backwaren", "frisch"]},
    metaTitle: { tr: "Somun Ekmek - Oba Supermarkt", de: "Laib Brot - Oba Supermarkt"},
    metaDescription: { tr: "Günlük taze somun ekmek", de: "Täglich frisches Brot"},
  },
  "prod-010": {
    name: { tr: "Kruvasan (Tereyağlı)", de: "Buttercroissant"},
    description: {
      tr: "Fransız usulü tereyağlı kruvasan. Kahvaltının yıldızı.",
      de: "Französisches Buttercroissant für einen starken Start in den Tag.",
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
      de: "Natürliches Quellwasser in praktischer 5-Liter-Verpackung.",
    },
    shortDescription: { tr: "Doğal kaynak suyu 5L", de: "Quellwasser 5L"},
    tags: { tr: ["su", "içecek", "doğal"], de: ["wasser", "getränk", "natürlich"]},
    metaTitle: { tr: "Su 5L - Oba Supermarkt", de: "Wasser 5L - Oba Supermarkt"},
    metaDescription: { tr: "Doğal kaynak suyu 5L", de: "Natürliches Quellwasser 5L"},
  },
  "prod-012": {
    name: { tr: "Cola (1L)", de: "Cola (1L)"},
    description: {
      tr: "Klasik cola tadı. 1 litre.",
      de: "Klassischer Cola-Geschmack in der 1-Liter-Flasche.",
    },
    shortDescription: { tr: "Cola 1L", de: "Cola 1L"},
    tags: { tr: ["meşrubat", "cola", "içecek"], de: ["limonade", "cola", "getränk"]},
    metaTitle: { tr: "Cola - Oba Supermarkt", de: "Cola - Oba Supermarkt"},
    metaDescription: { tr: "Klasik cola 1L", de: "Klassische Cola 1L"},
  },
  "prod-013": {
    name: { tr: "Cips (Klasik)", de: "Kartoffelchips (klassisch)"},
    description: {
      tr: "Klasik patates cipsi. Aile boyu paket.",
      de: "Klassische Kartoffelchips in der Familienpackung.",
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
      de: "Milchschokolade mit 30 Prozent Kakaoanteil.",
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
      de: "Osmancık-Reis in der 1-kg-Packung.",
    },
    shortDescription: { tr: "Osmancık pirinç 1kg", de: "Osmancık-Reis 1kg"},
    tags: { tr: ["pirinç", "bakliyat", "temel gıda"], de: ["reis", "grundnahrung", "vorrat"]},
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
      de: "Antibakterielle Flüssigseife in der 500-ml-Flasche.",
    },
    shortDescription: { tr: "Sıvı sabun 500ml", de: "Flüssigseife 500ml"},
    tags: { tr: ["sabun", "temizlik", "hijyen"], de: ["seife", "reinigung", "hygiene"]},
    metaTitle: { tr: "Sıvı Sabun - Oba Supermarkt", de: "Flüssigseife - Oba Supermarkt"},
    metaDescription: { tr: "Antibakteriyel sıvı sabun", de: "Antibakterielle Flüssigseife"},
  },
  "prod-018": {
    name: { tr: "Çamaşır Deterjanı", de: "Waschmittel"},
    description: {
      tr: "Konsantre çamaşır deterjanı. 2 kg.",
      de: "Konzentriertes Waschmittel in der 2-kg-Packung.",
    },
    shortDescription: { tr: "Çamaşır deterjanı 2kg", de: "Waschmittel 2kg"},
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
    title: { tr: "Hafta Sonu İndirimi", de: "Wochenend-Aktion"},
    description: {
      tr: "Seçili ürünlerde %20'ye varan indirimler! Bu hafta sonu kaçırmayın.",
      de: "Bis zu 20 Prozent Rabatt auf ausgewählte Produkte. Nur dieses Wochenende.",
    },
  },
  "promo-002": {
    title: { tr: "Meyve & Sebze Fırsatı", de: "Obst- & Gemüse-Aktion"},
    description: {
      tr: "Taze meyve ve sebzelerde özel fiyatlar! Sağlıklı beslenmeyi uygun fiyata yakalayın.",
      de: "Sonderpreise für frisches Obst und Gemüse. Gesund einkaufen und sparen.",
    },
  },
  "promo-003": {
    title: { tr: "Kahvaltı Paketi Kampanyası", de: "Aktion Frühstückspaket"},
    description: {
      tr: "Kahvaltılık ürünlerde 3 al 2 öde! Peynir, zeytin, reçel ve daha fazlası.",
      de: "3 für 2 bei Frühstücksartikeln wie Käse, Oliven, Marmelade und mehr.",
    },
  },
  "promo-004": {
    title: { tr: "Temizlik Ürünlerinde Büyük İndirim", de: "Große Aktion auf Reinigungsprodukte"},
    description: {
      tr: "Tüm temizlik ürünlerinde 25 EUR ve üzeri alışverişe 5 EUR indirim!",
      de: "5 EUR Rabatt ab 25 EUR Einkaufswert auf alle Reinigungsprodukte.",
    },
  },
  "promo-005": {
    title: { tr: "Atıştırmalık Festivali", de: "Snack-Aktion"},
    description: {
      tr: "Cips, çikolata ve atıştırmalıklarda %25 indirim! Film gecelerinin vazgeçilmezi.",
      de: "25 Prozent Rabatt auf Chips, Schokolade und Knabbereien. Perfekt für den Filmabend.",
    },
  },
  "promo-006": {
    title: { tr: "Yeni Yıl Temizlik Kampanyası", de: "Neujahrs-Aktion für Reinigungsprodukte"},
    description: {
      tr: "Yeni yıla özel temizlik ürünlerinde %30 indirim!",
      de: "30 Prozent Rabatt auf Reinigungsprodukte zum Jahreswechsel.",
    },
  },
  "promo-007": {
    title: { tr: "Çarşamba Et Günü", de: "Fleisch-Aktion am Mittwoch"},
    description: {
      tr: "Her çarşamba taze kırmızı et ve tavukta %18 indirim. Kasap reyonunda geçerli.",
      de: "Jeden Mittwoch 18 Prozent Rabatt auf frisches Fleisch und Geflügel.",
    },
  },
  "promo-008": {
    title: { tr: "Süt Ürünleri Fırsatı", de: "Milchprodukte-Aktion"},
    description: {
      tr: "Yoğurt, peynir ve sütte 3 al 2 öde. Kahvaltıyı tamamlayın.",
      de: "3 für 2 auf Joghurt, Käse und Milch. Ideal für den Frühstückseinkauf.",
    },
  },
  "promo-009": {
    title: { tr: "İçeceklerde Sepet İndirimi", de: "Getränke-Aktion"},
    description: {
      tr: "Gazlı içecek ve meyve suyunda 35 EUR ve üzeri alışverişe 6 EUR anında indirim.",
      de: "6 EUR Sofortrabatt ab 35 EUR auf Softdrinks und Fruchtsäfte.",
    },
  },
  "promo-010": {
    title: { tr: "Dondurma Festivali", de: "Eis-Aktion"},
    description: {
      tr: "Seçili dondurma ve tatlılarda %22 indirim. Yaz lezzetleri raflarda.",
      de: "22 Prozent Rabatt auf ausgewähltes Eis und Desserts. Sommergenuss im Regal.",
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
