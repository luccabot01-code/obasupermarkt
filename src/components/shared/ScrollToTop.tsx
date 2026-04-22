"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

function scrollWindowToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  const root = document.scrollingElement;
  if (root) root.scrollTop = 0;
}

/**
 * Client navigasyonda sayfa en üstten başlasın.
 * useSearchParams kullanmıyoruz: Suspense ile gecikince useLayoutEffect ilk karede
 * çalışmıyor, liste → ürün gibi geçişlerde yanlış scroll + geç düzeltme görülüyordu.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    scrollWindowToTop();
    requestAnimationFrame(() => {
      scrollWindowToTop();
      requestAnimationFrame(scrollWindowToTop);
    });
  }, [pathname]);

  return null;
}
