"use client";

/**
 * Buton de trimitere care cere confirmare înainte.
 * Ștergerea unui caz e definitivă, deci merită o întrebare în plus.
 */
export function ConfirmButton({
  message,
  children,
  className,
  formAction,
}: {
  message: string;
  children: React.ReactNode;
  className?: string;
  formAction?: (formData: FormData) => void;
}) {
  return (
    <button
      formAction={formAction}
      className={className}
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
