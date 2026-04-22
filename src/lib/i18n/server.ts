import { cookies, headers } from "next/headers";
import { defaultLocale, isValidLocale, type Locale, LOCALE_COOKIE } from "./config";
import { localizedPath } from "./paths";

const REQUEST_LOCALE_HEADER = "x-oba-locale";

export function resolveLocale(raw: string): Locale {
  return isValidLocale(raw) ? raw : defaultLocale;
}

export async function getRequestLocale(): Promise<Locale> {
  const headerStore = await headers();
  const headerValue = headerStore.get(REQUEST_LOCALE_HEADER);
  if (headerValue && isValidLocale(headerValue)) return headerValue;

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(LOCALE_COOKIE)?.value;
  return cookieValue && isValidLocale(cookieValue) ? cookieValue : defaultLocale;
}

export function pathForLocale(locale: Locale): (path: string) => string {
  return (path: string) => localizedPath(locale, path);
}
