import { getSql } from "@/lib/db";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!process.env.DATABASE_URL) return new Response("Not configured", { status: 503 });
  const { id } = await params;
  const sql = getSql();
  try {
    const rows = await sql`SELECT mime, body FROM portfolio_media WHERE id=${id}::uuid LIMIT 1` as {mime:string; body:unknown}[];
    if (!rows[0]) return new Response("Not found", { status: 404 });
    const raw = rows[0].body;
    let bytes: Uint8Array;
    if (raw instanceof Uint8Array) bytes = raw;
    else if (typeof raw === "string") bytes = Uint8Array.from(Buffer.from(raw.replace(/^\\x/, ""), "hex"));
    else bytes = Uint8Array.from(Buffer.from(raw as ArrayBuffer));
    const body = new ArrayBuffer(bytes.byteLength);
    new Uint8Array(body).set(bytes);
    return new Response(body, { headers: { "Content-Type": rows[0].mime, "Cache-Control": "public, max-age=31536000, immutable" } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
