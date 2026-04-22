import { notFound } from "next/navigation";
import { Navbar } from "@/components/shared/Navbar";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { locales, isValidLocale, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <LocaleProvider locale={locale}>
      <Navbar />
      <main className="flex min-h-0 flex-1 flex-col bg-background pt-nav">{children}</main>
    </LocaleProvider>
  );
}
