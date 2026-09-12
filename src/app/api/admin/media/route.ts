import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";

const MAX_SIZE = 6 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "DATABASE_URL no configurada" }, { status: 503 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Selecciona una imagen." }, { status: 400 });
  if (!ALLOWED.has(file.type)) return NextResponse.json({ error: "Formato no permitido. Usa JPG, PNG, WEBP o GIF." }, { status: 400 });
  if (file.size > MAX_SIZE) return NextResponse.json({ error: "La imagen supera 6 MB." }, { status: 400 });
  const id = crypto.randomUUID();
  const bytes = Buffer.from(await file.arrayBuffer());
  const sql = getSql();
  await sql`INSERT INTO portfolio_media (id, mime, body, size, created_at) VALUES (${id}::uuid, ${file.type}, ${bytes}, ${file.size}, ${Date.now()})`;
  return NextResponse.json({ id, url: `/api/media/${id}`, mime: file.type, size: file.size });
}
