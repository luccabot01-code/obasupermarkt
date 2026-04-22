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
  Tag,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { getAllPromotions } from "@/lib/data/promotions";
import { getAdminMessages } from "@/lib/i18n/admin-messages";
import { formatDate, formatPromotionValue } from "@/lib/utils";
import { localizedPath } from "@/lib/i18n/paths";
import {
  deletePromotionAction,
  patchPromotionAction,
} from "@/app/admin/_actions/catalog";

type PromotionRow = ReturnType<typeof getAllPromotions>[number];

function isPromotionLive(promotion: PromotionRow) {
  const now = new Date();
  const start = new Date(promotion.startDate);
  const end = new Date(promotion.endDate);
  return promotion.isActive && now >= start && now <= end;
}

export default function AdminPromotionsPage() {
  const router = useRouter();
  const locale = useLocale();
  const messages = getAdminMessages(locale);
  const promotions = getAllPromotions(locale);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPromotions, setSelectedPromotions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const normalizedQuery = searchQuery.toLocaleLowerCase(locale);
  const filteredPromotions = promotions.filter((promotion) =>
    promotion.title.toLocaleLowerCase(locale).includes(normalizedQuery),
  );

  const togglePromotionSelection = (promotionId: string) => {
    setSelectedPromotions((prev) =>
      prev.includes(promotionId)
        ? prev.filter((id) => id !== promotionId)
        : [...prev, promotionId],
    );
  };

  const toggleAllSelection = () => {
    if (selectedPromotions.length === filteredPromotions.length) {
      setSelectedPromotions([]);
    } else {
      setSelectedPromotions(filteredPromotions.map((p) => p.id));
    }
  };

  const handleDelete = (promotionId: string) => {
    if (!confirm(messages.common.confirmDelete)) return;
    startTransition(() => {
      void (async () => {
        const res = await deletePromotionAction(promotionId);
        if (!res.ok) {
          alert(messages.common.deleteFailed);
          return;
        }
        setSelectedPromotions((prev) => prev.filter((id) => id !== promotionId));
        router.refresh();
      })();
    });
  };

  const handlePatch = (
    promotionId: string,
    patch: Partial<{ isActive: boolean; isFeatured: boolean }>,
  ) => {
    startTransition(() => {
      void (async () => {
        const res = await patchPromotionAction(promotionId, patch);
        if (!res.ok) alert(messages.common.deleteFailed);
        router.refresh();
      })();
    });
  };

  const scheduleBadge = (promotion: PromotionRow) => {
    if (!promotion.isActive) {
      return (
        <Badge variant="secondary" className="max-w-full truncate font-normal">
          {messages.promotionsPage.badgeOff}
        </Badge>
      );
    }
    if (isPromotionLive(promotion)) {
      return (
        <Badge className="max-w-full truncate border-emerald-200 bg-emerald-50 font-normal text-emerald-900 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-100">
          {messages.promotionsPage.badgeLive}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="max-w-full truncate font-normal">
        {messages.promotionsPage.badgeScheduled}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {messages.promotionsPage.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {messages.promotionsPage.total(promotions.length)}
          </p>
        </div>
        <div className="shrink-0 sm:pt-0.5">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/admin/promotions/new">
              <Plus className="mr-2 h-4 w-4" />
              {messages.promotionsPage.newPromotion}
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative min-w-0">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={messages.promotionsPage.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {selectedPromotions.length > 0 ? (
        <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {messages.promotionsPage.selected(selectedPromotions.length)}
          </p>
          <Button variant="outline" size="sm" type="button" disabled>
            {messages.promotionsPage.bulkDelete}
          </Button>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10 pl-3">
                <Checkbox
                  checked={
                    selectedPromotions.length === filteredPromotions.length &&
                    filteredPromotions.length > 0
                  }
                  onCheckedChange={toggleAllSelection}
                />
              </TableHead>
              <TableHead className="min-w-[200px]">{messages.promotionsPage.promotion}</TableHead>
              <TableHead className="hidden md:table-cell">{messages.promotionsPage.discount}</TableHead>
              <TableHead className="hidden lg:table-cell">{messages.promotionsPage.startDate}</TableHead>
              <TableHead className="hidden lg:table-cell">{messages.promotionsPage.endDate}</TableHead>
              <TableHead className="min-w-[112px] max-w-[140px] text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {messages.promotionsPage.scheduleColumn}
              </TableHead>
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
            {filteredPromotions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-36 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Tag className="h-8 w-8 opacity-60" />
                    <p>{messages.promotionsPage.empty}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredPromotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <TableCell className="pl-3">
                    <Checkbox
                      checked={selectedPromotions.includes(promotion.id)}
                      onCheckedChange={() => togglePromotionSelection(promotion.id)}
                    />
                  </TableCell>
                  <TableCell className="max-w-[min(100vw-8rem,320px)] whitespace-normal">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Tag className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium leading-snug">{promotion.title}</p>
                        <p className="line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                          {promotion.description}
                        </p>
                        <div className="mt-2 md:hidden">
                          <Badge variant="secondary">{formatPromotionValue(promotion, locale)}</Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="secondary">{formatPromotionValue(promotion, locale)}</Badge>
                  </TableCell>
                  <TableCell className="hidden whitespace-nowrap text-sm lg:table-cell">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      {formatDate(promotion.startDate, locale)}
                    </div>
                  </TableCell>
                  <TableCell className="hidden whitespace-nowrap text-sm lg:table-cell">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      {formatDate(promotion.endDate, locale)}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-normal py-3">
                    <div className="flex flex-col items-start gap-1">{scheduleBadge(promotion)}</div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center py-0.5">
                      <Switch
                        size="sm"
                        checked={promotion.isActive}
                        disabled={isPending}
                        aria-label={messages.common.toggleActive}
                        onCheckedChange={(checked) =>
                          handlePatch(promotion.id, { isActive: checked === true })
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center py-0.5">
                      <Switch
                        size="sm"
                        checked={promotion.isFeatured}
                        disabled={isPending}
                        aria-label={messages.common.toggleFeatured}
                        onCheckedChange={(checked) =>
                          handlePatch(promotion.id, { isFeatured: checked === true })
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
                          <Link href={localizedPath(locale, `/public/promotions/${promotion.slug}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            {messages.common.view}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          disabled={isPending}
                          onClick={() => handleDelete(promotion.id)}
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
          {messages.promotionsPage.showing(filteredPromotions.length)}
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
