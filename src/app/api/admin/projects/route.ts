import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";

function slugify(input: string) {
  return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "DATABASE_URL no configurada" }, { status: 503 });
  const sql = getSql();
  const rows = await sql`SELECT id, content, visibility, revision, updated_at FROM portfolio_projects ORDER BY updated_at DESC`;
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "DATABASE_URL no configurada" }, { status: 503 });
  const body = await request.json();
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const requestedId = typeof body.id === "string" ? body.id : "";
  const id = slugify(requestedId || title);
  if (!title || !id) return NextResponse.json({ error: "Título requerido" }, { status: 400 });
  const now = Date.now();
  const content = {
    id,
    title,
    year: String(body.year || new Date().getFullYear()),
    category: body.category || "web",
    summary: body.summary || "",
    description: body.description || body.summary || "",
    challenge: body.challenge || "",
    solution: body.solution || "",
    result: body.result || "",
    status: body.status || "completed",
    featured: body.featured || "auto",
    website: body.website || "",
    repository: body.repository || "",
    tags: Array.isArray(body.tags) ? body.tags : [],
    features: Array.isArray(body.features) ? body.features : [],
    images: Array.isArray(body.images) ? body.images : [],
    imageMode: body.imageMode === "contain" ? "contain" : "cover",
    visibility: body.visibility === "draft" ? "draft" : "published",
    createdAt: now,
    updatedAt: now,
    revision: 1,
  };
  const visibility = content.visibility;
  const sql = getSql();
  try {
    const rows = await sql`
      INSERT INTO portfolio_projects (id, content, visibility, revision, updated_at)
      VALUES (${id}, ${JSON.stringify(content)}::jsonb, ${visibility}, 1, ${now})
      RETURNING id, content, visibility, revision, updated_at
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo crear el proyecto";
    if (message.toLowerCase().includes("duplicate")) return NextResponse.json({ error: "Ese identificador ya existe." }, { status: 409 });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
