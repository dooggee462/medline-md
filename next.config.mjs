/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generează un build autonom (.next/standalone) — ideal pentru Docker/VPS
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Imagini optimizate pentru Core Web Vitals (LCP)
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
