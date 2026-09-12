import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Jorge Lab | Jorge Luis Añanguren", template: "%s | Jorge Lab" },
  description: "Portafolio de Jorge Luis Añanguren: desarrollo web, IA, automatización, datos, e-commerce y soluciones digitales.",
  keywords: ["Jorge Luis Añanguren", "desarrollo web", "React", "Next.js", "automatización", "IA", "portafolio", "remote developer"],
  openGraph: {
    title: "Jorge Lab | Web · IA · Automatización",
    description: "Proyectos reales, sistemas web, e-commerce y automatización de Jorge Luis Añanguren.",
    type: "website",
    images: [{ url: "/projects/jorge-hero.png", width: 1200, height: 630, alt: "Jorge Lab" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
