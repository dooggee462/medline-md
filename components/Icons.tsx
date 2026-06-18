import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function IconDrop(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 2.5s6 6.3 6 10.5a6 6 0 1 1-12 0c0-4.2 6-10.5 6-10.5Z" />
      <path d="M9 13a3 3 0 0 0 3 3" />
    </svg>
  );
}

export function IconSyringe(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m18 2 4 4" />
      <path d="m17 7 3-3" />
      <path d="M19 9 9 19l-4 1 1-4L16 6" />
      <path d="m12 9 3 3" />
      <path d="m9 12 3 3" />
    </svg>
  );
}

export function IconHeart(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M19 14c1.5-1.5 3-3.4 3-5.5A4.5 4.5 0 0 0 12 5.5 4.5 4.5 0 0 0 2 8.5c0 2.1 1.5 4 3 5.5l7 7Z" />
      <path d="M3.5 11h4l1.5-3 2 5 1.5-3h5" />
    </svg>
  );
}

export function IconStethoscope(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4.5 3v5a4.5 4.5 0 0 0 9 0V3" />
      <path d="M4.5 3h-1m11 0h-1" />
      <path d="M9 12.5v2a5.5 5.5 0 0 0 11 0V13" />
      <circle cx="20" cy="11" r="2" />
    </svg>
  );
}

export function IconFlask(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M9 2h6" />
      <path d="M10 2v6.5L5 18a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9.5V2" />
      <path d="M7.5 14h9" />
    </svg>
  );
}

export function IconBandage(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="7" width="19" height="10" rx="5" transform="rotate(45 12 12)" />
      <path d="M12 9.5v.01M14.5 12v.01M9.5 12v.01M12 14.5v.01" />
    </svg>
  );
}

export function IconPhone(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 12l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
    </svg>
  );
}

export function IconWhatsApp(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.78 14.16c-.24.68-1.42 1.31-1.95 1.36-.5.05-1.13.07-1.83-.11-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.82-4.2-4.97-4.4-.14-.2-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.59.83 2.02.9 2.17.07.14.12.31.02.51-.1.2-.15.31-.29.48-.14.17-.3.38-.43.5-.14.14-.29.3-.12.58.17.29.74 1.22 1.59 1.98 1.1.97 2.02 1.28 2.31 1.42.29.14.46.12.63-.07.17-.2.72-.84.91-1.13.19-.29.39-.24.66-.14.27.1 1.7.8 1.99.95.29.14.48.21.55.33.07.12.07.7-.17 1.38Z" />
    </svg>
  );
}

export function IconViber(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12.04 2c-2.46.03-5.3.36-6.96 1.86C3.84 5.08 3.5 6.96 3.46 9.28c-.04 2.32-.09 6.67 4.1 7.85v1.8c0 .65.79.97 1.24.5l1.83-1.9c.43.03.86.05 1.41.04 2.46-.03 5.3-.36 6.96-1.86 1.24-1.22 1.58-3.1 1.62-5.42.04-2.32.09-6.67-4.1-7.85C15.3 2.06 13.78 1.98 12.04 2Zm.18 2.7c1.49 0 2.71.02 3.73.86.86.72 1.13 2.07 1.16 3.7.03 1.62.02 2.95-.65 3.84-.77.99-2.45 1.21-3.78 1.24-.5.01-.89-.01-1.27-.04l-.36-.03-1.2 1.24v-1.55l-.55-.13c-3.13-.78-3.07-3.46-3.04-5.18.03-1.63.3-2.98 1.16-3.7 1.02-.84 2.24-.86 3.73-.86h1.07ZM11 6.6a.45.45 0 0 0 0 .9c2.15 0 3.45 1.3 3.46 3.45a.45.45 0 0 0 .9 0C15.36 8.3 13.6 6.6 11 6.6Zm.02 1.6a.45.45 0 0 0 .02.9c.92.03 1.36.48 1.4 1.42a.45.45 0 0 0 .9-.03c-.05-1.38-.84-2.2-2.27-2.29h-.05Zm-2.2.13c-.2 0-.43.05-.6.21-.28.24-.7.7-.71 1.42 0 .82.55 1.65 1.45 2.55.9.9 1.73 1.46 2.55 1.46.72-.01 1.18-.43 1.42-.71.27-.31.27-.66.18-.86-.1-.2-1.05-.78-1.27-.86-.22-.08-.38-.06-.54.13-.11.13-.4.49-.5.58-.07.07-.16.08-.28.03-.42-.17-.83-.45-1.17-.8-.34-.34-.59-.7-.8-1.16-.05-.12-.04-.21.03-.28.09-.1.45-.4.58-.5.19-.16.21-.32.13-.54-.08-.22-.66-1.17-.86-1.27a.6.6 0 0 0-.31-.08l-.01-.01Z" />
    </svg>
  );
}

export function IconMessenger(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2C6.27 2 2 6.21 2 11.88c0 2.97 1.22 5.54 3.2 7.31.17.15.27.36.27.59l.06 1.82c.02.58.62.96 1.15.72l2.03-.9c.18-.08.38-.09.56-.04 1.03.28 2.13.43 3.3.43 5.73 0 10-4.21 10-9.88S17.73 2 12 2Zm6 7.62-2.94 4.66c-.47.74-1.47.93-2.18.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66c.47-.74 1.47-.93 2.18-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63Z" />
    </svg>
  );
}

export function IconFacebook(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M14 9h3l.5-3H14V4.5c0-.9.3-1.5 1.6-1.5H17.6V.3C17.2.2 16 0 14.7 0 12 0 10.2 1.6 10.2 4.4V6H7.5v3h2.7v9H14V9Z" />
    </svg>
  );
}

export function IconInstagram(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconTiktok(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M16.5 2c.3 2.2 1.6 3.9 3.8 4.2v2.5c-1.3.1-2.5-.3-3.8-1v6.4c0 3.6-2.6 5.9-5.7 5.9-3 0-5.3-2.3-5.3-5.2 0-3.1 2.6-5.3 5.9-4.9v2.6c-.4-.1-.9-.2-1.3-.2-1.4 0-2.4 1-2.4 2.4 0 1.5 1.1 2.5 2.5 2.5 1.5 0 2.6-1.1 2.6-3V2h3.2Z" />
    </svg>
  );
}

export function IconMail(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 6 9 6 9-6" />
    </svg>
  );
}

export function IconPin(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconClock(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function IconCheck(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m4 12 5 5L20 6" />
    </svg>
  );
}

export function IconShield(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconStar(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2.5l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.56 6.09 20.66l1.13-6.57L2.45 9.44l6.6-.96L12 2.5Z" />
    </svg>
  );
}

export function IconPlus(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/** Mapping nume -> componentă, pentru serviciile din dicționar */
export const SERVICE_ICONS: Record<
  string,
  (p: IconProps) => React.JSX.Element
> = {
  drop: IconDrop,
  syringe: IconSyringe,
  heart: IconHeart,
  stethoscope: IconStethoscope,
  flask: IconFlask,
  bandage: IconBandage,
};
