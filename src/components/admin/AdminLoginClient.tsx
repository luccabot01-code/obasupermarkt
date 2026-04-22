"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { StoreNameWordmark } from "@/components/shared/StoreNameWordmark";
import { useLocale } from "@/contexts/LocaleContext";
import { getAdminMessages } from "@/lib/i18n/admin-messages";
import { getStoreSettings } from "@/lib/data/store";
import { localizedPath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";

const heroImage = "/Gemini_Generated_Image_ai8umvai8umvai8u.png";

export function AdminLoginClient() {
  const router = useRouter();
  const locale = useLocale();
  const messages = getAdminMessages(locale);
  const storeDisplayName = getStoreSettings(locale).storeName;
  const storefrontHome = localizedPath(locale, "/");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, rememberMe }),
      });

      if (!res.ok) {
        setError(messages.loginPage.invalidCredentials);
        setIsLoading(false);
        return;
      }

      router.push("/admin/products/");
      router.refresh();
    } catch {
      setError(messages.loginPage.invalidCredentials);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-svh w-full bg-zinc-50 text-foreground dark:bg-zinc-950">
      <div className="grid min-h-svh w-full lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div className="relative hidden overflow-hidden lg:block">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 55vw, 0"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-emerald-950/92 via-zinc-950/88 to-zinc-950/95"
            aria-hidden
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.18),transparent_55%)]" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
            <Link
              href={storefrontHome}
              className="inline-flex w-fit items-center gap-3 rounded-xl bg-white/10 px-4 py-2.5 text-white shadow-sm ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/15"
            >
              <BrandLogo
                frameClassName="h-10 w-10 rounded-lg shadow-inner ring-1 ring-white/25"
                sizes="40px"
              />
              <StoreNameWordmark
                name={storeDisplayName}
                variant="stack"
                className="text-left leading-tight"
                obaClassName="text-wordmark-oba text-lg font-semibold tracking-tight"
                supermarktClassName="text-sm font-medium text-emerald-100/90"
              />
            </Link>

            <div className="max-w-md space-y-5 text-white">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-[2.65rem]">
                {messages.loginPage.welcomeTitle}
              </h1>
              <p className="text-base leading-relaxed text-white/75">
                {messages.loginPage.welcomeSubtitle}
              </p>
            </div>

            <p className="text-xs text-white/45">
              © {new Date().getFullYear()}{" "}
              <StoreNameWordmark
                name={storeDisplayName}
                className="inline"
                obaClassName="text-wordmark-oba"
                supermarktClassName="text-white/50"
              />
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-20">
          <div className="mx-auto w-full max-w-[420px] space-y-8">
            <div className="flex items-center justify-between gap-4 lg:hidden">
              <Link href={storefrontHome} className="inline-flex items-center gap-2">
                <BrandLogo frameClassName="h-10 w-10 rounded-lg shadow-md ring-1 ring-border" sizes="40px" />
                <StoreNameWordmark
                  name={storeDisplayName}
                  className="text-lg font-semibold tracking-tight"
                  obaClassName="text-wordmark-oba"
                  supermarktClassName="text-black"
                />
              </Link>
            </div>

            <div className="space-y-2 lg:space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight">{messages.loginPage.title}</h2>
              <p className="text-muted-foreground">{messages.loginPage.description}</p>
            </div>

            <div
              className={cn(
                "rounded-2xl border bg-card/80 p-6 shadow-sm shadow-zinc-950/5 ring-1 ring-border/60 backdrop-blur-sm",
                "dark:bg-zinc-900/60 dark:ring-white/10"
              )}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                {error ? (
                  <Alert variant="destructive" className="border-destructive/60">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : null}

                <div className="space-y-2">
                  <Label htmlFor="username">{messages.loginPage.username}</Label>
                  <Input
                    id="username"
                    name="username"
                    autoComplete="username"
                    placeholder="obasupermarkt"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-11 rounded-xl border-zinc-200 bg-background dark:border-zinc-700"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{messages.loginPage.password}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      autoComplete="current-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="•••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 rounded-xl border-zinc-200 bg-background pr-11 dark:border-zinc-700"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-11 w-11 rounded-xl text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                    />
                    <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                      {messages.loginPage.rememberMe}
                    </Label>
                  </div>
                  <span className="text-sm text-muted-foreground/80">{messages.loginPage.forgotPassword}</span>
                </div>

                <Button
                  type="submit"
                  className="h-11 w-full rounded-xl bg-emerald-600 text-base font-medium text-white shadow-sm hover:bg-emerald-700"
                  disabled={isLoading}
                >
                  {isLoading ? messages.loginPage.signingIn : messages.loginPage.signIn}
                </Button>
              </form>

              <div className="mt-5 rounded-xl border border-dashed border-emerald-200/80 bg-emerald-50/50 px-4 py-3 text-center text-sm dark:border-emerald-900/50 dark:bg-emerald-950/30">
                <p className="text-muted-foreground">{messages.loginPage.demoCredentials}</p>
                <p className="mt-1 font-mono text-xs text-foreground/90">{messages.loginPage.demoHint}</p>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              <Link href={storefrontHome} className="font-medium text-emerald-700 hover:underline dark:text-emerald-400">
                ← {messages.loginPage.backHome}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
