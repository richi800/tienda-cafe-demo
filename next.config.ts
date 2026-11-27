import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  cacheLife: {
    // Catálogo de Shopify: un cambio en el admin se ve en la tienda en cerca de un minuto.
    // stale de 30 s es el mínimo que admite ensureStatic = "navigation" en la ficha de producto.
    catalog: { stale: 30, revalidate: 60, expire: 60 * 60 },
  },
  // Las imágenes se sirven tal cual para no consumir el optimizador de imágenes de Vercel.
  images: {
    unoptimized: true,
    // Fotos de producto que entrega la Storefront API desde el CDN de Shopify.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
