import { redirect } from "next/navigation";

/** Panel girişi ürün kataloğu; eski /admin/dashboard bağlantıları korunur. */
export default function AdminDashboardRedirectPage() {
  redirect("/admin/products/");
}
