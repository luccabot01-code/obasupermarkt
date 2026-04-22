import { defaultLocale, type Locale } from "./config";

const trMessages = {
  store: {
    tagline: "Taze Ürünler, Haftalık İndirimler",
    description:
  "Oba Supermarkt olarak müşterilerimize en taze ürünleri, en uygun fiyatlarla sunuyoruz. Yerel üreticilerden ve Türkiye'den tedarik ettiğimiz geniş ürün yelpazemizle hizmetinizdeyiz.",
  },
  shared: {
    days: [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ],
    common: {
      viewAll: "Tümünü Gör",
      today: "Bugün",
      openNow: "Şu an açık",
      closedNow: "Şu an kapalı",
    },
    languageSwitcher: {
      selectLabel: "Dil seçin",
    },
    nav: {
      home: "Ana Sayfa",
      products: "Ürünler",
      promotions: "Kampanyalar",
      about: "Hakkımızda",
      openMenu: "Menüyü aç",
      closeMenu: "Menüyü kapat",
      callStore: "Telefon ile ara",
    },
    footer: {
      linksAriaLabel: "Mağaza bağlantıları",
      contactHeading: "İletişim",
      openMap: "Haritada aç",
      phone: "Telefon",
      email: "E-posta",
      businessHours: "Çalışma saatleri",
      closed: "Kapalı",
      open24Hours: "24 saat",
      rightsReserved: "Tüm hakları saklıdır.",
      privacyPolicy: "Gizlilik Politikası",
      termsOfUse: "Kullanım Koşulları",
      faq: "Sıkça sorulan sorular",
    },
  },
  home: {
    primaryCta: "Ürünleri Keşfet",
    secondaryCta: "Kampanyalar",
    desktopTagline: "Kaliteli ürünler, uygun fiyatlar",
    freshProductsTitle: "Taze Ürünler",
    freshProductsDescription: "Her gün taze",
    dealsTitle: "İndirimler",
    dealsDescription: "Her hafta yeni",
    weeklyPromotionsTitle: "Kampanyalar",
    weeklyPromotionsDescription: "Kaçırmayın, sınırlı süreli indirimler!",
    saleProductsTitle: "İndirimli Ürünler",
    saleProductsDescription: "Fırsat ürünlerini kaçırmayın",
    heroChips: [
      "Taze ürünler",
      "Günlük fırsatlar",
      "Haftalık kampanyalar",
      "Güvenilir süpermarket",
      "Temel gıda ve atıştırmalıklar",
      "Özenle seçilmiş ürünler",
      "Kaliteli ürün, güler yüzlü hizmet",
      "Kahvaltılık, içecek ve mutfak ürünleri",
    ],
  },
  cards: {
    product: {
      noImage: "Görsel yok",
      discountSuffix: "indirim",
      featured: "Öne çıkan",
    },
    promotion: {
      details: "Detayları gör",
    },
    category: {
      productCountSuffix: "ürün",
      cta: "Keşfet",
    },
  },
  catalog: {
    products: {
      title: "Ürünler",
      description: "Tüm ürünlerimizi keşfedin",
      searchHeading: "Ara",
      searchPlaceholder: "Ürün adı yazın...",
      searchAria: "Ürün ara",
      categoriesHeading: "Kategoriler",
      allProducts: "Tüm Ürünler",
      priceRangeHeading: "Fiyat aralığı",
      min: "Min",
      max: "Max",
      resultsSuffix: "ürün bulundu",
      totalLabel: "toplam",
      filter: "Filtrele",
      clearSearch: "Aramayı temizle",
      noResultsSuffix: "ile eşleşen ürün yok.",
      noProducts: "Ürün bulunamadı",
      previous: "Önceki",
      next: "Sonraki",
      metaTitle: "Ürünler",
      metaDescription:
        "Oba Supermarkt ürün kataloğu. Taze gıda ürünleri, temel gıda, içecekler ve daha fazlası.",
    },
    promotions: {
      title: "Güncel kampanyalar",
      description:
        "Haftalık indirimler ve özel fırsatlarla alışverişinizi daha ekonomik hale getirin.",
      featuredTitle: "Öne çıkan kampanyalar",
      allTitle: "Tüm kampanyalar",
      activeSuffix: "aktif kampanya",
      none: "Şu anda aktif kampanya bulunmuyor.",
      soon: "Yakında yeni kampanyalarla karşınızda olacağız.",
      exploreTitle: "Tüm ürünleri inceleyin",
      exploreDescription: "Kampanyalı ürünlerin yanı sıra tüm ürünlerimizi keşfedin.",
      exploreCta: "Ürünleri keşfet",
      metaTitle: "Kampanyalar",
      metaDescription:
        "Oba Supermarkt güncel kampanyaları ve indirimleri. Haftalık özel fırsatları kaçırmayın!",
    },
    categories: {
      title: "Kategoriler",
      description: "Tüm ürün kategorilerimizi keşfedin",
      metaTitle: "Kategoriler",
      metaDescription:
        "Oba Supermarkt ürün kategorileri. Meyve ve sebze, et ve tavuk, süt ürünleri ve daha fazlası.",
    },
  },
};

type Messages = typeof trMessages;

