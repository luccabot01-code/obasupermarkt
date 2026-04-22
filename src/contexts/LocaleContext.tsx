"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/config";
import { getMessages, type Messages } from "@/lib/i18n/messages";
import { localizedPath } from "@/lib/i18n/paths";

const LocaleContext = createContext<Locale | null>(null);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  const v = useContext(LocaleContext);
  if (!v) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return v;
}

/** trailingSlash uyumlu site yolu üretir: lp("/public/products") */
export function useLocalizedPath(): (path: string) => string {
  const locale = useLocale();
  return (path: string) => localizedPath(locale, path);
}

export function useMessages(): Messages {
  return getMessages(useLocale());
}
