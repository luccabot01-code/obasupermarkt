"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_VALUE,
} from "@/lib/auth/demo-admin-user";
import { adminRemoveCategoryRecord, adminPatchCategoryById } from "@/lib/data/categories";
import {
  adminDeleteProductById,
  adminDeleteProductsByIds,
  adminPatchProductById,
  countProductsInCategory,
} from "@/lib/data/products";
import {
  adminDeletePromotionById,
  adminPatchPromotionById,
} from "@/lib/data/promotions";
import { locales } from "@/lib/i18n/config";

async function assertAdminSession() {
  const jar = await cookies();
  if (jar.get(ADMIN_SESSION_COOKIE)?.value !== ADMIN_SESSION_VALUE) {
    throw new Error("Unauthorized");
  }
}

function revalidatePublicAndAdmin() {
  for (const locale of locales) {
    revalidatePath(`/${locale}`, "layout");
  }
  revalidatePath("/admin", "layout");
}

export async function deleteProductAction(productId: string) {
  await assertAdminSession();
  const ok = adminDeleteProductById(productId);
  if (!ok) return { ok: false as const, error: "not_found" as const };
  revalidatePublicAndAdmin();
  return { ok: true as const };
}

export async function deleteProductsBulkAction(productIds: string[]) {
  await assertAdminSession();
  const n = adminDeleteProductsByIds(productIds);
  revalidatePublicAndAdmin();
  return { ok: true as const, deleted: n };
}

export async function patchProductAction(
  productId: string,
  patch: Partial<{ isActive: boolean; isFeatured: boolean; quantity: number; price: number; compareAtPrice: number | null }>,
) {
  await assertAdminSession();
  const ok = adminPatchProductById(productId, patch);
  if (!ok) return { ok: false as const, error: "not_found" as const };
  revalidatePublicAndAdmin();
  return { ok: true as const };
}

export async function deleteCategoryAction(categoryId: string) {
  await assertAdminSession();
  if (countProductsInCategory(categoryId) > 0) {
    return { ok: false as const, error: "in_use" as const };
  }
  const ok = adminRemoveCategoryRecord(categoryId);
  if (!ok) return { ok: false as const, error: "not_found" as const };
  revalidatePublicAndAdmin();
  return { ok: true as const };
}

export async function patchCategoryAction(
  categoryId: string,
  patch: Partial<{ isActive: boolean; sortOrder: number }>,
) {
  await assertAdminSession();
  const ok = adminPatchCategoryById(categoryId, patch);
  if (!ok) return { ok: false as const, error: "not_found" as const };
  revalidatePublicAndAdmin();
  return { ok: true as const };
}

export async function deletePromotionAction(promotionId: string) {
  await assertAdminSession();
  const ok = adminDeletePromotionById(promotionId);
  if (!ok) return { ok: false as const, error: "not_found" as const };
  revalidatePublicAndAdmin();
  return { ok: true as const };
}

export async function patchPromotionAction(
  promotionId: string,
  patch: Partial<{ isActive: boolean; isFeatured: boolean }>,
) {
  await assertAdminSession();
  const ok = adminPatchPromotionById(promotionId, patch);
  if (!ok) return { ok: false as const, error: "not_found" as const };
  revalidatePublicAndAdmin();
  return { ok: true as const };
}
