import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UAC RDC | Leader de la Distribution en Afrique Centrale",
  description: "Découvrez le meilleur de l'électronique, du mobilier et des solutions d'énergie en RDC. Qualité premium, service d'exception.",
  keywords: ["e-commerce RDC", "UAC Congo", "Samsung Kinshasa", "Mobilier bureau Kinshasa", "Energie Solaire RDC"],
  openGraph: {
    title: "UAC RDC | E-commerce Premium",
    description: "La référence de la distribution au Congo Kinshasa depuis 1974.",
    url: "https://uacrdc.com",
    siteName: "UAC RDC",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
