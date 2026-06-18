import Image from "next/image";

/**
 * Logo oficial Medline (fișier real: public/logo.png).
 * Înlocuiește public/logo.png cu o altă variantă dacă e nevoie.
 */
export function Logo({
  className = "h-14 w-auto",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt="MedLine — asistență medicală la domiciliu în Chișinău"
      width={1238}
      height={1238}
      priority={priority}
      className={className}
    />
  );
}
