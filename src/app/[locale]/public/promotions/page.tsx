import { resolveLocale } from "@/lib/i18n/server";
import { getMessages } from "@/lib/i18n/messages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const messages = getMessages(locale);

  return {
    title: messages.catalog.promotions.metaTitle,
    description: messages.catalog.promotions.metaDescription,
  };
}

export default async function PromotionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const messages = getMessages(locale);

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {messages.catalog.promotions.metaTitle}
      </h1>
      <p className="mt-4 text-lg text-slate-500">
        Coming soon...
      </p>
    </div>
  );
}
