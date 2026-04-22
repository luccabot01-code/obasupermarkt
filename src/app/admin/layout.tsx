import { AdminShell } from "@/components/admin/AdminShell";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { getRequestLocale } from "@/lib/i18n/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getRequestLocale();

  return (
    <LocaleProvider locale={locale}>
      <AdminShell>{children}</AdminShell>
    </LocaleProvider>
  );
}
