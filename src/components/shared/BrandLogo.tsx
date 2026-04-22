import Image from "next/image";
import { cn } from "@/lib/utils";
import { BRAND_LOGO_ALT, BRAND_LOGO_PATH } from "@/lib/brand";

type BrandLogoProps = {
  className?: string;
  /** Boyut ve şekil (örn. `h-9 w-9 rounded-xl shadow-lg`). `relative` eklenir. */
  frameClassName: string;
  sizes: string;
  priority?: boolean;
  /** Boş string: dekoratif (yanında marka metni varken). */
  alt?: string;
};

/**
 * Mağaza logosu — Navbar / hero / footer / admin ile aynı dosya (`BRAND_LOGO_PATH`).
 */
export function BrandLogo({ className, frameClassName, sizes, priority, alt }: BrandLogoProps) {
  const resolvedAlt = alt !== undefined ? alt : BRAND_LOGO_ALT;
  return (
    <span className={cn("relative inline-flex shrink-0 overflow-hidden", frameClassName, className)}>
      <Image
        src={BRAND_LOGO_PATH}
        alt={resolvedAlt}
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority}
      />
    </span>
  );
}
