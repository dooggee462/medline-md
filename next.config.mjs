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
  /**
   * Pagina de serviciu pentru codare are aceeași temă ca /codare, care e mult
   * mai completă. În loc s-o ținem ca duplicat cu canonical, o trimitem acolo:
   * un singur URL, toată autoritatea într-un loc, nimic de întreținut în două
   * variante. Permanent (308), ca Google să transfere ce a acumulat vechiul URL.
   */
  async redirects() {
    return [
      {
        source: "/:locale(ro|ru)/servicii/codare-anti-alcool",
        destination: "/:locale/codare",
        permanent: true,
      },
      {
        source: "/:locale(ro|ru)/servicii/kodirovanie-ot-alkogolya",
        destination: "/:locale/codare",
        permanent: true,
      },
    ];
  },
  /**
   * Reamintirile pornesc din instrumentation.ts și citesc fișiere, deci au
   * nevoie de „fs". Next compilează instrumentarea și pentru middleware, care
   * rulează în edge, unde „fs" nu există — acolo o lăsăm goală, fiindcă acel
   * cod nu rulează niciodată în edge.
   */
  webpack(config, { nextRuntime }) {
    if (nextRuntime === "edge") {
      config.resolve.fallback = { ...config.resolve.fallback, fs: false, path: false };
    }
    return config;
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
