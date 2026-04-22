"use client";
import Image from "next/image";
import { Promotion } from "@/types";
import { useLocale, useMessages } from "@/contexts/LocaleContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { cn, formatDate, formatPromotionValue } from "@/lib/utils";

interface PromotionCardProps {
  promotion: Promotion;
  variant?: "default" | "featured" | "compact" | "tile";
}

export function PromotionCard({
  promotion,
  variant = "default",
}: PromotionCardProps) {
  const locale = useLocale();
  const messages = useMessages();
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";
  const isTile = variant === "tile";

  const aspectClass = isFeatured
    ? "aspect-[16/9]"
    : isCompact
      ? "aspect-[4/3]"
      : isTile
        ? "aspect-[7/10] min-h-[290px] sm:aspect-[4/5] sm:min-h-0"
        : "aspect-[16/10]";

  const content = (
    <>
      {/* Image Container */}
      <div className={cn("relative w-full shrink-0 overflow-hidden bg-muted", aspectClass)}>
        {promotion.image ? (
          <Image
            src={promotion.image}
            alt={promotion.title}
            fill
            className="object-cover transition-transform duration-500 sm:group-hover:scale-105"
            sizes={
              isFeatured
                ? "100vw"
                : isCompact
                  ? "(max-width: 640px) 100vw, 33vw"
                  : isTile
                    ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    : "(max-width: 640px) 100vw, 50vw"
            }
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <span className="text-4xl font-bold text-primary/30">
              {formatPromotionValue(promotion, locale)}
            </span>
          </div>
        )}

        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t",
            isTile
              ? "from-black/88 via-black/52 via-45% to-black/8"
              : "from-black/75 via-black/25 to-black/5"
          )}
        />

        {isTile && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_42%)] opacity-80" />
        )}

        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-end",
            isTile ? "p-3.5 pb-4.5 sm:p-6" : "p-4 sm:p-6"
          )}
        >
          <Badge className="mb-2 w-fit rounded-lg border border-white/25 bg-black/35 px-2 py-0.5 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md sm:px-2.5 sm:text-xs">
            {formatPromotionValue(promotion, locale)}
          </Badge>

          {/* Title */}
          <h3
            className={cn(
              "font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]",
              isFeatured ? "text-2xl sm:text-3xl" : isCompact ? "text-lg" : "text-xl",
              isTile && "line-clamp-3 text-base leading-[1.3] sm:line-clamp-2 sm:text-xl sm:leading-snug"
            )}
          >
            {promotion.title}
          </h3>

          {/* Description */}
          {!isCompact && promotion.description && (
            <p
              className={cn(
                "mt-1.5 text-sm leading-relaxed",
                isTile
                  ? "line-clamp-5 text-[13px] text-white/95 sm:line-clamp-2 sm:text-sm"
                  : "line-clamp-2 text-white/80"
              )}
            >
              {promotion.description}
            </p>
          )}

          {/* Date */}
          <div
            className={cn(
              "mt-2 flex items-start gap-1 text-[11px] leading-snug sm:items-center sm:text-xs",
              isTile ? "text-white/85" : "text-white/70"
            )}
          >
            <Calendar className="mt-0.5 h-3 w-3 shrink-0 sm:mt-0" />
            <span className="line-clamp-2">
              {formatDate(promotion.startDate, locale)} - {formatDate(promotion.endDate, locale)}
            </span>
          </div>

          {/* CTA Button */}
          {!isCompact && (
            <Button
              size="sm"
              className="mt-3 h-8 w-fit rounded-xl border-0 bg-white/95 px-3 text-xs text-foreground shadow-lg sm:h-9 sm:px-3.5 sm:text-sm sm:hover:bg-white"
            >
              {messages.cards.promotion.details}
              <ArrowRight className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          )}
        </div>
      </div>
    </>
  );

  const cardClass = cn(
    "group flex h-full flex-col overflow-hidden border-0 py-0 transition-all duration-300",
    "rounded-2xl bg-card shadow-md ring-1 ring-slate-200/60",
    "sm:hover:-translate-y-1.5 sm:hover:shadow-xl sm:hover:ring-emerald-300/45",
    isFeatured && "ring-2 ring-emerald-400/35 shadow-emerald-900/10 sm:hover:shadow-emerald-900/15"
  );

  if (isCompact) {
    return <Card className={cardClass}>{content}</Card>;
  }

  return <Card className={cardClass}>{content}</Card>;
}
