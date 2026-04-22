import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  getStoreSettings,
  getBusinessHours,
  getMapUrl,
  getPhoneLink,
  getEmailLink,
} from "@/lib/data/store";
import type { BusinessHours } from "@/types";
import { defaultLocale, isValidLocale, type Locale } from "@/lib/i18n/config";
import { getDayLabel, getMessages } from "@/lib/i18n/messages";
import { localizedPath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { StoreNameWordmark } from "@/components/shared/StoreNameWordmark";
import { FooterBusinessHoursSection } from "@/components/shared/FooterBusinessHoursSection";

const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0] as const;

function hourLabel(h: BusinessHours, locale: Locale): string {
  const messages = getMessages(locale);
  if (!h.isOpen) return messages.shared.footer.closed;
  if (h.is24Hours) return messages.shared.footer.open24Hours;
  return `${h.open} – ${h.close}`;
}

function hoursInWeekOrder(hours: BusinessHours[]): BusinessHours[] {
  const byDay = new Map(hours.map((h) => [h.day, h]));
  return DAY_ORDER.map((d) => byDay.get(d)).filter((h): h is BusinessHours => h != null);
}

export async function Footer({ locale: rawLocale }: { locale: string }) {
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const lp = (path: string) => localizedPath(locale, path);
  const messages = getMessages(locale);

  const store = getStoreSettings();
  const businessHours = getBusinessHours();
  const hoursByDay = hoursInWeekOrder(businessHours);
  const mapUrl =
    store.latitude != null && store.longitude != null
      ? getMapUrl(store.latitude, store.longitude)
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${store.address} ${store.postalCode} ${store.city}`
        )}`;

  const addressLine = [store.address, store.postalCode, store.city].filter(Boolean).join(", ");

  const hoursRows = hoursByDay.map((h) => {
    const closed = !h.isOpen;
    return {
      dayKey: h.day,
      dayLabel: getDayLabel(locale, h.day),
      timeLabel: hourLabel(h, locale),
      closed,
    };
  });

  return (
    <footer className="border-t bg-gradient-to-b from-background via-background/90 to-transparent">
      <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
        <div className="lg:rounded-xl lg:border lg:border-slate-200/60 lg:bg-white/45 lg:px-6 lg:py-6 lg:shadow-sm lg:backdrop-blur-sm xl:px-8">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:items-start lg:gap-x-6 lg:gap-y-5 xl:gap-x-8">
            {/* Brand */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <Link href={lp("/")} className="inline-flex items-center justify-center gap-2 lg:justify-start">
                <BrandLogo
                  frameClassName="h-8 w-8 rounded-lg shadow-sm sm:h-9 sm:w-9"
                  sizes="(max-width: 640px) 32px, 36px"
                />
                <StoreNameWordmark
                  name={store.storeName}
                  className="text-base font-bold leading-tight sm:text-lg"
                  obaClassName="text-wordmark-oba"
                  supermarktClassName="text-black"
                />
              </Link>
              <p className="mt-3 max-w-[26rem] text-sm leading-relaxed text-slate-600 sm:text-[15px] lg:mt-4 lg:text-sm">
                {messages.store.description}
              </p>
            </div>

            {/* Çalışma saatleri — cam panel (iletişimin üstünde); mobilde daha dar ve hafif */}
            <div className="mx-auto w-full max-w-[17.5rem] sm:max-w-none lg:mx-0">
              <div
                className={cn(
                  "relative isolate overflow-hidden rounded-xl border shadow-[0_12px_36px_-18px_rgba(15,23,42,0.22),inset_0_1px_0_0_rgba(255,255,255,0.9)] sm:rounded-2xl sm:shadow-[0_24px_64px_-28px_rgba(15,23,42,0.28),inset_0_1px_0_0_rgba(255,255,255,0.9)]",
                  "border-slate-200/80 bg-gradient-to-b from-white/92 via-white/88 to-slate-100/50 max-sm:backdrop-blur-none sm:border-slate-200/70 sm:bg-gradient-to-br sm:from-white/85 sm:via-white/55 sm:to-slate-100/35 sm:backdrop-blur-xl",
                  "dark:border-slate-700/50 dark:from-slate-900/92 dark:via-slate-900/88 dark:to-slate-950/45 dark:sm:from-slate-900/80 dark:sm:via-slate-900/50 dark:sm:to-slate-950/40 dark:shadow-black/30",
                )}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent sm:inset-x-6 sm:via-emerald-400/60"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -right-16 -top-24 z-0 hidden h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl sm:block"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -bottom-20 -left-12 z-0 hidden h-40 w-40 rounded-full bg-slate-400/10 blur-3xl sm:block"
                  aria-hidden
                />

                <FooterBusinessHoursSection heading={messages.shared.footer.businessHours} rows={hoursRows} />
              </div>
            </div>

            {/* İletişim — metin satırları + yuvarlak kısayol ikonları (ikisi birlikte) */}
            <div className="flex w-full flex-col items-center text-center sm:col-span-2 lg:col-span-1 lg:items-start lg:text-left">
              <p className="mb-3 w-full uppercase sm:mb-2 lg:mb-2 lg:w-auto lg:text-left max-sm:text-[13px] max-sm:font-bold max-sm:tracking-[0.12em] max-sm:text-slate-500 sm:text-[11px] sm:font-semibold sm:tracking-[0.12em] sm:text-slate-500 lg:text-[10px]">
                {messages.shared.footer.contactHeading}
              </p>
              <div
                className={cn(
                  "mb-3 flex w-full flex-col text-left gap-3 lg:gap-3.5",
                  "overflow-hidden rounded-xl border border-slate-200/70 bg-gradient-to-b from-white/92 to-slate-100/55 px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_8px_24px_-12px_rgba(15,23,42,0.12)] ring-1 ring-inset ring-white/50 backdrop-blur-[2px]",
                  "dark:border-slate-600/45 dark:from-slate-900/75 dark:to-slate-900/45 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_24px_-12px_rgba(0,0,0,0.35)] dark:ring-white/5",
                )}
              >
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-[13px] font-semibold leading-[1.35] text-slate-800 transition-colors hover:text-emerald-700 max-sm:min-h-[1.75rem] sm:gap-2 sm:font-normal sm:text-sm sm:leading-relaxed sm:text-slate-700"
                >
                  <MapPin
                    className="h-4 w-4 shrink-0 text-emerald-600/90"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">{addressLine}</span>
                </a>
                <a
                  href={getPhoneLink(store.phone)}
                  className="flex items-center gap-2.5 text-[13px] font-semibold leading-[1.35] text-slate-800 transition-colors hover:text-emerald-700 max-sm:min-h-[1.75rem] sm:gap-2 sm:font-normal sm:text-sm sm:leading-relaxed sm:text-slate-700"
                >
                  <Phone className="h-4 w-4 shrink-0 text-emerald-600/90" strokeWidth={1.75} aria-hidden />
                  <span className="min-w-0 tabular-nums tracking-tight">{store.phone}</span>
                </a>
                <a
                  href={getEmailLink(store.email)}
                  className="flex items-center gap-2.5 break-all text-[13px] font-semibold leading-[1.35] text-slate-800 transition-colors hover:text-emerald-700 max-sm:min-h-[1.75rem] sm:gap-2 sm:font-normal sm:text-sm sm:leading-relaxed sm:text-slate-700"
                >
                  <Mail className="h-4 w-4 shrink-0 text-emerald-600/90" strokeWidth={1.75} aria-hidden />
                  <span className="min-w-0 flex-1">{store.email}</span>
                </a>
              </div>
              <div className="mt-1 flex w-full flex-wrap justify-center gap-1.5">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white/70 text-slate-600 shadow-sm transition-colors hover:border-emerald-300/80 hover:text-emerald-600 sm:h-10 sm:w-10"
                  aria-label={messages.shared.footer.openMap}
                >
                  <MapPin className="h-4 w-4 sm:h-[17px] sm:w-[17px]" strokeWidth={1.75} aria-hidden />
                </a>
                <a
                  href={getPhoneLink(store.phone)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white/70 text-slate-600 shadow-sm transition-colors hover:border-emerald-300/80 hover:text-emerald-600 sm:h-10 sm:w-10"
                  aria-label={messages.shared.footer.phone}
                >
                  <Phone className="h-4 w-4 sm:h-[17px] sm:w-[17px]" strokeWidth={1.75} aria-hidden />
                </a>
                <a
                  href={getEmailLink(store.email)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white/70 text-slate-600 shadow-sm transition-colors hover:border-emerald-300/80 hover:text-emerald-600 sm:h-10 sm:w-10"
                  aria-label={messages.shared.footer.email}
                >
                  <Mail className="h-4 w-4 sm:h-[17px] sm:w-[17px]" strokeWidth={1.75} aria-hidden />
                </a>
                {store.socialMedia.facebook && (
                  <a
                    href={store.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white/70 text-slate-600 shadow-sm transition-colors hover:border-emerald-300/80 hover:text-emerald-600 sm:h-10 sm:w-10"
                    aria-label="Facebook"
                  >
                    <svg className="h-4 w-4 sm:h-[17px] sm:w-[17px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
                {store.socialMedia.instagram && (
                  <a
                    href={store.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white/70 text-slate-600 shadow-sm transition-colors hover:border-emerald-300/80 hover:text-emerald-600 sm:h-10 sm:w-10"
                    aria-label="Instagram"
                  >
                    <svg
                      className="h-4 w-4 sm:h-[17px] sm:w-[17px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      aria-hidden
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-emerald-900/10 pt-4 sm:mt-8 sm:pt-5">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-3">
            <p className="text-center text-xs text-muted-foreground sm:text-left">
              © {new Date().getFullYear()}{" "}
              <StoreNameWordmark name={store.storeName} className="inline" obaClassName="text-wordmark-oba" />
              . {messages.shared.footer.rightsReserved}
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              <Link
                href={lp("/public/faq")}
                className="text-xs text-muted-foreground transition-colors hover:text-emerald-600"
              >
                {messages.shared.footer.faq}
              </Link>
              <Link
                href={lp("/public/privacy-policy")}
                className="text-xs text-muted-foreground transition-colors hover:text-emerald-600"
              >
                {messages.shared.footer.privacyPolicy}
              </Link>
              <Link
                href={lp("/public/terms-of-use")}
                className="text-xs text-muted-foreground transition-colors hover:text-emerald-600"
              >
                {messages.shared.footer.termsOfUse}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}



