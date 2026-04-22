import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFaqPageCopy } from "@/lib/i18n/page-copy";
import { pathForLocale, resolveLocale } from "@/lib/i18n/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const copy = getFaqPageCopy(locale);

  return {
    title: copy.title,
    description: copy.description,
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const copy = getFaqPageCopy(locale);
  const lp = pathForLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <Button variant="ghost" size="sm" className="mb-4 -ml-2 h-9" asChild>
              <Link href={lp("/")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {copy.backHome}
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{copy.intro}</p>
          </div>
        </div>

        <div className="container mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {copy.items.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-border/80 bg-card/40 px-4 py-1 shadow-sm transition-colors open:bg-card/80 dark:border-slate-700/60"
              >
                <summary className="cursor-pointer list-none py-3 pr-2 text-[15px] font-semibold leading-snug text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.question}
                </summary>
                <p className="border-t border-border/50 pb-4 pt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>

          <p className="mt-12 border-t border-border/60 pt-6 text-center text-[10px] leading-relaxed text-muted-foreground/75 sm:text-[11px]">
            {copy.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
