import Image from "next/image";

/**
 * Logo oficial Medline (fișier real: public/logo.png).
 * Înlocuiește public/logo.png cu o altă variantă dacă e nevoie.
 *
 * width/height descriu mărimea afișată (max ~80px, în footer), nu fișierul
 * sursă de 1238px: după ele next/image alege variantele din srcset. Cu
 * 1238 se descărca varianta de 3840px (~90 KB) pentru un logo de 56px.
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
      width={112}
      height={112}
      priority={priority}
      className={className}
    />
  );
}
