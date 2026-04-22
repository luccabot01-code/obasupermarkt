import Link from "next/link";
import { Search, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { getRequestLocale } from "@/lib/i18n/server";

const notFoundCopy: Record<
  Locale,
  {
    title: string;
    description: string;
    home: string;
  }
> = {
  tr: {
    title: "Sayfa Bulunamadı",
    description:
      "Aradığınız sayfa mevcut değil veya taşınmış olabilir. Lütfen ana sayfaya dönün ya da başka bir sayfa deneyin.",
    home: "Ana Sayfa",
  },
  de: {
    title: "Seite nicht gefunden",
    description:
      "Die gesuchte Seite gibt es nicht oder sie wurde vielleicht verschoben. Bitte kehren Sie zur Startseite zurück oder versuchen Sie eine andere Seite.",
    home: "Startseite",
  },
};

export default async function NotFound() {
  const locale = await getRequestLocale();
  const copy = notFoundCopy[locale];
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <Search className="h-12 w-12 text-primary" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">
          {copy.title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          {copy.description}
        </p>

        <div className="mt-8 flex justify-center">
          <Button asChild>
            <Link href={lp("/")}>
              <Home className="mr-2 h-4 w-4" />
              {copy.home}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
