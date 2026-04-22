import HomePageClient from "@/components/public/HomePageClient";
import { Footer } from "@/components/shared/Footer";
import { getStoreSettings, isStoreOpen, getTodayBusinessHours } from "@/lib/data/store";
import { getFeaturedPromotions } from "@/lib/data/promotions";
import { getLocalizedStoreValue } from "@/lib/i18n/content";
import { resolveLocale } from "@/lib/i18n/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  return {
    title: {
      absolute: "obasupermarkt",
    },
    description: getLocalizedStoreValue("metaDescription", locale),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const [store, storeOpen, todayHours] = await Promise.all([
    getStoreSettings(locale),
    isStoreOpen(),
    getTodayBusinessHours(locale),
  ]);
  const featuredPromotions = getFeaturedPromotions(3, locale);

  return (
    <div className="min-w-0 overflow-x-hidden">
      <HomePageClient
        store={store}
        storeOpen={storeOpen}
        todayHours={todayHours}
        featuredPromotions={featuredPromotions}
      />
      <Footer locale={locale} />
    </div>
  );
}
