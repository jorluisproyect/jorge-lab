import type { Project } from "@/data/projects";

export const privateBadge = "Proyecto privado / Demo conceptual";
export const privateRole = "Producto propio · Desarrollo asistido por IA";

const cases = [
  { slug: "tucita", name: "TUCITA", category: "Reservas y servicios", summary: "Agenda y reservas para profesionales y negocios.", stack: ["Next.js", "React", "TypeScript", "PostgreSQL"], status: "Desarrollo activo", scope: "Página pública y demo disponibles. El producto continúa en desarrollo." },
  { slug: "inventra", name: "INVENTRA", category: "Inventario", summary: "Productos, movimientos y control de stock.", stack: ["Next.js", "TypeScript", "Neon", "PostgreSQL"], status: "Inventario básico implementado", scope: "Inventario básico implementado. Proveedores, exportaciones y auditoría ampliada pendientes." },
  { slug: "nova", name: "NOVA", category: "IA local para Windows", summary: "Asistente local para Windows con IA y voz.", stack: ["Python", "PySide6", "Ollama", "SQLite"], status: "Aplicación local en evolución", scope: "Aplicación local existente. Empaquetado y activación continua por voz pendientes." },
  { slug: "vyra", name: "VYRA", category: "CRM y automatización", summary: "Contactos, seguimiento comercial y propuestas.", stack: ["Next.js", "TypeScript", "PostgreSQL", "n8n"], status: "CRM local implementado", scope: "CRM local implementado. Integración real con WhatsApp pendiente." },
  { slug: "chispa", name: "CHISPA", category: "Productividad", summary: "Captura de ideas con guardado local y sincronización.", stack: ["Next.js", "TypeScript", "IndexedDB", "PostgreSQL"], status: "Implementación existente", scope: "Implementación existente; funcionamiento completo no revalidado en esta revisión." },
  { slug: "mi-bolsillo", name: "Mi Bolsillo", category: "Finanzas personales", summary: "Gastos, movimientos y planificación financiera.", stack: ["Next.js", "TypeScript", "PostgreSQL", "Decimal.js"], status: "Implementación existente", scope: "Implementación existente; sin datos financieros personales en esta muestra." },
  { slug: "cotizador", name: "Neurai Quote", category: "Cotización comercial", summary: "Cotizaciones y propuestas comerciales en PDF.", stack: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL"], status: "Implementación privada V1", scope: "Versión privada V1. Tarifas y estado del despliegue por revisar." },
  { slug: "nevzok-vault", name: "NEVZOK VAULT", category: "Gestión de contraseñas", summary: "Bóveda personal para gestionar contraseñas.", stack: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL"], status: "Implementación privada existente", scope: "Implementación privada existente; sin auditoría de seguridad acreditada." },
] satisfies { slug: string; name: string; category: string; summary: string; stack: string[]; status: string; scope: string }[];

export const privateProjects: Project[] = cases.map((item) => ({
  ...item,
  privateDemo: true,
  role: privateRole,
  kicker: item.category.toUpperCase(),
  description: `${item.summary} ${item.scope}`,
  logo: `/projects/logos/${item.slug}.${["inventra", "mi-bolsillo", "cotizador"].includes(item.slug) ? "svg" : "png"}`,
  image: item.slug === "tucita" ? "/projects/tucita-publica.jpg" : `/projects/references/${item.slug}.${item.slug === "nova" ? "png" : "jpg"}`,
  referenceCaption: item.slug === "tucita" ? "Captura de la página pública" : item.slug === "inventra" ? "Vista de referencia con datos de ejemplo" : item.slug === "nova" ? "Interfaz local con historial vacío" : "Pantalla de acceso · Sin datos privados",
  imageMode: "contain",
  gallery: [],
  challenge: item.summary,
  solution: "Jorge impulsa el producto y participa en su construcción mediante desarrollo asistido por IA. El stack se comprobó en los archivos del proyecto.",
  outcome: item.scope,
  features: [],
}));

// Public editorial cases always use curated content, regardless of older CMS records.
export function withPrivateProjects(projects: Project[]) {
  const publicReferences = ["adri-nails", "wordtec", "wilyu-market", "gm-consultores", "sweetsfish", "neurai-solutek"];
  const publicProjects = projects.filter((p) => !privateProjects.some((item) => item.slug === p.slug)).map((p) => {
    const image = `/projects/references/${p.slug}.jpg`;
    return {
      ...p,
      ...(publicReferences.includes(p.slug) ? { image, gallery: [image], imageMode: "contain" as const, referenceCaption: "Captura de la página pública" } : {}),
      ...(p.slug === "adri-nails" ? { name: "Adri Nails Studio", featured: true } : {}),
    };
  });
  return [...publicProjects, ...privateProjects];
}
