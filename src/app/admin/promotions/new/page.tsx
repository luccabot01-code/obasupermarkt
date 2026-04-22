"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/contexts/LocaleContext";
import { getAdminMessages } from "@/lib/i18n/admin-messages";

/**
 * New Promotion Page
 * 
 * TODO: Connect to real backend
 * - Add form validation with Zod
 * - Connect to promotion API
 * - Add product/category selection
 */
export default function NewPromotionPage() {
  const router = useRouter();
  const locale = useLocale();
  const messages = getAdminMessages(locale);
  const [isLoading, setIsLoading] = useState(false);
  const [promotionType, setPromotionType] = useState("percentage");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement real API call
    setTimeout(() => {
      setIsLoading(false);
      alert(messages.promotionForm.successAlert);
      router.push("/admin/promotions");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/promotions">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{messages.promotionForm.title}</h1>
            <p className="text-muted-foreground">{messages.promotionForm.description}</p>
          </div>
        </div>
        <Button type="submit" form="promotion-form" disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? messages.common.saving : messages.common.save}
        </Button>
      </div>

      <form id="promotion-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>{messages.promotionForm.basicInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{messages.promotionForm.name}</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder={messages.promotionForm.namePlaceholder}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{messages.promotionForm.fullDescription}</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder={messages.promotionForm.fullDescriptionPlaceholder}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Promotion Type & Value */}
            <Card>
              <CardHeader>
                <CardTitle>{messages.promotionForm.discountDetails}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="type">{messages.promotionForm.type}</Label>
                    <Select
                      name="type"
                      value={promotionType}
                      onValueChange={setPromotionType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={messages.promotionForm.typePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">
                          {messages.promotionForm.typeOptions.percentage}
                        </SelectItem>
                        <SelectItem value="fixed_amount">
                          {messages.promotionForm.typeOptions.fixed_amount}
                        </SelectItem>
                        <SelectItem value="buy_x_get_y">
                          {messages.promotionForm.typeOptions.buy_x_get_y}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="value">
                      {promotionType === "percentage" && messages.promotionForm.valuePercentage}
                      {promotionType === "fixed_amount" && messages.promotionForm.valueFixed}
                      {promotionType === "buy_x_get_y" && messages.promotionForm.valueBuy}
                      *
                    </Label>
                    <Input
                      id="value"
                      name="value"
                      type="number"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                {promotionType === "buy_x_get_y" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="minQuantity">{messages.promotionForm.minQuantity}</Label>
                      <Input
                        id="minQuantity"
                        name="minQuantity"
                        type="number"
                        placeholder="3"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="freeQuantity">{messages.promotionForm.freeQuantity}</Label>
                      <Input
                        id="freeQuantity"
                        name="freeQuantity"
                        type="number"
                        placeholder="1"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Date Range */}
            <Card>
              <CardHeader>
                <CardTitle>{messages.promotionForm.dateRange}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">{messages.promotionForm.startDate}</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="datetime-local"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">{messages.promotionForm.endDate}</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="datetime-local"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products */}
            <Card>
              <CardHeader>
                <CardTitle>{messages.promotionForm.scope}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{messages.promotionForm.products}</Label>
                  <p className="text-sm text-muted-foreground">
                    {messages.promotionForm.productsTodo}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>{messages.promotionForm.status}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="isActive" name="isActive" defaultChecked />
                  <Label htmlFor="isActive" className="font-normal">
                    {messages.common.active}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="isFeatured" name="isFeatured" />
                  <Label htmlFor="isFeatured" className="font-normal">
                    {messages.common.featured}
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Image */}
            <Card>
              <CardHeader>
                <CardTitle>{messages.promotionForm.image}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8">
                  <div className="text-center">
                    <Percent className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      {messages.promotionForm.uploadImage}
                    </p>
                    <Button variant="outline" className="mt-4" size="sm" type="button">
                      {messages.promotionForm.chooseImage}
                    </Button>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {messages.promotionForm.imageTodo}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
