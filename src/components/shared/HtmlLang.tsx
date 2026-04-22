"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isValidLocale, localeToHtmlLang, type Locale } from "@/lib/i18n/config";

/** İlk URL segmentinden <html lang> günceller (hydration sonrası). */
export function HtmlLang() {
  const pathname = usePathname();

  useEffect(() => {
    const seg = pathname.split("/").filter(Boolean)[0];
    if (seg && isValidLocale(seg)) {
      document.documentElement.lang = localeToHtmlLang(seg as Locale);
    }
  }, [pathname]);

  return null;
}
