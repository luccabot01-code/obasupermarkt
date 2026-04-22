import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStoreSettings, getBusinessHours, isStoreOpen } from "@/lib/data/store";
import { getContactPageCopy } from "@/lib/i18n/page-copy";
import { resolveLocale } from "@/lib/i18n/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const copy = getContactPageCopy(locale);

  return {
    title: copy.title,
    description: copy.description,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const copy = getContactPageCopy(locale);
  const [store, businessHours, storeOpen] = await Promise.all([
    getStoreSettings(locale),
    getBusinessHours(locale),
    isStoreOpen(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        {/* Hero Section */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              {copy.hero}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Store Status */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        storeOpen ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <Clock
                        className={`h-6 w-6 ${
                          storeOpen ? "text-green-600" : "text-red-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {copy.storeStatus}
                      </p>
                      <p
                        className={`text-lg font-semibold ${
                          storeOpen ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {storeOpen ? copy.open : copy.closed}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{copy.address}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {store.address}
                          <br />
                          {store.postalCode} {store.city}
                          <br />
                          {store.country}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{copy.phone}</h3>
                        <a
                          href={`tel:${store.phone}`}
                          className="mt-1 block text-sm text-muted-foreground hover:text-primary"
                        >
                          {store.phone}
                        </a>
                        {store.whatsapp && (
                          <a
                            href={`https://wa.me/${store.whatsapp.replace(/\+/g, "").replace(/\s/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 flex items-center gap-1 text-sm text-green-600 hover:underline"
                          >
                            WhatsApp
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{copy.email}</h3>
                        <a
                          href={`mailto:${store.email}`}
                          className="mt-1 block text-sm text-muted-foreground hover:text-primary"
                        >
                          {store.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{copy.hours}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {copy.hoursNote}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>{copy.social}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex gap-3">
                    {store.socialMedia.facebook && (
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href={store.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                      </Button>
                    )}
                    {store.socialMedia.instagram && (
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href={store.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Business Hours & Map */}
            <div className="space-y-6">
              {/* Business Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>{copy.hours}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    {businessHours.map((hours) => (
                      <div
                        key={hours.day}
                        className="flex items-center justify-between py-2"
                      >
                        <span className="font-medium">{hours.dayName}</span>
                        <span
                          className={`${
                            hours.isOpen
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {hours.isOpen
                            ? hours.is24Hours
                              ? copy.open24
                              : `${hours.open} - ${hours.close}`
                            : copy.closed}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>{copy.location}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                      <div className="text-center">
                        <MapPin className="mx-auto h-12 w-12 text-primary/40" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          {copy.mapNeedsKey}
                        </p>
                        <Button className="mt-4" variant="outline" size="sm" asChild>
                          <a
                            href={`https://www.google.com/maps?q=${store.latitude},${store.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {copy.openMaps}
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
