import type { Metadata } from "next";
import { Outfit, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/lib/plan-context";
import AppShell from "@/components/layout/AppShell";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://viaja.ven";

export const metadata: Metadata = {
  title: "VenezueLautentica · Turismo Gastronómico",
  description:
    "Planifica tu día perfecto en Colonia Tovar. Gastronomía, cafés, cervezas artesanales y experiencias locales, organizadas en un solo plan.",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "VenezueLautentica · Turismo Gastronómico",
    description:
      "Planifica tu día perfecto en Colonia Tovar. Gastronomía, cafés, cervezas artesanales y experiencias locales.",
    url: siteUrl,
    siteName: "VenezueLautentica",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VenezueLautentica – Turismo Gastronómico en Colonia Tovar",
      },
    ],
    locale: "es_VE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VenezueLautentica · Turismo Gastronómico",
    description:
      "Planifica tu día perfecto en Colonia Tovar. Gastronomía, cafés, cervezas artesanales y experiencias locales.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.variable} ${inter.variable} ${playfair.variable} antialiased font-sans`}
      >
        <PlanProvider>
          <AppShell>{children}</AppShell>
        </PlanProvider>
      </body>
    </html>
  );
}