const deMessages: Messages = {
  store: {
    tagline: "Frische Produkte, wöchentliche Aktionen",
    description:
      "Als Oba Supermarkt bieten wir unseren Kundinnen und Kunden die frischesten Produkte zu fairen Preisen. Mit unserem breiten Sortiment, das wir von regionalen Produzentinnen und Produzenten sowie aus der Türkei beziehen, sind wir gerne für Sie da.",
  },
  shared: {
    days: [
      "Sonntag",
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
    ],
    common: {
      viewAll: "Alle ansehen",
      today: "Heute",
      openNow: "Jetzt geöffnet",
      closedNow: "Jetzt geschlossen",
    },
    languageSwitcher: {
      selectLabel: "Sprache wählen",
    },
    nav: {
      home: "Startseite",
      products: "Produkte",
      promotions: "Aktionen",
      about: "Über uns",
      openMenu: "Navigation öffnen",
      closeMenu: "Navigation schließen",
      callStore: "Anrufen",
    },
    footer: {
      linksAriaLabel: "Links zum Marktauftritt",
      contactHeading: "Kontakt",
      openMap: "In Google Maps öffnen",
      phone: "Telefon",
      email: "E-Mail",
      businessHours: "Öffnungszeiten",
      closed: "Geschlossen",
      open24Hours: "24 Stunden",
      rightsReserved: "Alle Rechte vorbehalten.",
      privacyPolicy: "Datenschutz",
      termsOfUse: "Nutzungsbedingungen",
      faq: "Häufige Fragen",
    },
  },
  home: {
    primaryCta: "Produkte entdecken",
    secondaryCta: "Aktionen",
    desktopTagline: "Gute Qualität, faire Preise",
    freshProductsTitle: "Frische Produkte",
    freshProductsDescription: "Jeden Tag frisch",
    dealsTitle: "Aktionen",
    dealsDescription: "Jede Woche neu",
    weeklyPromotionsTitle: "Aktionen",
    weeklyPromotionsDescription: "Nicht verpassen, zeitlich begrenzte Angebote!",
    saleProductsTitle: "Produkte im Angebot",
    saleProductsDescription: "Unsere Angebotsprodukte nicht verpassen",
    heroChips: [
      "Frische Produkte",
      "Tägliche Angebote",
      "Wöchentliche Aktionen",
      "Verlässlicher Supermarkt",
      "Grundnahrungsmittel und Knabbereien",
      "Sorgfältig ausgewählte Produkte",
      "Gute Qualität, freundlicher Service",
      "Frühstück, Getränke und Küchenbedarf",
    ],
  },
  cards: {
    product: {
      noImage: "Kein Bild",
      discountSuffix: "Rabatt",
      featured: "Im Fokus",
    },
    promotion: {
      details: "Details anschauen",
    },
    category: {
      productCountSuffix: "Produkte",
      cta: "Entdecken",
    },
  },
  catalog: {
    products: {
      title: "Produkte",
      description: "Entdecken Sie alle unsere Produkte",
      searchHeading: "Suche",
      searchPlaceholder: "Produktname eingeben...",
      searchAria: "Produkte durchsuchen",
      categoriesHeading: "Kategorien",
      allProducts: "Alle Produkte",
      priceRangeHeading: "Preisbereich",
      min: "Min",
      max: "Max",
      resultsSuffix: "Produkte gefunden",
      totalLabel: "gesamt",
      filter: "Filtern",
      clearSearch: "Suche löschen",
      noResultsSuffix: "ergibt keine passenden Produkte.",
      noProducts: "Keine Produkte gefunden",
      previous: "Zurück",
      next: "Weiter",
      metaTitle: "Produkte",
      metaDescription:
        "Produktkatalog von Oba Supermarkt. Frischwaren, Grundnahrungsmittel, Getränke und vieles mehr.",
    },
    promotions: {
      title: "Aktuelle Aktionen",
      description:
        "Mit wöchentlichen Aktionen und besonderen Angeboten wird Ihr Einkauf noch günstiger.",
      featuredTitle: "Aktionen im Fokus",
      allTitle: "Alle Aktionen",
      activeSuffix: "aktive Aktionen",
      none: "Derzeit gibt es keine aktive Aktion.",
      soon: "Schon bald sind wir mit neuen Aktionen für Sie da.",
      exploreTitle: "Entdecken Sie alle Produkte",
      exploreDescription:
        "Entdecken Sie neben den Aktionsprodukten auch alle unsere Produkte.",
      exploreCta: "Produkte entdecken",
      metaTitle: "Aktionen",
      metaDescription:
        "Aktuelle Aktionen und Rabatte von Oba Supermarkt. Unsere wöchentlichen Angebote nicht verpassen!",
    },
    categories: {
      title: "Kategorien",
      description: "Entdecken Sie alle unsere Produktkategorien",
      metaTitle: "Kategorien",
      metaDescription:
        "Produktkategorien von Oba Supermarkt. Obst und Gemüse, Fleisch und Hendl, Milchprodukte und mehr.",
    },
  },
};

const messages: Record<Locale, Messages> = {
  de: deMessages,
  tr: trMessages,
};

export function getMessages(locale: Locale): Messages {
  return messages[locale] ?? messages[defaultLocale];
}

export function getDayLabel(locale: Locale, day: number): string {
  return getMessages(locale).shared.days[day] ?? getMessages(defaultLocale).shared.days[day] ?? "";
}

export type { Messages };
