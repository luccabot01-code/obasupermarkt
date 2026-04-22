import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminLoginClient } from "@/components/admin/AdminLoginClient";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE } from "@/lib/auth/demo-admin-user";

export default async function AdminEntryPage() {
  const jar = await cookies();
  if (jar.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE) {
    redirect("/admin/products/");
  }
  return <AdminLoginClient />;
}
