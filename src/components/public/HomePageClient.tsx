"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  animate as animateValue,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useLocalizedPath, useMessages } from "@/contexts/LocaleContext";
import {
  ArrowRight,
  BadgePercent,
  Clock,
  Leaf,
  ShieldCheck,
  ShoppingBasket,
  Smile,
  Sparkles,
  Tags,
  UtensilsCrossed,
} from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { StoreNameWordmark } from "@/components/shared/StoreNameWordmark";
import { Button } from "@/components/ui/button";
import { useHoverCapable } from "@/hooks/useHoverCapable";
import type { BusinessHours, Promotion, StoreSettings } from "@/types";
import { PromotionCard } from "@/components/public/PromotionCard";


// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const heroChipIcons = [
  Leaf,
  BadgePercent,
  Tags,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Smile,
  UtensilsCrossed,
] as const;

const heroChipLoop = [...heroChipIcons, ...heroChipIcons] as const;

const STAIR_MIN_WIDTH = 18; // rem – en kısa chip
const STAIR_STEP = 4;       // rem – her adımdaki sabit artış

/** Sepet, bölüm sağ kenarından bu kadar px dışarıda başlar (tamamen dışarıdan giriş) */
const CAMPAIGN_CART_OFFSCREEN_RIGHT_PX = 220;

/** Sepet görseli zaman çizelgesi çarpanı (>1 = daha hızlı); başlık harfleri `campaignProgress` ile senkron kalır */
const CAMPAIGN_CART_TIMELINE_BOOST = 1.16;

const heroChipColor = "rgb(22, 163, 74)";
const heroChipStartColor = { r: 22, g: 163, b: 74 };
const heroChipEndColor = { r: 105, g: 107, b: 112 };

function getHeroChipColor(index: number, total: number) {
  const progress = total <= 1 ? 0 : index / (total - 1);
  const r = Math.round(
    heroChipStartColor.r + (heroChipEndColor.r - heroChipStartColor.r) * progress,
  );
  const g = Math.round(
    heroChipStartColor.g + (heroChipEndColor.g - heroChipStartColor.g) * progress,
  );
  const b = Math.round(
    heroChipStartColor.b + (heroChipEndColor.b - heroChipStartColor.b) * progress,
  );

  return `rgb(${r}, ${g}, ${b})`;
}

