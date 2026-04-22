"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Plus,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/contexts/LocaleContext";
import { getAdminMessages } from "@/lib/i18n/admin-messages";

/**
 * New Product Page
 * 
 * TODO: Connect to real backend
 * - Implement image upload to storage (Supabase Storage, S3, etc.)
 * - Add form validation with Zod
 * - Connect to product API
 * - Add slug auto-generation
 */
export default function NewProductPage() {
  const router = useRouter();
  const locale = useLocale();
  const messages = getAdminMessages(locale);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement real API call
    // const formData = new FormData(e.currentTarget);
    // const response = await fetch('/api/admin/products', {
    //   method: 'POST',
    //   body: formData,
    // });

    // Mock submission
    setTimeout(() => {
      setIsLoading(false);
      alert(messages.productForm.successAlert);
      router.push("/admin/products");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{messages.productForm.title}</h1>
            <p className="text-muted-foreground">{messages.productForm.description}</p>
          </div>
        </div>
        <Button type="submit" form="product-form" disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? messages.common.saving : messages.common.save}
        </Button>
      </div>

      <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>{messages.productForm.basicInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{messages.productForm.name}</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={messages.productForm.namePlaceholder}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">{messages.productForm.sku}</Label>
                    <Input
                      id="sku"
                      name="sku"
                      placeholder={messages.productForm.skuPlaceholder}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">{messages.productForm.shortDescription}</Label>
                  <Input
                    id="shortDescription"
                    name="shortDescription"
                    placeholder={messages.productForm.shortDescriptionPlaceholder}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{messages.productForm.fullDescription}</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder={messages.productForm.fullDescriptionPlaceholder}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>{messages.productForm.pricing}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">{messages.productForm.price}</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="compareAtPrice">{messages.productForm.compareAtPrice}</Label>
                    <Input
                      id="compareAtPrice"
                      name="compareAtPrice"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card>
              <CardHeader>
                <CardTitle>{messages.productForm.inventory}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">{messages.productForm.quantity}</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">{messages.productForm.weight}</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">{messages.productForm.unit}</Label>
                    <Select name="unit" defaultValue="piece">
                      <SelectTrigger>
                        <SelectValue placeholder={messages.productForm.unitPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="piece">{messages.productForm.units.piece}</SelectItem>
                        <SelectItem value="kg">{messages.productForm.units.kg}</SelectItem>
                        <SelectItem value="g">{messages.productForm.units.g}</SelectItem>
                        <SelectItem value="l">{messages.productForm.units.l}</SelectItem>
                        <SelectItem value="ml">{messages.productForm.units.ml}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="barcode">{messages.productForm.barcode}</Label>
                  <Input
                    id="barcode"
                    name="barcode"
                    placeholder={messages.productForm.barcodePlaceholder}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>{messages.productForm.images}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* TODO: Implement image upload */}
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-12">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        {messages.productForm.uploadHint}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {messages.productForm.uploadFormats}
                      </p>
                      <Button variant="outline" className="mt-4" type="button">
                        {messages.productForm.chooseImage}
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {messages.productForm.imageTodo}
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
                <CardTitle>{messages.productForm.status}</CardTitle>
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

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>{messages.productForm.tags}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder={messages.productForm.newTagPlaceholder}
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={handleAddTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SEO */}
            <Card>
              <CardHeader>
                <CardTitle>{messages.productForm.seo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">{messages.productForm.metaTitle}</Label>
                  <Input
                    id="metaTitle"
                    name="metaTitle"
                    placeholder={messages.productForm.metaTitlePlaceholder}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">{messages.productForm.metaDescription}</Label>
                  <Textarea
                    id="metaDescription"
                    name="metaDescription"
                    placeholder={messages.productForm.metaDescriptionPlaceholder}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
