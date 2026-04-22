import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HtmlLang } from "@/components/shared/HtmlLang";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { BRAND_LOGO_ALT, BRAND_LOGO_PATH } from "@/lib/brand";
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
  de: ["Supermarkt", "Lebensmittel", "Rabatte", "Aktionen", "frische Produkte", "Oba Supermarkt"],
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

function getMetadataBase(): URL {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    "https://obasupermarkt.vercel.app";

  return new URL(siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`);
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const title = getLocalizedStoreValue("metaTitle", locale);
  const description = getLocalizedStoreValue("metaDescription", locale);
  const metadataBase = getMetadataBase();
  const socialImage = {
    url: BRAND_LOGO_PATH,
    width: 826,
    height: 826,
    alt: BRAND_LOGO_ALT,
  } as const;

  return {
    title: {
      default: title,
      template: "%s | Oba Supermarkt",
    },
    description,
    keywords: [...localizedKeywords[locale]],
    authors: [{ name: "Oba Supermarkt" }],
    creator: "Oba Supermarkt",
    metadataBase,
    icons: {
      icon: [
        { url: BRAND_LOGO_PATH, type: "image/png", sizes: "826x826" },
      ],
      shortcut: [BRAND_LOGO_PATH],
      apple: [
        { url: BRAND_LOGO_PATH, type: "image/png", sizes: "826x826" },
      ],
    },
    openGraph: {
      type: "website",
      locale: localeToOpenGraph(locale),
      url: metadataBase,
      siteName: "Oba Supermarkt",
      title,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
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
