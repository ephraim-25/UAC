import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimisations pour Vercel
  output: undefined, // Laisser Vercel gérer automatiquement
  reactStrictMode: true,
  swcMinify: true,
  // Configuration pour éviter les erreurs 404
  trailingSlash: false,
  // Images optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
