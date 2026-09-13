import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./mobile-catalog.css";
import "./pwa.css";
import MobileDock from "@/components/MobileDock";
import PWARegister from "@/components/PWARegister";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: { default: "Jorge Lab | Jorge Luis Añanguren", template: "%s | Jorge Lab" },
  description: "Portafolio de Jorge Luis Añanguren: desarrollo web, IA, automatización, datos, e-commerce y soluciones digitales.",
  keywords: ["Jorge Luis Añanguren", "desarrollo web", "React", "Next.js", "automatización", "IA", "portafolio", "remote developer"],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/jorge-lab-icon.svg",
    apple: "/jorge-lab-icon.svg"
  },
  openGraph: {
    title: "Jorge Lab | Web · IA · Automatización",
    description: "Proyectos reales, sistemas web, e-commerce y automatización de Jorge Luis Añanguren.",
    type: "website",
    images: [{ url: "/projects/jorge-hero.png", width: 1200, height: 630, alt: "Jorge Lab" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#020711"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {children}
        <MobileDock />
        <WhatsAppFloat />
        <PWARegister />
      </body>
    </html>
  );
}
