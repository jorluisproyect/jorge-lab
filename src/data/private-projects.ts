import type { Project } from "@/data/projects";

export const privateBadge = "Proyecto privado / Demo conceptual";
export const privateRole = "Producto propio · Desarrollo asistido por IA";

const cases = [
  { slug: "tucita", name: "TUCITA", category: "Reservas y servicios", summary: "Plataforma multirubro para organizar agendas, profesionales y reservas de negocios de servicios.", stack: ["Next.js", "React", "TypeScript", "PostgreSQL"], status: "Desarrollo activo", scope: "Código web y versión Android existentes. Sus módulos siguen en evolución; esta ficha no acredita disponibilidad comercial general." },
  { slug: "inventra", name: "INVENTRA", category: "Inventario", summary: "Sistema privado para gestionar productos, entradas, salidas e historial de stock por negocio.", stack: ["Next.js", "TypeScript", "Neon", "PostgreSQL"], status: "Inventario básico implementado", scope: "Código y documentación de inventario persistente confirmados. Proveedores, exportaciones y auditoría completa siguen pendientes." },
  { slug: "nova", name: "NOVA", category: "IA local para Windows", summary: "Asistente de escritorio con conversación, voz, memoria local y acciones delimitadas por permisos.", stack: ["Python", "PySide6", "Ollama", "SQLite"], status: "Aplicación local en evolución", scope: "Aplicación Windows y código existentes. El inicio actual usa Python; el empaquetado requiere revisión. La activación continua por voz no está implementada." },
  { slug: "vyra", name: "VYRA", category: "CRM y automatización", summary: "CRM privado para organizar contactos comerciales, seguimiento, catálogo y propuestas.", stack: ["Next.js", "TypeScript", "PostgreSQL", "n8n"], status: "CRM local implementado", scope: "CRM y workflows documentados. La atención real por WhatsApp está pendiente de acceso oficial y autorización; no se anuncian envíos automáticos." },
  { slug: "chispa", name: "CHISPA", category: "Productividad", summary: "Captura rápida de ideas con almacenamiento local y sincronización cuando vuelve la conexión.", stack: ["Next.js", "TypeScript", "IndexedDB", "PostgreSQL"], status: "Implementación existente", scope: "Código y documentación de la aplicación privada confirmados. No se ha revalidado su funcionamiento completo en esta revisión del portafolio." },
  { slug: "mi-bolsillo", name: "Mi Bolsillo", category: "Finanzas personales", summary: "Herramienta privada para registrar movimientos y explorar cobertura y previsiones de gastos.", stack: ["Next.js", "TypeScript", "PostgreSQL", "Decimal.js"], status: "Implementación existente", scope: "Código, modelos de cálculo y pruebas existentes. Las previsiones son herramientas de planificación; no se publican datos financieros ni resultados personales." },
  { slug: "cotizador", name: "Neurai Quote", category: "Cotización comercial", summary: "Gestor de clientes, servicios y propuestas con condiciones, monedas y documentos PDF.", stack: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL"], status: "Implementación privada V1", scope: "Código y documentación V1 confirmados. El estado operativo del despliegue no se ha revalidado; las tarifas requieren revisión del propietario." },
  { slug: "nevzok-vault", name: "NEVZOK VAULT", category: "Gestión de contraseñas", summary: "Bóveda personal con acceso de propietario y flujos de recuperación para información sensible.", stack: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL"], status: "Implementación privada existente", scope: "Código y repositorio privado confirmados. Esta muestra no constituye una auditoría de seguridad y no contiene credenciales ni acceso a la bóveda." },
] satisfies { slug: string; name: string; category: string; summary: string; stack: string[]; status: string; scope: string }[];

export const privateProjects: Project[] = cases.map((item) => ({
  ...item,
  privateDemo: true,
  role: privateRole,
  kicker: item.category.toUpperCase(),
  description: `${item.summary} ${item.scope}`,
  image: `/projects/private-${item.slug}.svg`,
  gallery: [`/projects/private-${item.slug}.svg`],
  challenge: item.summary,
  solution: "Jorge impulsa el producto y participa en su construcción mediante desarrollo asistido por IA. El stack se comprobó en los archivos del proyecto.",
  outcome: item.scope,
  features: [],
}));

// Public editorial cases always use curated content, regardless of older CMS records.
export function withPrivateProjects(projects: Project[]) {
  return [...projects.filter((p) => !privateProjects.some((item) => item.slug === p.slug)), ...privateProjects];
}
