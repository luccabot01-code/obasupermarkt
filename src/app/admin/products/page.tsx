"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  MoreHorizontal,
  Trash2,
  Eye,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "@/contexts/LocaleContext";
import { getProductsForAdmin } from "@/lib/data/products";
import { getAdminMessages } from "@/lib/i18n/admin-messages";
import { localizedPath } from "@/lib/i18n/paths";
import { formatPrice } from "@/lib/utils";
import {
  deleteProductAction,
  deleteProductsBulkAction,
  patchProductAction,
} from "@/app/admin/_actions/catalog";

export default function AdminProductsPage() {
  const router = useRouter();
  const locale = useLocale();
  const messages = getAdminMessages(locale);
  const products = getProductsForAdmin(locale);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const normalizedQuery = searchQuery.toLocaleLowerCase(locale);
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLocaleLowerCase(locale).includes(normalizedQuery) ||
      product.sku.toLocaleLowerCase(locale).includes(normalizedQuery);
    return matchesSearch;
  });

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleAllSelection = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  const handleDelete = (productId: string) => {
    if (!confirm(messages.common.confirmDelete)) return;
    startTransition(() => {
      void (async () => {
        const res = await deleteProductAction(productId);
        if (!res.ok) {
          alert(messages.common.deleteFailed);
          return;
        }
        setSelectedProducts((prev) => prev.filter((id) => id !== productId));
        router.refresh();
      })();
    });
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return;
    if (!confirm(messages.common.confirmDelete)) return;
    startTransition(() => {
      void (async () => {
        const res = await deleteProductsBulkAction(selectedProducts);
        if (res.deleted === 0) {
          alert(messages.common.deleteFailed);
          return;
        }
        setSelectedProducts([]);
        router.refresh();
      })();
    });
  };

  const handlePatch = (
    productId: string,
    patch: Partial<{
      isActive: boolean;
      isFeatured: boolean;
      quantity: number;
      price: number;
      compareAtPrice: number | null;
    }>,
  ) => {
    startTransition(() => {
      void (async () => {
        const res = await patchProductAction(productId, patch);
        if (!res.ok) alert(messages.common.deleteFailed);
        router.refresh();
      })();
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {messages.productsPage.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {messages.productsPage.total(products.length)}
          </p>
        </div>
        <div className="shrink-0 sm:pt-0.5">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              {messages.productsPage.newProduct}
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={messages.productsPage.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {selectedProducts.length > 0 ? (
        <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {messages.productsPage.selected(selectedProducts.length)}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" disabled={isPending} onClick={handleBulkDelete}>
              {messages.productsPage.bulkDelete}
            </Button>
            <Button variant="ghost" size="sm" type="button" disabled>
              {messages.productsPage.bulkUpdate}
            </Button>
          </div>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10 pl-3">
                <Checkbox
                  checked={
                    selectedProducts.length === filteredProducts.length &&
                    filteredProducts.length > 0
                  }
                  onCheckedChange={toggleAllSelection}
                />
              </TableHead>
              <TableHead className="min-w-[200px]">{messages.productsPage.product}</TableHead>
              <TableHead className="w-[100px]">{messages.productsPage.price}</TableHead>
              <TableHead className="w-[72px] text-center">{messages.productsPage.stock}</TableHead>
              <TableHead className="w-[88px] text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {messages.common.published}
              </TableHead>
              <TableHead className="w-[88px] text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {messages.common.spotlight}
              </TableHead>
              <TableHead className="w-12 pr-3 text-right" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-36 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Package className="h-8 w-8 opacity-60" />
                    <p>{messages.productsPage.empty}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="pl-3">
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => toggleProductSelection(product.id)}
                    />
                  </TableCell>
                  <TableCell className="max-w-[min(100vw-8rem,320px)] whitespace-normal">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium leading-snug">{product.name}</p>
                        <p className="text-xs text-muted-foreground sm:text-sm">SKU: {product.sku}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium tabular-nums">
                        {formatPrice(product.price, locale)}
                      </span>
                      {product.compareAtPrice ? (
                        <span className="text-xs text-muted-foreground line-through tabular-nums">
                          {formatPrice(product.compareAtPrice, locale)}
                        </span>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell className="text-center tabular-nums">
                    <span
                      className={
                        product.quantity < 20 ? "font-medium text-red-600" : "text-muted-foreground"
                      }
                    >
                      {product.quantity}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center py-0.5">
                      <Switch
                        size="sm"
                        checked={product.isActive}
                        disabled={isPending}
                        aria-label={messages.common.toggleActive}
                        onCheckedChange={(checked) =>
                          handlePatch(product.id, { isActive: checked === true })
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center py-0.5">
                      <Switch
                        size="sm"
                        checked={product.isFeatured}
                        disabled={isPending}
                        aria-label={messages.common.toggleFeatured}
                        onCheckedChange={(checked) =>
                          handlePatch(product.id, { isFeatured: checked === true })
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell className="pr-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-[10rem]">
                        <DropdownMenuItem asChild>
                          <Link
                            href={localizedPath(locale, `/public/products/${product.slug}`)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            {messages.common.view}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          disabled={isPending}
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {messages.common.delete}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {messages.productsPage.showing(filteredProducts.length)}
        </p>
        <div className="flex shrink-0 justify-end gap-2">
          <Button variant="outline" size="sm" disabled>
            {messages.common.previous}
          </Button>
          <Button variant="outline" size="sm" disabled>
            {messages.common.next}
          </Button>
        </div>
      </div>
    </div>
  );
}
