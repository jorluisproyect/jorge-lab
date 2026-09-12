"use client";

import { FormEvent, useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true); setError("");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { setError(data.error || "No se pudo ingresar"); setLoading(false); return; }
    window.location.reload();
  }

  return <section className="admin-login shell">
    <div className="admin-login-card">
      <span>PANEL PRIVADO</span>
      <h1>Administrar <em>JORGE LAB.</em></h1>
      <p>Ingresa con tu usuario y clave privada para crear, editar, destacar o publicar proyectos sin tocar código.</p>
      <form onSubmit={submit}>
        <label>Usuario</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />
        <label>Clave de administrador</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
        {error && <p className="admin-error">{error}</p>}
        <button className="primary" disabled={loading}>{loading ? "Ingresando…" : "Entrar al panel →"}</button>
      </form>
    </div>
  </section>;
}
