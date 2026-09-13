import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JORGE LAB | Jorge Luis Añanguren",
    short_name: "JORGE LAB",
    description: "Portafolio profesional de desarrollo web, IA, automatización y sistemas digitales.",
    start_url: "/",
    display: "standalone",
    background_color: "#020711",
    theme_color: "#020711",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/jorge-lab-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: "/jorge-lab-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ]
  };
}
