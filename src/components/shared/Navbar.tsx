"use client";

import { useState, useLayoutEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, ChevronRight, Building2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { StoreNameWordmark } from "@/components/shared/StoreNameWordmark";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { useLocalizedPath, useLocale, useMessages } from "@/contexts/LocaleContext";
import { getStoreSettings } from "@/lib/data/store";
import { normalizeAppPath, stripLocalePrefix } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";

function isNavActive(appHref: string, pathname: string | null): boolean {
  if (!pathname) return false;
  const current = stripLocalePrefix(pathname);
  const target = appHref === "/" ? "/" : normalizeAppPath(appHref);
  if (appHref === "/") return current === "/";
  return current === target || current.startsWith(target);
}

/** Locale önekinden sonra gerçekten ana sayfa mı (ilk giriş görünümü = scroll 0) */
function isAppHomePathname(pathname: string | null): boolean {
  if (!pathname) return false;
  return stripLocalePrefix(pathname) === "/";
}

function scrollToInitialPageTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const scrollLockYRef = useRef(0);
  /** Hızlı aç-kapa: önceki kapanışın rAF scrollTo çağrılarını geçersiz kıl */
  const scrollLockGenerationRef = useRef(0);
  /** Menüden Next.js link / dil değişimi: scroll geri yükleme yapma (Next yeni sayfa konumunu belirler) */
  const skipScrollRestoreRef = useRef(false);
  const pathname = usePathname();
  const locale = useLocale();
  const lp = useLocalizedPath();
  const messages = useMessages();
  const storeDisplayName = getStoreSettings(locale).storeName;
  const navigation = [
    { name: messages.shared.nav.home, href: "/", icon: Home },
    { name: messages.shared.nav.products, href: "/public/products", icon: Package },
    { name: messages.shared.nav.about, href: "/public/about", icon: Building2 },
  ];

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // Swipe left to close menu
    if (isLeftSwipe && isOpen) {
      setIsOpen(false);
    }
    // Swipe right to open menu
    if (isRightSwipe && !isOpen && touchStart < 50) {
      setIsOpen(true);
    }
  }, [touchStart, touchEnd, isOpen]);

  // Mobil menü scroll kilidi. Hızlı hamburger/X basımında eski kapanışın scrollTo ile yeni açılışın
  // scrollY kaydı çakışmasın diye nesil ref + top’tan okuma kullanılır.
  useLayoutEffect(() => {
    if (!isOpen) return;

    scrollLockGenerationRef.current += 1;
    const root = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    scrollLockYRef.current = scrollY;

    const gap = Math.max(0, window.innerWidth - root.clientWidth);
    const pad = gap > 0 ? `${gap}px` : "0px";
    root.style.setProperty("--nav-scrollbar-pad", pad);

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.paddingRight = gap > 0 ? pad : "";
    body.style.overflow = "hidden";
    root.style.overflow = "hidden";

    return () => {
      const genAtClose = scrollLockGenerationRef.current;
      const topStr = body.style.top;
      let y = scrollLockYRef.current;
      if (topStr) {
        const parsed = Number.parseInt(topStr, 10);
        if (!Number.isNaN(parsed)) y = Math.max(0, -parsed);
      }

      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.paddingRight = "";
      body.style.overflow = "";
      root.style.overflow = "";
      root.style.paddingRight = "";
      root.style.removeProperty("--nav-scrollbar-pad");

      const skipRestore = skipScrollRestoreRef.current;
      skipScrollRestoreRef.current = false;

      if (skipRestore) {
        return;
      }

      window.scrollTo({ top: y, left: 0, behavior: "auto" });

      requestAnimationFrame(() => {
        if (scrollLockGenerationRef.current !== genAtClose) return;
        window.scrollTo({ top: y, left: 0, behavior: "auto" });
        requestAnimationFrame(() => {
          if (scrollLockGenerationRef.current !== genAtClose) return;
          window.scrollTo({ top: y, left: 0, behavior: "auto" });
        });
      });
    };
  }, [isOpen]);

  return (
    <>
      {/* Navbar - Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-[60] safe-area-top [padding-right:var(--nav-scrollbar-pad,0px)]">
        <nav
          className={cn(
            "flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6",
            "bg-white/20 backdrop-blur-xl",
            "border-b border-white/30",
            "shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
            "transition-all duration-300 ease-out"
          )}
        >
          {/* Logo - Left */}
          <Link
            href={lp("/")}
            className="flex items-center gap-2.5 group min-h-[44px]"
            onClick={(e) => {
              if (isAppHomePathname(pathname)) {
                e.preventDefault();
                scrollToInitialPageTop();
              }
            }}
          >
            <BrandLogo
              frameClassName="h-9 w-9 sm:h-10 sm:w-10 rounded-xl shadow-lg transition-transform duration-300 group-active:scale-95"
              sizes="(max-width: 640px) 36px, 40px"
            />
            <StoreNameWordmark
              name={storeDisplayName}
              className="hidden text-lg font-semibold sm:block"
              obaClassName="text-wordmark-oba"
              supermarktClassName="text-black"
            />
          </Link>

          {/* Desktop Navigation - Center-Right */}
          <div className="hidden md:flex md:items-center md:gap-0.5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={lp(item.href)}
                onClick={(e) => {
                  if (item.href === "/" && isAppHomePathname(pathname)) {
                    e.preventDefault();
                    scrollToInitialPageTop();
                  }
                }}
                className={cn(
                  "relative px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-full min-h-[44px] flex items-center",
                  isNavActive(item.href, pathname)
                    ? "text-emerald-700 bg-white/60 shadow-sm"
                    : "text-slate-700 hover:text-emerald-600 hover:bg-white/40"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions — dil seçici sadece masaüstü; mobilde hamburger menü içinde */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden md:block">
              <LanguageSwitcher variant="header" />
            </div>
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden h-11 w-11 rounded-full bg-white/30 text-slate-700 hover:text-emerald-600 hover:bg-white/50 transition-all duration-200 touch-manipulation backdrop-blur-sm"
              aria-label={isOpen ? messages.shared.nav.closeMenu : messages.shared.nav.openMenu}
              aria-expanded={isOpen}
            >
              <div className="relative flex h-5 w-6 flex-col justify-center">
                <span
                  className={cn(
                    "absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out",
                    isOpen ? "rotate-45" : "-translate-y-1.5"
                  )}
                />
                <span
                  className={cn(
                    "absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out",
                    isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out",
                    isOpen ? "-rotate-45" : "translate-y-1.5"
                  )}
                />
              </div>
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar - Glassmorphism */}
      <div
        className={cn(
          "fixed inset-0 z-[55] md:hidden",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={cn(
            "absolute top-0 right-0 bottom-0 w-[280px]",
            "bg-white/70 backdrop-blur-2xl",
            "border-l border-white/40",
            "shadow-[-10px_0_40px_rgba(0,0,0,0.1)]",
            "transform transition-transform duration-300 ease-out safe-area-bottom",
            "flex flex-col",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Header — close */}
          <div className="flex items-center justify-end border-b border-white/25 px-3 py-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-10 w-10 rounded-full bg-white/40 text-slate-600 hover:text-slate-800 hover:bg-white/60 backdrop-blur-sm"
              aria-label={messages.shared.nav.closeMenu}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          <div className="border-b border-white/25 px-4 py-4">
            <LanguageSwitcher
              variant="drawer"
              onLocalePicked={() => {
                skipScrollRestoreRef.current = true;
                setIsOpen(false);
              }}
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-1.5">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isNavActive(item.href, pathname);
                return (
                  <Link
                    key={item.name}
                    href={lp(item.href)}
                    onClick={(e) => {
                      if (item.href === "/" && isAppHomePathname(pathname)) {
                        e.preventDefault();
                        skipScrollRestoreRef.current = true;
                        setIsOpen(false);
                        scrollToInitialPageTop();
                        return;
                      }
                      skipScrollRestoreRef.current = true;
                      setIsOpen(false);
                    }}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-4 py-3.5",
                      "transition-all duration-200 ease-out",
                      "active:scale-[0.98] touch-manipulation",
                      active
                        ? "bg-emerald-500 text-white shadow-[0_0_24px_rgba(16,185,129,0.45)] ring-1 ring-emerald-400/60 backdrop-blur-sm"
                        : "bg-white/40 text-slate-700 hover:bg-white/70 hover:text-emerald-600 backdrop-blur-sm"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                        active ? "bg-white/20" : "bg-white/60 group-hover:bg-emerald-100"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5",
                          active ? "text-white" : "text-slate-500 group-hover:text-emerald-600"
                        )}
                      />
                    </div>
                    <span className="flex-1 font-medium">{item.name}</span>
                    <ChevronRight
                      className={cn(
                        "h-5 w-5 transition-all duration-200",
                        active
                          ? "text-white/80"
                          : "text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5"
                      )}
                    />
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Phone + social — icons only */}
          <div className="border-t border-white/25 bg-white/20 px-5 pt-4 safe-area-bottom">
            <div className="flex items-center justify-center gap-7 py-4">
              <a
                href="tel:+436764008534"
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-white/50 hover:text-emerald-600 active:scale-95 touch-manipulation"
                aria-label={messages.shared.nav.callStore}
              >
                <Phone className="h-6 w-6" strokeWidth={1.75} aria-hidden />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-white/50 hover:text-emerald-600 active:scale-95 touch-manipulation"
                aria-label="Instagram"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-white/50 hover:text-emerald-600 active:scale-95 touch-manipulation"
                aria-label="Facebook"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
            <div className="h-3 shrink-0" aria-hidden />
          </div>
        </div>
      </div>
    </>
  );
}
