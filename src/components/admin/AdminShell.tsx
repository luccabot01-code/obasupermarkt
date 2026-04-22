"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  Menu,
  Package,
  Settings,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useLocale } from "@/contexts/LocaleContext";
import { getAdminMessages } from "@/lib/i18n/admin-messages";
import { localizedPath } from "@/lib/i18n/paths";
import { cn, getInitials, stripTrailingSlashFromPathname } from "@/lib/utils";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { AdminLanguageSwitcher } from "./AdminLanguageSwitcher";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const messages = getAdminMessages(locale);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoginPage = stripTrailingSlashFromPathname(pathname) === "/admin";

  if (isLoginPage) {
    return <>{children}</>;
  }

  const userInitials = getInitials(messages.shell.userName);

  const storefrontHome = localizedPath(locale, "/");
  const adminNavigation = [
    { name: messages.nav.products, href: "/admin/products", icon: Package },
    { name: messages.nav.promotions, href: "/admin/promotions", icon: Tag },
    { name: messages.nav.settings, href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-svh flex-col bg-background md:flex-row">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border/70 bg-muted/40 md:flex dark:bg-muted/20">
        <div className="flex h-14 items-center border-b border-border/60 px-5">
          <Link href="/admin/products" className="flex items-center gap-2">
            <BrandLogo frameClassName="h-8 w-8 rounded-lg ring-1 ring-border shadow-sm" sizes="32px" />
            <span className="font-bold">{messages.shell.title}</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-0.5 p-3">
          {adminNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-background/80 hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border/60 p-4">
          <div className="mb-4">
            <AdminLanguageSwitcher />
          </div>
          <div className="mb-4 flex items-center gap-3 rounded-lg bg-muted px-3 py-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <span className="text-xs font-bold text-primary">{userInitials}</span>
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{messages.shell.userName}</p>
              <p className="truncate text-xs text-muted-foreground">
                {messages.shell.userEmail}
              </p>
            </div>
          </div>
          <Button variant="outline" className="mb-2 w-full" asChild>
            <Link href="/api/admin/logout/">
              <LogOut className="mr-2 h-4 w-4" />
              {messages.shell.signOut}
            </Link>
          </Button>
          <Button variant="secondary" className="w-full" asChild>
            <Link href={storefrontHome}>{messages.shell.backToStorefront}</Link>
          </Button>
        </div>
      </aside>

      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border/60 bg-background/95 px-4 backdrop-blur md:hidden">
        <Link href="/admin/products" className="flex items-center gap-2">
          <BrandLogo frameClassName="h-8 w-8 rounded-lg ring-1 ring-border shadow-sm" sizes="32px" />
          <span className="font-bold">{messages.shell.title}</span>
        </Link>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] p-0">
            <SheetTitle className="sr-only">{messages.shell.menuTitle}</SheetTitle>
            <div className="flex h-full flex-col">
              <div className="flex h-14 shrink-0 items-center border-b border-border/60 px-4">
                <Link
                  href="/admin/products"
                  className="flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BrandLogo frameClassName="h-8 w-8 rounded-lg ring-1 ring-border shadow-sm" sizes="32px" />
                  <span className="font-bold">{messages.shell.title}</span>
                </Link>
              </div>

              <nav className="flex-1 space-y-0.5 p-3">
                {adminNavigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="border-t border-border/60 p-4">
                <div className="mb-4">
                  <AdminLanguageSwitcher />
                </div>
                <div className="mb-4 flex items-center gap-3 rounded-lg bg-muted px-3 py-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xs font-bold text-primary">{userInitials}</span>
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium">{messages.shell.userName}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {messages.shell.userEmail}
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="mb-2 w-full" asChild>
                  <Link href="/api/admin/logout/" onClick={() => setIsMobileMenuOpen(false)}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {messages.shell.signOut}
                  </Link>
                </Button>
                <Button variant="secondary" className="w-full" asChild>
                  <Link href={storefrontHome} onClick={() => setIsMobileMenuOpen(false)}>
                    {messages.shell.backToStorefront}
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-auto">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:max-w-[1400px] lg:px-8 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
