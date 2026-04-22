import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_VALUE,
} from "@/lib/auth/demo-admin-user";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { negotiateLocale } from "@/lib/i18n/negotiate";
import { pathnameWithLocale } from "@/lib/i18n/paths";
import { appPathToExternalPath, externalPathToAppPath } from "@/lib/i18n/routing";
import { stripTrailingSlashFromPathname } from "@/lib/utils";

function pathnameHasLocale(pathname: string): boolean {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment != null && isValidLocale(segment);
}

function comparablePath(path: string): string {
  const normalized = path.endsWith("/") ? path : `${path}/`;

  try {
    return decodeURIComponent(normalized);
  } catch {
    return normalized;
  }
}

function requestHeadersWithLocale(request: NextRequest, locale: Locale): Headers {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-oba-locale", locale);
  return requestHeaders;
}

function permanentRedirect(url: URL) {
  return NextResponse.redirect(url, 301);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const locale = negotiateLocale(request);
    const headers = requestHeadersWithLocale(request, locale);
    const adminPath = stripTrailingSlashFromPathname(pathname);

    if (adminPath === "/admin/login") {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/";
      return NextResponse.redirect(loginUrl);
    }

    if (adminPath === "/admin") {
      const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
      if (session === ADMIN_SESSION_VALUE) {
        const productsUrl = request.nextUrl.clone();
        productsUrl.pathname = "/admin/products/";
        return NextResponse.redirect(productsUrl);
      }
      return NextResponse.next({
        request: { headers },
      });
    }

    const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (session !== ADMIN_SESSION_VALUE) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/";
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next({
      request: { headers },
    });
  }

  if (pathnameHasLocale(pathname)) {
    const [, rawLocale, ...restSegments] = pathname.split("/");
    const locale = rawLocale as Locale;
    const requestHeaders = requestHeadersWithLocale(request, locale);
    const restPath = restSegments.length > 0 ? `/${restSegments.join("/")}` : "/";
    const canonicalAppPath = externalPathToAppPath(restPath, locale);
    const localizedExternalPath = appPathToExternalPath(canonicalAppPath, locale);

    if (comparablePath(localizedExternalPath) !== comparablePath(restPath)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname =
        localizedExternalPath === "/"
          ? `/${locale}/`
          : `/${locale}${localizedExternalPath.slice(0, -1)}/`;
      return permanentRedirect(redirectUrl);
    }

    if (comparablePath(canonicalAppPath) !== comparablePath(localizedExternalPath)) {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname =
        canonicalAppPath === "/"
          ? `/${locale}/`
          : `/${locale}${canonicalAppPath.slice(0, -1)}/`;
      return NextResponse.rewrite(rewriteUrl, {
        request: {
          headers: requestHeaders,
        },
      });
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const locale: Locale = negotiateLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathnameWithLocale(locale, pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
