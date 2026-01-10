"use client";

import { CartProvider } from "@/context/CartContext";

/**
 * Client Providers Wrapper
 * 
 * Ce composant isole tous les Client Providers dans une frontière client.
 * Il permet à layout.tsx (Server Component) d'utiliser des providers client
 * sans violer la frontière Server/Client.
 * 
 * Architecture Next.js 15 App Router conforme :
 * - Server Component (layout.tsx) peut importer ce Client Component wrapper
 * - Ce wrapper contient tous les providers nécessitant du state client
 * - Respecte la séparation SSR / Client Hydration
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
