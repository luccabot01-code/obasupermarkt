import type { NextRequest } from "next/server";
import { defaultLocale, isValidLocale, type Locale, LOCALE_COOKIE } from "./config";

/**
 * Accept-Language sırasına göre ilk eşleşen dili döndürür.
 * de, de-AT, de-DE → de (Avusturya Almancası slotu)
 */
export function parseAcceptLanguage(header: string | null): Locale {
  if (!header?.trim()) return defaultLocale;

  const tags = header.split(",").map((part) => {
    const [tag] = part.trim().split(";");
    return tag.trim().toLowerCase();
  });

  for (const tag of tags) {
    if (tag.startsWith("tr")) return "tr";
    if (tag.startsWith("de")) return "de";
  }

  return defaultLocale;
}

export function negotiateLocale(request: NextRequest): Locale {
  const fromCookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (fromCookie && isValidLocale(fromCookie)) return fromCookie;

  return parseAcceptLanguage(request.headers.get("accept-language"));
}
