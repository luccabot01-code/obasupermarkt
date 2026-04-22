import { defaultLocale, isValidLocale, locales, type Locale } from "./config";
import { appPathToExternalPath, externalPathToAppPath } from "./routing";

/**
 * Uygulama yolu (locale öneki olmadan), trailingSlash: true ile biter.
 */
export function normalizeAppPath(path: string): string {
  if (!path || path === "/") return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
}

/**
 * /{locale}/... şeklinde tam yol (trailingSlash uyumlu).
 * path: "/" veya "/public/products" veya "/public/products/"
 */
export function localizedPath(locale: string, path: string): string {
  const loc: Locale = isValidLocale(locale) ? locale : defaultLocale;
  const externalPath = appPathToExternalPath(path, loc);
  if (externalPath === "/") return `/${loc}/`;
  return `/${loc}${externalPath.slice(0, -1)}/`;
}

/** Middleware: pathname'e locale öneki ekler */
export function pathnameWithLocale(locale: Locale, pathname: string): string {
  return localizedPath(locale, externalPathToAppPath(pathname, locale));
}

/** pathname: /de/public/products/ → /public/products/ */
export function stripLocalePrefix(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  if (isValidLocale(parts[0])) {
    const rest = parts.slice(1).join("/");
    return rest ? externalPathToAppPath(`/${rest}`, parts[0]) : "/";
  }
  return externalPathToAppPath(pathname, defaultLocale);
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const first = pathname.split("/").filter(Boolean)[0];
  if (first && isValidLocale(first)) return first;
  return null;
}

export { locales };
