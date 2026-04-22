import { Heart, Leaf, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StoreNameWordmark } from "@/components/shared/StoreNameWordmark";
import { getStoreSettings } from "@/lib/data/store";
import { getAboutPageCopy } from "@/lib/i18n/page-copy";
import { resolveLocale } from "@/lib/i18n/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const copy = getAboutPageCopy(locale);

  return {
    title: copy.title,
    description: copy.description,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const copy = getAboutPageCopy(locale);
  const store = getStoreSettings(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="border-b bg-gradient-to-br from-emerald-50/80 via-background to-primary/5">
          <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700/90">
              {copy.region}
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              <StoreNameWordmark
                name={store.storeName}
                className="font-semibold"
                supermarktClassName="font-semibold text-foreground"
              />
              , {copy.intro}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>{copy.paragraph1}</p>
            <p>{copy.paragraph2}</p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-emerald-100/60 bg-white/60 shadow-sm backdrop-blur-sm">
              <CardHeader className="pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100/80">
                  <Leaf className="h-5 w-5 text-emerald-700" aria-hidden />
                </div>
                <CardTitle className="text-lg">{copy.freshnessTitle}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {copy.freshnessBody}
              </CardContent>
            </Card>

            <Card className="border-emerald-100/60 bg-white/60 shadow-sm backdrop-blur-sm">
              <CardHeader className="pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100/80">
                  <Users className="h-5 w-5 text-emerald-700" aria-hidden />
                </div>
                <CardTitle className="text-lg">{copy.neighborhoodTitle}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {copy.neighborhoodBody}
              </CardContent>
            </Card>

            <Card className="border-emerald-100/60 bg-white/60 shadow-sm backdrop-blur-sm sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100/80">
                  <Heart className="h-5 w-5 text-emerald-700" aria-hidden />
                </div>
                <CardTitle className="text-lg">{copy.trustTitle}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {copy.trustBody}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
