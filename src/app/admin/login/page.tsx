import { redirect } from "next/navigation";

/** Eski /admin/login bağlantıları → /admin */
export default function AdminLoginLegacyRedirect() {
  redirect("/admin/");
}
