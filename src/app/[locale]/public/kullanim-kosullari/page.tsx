import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTermsPageCopy } from "@/lib/i18n/page-copy";
import { pathForLocale, resolveLocale } from "@/lib/i18n/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const copy = getTermsPageCopy(locale);

  return {
    title: copy.title,
    description: copy.description,
  };
}

export default async function TermsOfUsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const copy = getTermsPageCopy(locale);
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
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {copy.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {copy.updated}: {new Date().getFullYear()}
            </p>
          </div>
        </div>

        <article className="container mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-semibold prose-p:text-muted-foreground prose-li:text-muted-foreground">
            {copy.sections.map((section, index) => (
              <section key={section.title} className={index === 0 ? "" : "mt-10"}>
                <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul className="list-disc space-y-2 pl-5">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <p className="mt-14 border-t border-border/60 pt-5 text-center text-[10px] leading-relaxed text-muted-foreground/65 sm:text-[11px]">
            {copy.disclaimer}
          </p>
        </article>
      </div>
    </div>
  );
}
