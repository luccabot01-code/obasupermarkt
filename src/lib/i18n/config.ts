/**
 * i18n — Avusturya odaklı: varsayılan içerik dili Avusturya Almancası (de).
 */

export const locales = ["de", "tr"] as const;
export type Locale = (typeof locales)[number];

/** Avusturya Almancası — birincil dil */
export const defaultLocale: Locale = "de";

export const LOCALE_COOKIE = "oba_locale";

export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** <html lang> — Almanca için bölgesel kod */
export function localeToHtmlLang(locale: Locale): string {
  switch (locale) {
    case "de":
      return "de-AT";
    case "tr":
      return "tr";
    default:
      return "de-AT";
  }
}

const localeLabelsByLocale: Record<Locale, Record<Locale, string>> = {
  de: {
    de: "Deutsch (Österreich)",
    tr: "Türkisch",
  },
  tr: {
    de: "Almanca (Avusturya)",
    tr: "Türkçe",
  },
};

export function getLocaleLabels(locale: Locale): Record<Locale, string> {
  return localeLabelsByLocale[locale];
}

/** Mobil menü dil bölümü başlığı — aktif dile göre tek kelime */
export const localeDrawerLanguageHeading: Record<Locale, string> = {
  de: "Sprache",
  tr: "Dil",
};

/** Bayrak (emoji) — DE için AT bayrağı (Avusturya Almancası) */
export const localeFlags: Record<Locale, string> = {
  de: "\uD83C\uDDE6\uD83C\uDDF9",
  tr: "\uD83C\uDDF9\uD83C\uDDF7",
};
