"use client";

import { useRouter } from "next/navigation";
import { Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "@/contexts/LocaleContext";
import {
  locales,
  localeFlags,
  getLocaleLabels,
  type Locale,
} from "@/lib/i18n/config";
import { getAdminMessages } from "@/lib/i18n/admin-messages";

export function AdminLanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();
  const messages = getAdminMessages(locale);
  const localeLabels = getLocaleLabels(locale);

  async function handleSwitch(next: Locale) {
    if (next === locale) return;

    try {
      await fetch("/api/locale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locale: next }),
      });
    } catch {
      // Best effort only: we still refresh to pick up the new locale if possible.
    }

    router.refresh();
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-10 justify-between gap-2 rounded-xl">
          <span className="flex items-center gap-2">
            <Globe className="h-4 w-4" aria-hidden />
            <span className="text-lg leading-none" aria-hidden>
              {localeFlags[locale]}
            </span>
            <span>{localeLabels[locale]}</span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[12rem] rounded-xl">
        {locales.map((entry) => (
          <DropdownMenuItem
            key={entry}
            className="cursor-pointer gap-3 rounded-lg py-2.5"
            onClick={() => void handleSwitch(entry)}
            aria-label={messages.shell.languageLabel}
          >
            <span className="text-xl" aria-hidden>
              {localeFlags[entry]}
            </span>
            <span className="flex-1 font-medium">{localeLabels[entry]}</span>
            {entry === locale ? <Check className="h-4 w-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
