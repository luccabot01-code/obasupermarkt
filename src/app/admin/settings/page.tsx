"use client";

import { useState } from "react";
import { Save, Store, Clock, Mail, Globe } from "lucide-react";
import type { BusinessHours } from "@/types";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useLocale } from "@/contexts/LocaleContext";
import { getStoreSettings } from "@/lib/data/store";
import { getAdminMessages } from "@/lib/i18n/admin-messages";

function BusinessHoursRow({
  hours,
  index,
  openLabel,
  closedLabel,
}: {
  hours: BusinessHours;
  index: number;
  openLabel: string;
  closedLabel: string;
}) {
  const [isOpen, setIsOpen] = useState(hours.isOpen);
  const fieldId = `hours-open-${hours.day}-${index}`;

  return (
    <div className="grid gap-4 rounded-lg border border-border/60 bg-card/40 p-4 sm:grid-cols-[minmax(0,10rem)_1fr]">
      <div className="font-medium leading-snug text-foreground">{hours.dayName}</div>
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <input type="hidden" name={`hours[${index}].day`} value={hours.day} />
        <input type="hidden" name={`hours[${index}].isOpen`} value={isOpen ? "true" : "false"} />
        <div className="flex shrink-0 items-center gap-3">
          <Switch
            id={fieldId}
            checked={isOpen}
            onCheckedChange={(v) => setIsOpen(v === true)}
          />
          <Label htmlFor={fieldId} className="text-sm font-normal text-muted-foreground">
            {isOpen ? openLabel : closedLabel}
          </Label>
        </div>
        {isOpen ? (
          <div className="flex min-w-0 w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <Input
              type="time"
              name={`hours[${index}].open`}
              defaultValue={hours.open}
              className="w-full min-w-0 sm:w-32"
            />
            <span className="hidden text-muted-foreground sm:inline" aria-hidden>
              —
            </span>
            <Input
              type="time"
              name={`hours[${index}].close`}
              defaultValue={hours.close}
              className="w-full min-w-0 sm:w-32"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Admin Settings Page
 * 
 * TODO: Connect to real backend
 * - Load settings from API
 * - Save settings to API
 * - Add image upload for logo
 * - Add form validation
 */
export default function AdminSettingsPage() {
  const locale = useLocale();
  const messages = getAdminMessages(locale);
  const storeSettings = getStoreSettings(locale);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement real API call
    setTimeout(() => {
      setIsLoading(false);
      alert(messages.settingsPage.successAlert);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{messages.settingsPage.title}</h1>
        <p className="text-muted-foreground">{messages.settingsPage.description}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid h-auto w-full max-w-4xl grid-cols-2 gap-3 bg-transparent p-0 sm:grid-cols-4">
          <TabsTrigger value="general" className="h-12 rounded-2xl border border-slate-200/70 bg-white/80 px-4 text-sm font-semibold text-slate-700 shadow-[0_10px_28px_-12px_rgba(15,23,42,0.09),0_2px_6px_-2px_rgba(15,23,42,0.035)] ring-1 ring-inset ring-white/50 backdrop-blur-[2px] hover:border-slate-300 hover:bg-white hover:text-slate-900 data-active:border-slate-300 data-active:bg-white data-active:text-slate-900 data-active:shadow-[0_14px_30px_-12px_rgba(15,23,42,0.14),0_4px_10px_-4px_rgba(15,23,42,0.08)]">
            {messages.settingsPage.tabs.general}
          </TabsTrigger>
          <TabsTrigger value="contact" className="h-12 rounded-2xl border border-slate-200/70 bg-white/80 px-4 text-sm font-semibold text-slate-700 shadow-[0_10px_28px_-12px_rgba(15,23,42,0.09),0_2px_6px_-2px_rgba(15,23,42,0.035)] ring-1 ring-inset ring-white/50 backdrop-blur-[2px] hover:border-slate-300 hover:bg-white hover:text-slate-900 data-active:border-slate-300 data-active:bg-white data-active:text-slate-900 data-active:shadow-[0_14px_30px_-12px_rgba(15,23,42,0.14),0_4px_10px_-4px_rgba(15,23,42,0.08)]">
            {messages.settingsPage.tabs.contact}
          </TabsTrigger>
          <TabsTrigger value="hours" className="h-12 rounded-2xl border border-slate-200/70 bg-white/80 px-4 text-sm font-semibold text-slate-700 shadow-[0_10px_28px_-12px_rgba(15,23,42,0.09),0_2px_6px_-2px_rgba(15,23,42,0.035)] ring-1 ring-inset ring-white/50 backdrop-blur-[2px] hover:border-slate-300 hover:bg-white hover:text-slate-900 data-active:border-slate-300 data-active:bg-white data-active:text-slate-900 data-active:shadow-[0_14px_30px_-12px_rgba(15,23,42,0.14),0_4px_10px_-4px_rgba(15,23,42,0.08)]">
            {messages.settingsPage.tabs.hours}
          </TabsTrigger>
          <TabsTrigger value="features" className="h-12 rounded-2xl border border-slate-200/70 bg-white/80 px-4 text-sm font-semibold text-slate-700 shadow-[0_10px_28px_-12px_rgba(15,23,42,0.09),0_2px_6px_-2px_rgba(15,23,42,0.035)] ring-1 ring-inset ring-white/50 backdrop-blur-[2px] hover:border-slate-300 hover:bg-white hover:text-slate-900 data-active:border-slate-300 data-active:bg-white data-active:text-slate-900 data-active:shadow-[0_14px_30px_-12px_rgba(15,23,42,0.14),0_4px_10px_-4px_rgba(15,23,42,0.08)]">
            {messages.settingsPage.tabs.features}
          </TabsTrigger>
        </TabsList>

        <form id="settings-form" onSubmit={handleSubmit} className="mt-6">
          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  {messages.settingsPage.generalTitle}
                </CardTitle>
                <CardDescription>
                  {messages.settingsPage.generalDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">{messages.settingsPage.storeName}</Label>
                    <Input
                      id="storeName"
                      name="storeName"
                      defaultValue={storeSettings.storeName}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeTagline">{messages.settingsPage.tagline}</Label>
                    <Input
                      id="storeTagline"
                      name="storeTagline"
                      defaultValue={storeSettings.storeTagline || ""}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{messages.settingsPage.storeDescription}</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={storeSettings.description || ""}
                    rows={4}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>{messages.settingsPage.logo}</Label>
                  <div className="flex items-center gap-4">
                    <BrandLogo
                      frameClassName="h-20 w-20 rounded-lg bg-muted ring-1 ring-border shadow-sm"
                      sizes="80px"
                    />
                    <div>
                      <Button variant="outline" size="sm" type="button">
                        {messages.settingsPage.uploadLogo}
                      </Button>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {messages.settingsPage.logoHint}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle">{messages.settingsPage.metaTitle}</Label>
                    <Input
                      id="metaTitle"
                      name="metaTitle"
                      defaultValue={storeSettings.metaTitle || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">{messages.settingsPage.metaDescription}</Label>
                    <Input
                      id="metaDescription"
                      name="metaDescription"
                      defaultValue={storeSettings.metaDescription || ""}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Settings */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  {messages.settingsPage.contactTitle}
                </CardTitle>
                <CardDescription>
                  {messages.settingsPage.contactDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">{messages.settingsPage.email}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={storeSettings.email}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{messages.settingsPage.phone}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      defaultValue={storeSettings.phone}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">{messages.settingsPage.whatsapp}</Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    defaultValue={storeSettings.whatsapp || ""}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="address">{messages.settingsPage.address}</Label>
                  <Input
                    id="address"
                    name="address"
                    defaultValue={storeSettings.address}
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">{messages.settingsPage.city}</Label>
                    <Input
                      id="city"
                      name="city"
                      defaultValue={storeSettings.city}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">{messages.settingsPage.postalCode}</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      defaultValue={storeSettings.postalCode}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">{messages.settingsPage.country}</Label>
                    <Input
                      id="country"
                      name="country"
                      defaultValue={storeSettings.country}
                      required
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>{messages.settingsPage.social}</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      name="facebook"
                      placeholder="Facebook URL"
                      defaultValue={storeSettings.socialMedia.facebook || ""}
                    />
                    <Input
                      name="instagram"
                      placeholder="Instagram URL"
                      defaultValue={storeSettings.socialMedia.instagram || ""}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Hours */}
          <TabsContent value="hours" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {messages.settingsPage.hoursTitle}
                </CardTitle>
                <CardDescription>
                  {messages.settingsPage.hoursDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {storeSettings.businessHours.map((hours, index) => (
                    <BusinessHoursRow
                      key={hours.day}
                      hours={hours}
                      index={index}
                      openLabel={messages.settingsPage.open}
                      closedLabel={messages.settingsPage.closed}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  {messages.settingsPage.featuresTitle}
                </CardTitle>
                <CardDescription>
                  {messages.settingsPage.featuresDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-col gap-4 rounded-lg border border-border/60 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="font-medium">{messages.settingsPage.onlineOrderingTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {messages.settingsPage.onlineOrderingDescription}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center sm:pt-0.5">
                    <Switch
                      name="enableOnlineOrdering"
                      defaultChecked={storeSettings.features.enableOnlineOrdering}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 rounded-lg border border-border/60 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="font-medium">{messages.settingsPage.reservationsTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {messages.settingsPage.reservationsDescription}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center sm:pt-0.5">
                    <Switch
                      name="enableReservations"
                      defaultChecked={storeSettings.features.enableReservations}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 rounded-lg border border-border/60 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="font-medium">{messages.settingsPage.deliveryTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {messages.settingsPage.deliveryDescription}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center sm:pt-0.5">
                    <Switch
                      name="enableDelivery"
                      defaultChecked={storeSettings.features.enableDelivery}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 rounded-lg border border-border/60 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="font-medium">{messages.settingsPage.pickupTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {messages.settingsPage.pickupDescription}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center sm:pt-0.5">
                    <Switch
                      name="enablePickup"
                      defaultChecked={storeSettings.features.enablePickup}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 rounded-lg border border-border/60 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="font-medium">{messages.settingsPage.loyaltyTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {messages.settingsPage.loyaltyDescription}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center sm:pt-0.5">
                    <Switch
                      name="enableLoyaltyProgram"
                      defaultChecked={storeSettings.features.enableLoyaltyProgram}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="mt-8 flex flex-col gap-3 border-t border-border/60 pt-6 sm:flex-row sm:justify-end">
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? messages.common.saving : messages.settingsPage.saveChanges}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
}
