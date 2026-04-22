import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Share2, Heart, Package, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/public/ProductCard";
import { getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import { formatPrice, calculateDiscountPercentage } from "@/lib/utils";
import { getProductDetailCopy } from "@/lib/i18n/page-copy";
import { pathForLocale, resolveLocale } from "@/lib/i18n/server";

interface ProductPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug, locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const copy = getProductDetailCopy(locale);
  const product = getProductBySlug(slug, locale);

  if (!product) {
    return {
      title: copy.notFound,
    };
  }

  return {
    title: product.metaTitle || product.name,
    description: product.metaDescription || product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const copy = getProductDetailCopy(locale);
  const lp = pathForLocale(locale);
  const product = getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, 4, locale);
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercentage = hasDiscount
    ? calculateDiscountPercentage(product.price, product.compareAtPrice!)
    : 0;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href={lp("/")} className="hover:text-foreground">
                {copy.home}
              </Link>
              <span>/</span>
              <Link href={lp("/public/products")} className="hover:text-foreground">
                {copy.products}
              </Link>
              <span>/</span>
              <Link
                href={lp(`/public/categories/${product.category.slug}`)}
                className="hover:text-foreground"
              >
                {product.category.name}
              </Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-muted-foreground">{copy.noImage}</span>
                </div>
              )}

              {/* Badges */}
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {hasDiscount && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    %{discountPercentage} {copy.discount}
                  </Badge>
                )}
                {product.isFeatured && (
                  <Badge className="bg-primary text-primary-foreground">
                    {copy.featured}
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Category */}
              <Link
                href={lp(`/public/categories/${product.category.slug}`)}
                className="text-sm font-medium text-primary hover:underline"
              >
                {product.category.name}
              </Link>

              {/* Name */}
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                {product.name}
              </h1>

              {/* SKU */}
              <p className="mt-1 text-sm text-muted-foreground">
                {copy.sku}: {product.sku}
              </p>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price, locale)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.compareAtPrice!, locale)}
                    </span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      %{discountPercentage} {copy.savings}
                    </Badge>
                  </>
                )}
              </div>

              {/* Short Description */}
              {product.shortDescription && (
                <p className="mt-4 text-muted-foreground">
                  {product.shortDescription}
                </p>
              )}

              <Separator className="my-6" />

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">{copy.unit}:</span>
                  <span className="ml-2 font-medium">
                    {product.weight
                      ? `${product.weight >= 1000 ? product.weight / 1000 : product.weight} ${
                          product.weight >= 1000 ? "kg" : "g"
                        }`
                      : product.unit}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">{copy.stock}:</span>
                  <span className="ml-2 font-medium">
                    {product.quantity > 0 ? copy.inStock : copy.outOfStock}
                  </span>
                </div>
                {product.barcode && (
                  <div>
                    <span className="text-muted-foreground">{copy.barcode}:</span>
                    <span className="ml-2 font-medium">{product.barcode}</span>
                  </div>
                )}
              </div>

              <Separator className="my-6" />

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2 rounded-lg bg-muted p-4 text-center">
                  <Package className="h-6 w-6 text-primary" />
                  <span className="text-xs text-muted-foreground">
                    {copy.fresh}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-lg bg-muted p-4 text-center">
                  <Truck className="h-6 w-6 text-primary" />
                  <span className="text-xs text-muted-foreground">
                    {copy.fast}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-lg bg-muted p-4 text-center">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="text-xs text-muted-foreground">
                    {copy.quality}
                  </span>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="flex-1">
                  {copy.addToCart}
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="mt-6">
                  <span className="text-sm text-muted-foreground">{copy.tags}:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold">{copy.descriptionTitle}</h2>
              <div className="mt-4 prose prose-sm max-w-none text-muted-foreground">
                <p>{product.description}</p>
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold">{copy.relatedTitle}</h2>
              <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
