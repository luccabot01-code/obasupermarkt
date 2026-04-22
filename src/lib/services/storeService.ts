// ============================================
// SERVICE - Store Service
// ============================================
// This service layer abstracts data fetching logic.
// TODO: When migrating to real backend:
// 1. Replace mock data imports with actual API calls
// 2. Add error handling and loading states
// 3. Implement caching strategy

import { StoreSettings, BusinessHours } from "@/types";
import {
  mockStoreSettings,
  getStoreSettings as mockGetStoreSettings,
  getBusinessHours as mockGetBusinessHours,
  getTodayBusinessHours as mockGetTodayBusinessHours,
  isStoreOpen as mockIsStoreOpen,
  getNextOpeningTime as mockGetNextOpeningTime,
  getWhatsAppLink as mockGetWhatsAppLink,
  getPhoneLink as mockGetPhoneLink,
  getEmailLink as mockGetEmailLink,
  getMapUrl as mockGetMapUrl,
} from "@/lib/data/store";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get store settings
 * TODO: Replace with actual API call: GET /api/store/settings
 */
export async function getStoreSettings(): Promise<StoreSettings> {
  await delay(150);
  return mockGetStoreSettings();
}

/**
 * Get business hours
 * TODO: Replace with actual API call: GET /api/store/business-hours
 */
export async function getBusinessHours(): Promise<BusinessHours[]> {
  await delay(150);
  return mockGetBusinessHours();
}

/**
 * Get today's business hours
 * TODO: Replace with actual API call: GET /api/store/business-hours/today
 */
export async function getTodayBusinessHours(): Promise<BusinessHours | undefined> {
  await delay(100);
  return mockGetTodayBusinessHours();
}

/**
 * Check if store is currently open
 * TODO: Replace with actual API call: GET /api/store/status
 */
export async function isStoreOpen(): Promise<boolean> {
  await delay(100);
  return mockIsStoreOpen();
}

/**
 * Get next opening time
 * TODO: Replace with actual API call: GET /api/store/next-opening
 */
export async function getNextOpeningTime(): Promise<string | null> {
  await delay(100);
  return mockGetNextOpeningTime();
}

/**
 * Update store settings (Admin only)
 * TODO: Replace with actual API call: PATCH /api/admin/store/settings
 */
export async function updateStoreSettings(
  settingsData: Partial<StoreSettings>
): Promise<StoreSettings> {
  await delay(400);
  
  return {
    ...mockStoreSettings,
    ...settingsData,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Update business hours (Admin only)
 * TODO: Replace with actual API call: PATCH /api/admin/store/business-hours
 */
export async function updateBusinessHours(
  hours: BusinessHours[]
): Promise<BusinessHours[]> {
  await delay(300);
  return hours;
}

// Utility functions
export function getWhatsAppLink(phone: string): string {
  return mockGetWhatsAppLink(phone);
}

export function getPhoneLink(phone: string): string {
  return mockGetPhoneLink(phone);
}

export function getEmailLink(email: string): string {
  return mockGetEmailLink(email);
}

export function getMapUrl(latitude: number, longitude: number): string {
  return mockGetMapUrl(latitude, longitude);
}
