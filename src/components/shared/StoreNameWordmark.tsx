import { cn } from "@/lib/utils";

type StoreNameWordmarkProps = {
  name: string;
  className?: string;
  /** «Oba» için ek sınıflar; renk için `text-wordmark-oba` kullanılır. */
  obaClassName?: string;
  /** «Supermarkt» ve sonrası; boş bırakılırsa üstten renk miras alır. */
  supermarktClassName?: string;
  /** İki satır: üstte Oba, altta kalan kısım (boşluk yok). */
  variant?: "inline" | "stack";
};

/**
 * İsim `Oba` + boşluk ile başlıyorsa «Oba» kelimesini tabela kırmızısı (`text-wordmark-oba`) ile gösterir.
 */
export function StoreNameWordmark({
  name,
  className,
  obaClassName,
  supermarktClassName,
  variant = "inline",
}: StoreNameWordmarkProps) {
  const m = name.match(/^oba(\s+)(.+)$/i);
  if (m) {
    if (variant === "stack") {
      return (
        <span className={cn("flex flex-col", className)}>
          <span className={cn("text-wordmark-oba", obaClassName)}>Oba</span>
          <span className={cn(supermarktClassName)} style={{ color: "#4c4d4d" }}>{m[2]}</span>
        </span>
      );
    }
    return (
      <span className={className}>
        <span className={cn("text-wordmark-oba", obaClassName)}>Oba</span>
        {m[1]}
        <span className={cn(supermarktClassName)} style={{ color: "#4c4d4d" }}>{m[2]}</span>
      </span>
    );
  }
  return <span className={className}>{name}</span>;
}
