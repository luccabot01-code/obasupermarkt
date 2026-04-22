"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PromotionCard } from "@/components/public/PromotionCard";
import { FadeUpOnMount, PageEnterItem, PageEnterStagger } from "@/components/shared/PageEnterMotion";
import { useLocalizedPath, useMessages } from "@/contexts/LocaleContext";
import type { Promotion } from "@/types";

interface PromotionsPageClientProps {
  activePromotions: Promotion[];
  featuredPromotions: Promotion[];
}

export function PromotionsPageClient({
  activePromotions,
  featuredPromotions,
}: PromotionsPageClientProps) {
  const lp = useLocalizedPath();
  const messages = useMessages();

  return (
    <div className="flex-1">
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50/90 via-background to-primary/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(22,163,74,0.12),transparent)]" />
        <div className="container relative mx-auto px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <FadeUpOnMount>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {messages.catalog.promotions.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {messages.catalog.promotions.description}
              </p>
            </FadeUpOnMount>
          </div>
        </div>
      </div>

      {featuredPromotions.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUpOnMount className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {messages.catalog.promotions.featuredTitle}
              </h2>
            </FadeUpOnMount>
            <PageEnterStagger
              delayChildren={0.12}
              staggerDelay={0.08}
              className="grid gap-6 md:grid-cols-2"
            >
              {featuredPromotions.map((promotion) => (
                <PageEnterItem key={promotion.id} className="h-full">
                  <PromotionCard promotion={promotion} variant="featured" />
                </PageEnterItem>
              ))}
            </PageEnterStagger>
          </div>
        </section>
      )}

      <section className="border-t border-emerald-100/60 bg-gradient-to-b from-muted/40 to-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUpOnMount className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {messages.catalog.promotions.allTitle}
            </h2>
            <p className="text-sm font-medium text-muted-foreground">
              {activePromotions.length} {messages.catalog.promotions.activeSuffix}
            </p>
          </FadeUpOnMount>

          {activePromotions.length > 0 ? (
            <PageEnterStagger
              delayChildren={0.1}
              staggerDelay={0.06}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {activePromotions.map((promotion) => (
                <PageEnterItem key={promotion.id} className="h-full">
                  <PromotionCard promotion={promotion} variant="default" />
                </PageEnterItem>
              ))}
            </PageEnterStagger>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/50 py-16"
            >
              <Calendar className="h-12 w-12 text-emerald-600/40" />
              <p className="mt-4 text-muted-foreground">{messages.catalog.promotions.none}</p>
              <p className="text-sm text-muted-foreground">
                {messages.catalog.promotions.soon}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <FadeUpOnMount>
            <h2 className="text-2xl font-bold text-foreground">{messages.catalog.promotions.exploreTitle}</h2>
            <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
              {messages.catalog.promotions.exploreDescription}
            </p>
            <Button className="mt-6 rounded-xl shadow-md shadow-emerald-600/15" asChild>
              <Link href={lp("/public/products")}>
                {messages.catalog.promotions.exploreCta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </FadeUpOnMount>
        </div>
      </section>
    </div>
  );
}
