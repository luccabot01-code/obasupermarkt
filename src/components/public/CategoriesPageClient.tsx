"use client";

import { CategoryCard } from "@/components/public/CategoryCard";
import { FadeUpOnMount, PageEnterItem, PageEnterStagger } from "@/components/shared/PageEnterMotion";
import { useMessages } from "@/contexts/LocaleContext";
import type { Category } from "@/types";

export type CategoryWithCount = Category & { productCount: number };

interface CategoriesPageClientProps {
  categories: CategoryWithCount[];
}

export function CategoriesPageClient({ categories }: CategoriesPageClientProps) {
  const messages = useMessages();

  return (
    <div className="flex-1">
      <div className="border-b border-emerald-100/80 bg-gradient-to-b from-emerald-50/40 to-muted/20">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <FadeUpOnMount>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {messages.catalog.categories.title}
            </h1>
            <p className="mt-2 max-w-xl text-muted-foreground">
              {messages.catalog.categories.description}
            </p>
          </FadeUpOnMount>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <PageEnterStagger
          delayChildren={0.08}
          staggerDelay={0.055}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {categories.map((category) => (
            <PageEnterItem key={category.id} className="h-full">
              <CategoryCard category={category} productCount={category.productCount} />
            </PageEnterItem>
          ))}
        </PageEnterStagger>
      </div>
    </div>
  );
}
