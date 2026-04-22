"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { useLocale, useLocalizedPath, useMessages } from "@/contexts/LocaleContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice, calculateDiscountPercentage } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

export function ProductCard({ product, showCategory = true }: ProductCardProps) {
  const locale = useLocale();
  const lp = useLocalizedPath();
  const messages = useMessages();
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercentage = hasDiscount
    ? calculateDiscountPercentage(product.price, product.compareAtPrice!)
    : 0;

  return (
    <Link href={lp(`/public/products/${product.slug}`)} className="block h-full">
      <Card
        className={cn(
          "group h-full min-w-0 gap-0 overflow-hidden border-0 py-0",
          "rounded-xl bg-card/90 shadow-md ring-1 ring-slate-200/70 sm:rounded-2xl",
          "transition-all duration-300 sm:hover:-translate-y-1 sm:hover:shadow-lg sm:hover:ring-emerald-300/50 sm:hover:-translate-y-1.5 sm:hover:shadow-xl"
        )}
      >
        {/* Mobilde daha alçak görsel = daha az dikey alan */}
        <div className="relative aspect-[5/4] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 sm:aspect-square">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 sm:group-hover:scale-[1.06]"
              sizes="(max-width: 640px) 46vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-xs text-muted-foreground sm:text-sm">{messages.cards.product.noImage}</span>
            </div>
          )}

          {hasDiscount && (
            <Badge className="absolute left-1.5 top-1.5 rounded-md border-0 bg-red-500/95 px-1 py-px text-[9px] font-semibold text-white shadow sm:left-3 sm:top-3 sm:rounded-lg sm:px-2 sm:py-0.5 sm:text-[11px]">
              %{discountPercentage} {messages.cards.product.discountSuffix}
            </Badge>
          )}

          {product.isFeatured && !hasDiscount && (
            <Badge className="absolute left-1.5 top-1.5 rounded-md border border-emerald-200/60 bg-emerald-500/95 px-1 py-px text-[9px] font-semibold text-white shadow sm:left-3 sm:top-3 sm:rounded-lg sm:px-2 sm:py-0.5 sm:text-[11px]">
              {messages.cards.product.featured}
            </Badge>
          )}
        </div>

        <CardContent className="space-y-1 p-2.5 sm:space-y-2 sm:p-4">
          {showCategory && (
            <p className="line-clamp-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-emerald-700/80 sm:text-[11px] sm:tracking-[0.12em]">
              {product.category.name}
            </p>
          )}

            <h3 className="line-clamp-2 text-xs font-semibold leading-tight text-foreground transition-colors sm:group-hover:text-emerald-700 sm:text-[15px] sm:leading-snug">
            {product.name}
          </h3>

          <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0 sm:gap-x-2">
            <span className="text-sm font-bold tabular-nums text-emerald-700 sm:text-lg">
              {formatPrice(product.price, locale)}
            </span>
            {hasDiscount && (
              <span className="text-[10px] tabular-nums text-muted-foreground line-through sm:text-sm">
                {formatPrice(product.compareAtPrice!, locale)}
              </span>
            )}
          </div>

          <p className="text-[10px] text-muted-foreground sm:text-xs">
            {product.weight
              ? `${product.weight >= 1000 ? product.weight / 1000 : product.weight} ${
                  product.weight >= 1000 ? "kg" : "g"
                }`
              : product.unit}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
