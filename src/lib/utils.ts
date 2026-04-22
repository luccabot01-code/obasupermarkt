import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { defaultLocale, type Locale } from "@/lib/i18n/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format price with fixed EUR currency
 */
function resolveIntlLocale(locale: Locale): string {
  switch (locale) {
    case "de":
      return "de-AT"
    case "tr":
    default:
      return "tr-TR"
  }
}

export function formatPrice(price: number, locale: Locale = defaultLocale): string {
  return new Intl.NumberFormat(resolveIntlLocale(locale), {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Calculate discount percentage
 */
export function calculateDiscountPercentage(
  currentPrice: number,
  originalPrice: number
): number {
  if (originalPrice <= 0 || currentPrice >= originalPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Format date to locale-aware long format
 */
export function formatDate(dateString: string, locale: Locale = defaultLocale): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(resolveIntlLocale(locale), {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Format date to locale-aware short format
 */
export function formatDateShort(dateString: string, locale: Locale = defaultLocale): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(resolveIntlLocale(locale), {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

/**
 * Format promotion value for display
 */
export function formatPromotionValue(promotion: {
  type: string;
  value: number;
  minQuantity?: number | null;
  freeQuantity?: number | null;
}, locale: Locale = defaultLocale): string {
  switch (promotion.type) {
    case "percentage":
      switch (locale) {
        case "de":
          return `${promotion.value}% Rabatt`;
        case "tr":
        default:
          return `%${promotion.value} indirim`;
      }
    case "fixed_amount":
      switch (locale) {
        case "de":
          return `${formatPrice(promotion.value, locale)} Rabatt`;
        case "tr":
        default:
          return `${formatPrice(promotion.value, locale)} indirim`;
      }
    case "buy_x_get_y":
      if (!promotion.minQuantity || !promotion.freeQuantity) {
        switch (locale) {
          case "de":
            return "Aktion";
          case "tr":
          default:
            return "Kampanya";
        }
      }
      switch (locale) {
        case "de":
          return `${promotion.minQuantity} kaufen, ${promotion.freeQuantity} gratis`;
        case "tr":
        default:
          return `${promotion.minQuantity} Al ${promotion.freeQuantity} Bedava`;
      }
    default:
      switch (locale) {
        case "de":
          return "Aktion";
        case "tr":
        default:
          return "Kampanya";
      }
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generate slug from string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Check if a date is in the past
 */
export function isPastDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date < new Date();
}

/**
 * Check if a date is in the future
 */
export function isFutureDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date > new Date();
}

/**
 * Check if current date is between start and end dates
 */
export function isActiveDateRange(
  startDate: string,
  endDate: string
): boolean {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  return now >= start && now <= end;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/** Path without query string and without trailing slashes (except root `/`). */
export function stripTrailingSlashFromPathname(pathname: string): string {
  const path = pathname.split("?")[0] ?? pathname;
  if (path === "/") return "/";
  return path.replace(/\/+$/, "") || "/";
}
