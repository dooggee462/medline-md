import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  authors: [
    { name: SITE.author.name, url: `${SITE.url}/ro/despre-noi` },
    { name: SITE.legalName, url: SITE.url },
  ],
  creator: SITE.author.name,
  publisher: SITE.legalName,
  category: "Health",
  formatDetection: { telephone: true, email: true, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    ...(SITE.googleVerification ? { google: SITE.googleVerification } : {}),
    yandex: "3a15d19e9bf1504b",
    other: {
      "msvalidate.01": "4EF271981ED76C4C3D577637A88CDC78",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0c3a2d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
