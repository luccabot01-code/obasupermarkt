// ============================================
// MOCK DATA - Store Settings
// ============================================
// TODO: Replace with Supabase/Database integration
// When migrating to real backend:
// 1. Remove this file
// 2. Import from @/lib/services/storeService instead
// 3. Update all imports in components

import { StoreSettings, BusinessHours, SocialMedia, StoreFeatures } from "@/types";
import type { Locale } from "@/lib/i18n/config";
import { BRAND_LOGO_PATH } from "@/lib/brand";
import { getLocalizedStoreValue } from "@/lib/i18n/content";
import { getDayLabel } from "@/lib/i18n/messages";

const defaultBusinessHours: BusinessHours[] = [
  { day: 1, dayName: "Pazartesi", open: "08:00", close: "19:30", isOpen: true, is24Hours: false },
  { day: 2, dayName: "Salı", open: "08:00", close: "19:30", isOpen: true, is24Hours: false },
  { day: 3, dayName: "Çarşamba", open: "08:00", close: "19:30", isOpen: true, is24Hours: false },
  { day: 4, dayName: "Perşembe", open: "08:00", close: "19:30", isOpen: true, is24Hours: false },
  { day: 5, dayName: "Cuma", open: "08:00", close: "19:30", isOpen: true, is24Hours: false },
  { day: 6, dayName: "Cumartesi", open: "08:00", close: "18:00", isOpen: true, is24Hours: false },
  { day: 0, dayName: "Pazar", open: "00:00", close: "00:00", isOpen: false, is24Hours: false },
];

const defaultSocialMedia: SocialMedia = {
  facebook: "https://www.facebook.com/smilehomeaustria",
  instagram: "https://instagram.com/obasupermarkt",
  twitter: null,
  youtube: null,
  tiktok: null,
};

const defaultFeatures: StoreFeatures = {
  enableOnlineOrdering: false,
  enableReservations: false,
  enableDelivery: false,
  enablePickup: false,
  enableLoyaltyProgram: false,
};

export const mockStoreSettings: StoreSettings = {
  id: "store-001",
  storeName: "Oba Supermarkt",
  storeTagline: "Taze Ürünler, Haftalık İndirimler",
  description: "Oba Supermarkt olarak müşterilerimize en taze ürünleri, en uygun fiyatlarla sunuyoruz. Yerel üreticilerden ve Türkiye'den tedarik ettiğimiz geniş ürün yelpazemizle hizmetinizdeyiz.",
  logo: BRAND_LOGO_PATH,
  favicon: "/favicon.ico",
  email: "office@obasupermarkt.at",
  phone: "+43 676 4008534",
  whatsapp: "+43 676 4008534",
  address: "Laaer-Berg-Straße 14",
  city: "Wien",
  postalCode: "1100",
  country: "Avusturya",
  latitude: 48.1736,
  longitude: 16.3845,
  businessHours: defaultBusinessHours,
  socialMedia: defaultSocialMedia,
  metaTitle: "Oba Supermarkt - Taze Ürünler, Haftalık İndirimler",
  metaDescription: "Oba Supermarkt - Taze gıda ürünleri, günlük indirimler ve kaliteli hizmet. Online ürün kataloğumuzu keşfedin!",
  features: defaultFeatures,
  createdAt: "2010-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

// Helper functions
export function getStoreSettings(locale?: Locale): StoreSettings {
  return {
    ...mockStoreSettings,
    storeTagline: getLocalizedStoreValue("tagline", locale),
    description: getLocalizedStoreValue("description", locale),
    country: getLocalizedStoreValue("country", locale),
    metaTitle: getLocalizedStoreValue("metaTitle", locale),
    metaDescription: getLocalizedStoreValue("metaDescription", locale),
  };
}

export function getBusinessHours(locale?: Locale): BusinessHours[] {
  return mockStoreSettings.businessHours.map((hours) => ({
    ...hours,
    dayName: getDayLabel(locale ?? "tr", hours.day),
  }));
}

export function getTodayBusinessHours(locale?: Locale): BusinessHours | undefined {
  const today = new Date().getDay();
  return getBusinessHours(locale).find((h) => h.day === today);
}

export function isStoreOpen(): boolean {
  const today = getTodayBusinessHours();
  if (!today || !today.isOpen) return false;
  
  if (today.is24Hours) return true;
  
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const [openHour, openMin] = today.open.split(":").map(Number);
  const [closeHour, closeMin] = today.close.split(":").map(Number);
  const openTime = openHour * 60 + openMin;
  const closeTime = closeHour * 60 + closeMin;
  
  return currentTime >= openTime && currentTime < closeTime;
}

export function getNextOpeningTime(locale?: Locale): string | null {
  if (isStoreOpen()) return null;
  
  const today = new Date().getDay();
  const hours = getBusinessHours(locale);
  
  // Check remaining days of the week
  for (let i = 1; i <= 7; i++) {
    const checkDay = (today + i) % 7;
    const dayHours = hours.find((h) => h.day === checkDay);
    if (dayHours?.isOpen) {
      return `${dayHours.dayName} ${dayHours.open}`;
    }
  }
  
  return null;
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/\s/g, "");
}

export function getWhatsAppLink(phone: string): string {
  const formatted = formatPhoneNumber(phone).replace(/\+/g, "");
  return `https://wa.me/${formatted}`;
}

export function getPhoneLink(phone: string): string {
  return `tel:${formatPhoneNumber(phone)}`;
}

export function getEmailLink(email: string): string {
  return `mailto:${email}`;
}

export function getMapUrl(_latitude: number, _longitude: number): string {
  return "https://www.google.com/maps/place/OBA+Supermarkt/@48.1727907,16.3783409,17z/data=!3m1!4b1!4m6!3m5!1s0x476da990c0df4435:0x611c4a48c0f83570!8m2!3d48.1727907!4d16.3809158!16s%2Fg%2F11vx3ls63m?entry=ttu&g_ep=EgoyMDI2MDQxOS4wIKXMDSoASAFQAw%3D%3D";
}
