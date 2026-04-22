"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  locales,
  localeFlags,
  getLocaleLabels,
  localeDrawerLanguageHeading,
  type Locale,
  defaultLocale,
} from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { localizedPath, stripLocalePrefix } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";

export type LanguageSwitcherVariant = "header" | "drawer";

type LanguageSwitcherProps = {
  className?: string;
  variant?: LanguageSwitcherVariant;
  /** Drawer’da dil değişince (ör. menüyü hemen kapat) */
  onLocalePicked?: () => void;
};

export function LanguageSwitcher({
  className,
  variant = "header",
  onLocalePicked,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  const current: Locale =
    segments[0] && locales.includes(segments[0] as Locale)
      ? (segments[0] as Locale)
      : defaultLocale;
  const messages = getMessages(current);
  const localeLabels = getLocaleLabels(current);

  const restPath = stripLocalePrefix(pathname);

  async function switchLocale(next: Locale) {
    const dest = localizedPath(next, restPath === "/" ? "/" : restPath.replace(/\/$/, ""));
    try {
      await fetch("/api/locale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locale: next }),
      });
    } catch {
      // Best effort only: locale is still reflected by the route segment.
    }

    setDrawerOpen(false);
    onLocalePicked?.();
    router.push(dest);
    router.refresh();
  }

  if (variant === "drawer") {
    const heading = localeDrawerLanguageHeading[current];
    const radiogroupId = "mobile-locale-picker";

    return (
      <div className={cn("w-full", className)}>
        <button
          type="button"
          id={`${radiogroupId}-trigger`}
          aria-expanded={drawerOpen}
          aria-controls={radiogroupId}
          onClick={() => setDrawerOpen((o) => !o)}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl border border-slate-200/80 bg-white/50 px-3 py-3 text-left transition-colors",
            "touch-manipulation active:scale-[0.99] hover:border-emerald-200/90 hover:bg-white/80",
            drawerOpen && "border-emerald-200/80 bg-white/70 ring-2 ring-emerald-500/15"
          )}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-700">
            <Globe className="h-4 w-4" strokeWidth={2} aria-hidden />
          </div>
          <span className="min-w-0 flex-1 font-semibold text-slate-900">{heading}</span>
          <span className="text-2xl leading-none" aria-hidden>
            {localeFlags[current]}
          </span>
          <ChevronDown
            className={cn("h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200", drawerOpen && "rotate-180")}
            aria-hidden
          />
        </button>

        {drawerOpen ? (
          <div
            id={radiogroupId}
            role="radiogroup"
            aria-label={heading}
            className="mt-2 flex flex-col gap-2"
          >
            {locales.map((loc) => {
              const active = loc === current;
              return (
                <button
                  key={loc}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => void switchLocale(loc)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all",
                    "touch-manipulation active:scale-[0.99]",
                    active
                      ? "border-emerald-400/70 bg-emerald-500/12 shadow-[0_0_0_1px_rgba(16,185,129,0.2)] ring-2 ring-emerald-500/25"
                      : "border-slate-200/80 bg-white/50 hover:border-emerald-200/90 hover:bg-white/80"
                  )}
                >
                  <span className="text-2xl leading-none" aria-hidden>
                    {localeFlags[loc]}
                  </span>
                  <span className="min-w-0 flex-1 font-semibold text-slate-900">{localeLabels[loc]}</span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      active ? "bg-emerald-500 text-white shadow-sm" : "bg-transparent"
                    )}
                    aria-hidden
                  >
                    {active ? <Check className="h-4 w-4" strokeWidth={2.5} /> : null}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn(
            "h-10 gap-2 rounded-xl border-emerald-200/50 bg-white/50 px-3 text-sm font-medium text-slate-800 shadow-sm backdrop-blur-md",
            "hover:border-emerald-300/70 hover:bg-white/75 hover:text-emerald-800",
            "focus-visible:ring-emerald-500/30",
            className
          )}
          aria-label={messages.shared.languageSwitcher.selectLabel}
        >
          <Globe className="h-4 w-4 text-emerald-600/90" aria-hidden />
          <span className="text-lg leading-none" aria-hidden>
            {localeFlags[current]}
          </span>
          <span className="max-w-[9rem] truncate">{localeLabels[current]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[12rem] rounded-xl border-slate-200/80 p-1 shadow-lg">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            className="cursor-pointer gap-3 rounded-lg py-2.5"
            onClick={() => void switchLocale(loc)}
          >
            <span className="text-xl" aria-hidden>
              {localeFlags[loc]}
            </span>
            <span className="flex-1 font-medium">{localeLabels[loc]}</span>
            {loc === current ? <Check className="h-4 w-4 text-emerald-600" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
