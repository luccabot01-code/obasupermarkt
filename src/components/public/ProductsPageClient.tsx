"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, Grid3X3, LayoutList } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/public/ProductCard";
import { FadeUpOnMount, PageEnterItem, PageEnterStagger } from "@/components/shared/PageEnterMotion";
import { useLocale, useLocalizedPath, useMessages } from "@/contexts/LocaleContext";
import type { Category, Product } from "@/types";

interface ProductsPageClientProps {
  products: Product[];
  categories: Category[];
}

function productSearchFilter(products: Product[], query: string, locale: string): Product[] {
  const q = query.trim().toLocaleLowerCase(locale);
  if (!q) return products;
  return products.filter((p) => p.name.toLocaleLowerCase(locale).includes(q));
}

export function ProductsPageClient({ products }: ProductsPageClientProps) {
  const locale = useLocale();
  const lp = useLocalizedPath();
  const messages = useMessages();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(
    () => productSearchFilter(products, searchQuery, locale),
    [products, searchQuery, locale]
  );

  return (
    <div className="flex-1">
      <div className="border-b border-emerald-100/80 bg-gradient-to-b from-emerald-50/40 to-muted/20">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <FadeUpOnMount>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {messages.catalog.products.title}
            </h1>
            <p className="mt-2 max-w-xl text-muted-foreground">
              {messages.catalog.products.description}
            </p>
          </FadeUpOnMount>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          <aside className="hidden lg:block">
            <motion.div
              className="sticky top-24 space-y-6"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-4 shadow-sm backdrop-blur-sm">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {messages.catalog.products.searchHeading}
                </h3>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={messages.catalog.products.searchPlaceholder}
                    className="rounded-xl pl-9"
                    aria-label={messages.catalog.products.searchAria}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-4 shadow-sm backdrop-blur-sm">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {messages.catalog.products.categoriesHeading}
                </h3>
                <div className="space-y-1">
                  <Link
                    href={lp("/public/products")}
                    className="block rounded-xl bg-emerald-500/10 px-3 py-2.5 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200/50"
                  >
                    {messages.catalog.products.allProducts}
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-4 shadow-sm backdrop-blur-sm">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {messages.catalog.products.priceRangeHeading}
                </h3>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder={messages.catalog.products.min} className="w-20 rounded-xl" />
                  <span className="text-muted-foreground">–</span>
                  <Input type="number" placeholder={messages.catalog.products.max} className="w-20 rounded-xl" />
                </div>
              </div>
            </motion.div>
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-6 lg:hidden">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={messages.catalog.products.searchPlaceholder}
                  className="rounded-xl pl-9"
                  aria-label={messages.catalog.products.searchAria}
                  autoComplete="off"
                />
              </div>
            </div>

            <FadeUpOnMount delay={0.05} className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredProducts.length}</span>{" "}
                {messages.catalog.products.resultsSuffix}
                {searchQuery.trim() ? (
                  <span className="text-muted-foreground"> ({messages.catalog.products.totalLabel} {products.length})</span>
                ) : null}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-xl lg:hidden">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  {messages.catalog.products.filter}
                </Button>
                <div className="hidden items-center gap-1 rounded-xl border border-slate-200/80 bg-white/50 p-1 sm:flex">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </FadeUpOnMount>

            {products.length > 0 ? (
              filteredProducts.length > 0 ? (
                <PageEnterStagger className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <PageEnterItem key={product.id} className="h-full">
                      <ProductCard product={product} />
                    </PageEnterItem>
                  ))}
                </PageEnterStagger>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-16">
                  <p className="text-muted-foreground">
                    &quot;{searchQuery.trim()}&quot; {messages.catalog.products.noResultsSuffix}
                  </p>
                  <Button
                    variant="link"
                    className="mt-2 text-emerald-700"
                    onClick={() => setSearchQuery("")}
                  >
                    {messages.catalog.products.clearSearch}
                  </Button>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-16">
                <p className="text-muted-foreground">{messages.catalog.products.noProducts}</p>
              </div>
            )}

            {products.length > 0 && filteredProducts.length > 0 && (
              <FadeUpOnMount delay={0.25} className="mt-8 flex items-center justify-center gap-2">
                <Button variant="outline" size="sm" className="rounded-xl" disabled>
                  {messages.catalog.products.previous}
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl" disabled>
                  {messages.catalog.products.next}
                </Button>
              </FadeUpOnMount>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
