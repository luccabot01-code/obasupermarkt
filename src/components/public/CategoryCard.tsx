"use client";

import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types";
import { useLocalizedPath, useMessages } from "@/contexts/LocaleContext";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  productCount?: number;
}

export function CategoryCard({ category, productCount }: CategoryCardProps) {
  const lp = useLocalizedPath();
  const messages = useMessages();
  return (
    <Link href={lp(`/public/categories/${category.slug}`)} className="block h-full">
      <Card
        className={cn(
          "group h-full gap-0 overflow-hidden border-0 py-0",
          "rounded-2xl shadow-md ring-1 ring-slate-200/70",
          "transition-all duration-300 sm:hover:-translate-y-1.5 sm:hover:shadow-xl sm:hover:ring-emerald-300/50"
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-emerald-50 to-slate-100">
          {category.image ? (
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-500 sm:group-hover:scale-[1.05]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-5xl font-bold text-emerald-600/15">
                {category.name.charAt(0)}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
            <h3 className="text-lg font-bold tracking-tight text-white drop-shadow-sm sm:text-xl">
              {category.name}
            </h3>
            {category.description && (
              <p className="mt-1 line-clamp-2 text-sm leading-snug text-white/75">
                {category.description}
              </p>
            )}
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/15 pt-3">
              {productCount !== undefined && (
                <span className="rounded-md bg-white/15 px-2 py-0.5 text-[11px] font-semibold text-white/90 backdrop-blur-sm">
                  {productCount} {messages.cards.category.productCountSuffix}
                </span>
              )}
              <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-white">
                {messages.cards.category.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform sm:group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
