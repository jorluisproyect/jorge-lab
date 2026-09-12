import { NextResponse } from "next/server";
import { adminCookie, createSessionToken } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";

const LIMIT_KEY = "admin-login";
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !process.env.SESSION_SECRET) {
      return NextResponse.json({ error: "Configura ADMIN_USERNAME, ADMIN_PASSWORD y SESSION_SECRET." }, { status: 503 });
    }

    if (process.env.DATABASE_URL) {
      const sql = getSql();
      const now = Date.now();
      const rows = await sql`SELECT attempts, expires_at FROM portfolio_login_limits WHERE key=${LIMIT_KEY}` as {attempts:number; expires_at:number}[];
      const current = rows[0];
      if (current && current.expires_at > now && current.attempts >= MAX_ATTEMPTS) {
        return NextResponse.json({ error: "Demasiados intentos. Prueba de nuevo en unos minutos." }, { status: 429 });
      }
    }

    const validUsername = typeof username === "string" && username === process.env.ADMIN_USERNAME;
    const validPassword = typeof password === "string" && password === process.env.ADMIN_PASSWORD;
    if (!validUsername || !validPassword) {
      if (process.env.DATABASE_URL) {
        const sql = getSql();
        const now = Date.now();
        await sql`
          INSERT INTO portfolio_login_limits (key, attempts, expires_at)
          VALUES (${LIMIT_KEY}, 1, ${now + WINDOW_MS})
          ON CONFLICT (key) DO UPDATE SET
            attempts = CASE WHEN portfolio_login_limits.expires_at < ${now} THEN 1 ELSE portfolio_login_limits.attempts + 1 END,
            expires_at = CASE WHEN portfolio_login_limits.expires_at < ${now} THEN ${now + WINDOW_MS} ELSE portfolio_login_limits.expires_at END
        `;
      }
      return NextResponse.json({ error: "Usuario o clave incorrectos." }, { status: 401 });
    }

    if (process.env.DATABASE_URL) {
      const sql = getSql();
      await sql`DELETE FROM portfolio_login_limits WHERE key=${LIMIT_KEY}`;
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(adminCookie.name, createSessionToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: adminCookie.maxAge,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "No se pudo iniciar sesión." }, { status: 500 });
  }
}
