import { projects as fallbackProjects, type Project } from "@/data/projects";
import { getSql } from "@/lib/db";

type DbRow = {
  id: string;
  content: Record<string, unknown>;
  visibility: string;
  revision: number;
  updated_at: number;
};

function str(v: unknown, fallback = "") { return typeof v === "string" ? v : fallback; }
function arr(v: unknown) { return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []; }

function imageList(content: Record<string, unknown>, fallback?: Project) {
  const images = Array.isArray(content.images) ? content.images : [];
  const urls = images.map((item) => {
    if (typeof item === "string") return item;
    if (item && typeof item === "object" && "url" in item) return str((item as {url?: unknown}).url);
    return "";
  }).filter(Boolean);
  return urls.length ? urls : (fallback?.gallery || (fallback?.image ? [fallback.image] : []));
}

export function dbContentToProject(row: DbRow): Project {
  const c = row.content || {};
  const id = str(c.id, row.id);
  const fallback = fallbackProjects.find((p) => p.slug === id);
  const gallery = imageList(c, fallback);
  const category = str(c.category, fallback?.category || "Proyecto digital");
  const featuredRaw = c.featured;
  const featured = featuredRaw === true || featuredRaw === "yes" || (featuredRaw === "auto" && Boolean(fallback?.featured));
  return {
    slug: id,
    name: str(c.title, fallback?.name || id),
    kicker: str(c.kicker, fallback?.kicker || category.toUpperCase()),
    category,
    summary: str(c.summary, fallback?.summary || "Proyecto digital desarrollado por Jorge Lab."),
    description: str(c.description) || fallback?.description || str(c.summary, "Proyecto digital."),
    image: gallery[0] || fallback?.image || "/projects/neurai.png",
    gallery: gallery.length ? gallery : ["/projects/neurai.png"],
    imageMode: (str(c.imageMode, fallback?.imageMode || "cover") === "contain" ? "contain" : "cover"),
    // TUCITA keeps its Vercel TEST URL; its custom domain is reserved for a later approved launch.
    live: id === "tucita" ? "https://turnavia.vercel.app" : ((str(c.website) || fallback?.live || "") || undefined),
    status: str(c.status, fallback?.status || "Publicado"),
    stack: arr(c.tags).length ? arr(c.tags) : (fallback?.stack || []),
    challenge: str(c.challenge) || fallback?.challenge || "Convertir una necesidad real en una solución digital clara.",
    solution: str(c.solution) || fallback?.solution || "Diseño y desarrollo de una solución web enfocada en el usuario.",
    outcome: str(c.result) || fallback?.outcome || "Una base funcional preparada para continuar creciendo.",
    features: arr(c.features).length ? arr(c.features) : (fallback?.features || []),
    featured,
    github: (str(c.repository) || fallback?.github || "") || undefined,
  };
}

export async function loadProjects(options?: { includeDrafts?: boolean }) {
  if (!process.env.DATABASE_URL) return fallbackProjects;
  try {
    const sql = getSql();
    const rows = await sql`SELECT id, content, visibility, revision, updated_at FROM portfolio_projects ORDER BY updated_at DESC` as DbRow[];
    const visible = rows.filter((r) => options?.includeDrafts || r.visibility === "published").map(dbContentToProject);
    // Always show the approved TUCITA case study, even if an older admin record is still a draft.
    // A published Neon record replaces the bundled version when it becomes available.
    const tucita = fallbackProjects.find((p) => p.slug === "tucita");
    const publishedTucita = visible.some((p) => p.slug === "tucita");
    return tucita && !publishedTucita ? [tucita, ...visible] : visible;
  } catch (error) {
    console.error("Neon project load failed; using fallback", error);
    return fallbackProjects;
  }
}

export async function loadProjectBySlug(slug: string) {
  const list = await loadProjects();
  return list.find((p) => p.slug === slug);
}
