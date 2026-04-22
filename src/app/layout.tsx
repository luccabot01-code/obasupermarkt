import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HtmlLang } from "@/components/shared/HtmlLang";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { localeToHtmlLang } from "@/lib/i18n/config";
import { getLocalizedStoreValue } from "@/lib/i18n/content";
import { getRequestLocale } from "@/lib/i18n/server";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#16a34a",
  viewportFit: "cover",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const localizedKeywords = {
  de: ["Supermarkt", "Lebensmittel", "Angebote", "Aktionen", "frische Produkte", "Oba Supermarkt"],
  tr: ["süpermarket", "gıda", "indirimler", "kampanyalar", "taze ürünler", "Oba Supermarkt"],
} as const;

function localeToOpenGraph(locale: "de" | "tr"): string {
  switch (locale) {
    case "de":
      return "de_AT";
    case "tr":
      return "tr_TR";
    default:
      return "de_AT";
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const title = getLocalizedStoreValue("metaTitle", locale);
  const description = getLocalizedStoreValue("metaDescription", locale);

  return {
    title: {
      default: title,
      template: "%s | Oba Supermarkt",
    },
    description,
    keywords: [...localizedKeywords[locale]],
    authors: [{ name: "Oba Supermarkt" }],
    creator: "Oba Supermarkt",
    metadataBase: new URL("https://obasupermarkt.at"),
    openGraph: {
      type: "website",
      locale: localeToOpenGraph(locale),
      url: "https://obasupermarkt.at",
      siteName: "Oba Supermarkt",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();

  return (
    <html
      lang={localeToHtmlLang(locale)}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background">
        <HtmlLang />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
