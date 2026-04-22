"use client";

import { useEffect, useState } from "react";

export function useHoverCapable() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCanHover = () => setCanHover(mediaQuery.matches);

    updateCanHover();
    mediaQuery.addEventListener("change", updateCanHover);

    return () => mediaQuery.removeEventListener("change", updateCanHover);
  }, []);

  return canHover;
}