// ---- Animated character for campaigns title ----
// Each letter derives its opacity DIRECTLY from the icon's pixel position (cartX),
// guaranteeing perfect visual sync regardless of easing or timing.
function AnimatedChar({
  char,
  index,
  total,
  cartX,
  textBounds,
}: {
  char: string;
  index: number;
  total: number;
  cartX: MotionValue<number>;
  textBounds: { left: number; right: number; width: number } | null;
}) {
  // charRatio: 0 → rightmost ("ı"), 1 → leftmost ("B")
  const charRatio = (total - 1 - index) / Math.max(total - 1, 1);
  // Approximate pixel x of this character (relative to campaignsRef)
  const charX = textBounds
    ? textBounds.right - charRatio * textBounds.width
    : 0;

  const fade = 48.4; // px crossfade window (~10% wider = slower per-char fade)
  // cartX decreases as icon sweeps left → char reveals when icon passes it
  const opacity = useTransform(cartX, [charX + fade, charX - fade], [0, 1]);

  return (
    <motion.span style={{ opacity, display: "inline-block" }}>
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

interface HomePageClientProps {
  store: StoreSettings;
  storeOpen: boolean;
  todayHours?: BusinessHours;
  featuredPromotions?: Promotion[];
}

function getClientBusinessStatus(hours: BusinessHours[]) {
  const now = new Date();
  const today = now.getDay();
  const todayHours = hours.find((item) => item.day === today);

  if (!todayHours || !todayHours.isOpen) {
    return { isOpen: false, todayHours };
  }

  if (todayHours.is24Hours) {
    return { isOpen: true, todayHours };
  }

  const currentTime = now.getHours() * 60 + now.getMinutes();
  const [openHour, openMinute] = todayHours.open.split(":").map(Number);
  const [closeHour, closeMinute] = todayHours.close.split(":").map(Number);
  const openTime = openHour * 60 + openMinute;
  const closeTime = closeHour * 60 + closeMinute;

  return {
    isOpen: currentTime >= openTime && currentTime < closeTime,
    todayHours,
  };
}

export default function HomePageClient({
  store,
  storeOpen,
  todayHours,
  featuredPromotions = [],
}: HomePageClientProps) {
  const lp = useLocalizedPath();
  const messages = useMessages();
  const canHover = useHoverCapable();
  const businessHours = useMemo(() => store.businessHours ?? [], [store.businessHours]);
  const [clientStatus, setClientStatus] = useState(() => ({
    isOpen: storeOpen,
    todayHours,
  }));

  useEffect(() => {
    const syncBusinessStatus = () => {
      setClientStatus(getClientBusinessStatus(businessHours));
    };

    syncBusinessStatus();
    const intervalId = window.setInterval(syncBusinessStatus, 30_000);

    return () => window.clearInterval(intervalId);
  }, [businessHours]);

  // ---- Campaigns section animation ----
  const campaignsRef = useRef<HTMLDivElement>(null);
  // Alt tarafta negatif margin (eski -40%) geç tetikletiyordu; 0 = tam viewport, bölüm görünür görünmez
  const campaignsInView = useInView(campaignsRef, { once: true, margin: "0px" });
  const campaignProgress = useMotionValue(0);
  const campaignTitle = messages.home.weeklyPromotionsTitle;
  const campaignChars = useMemo(() => campaignTitle.split(""), [campaignTitle]);

  const [viewportWidth, setViewportWidth] = useState(1920);
  useEffect(() => {
    setViewportWidth(window.innerWidth);
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [campaignsWidth, setCampaignsWidth] = useState(0);
  useLayoutEffect(() => {
    const el = campaignsRef.current;
    if (!el) return;
    const measure = () => setCampaignsWidth(el.getBoundingClientRect().width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Measure actual INLINE text bounds (not the block h2) for precise icon positioning
  const titleTextRef = useRef<HTMLSpanElement>(null);
  const [textBounds, setTextBounds] = useState<{ left: number; right: number; width: number } | null>(null);

  useEffect(() => {
    if (campaignsInView && titleTextRef.current && campaignsRef.current) {
      const textRect = titleTextRef.current.getBoundingClientRect();
      const parentRect = campaignsRef.current.getBoundingClientRect();
      setTextBounds({
        left: textRect.left - parentRect.left,
        right: textRect.right - parentRect.left,
        width: textRect.width,
      });
    }
  }, [campaignsInView]);

  // Start animation only after text bounds are measured
  useEffect(() => {
    if (!textBounds) return;
    const controls = animateValue(campaignProgress, 1, {
      duration: 3.08, // +10% vs 2.8s — slightly slower title reveal
      ease: "linear",
    });
    return () => controls.stop();
  }, [textBounds, campaignProgress]);

  // Icon: sağdan ekran dışından girer → başlığın üzerinden sola (sağda bekleme yok)
  const trackW = campaignsWidth > 0 ? campaignsWidth : viewportWidth;
  const iconOutsideRight = trackW + CAMPAIGN_CART_OFFSCREEN_RIGHT_PX;
  const iconExit = textBounds ? textBounds.left - 100 : -200;

  const cartKeyTimes = [0, 0.82, 1] as const;
  const cartPositions = [iconOutsideRight, iconExit, -trackW * 0.35] as const;
  const cartProgressBoosted = useTransform(campaignProgress, (p) =>
    Math.min(p * CAMPAIGN_CART_TIMELINE_BOOST, 1),
  );
  const displayCartX = useTransform(cartProgressBoosted, [...cartKeyTimes], [...cartPositions]);
  const letterCartX = useTransform(campaignProgress, [...cartKeyTimes], [...cartPositions]);

  return (
    <div className="flex min-w-0 w-full max-w-full flex-1 flex-col overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-env(safe-area-inset-top,0px)-3.5rem)] flex-col overflow-hidden pt-4 pb-8 sm:min-h-0 sm:pt-6 sm:pb-12 lg:pt-8 lg:pb-24">
        {/* Arka plan: tek görsel + eski beyazlaştırma gradyanları (blur yok) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 4.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-0 overflow-hidden sm:hidden"
          >
            <Image
              src="/freepik_tabelann-ustundeki-pencer_2827990410.png"
              alt="Oba Supermarkt"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-[1.05] translate-x-[2%] translate-y-[3%] contrast-[1.04] saturate-[1.02]"
            />
          </motion.div>
          <Image
            src="/freepik_enhance-and-upscale-this-_2824589049.png"
            alt="Oba Supermarkt"
            fill
            priority
            sizes="100vw"
            className="hidden object-cover contrast-[1.04] saturate-[1.02] sm:block sm:object-[center_66%] lg:object-[center_70%] xl:object-[center_74%]"
          />
          <div className="absolute top-0 left-0 right-0 z-10 h-[230px] bg-gradient-to-b from-background via-background/90 to-transparent sm:hidden" />
          <div className="absolute top-0 left-0 right-0 z-10 hidden bg-gradient-to-b from-background via-background/95 to-transparent sm:block sm:h-72 sm:via-background/80 lg:h-80" />
          <div className="absolute bottom-0 left-0 right-0 z-10 max-sm:h-[20rem] bg-gradient-to-t from-background via-background/98 to-transparent sm:h-[17rem]" />
          <motion.div
            initial={{ opacity: 0, x: 26, y: -20, scaleX: 0.94, scaleY: 0.9 }}
            animate={{ opacity: 1, x: 0, y: 0, scaleX: 1, scaleY: 1 }}
            transition={{ duration: 0.84, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 right-0 bottom-0 z-10 hidden w-[58%] origin-top-right bg-gradient-to-l from-background via-background/90 to-transparent lg:block"
          />
        </div>
        <div className="pointer-events-none absolute top-0 -right-8 bottom-0 z-20 hidden flex-col items-end justify-between py-16 lg:flex xl:-right-10 xl:py-20">
          {heroChipIcons.map((Icon, index) => {
            const text = messages.home.heroChips[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 120, y: -18 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.84,
                  delay: 0.9 + index * 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="self-end"
                style={{ width: `${STAIR_MIN_WIDTH + index * STAIR_STEP}rem` }}
              >
                <div className="flex w-full items-center justify-end gap-2 xl:gap-2.5">
                  <div
                    className="flex h-10 w-12 shrink-0 items-center justify-center rounded-full border border-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] xl:h-11 xl:w-14"
                    style={{ backgroundColor: getHeroChipColor(index, heroChipIcons.length) }}
                  >
                    <Icon className="h-4 w-4 text-white xl:h-[1.1rem] xl:w-[1.1rem]" />
                  </div>
                  <div
                    className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-ellipsis rounded-l-full rounded-r-none border border-white/45 px-5 py-3 text-center text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] xl:px-6 xl:py-3.5 xl:text-base"
                    style={{ backgroundColor: getHeroChipColor(index, heroChipIcons.length) }}
                  >
                    {text}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="container relative z-10 mx-auto flex min-h-0 flex-1 flex-col px-4 sm:px-6 lg:px-8">
          <div className="grid min-h-0 w-full flex-1 grid-cols-1 items-stretch gap-6 py-4 sm:gap-10 sm:py-6 lg:grid-cols-2 lg:gap-8">
            {/* Başlık + açıklama üstte; CTA + mağaza durumu hero içinde alta (flex-1 boşluk) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative flex h-full min-h-0 w-full max-w-full flex-col max-sm:items-center max-sm:min-h-[calc(100svh-env(safe-area-inset-top,0px)-3.5rem-6.5rem)] max-sm:space-y-3 sm:space-y-8"
            >
              <motion.h1
                variants={fadeInUp}
                className="relative left-0 mt-0 flex w-full shrink-0 flex-col gap-1 text-3xl font-bold tracking-tight text-foreground max-sm:mt-4 max-sm:items-center max-sm:text-center sm:-left-8 sm:-mt-3 sm:items-start sm:text-left sm:gap-2 sm:text-4xl lg:-left-16 lg:-mt-4 lg:text-5xl xl:text-6xl"
              >
                <span className="flex items-center gap-3 max-sm:justify-center sm:gap-4">
                  <BrandLogo
                    frameClassName="h-11 w-11 rounded-xl shadow-lg sm:h-14 sm:w-14 lg:h-16 lg:w-16 xl:h-[4.5rem] xl:w-[4.5rem]"
                    sizes="(max-width: 640px) 44px, (max-width: 1024px) 56px, 72px"
                    priority
                    alt=""
                  />
                  <StoreNameWordmark
                    name={store.storeName}
                    className="min-w-0 leading-tight"
                    supermarktClassName="text-foreground"
                  />
                </span>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="block max-w-[22rem] text-primary max-sm:mx-auto max-sm:mt-2 max-sm:max-w-[min(100%,22rem)] max-sm:text-[24px] max-sm:leading-[1.2] max-sm:break-words sm:max-w-none"
                >
                  {messages.store.tagline}
                </motion.span>
              </motion.h1>

              {/* Mobil: açıklama kutusu başlıktan aşağı insin (üst görselde cam hizasından uzak) */}
              <div
                className="w-full min-h-0 basis-0 max-sm:flex-[1.35] sm:hidden"
                aria-hidden
              />

              {/* Desktop: CTA ve durum paneli eski yerine dönsün */}
              <div className="hidden w-full min-h-0 lg:flex-1 lg:block" aria-hidden />

              <motion.div
                variants={fadeInUp}
                className="flex shrink-0 flex-wrap justify-center gap-3 sm:mt-0 sm:justify-start sm:gap-4 lg:mt-auto"
              >
                <motion.div
                  whileHover={canHover ? { scale: 1.02 } : undefined}
                  whileTap={{ scale: 0.98 }}
                  className="touch-manipulation"
                >
                  <Button size="lg" asChild className="h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-semibold">
                    <Link href={lp("/public/products")}>
                      {messages.home.primaryCta}
                      <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={canHover ? { scale: 1.02 } : undefined}
                  whileTap={{ scale: 0.98 }}
                  className="touch-manipulation"
                >
                  <Button size="lg" variant="outline" className="h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-semibold">
                    {messages.home.secondaryCta}
                  </Button>
                </motion.div>
              </motion.div>

              {/* Store Status — minimal “window” panel */}
              <motion.div
                variants={fadeInUp}
                className="mt-4 inline-flex w-fit max-w-full shrink-0 flex-wrap items-center justify-center self-center gap-x-5 gap-y-2 rounded-2xl border border-slate-200/70 bg-slate-100/75 px-4 py-3 text-sm text-slate-800 shadow-[0_10px_28px_-12px_rgba(15,23,42,0.14),0_2px_6px_-2px_rgba(15,23,42,0.06)] ring-1 ring-inset ring-white/50 backdrop-blur-[2px] max-sm:mb-0 max-sm:w-full max-sm:max-w-lg sm:mt-4 sm:self-start sm:px-5 sm:py-3.5 lg:mt-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    animate={clientStatus.isOpen ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`h-2.5 w-2.5 rounded-full ${
                      clientStatus.isOpen ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span className="font-medium text-slate-800">
                    {clientStatus.isOpen ? messages.shared.common.openNow : messages.shared.common.closedNow}
                  </span>
                </motion.div>
                {clientStatus.todayHours && (
                  <motion.div
                    initial={{ opacity: 0, x: 26, y: -20, scaleX: 0.94, scaleY: 0.9 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex items-center gap-2 text-slate-700"
                  >
                    <Clock className="h-4 w-4" />
                    <span>
                      {messages.shared.common.today}: {clientStatus.todayHours.open} - {clientStatus.todayHours.close}
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            {/* Hero Image - Desktop Only */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <motion.div
                whileHover={canHover ? { scale: 1.02 } : undefined}
                transition={{ duration: 0.3 }}
                className="relative aspect-square"
                aria-hidden="true"
              />

            </motion.div>
          </div>

          {/* Mobile / Tablet Chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 -mx-4 mt-4 overflow-x-clip overflow-y-hidden sm:-mx-6 sm:mt-6 lg:hidden"
          >
            <div
              className="hero-chip-marquee flex w-max gap-2 pb-3 sm:gap-2.5"
              style={{ animation: "hero-chip-marquee 26s linear infinite" }}
            >
              {heroChipLoop.map((Icon, index) => {
                const text = messages.home.heroChips[index % heroChipIcons.length];
                return (
                  <motion.div
                    key={`${text}-${index}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.3 + (index % heroChipIcons.length) * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/45 px-3 py-1.5 text-xs font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] sm:px-4 sm:py-2 sm:text-sm"
                    style={{ backgroundColor: heroChipColor }}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-white sm:h-4 sm:w-4" />
                    <span className="whitespace-nowrap">{text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---- Campaigns / Fırsatlar ---- */}
      <section className="relative -mt-8 overflow-x-clip overflow-y-visible bg-background pt-10 pb-14 sm:-mt-12 sm:pt-14 sm:pb-20 lg:-mt-14 lg:pt-20 lg:pb-28">
        <div ref={campaignsRef} className="relative -mt-2 isolate overflow-x-clip sm:-mt-3">
          {/* Shopping cart icon traversing full width */}
          <motion.div
            style={{ x: displayCartX }}
            className="pointer-events-none absolute top-1/2 left-0 z-20 -translate-y-1/2 will-change-transform"
          >
            <div className="relative isolate overflow-hidden rounded-full p-1 sm:p-1.5">
              {/* Gradient zemin: iOS’ta mask-image güvenilir değil; aynı sağ fade efekti */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--background) 0%, var(--background) 58%, transparent 100%)",
                }}
              />
              <Image
                src="/ss.png"
                alt=""
                width={144}
                height={144}
                className="relative z-10 h-[6.75rem] w-[6.75rem] sm:h-[9rem] sm:w-[9rem] lg:h-[11.25rem] lg:w-[11.25rem]"
              />
            </div>
          </motion.div>

          {/* Title text */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="home-campaigns-title relative z-10 text-center text-2xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
              <span ref={titleTextRef}>
                {campaignChars.map((char, i) => (
                  <AnimatedChar
                    key={i}
                    char={char}
                    index={i}
                    total={campaignChars.length}
                    cartX={letterCartX}
                    textBounds={textBounds}
                  />
                ))}
              </span>
            </h2>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Campaign Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={campaignsInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ duration: 0.8, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-8 overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200/60 sm:mt-12 lg:mt-14"
          >
            <div className="relative aspect-[4/3] sm:aspect-[2/1] lg:aspect-[2.5/1]">
              <Image
                src="/campaigns-cover-mobile.png"
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-center sm:hidden"
              />
              <Image
                src="/campaigns-cover.png"
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1280px"
                className="hidden object-cover object-center sm:block"
              />
              {/* Gradient overlays — strong on left for text readability, clear from center-right */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 via-40% to-transparent to-60%" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent via-40% to-transparent" />

              {/* Banner Text */}
              <div className="absolute inset-0 flex flex-col items-start justify-start p-5 pt-5 sm:justify-center sm:p-8 sm:pt-20 lg:p-12 lg:pt-24">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={campaignsInView ? { opacity: 1, x: 0 } : undefined}
                  transition={{ duration: 0.6, delay: 2.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="max-w-[12.5rem] text-[16px] font-bold leading-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] sm:max-w-md sm:text-2xl lg:max-w-xl lg:text-4xl">
                    {messages.catalog.promotions.description}
                  </h3>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={campaignsInView ? { opacity: 1, y: 0 } : undefined}
                    transition={{ duration: 0.5, delay: 3.1 }}
                    className="mt-7 sm:mt-4"
                  >
                    <Button
                      size="sm"
                      className="h-9 rounded-xl border-0 bg-white/90 px-4 text-sm font-semibold text-foreground shadow-md sm:h-10 sm:px-5 sm:text-base sm:hover:bg-white"
                    >
                      {messages.home.secondaryCta}
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Featured Promotions Grid */}
          {featuredPromotions.length > 0 && (
            <motion.div
              initial="hidden"
              animate={campaignsInView ? "visible" : undefined}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.12, delayChildren: 3.0 },
                },
              }}
              className="mt-4 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6"
            >
              {featuredPromotions.map((promo, index) => (
                <motion.div
                  key={promo.id}
                  className={index > 1 ? "hidden lg:block" : ""}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  <PromotionCard promotion={promo} variant="tile" />
                </motion.div>
              ))}
            </motion.div>
          )}

        </div>
      </section>

    </div>
  );
}
