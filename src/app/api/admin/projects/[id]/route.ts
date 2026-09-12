import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "DATABASE_URL no configurada" }, { status: 503 });
  const { id } = await params;
  const body = await request.json();
  const sql = getSql();
  const existing = await sql`SELECT content, revision FROM portfolio_projects WHERE id=${id}` as {content: Record<string, unknown>; revision:number}[];
  if (!existing[0]) return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
  const now = Date.now();
  const revision = existing[0].revision + 1;
  const visibility = body.visibility === "draft" ? "draft" : "published";
  const merged = {
    ...existing[0].content,
    ...body,
    id,
    title: String(body.title || existing[0].content.title || id),
    tags: Array.isArray(body.tags) ? body.tags : (existing[0].content.tags || []),
    features: Array.isArray(body.features) ? body.features : (existing[0].content.features || []),
    images: Array.isArray(body.images) ? body.images : (existing[0].content.images || []),
    visibility,
    revision,
    updatedAt: now,
  };
  const rows = await sql`
    UPDATE portfolio_projects
    SET content=${JSON.stringify(merged)}::jsonb, visibility=${visibility}, revision=${revision}, updated_at=${now}
    WHERE id=${id}
    RETURNING id, content, visibility, revision, updated_at
  `;
  return NextResponse.json(rows[0]);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "DATABASE_URL no configurada" }, { status: 503 });
  const { id } = await params;
  const sql = getSql();
  await sql`DELETE FROM portfolio_projects WHERE id=${id}`;
  return NextResponse.json({ ok: true });
}
