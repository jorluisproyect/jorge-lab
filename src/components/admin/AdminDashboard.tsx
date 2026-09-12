"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type ImageItem = { url: string; alt?: string };
type ProjectRow = {
  id: string;
  content: Record<string, any>;
  visibility: string;
  revision: number;
  updated_at: number;
};

type FormState = {
  id: string; title: string; year: string; category: string; summary: string; description: string;
  challenge: string; solution: string; result: string; status: string; featured: string; website: string;
  repository: string; tags: string; features: string; visibility: string; imageMode: string; images: ImageItem[];
};

const blank: FormState = {
  id: "", title: "", year: String(new Date().getFullYear()), category: "web", summary: "", description: "",
  challenge: "", solution: "", result: "", status: "completed", featured: "auto", website: "", repository: "",
  tags: "", features: "", visibility: "published", imageMode: "cover", images: [],
};

function toForm(row: ProjectRow): FormState {
  const c = row.content || {};
  return {
    id: row.id, title: c.title || "", year: c.year || String(new Date().getFullYear()), category: c.category || "web",
    summary: c.summary || "", description: c.description || "", challenge: c.challenge || "", solution: c.solution || "",
    result: c.result || "", status: c.status || "completed", featured: c.featured || "auto", website: c.website || "",
    repository: c.repository || "", tags: Array.isArray(c.tags) ? c.tags.join(", ") : "", features: Array.isArray(c.features) ? c.features.join("\n") : "",
    visibility: row.visibility || c.visibility || "published", imageMode: c.imageMode || "cover", images: Array.isArray(c.images) ? c.images : [],
  };
}

export default function AdminDashboard() {
  const [rows, setRows] = useState<ProjectRow[]>([]);
  const [form, setForm] = useState<FormState>(blank);
  const [mode, setMode] = useState<"new" | "edit">("new");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const published = useMemo(() => rows.filter((r) => r.visibility === "published").length, [rows]);
  const featured = useMemo(() => rows.filter((r) => ["yes", true].includes(r.content?.featured)).length, [rows]);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/projects", { cache: "no-store" });
    if (res.ok) setRows(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function change<K extends keyof FormState>(key: K, value: FormState[K]) { setForm((current) => ({ ...current, [key]: value })); }
  function newProject() { setMode("new"); setForm(blank); setMessage(""); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function edit(row: ProjectRow) { setMode("edit"); setForm(toForm(row)); setMessage(""); window.scrollTo({ top: 0, behavior: "smooth" }); }

  function payload() {
    return {
      ...form,
      tags: form.tags.split(",").map((x) => x.trim()).filter(Boolean),
      features: form.features.split("\n").map((x) => x.trim()).filter(Boolean),
    };
  }

  async function save(event: FormEvent) {
    event.preventDefault(); setSaving(true); setMessage("");
    const endpoint = mode === "new" ? "/api/admin/projects" : `/api/admin/projects/${encodeURIComponent(form.id)}`;
    const res = await fetch(endpoint, { method: mode === "new" ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload()) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { setMessage(`Error: ${data.error || "No se pudo guardar"}`); setSaving(false); return; }
    setMessage(mode === "new" ? "Proyecto creado y guardado en Neon." : "Cambios guardados en Neon.");
    setMode("edit"); setForm(toForm(data)); await load(); setSaving(false);
  }

  async function upload(file?: File) {
    if (!file) return;
    setUploading(true); setMessage("");
    const body = new FormData(); body.append("file", file);
    const res = await fetch("/api/admin/media", { method: "POST", body });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { setMessage(`Error: ${data.error || "No se pudo subir la imagen"}`); setUploading(false); return; }
    change("images", [...form.images, { url: data.url, alt: form.title || "Imagen del proyecto" }]);
    setMessage("Imagen subida. Pulsa Guardar proyecto para vincularla."); setUploading(false);
  }

  function removeImage(index: number) { change("images", form.images.filter((_, i) => i !== index)); }

  async function removeProject(row: ProjectRow) {
    if (!confirm(`¿Eliminar “${row.content?.title || row.id}”? Esta acción borra el proyecto de la base de datos.`)) return;
    const res = await fetch(`/api/admin/projects/${encodeURIComponent(row.id)}`, { method: "DELETE" });
    if (res.ok) { if (form.id === row.id) newProject(); await load(); }
  }

  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); window.location.reload(); }

  return <section className="admin-shell shell">
    <div className="admin-topbar">
      <div><span>PANEL PRIVADO / NEON</span><h1>Gestor de proyectos</h1><p>Lo que publiques aquí alimenta automáticamente tu portafolio.</p></div>
      <div className="admin-top-actions"><button className="secondary" onClick={() => window.open("/", "_blank")}>Ver web ↗</button><button className="secondary" onClick={logout}>Salir</button></div>
    </div>

    <div className="admin-stats"><article><strong>{rows.length}</strong><span>Total</span></article><article><strong>{published}</strong><span>Publicados</span></article><article><strong>{rows.length - published}</strong><span>Borradores</span></article><article><strong>{featured}</strong><span>Destacados manuales</span></article></div>

    <div className="admin-grid">
      <form className="admin-editor" onSubmit={save}>
        <div className="admin-editor-title"><div><small>{mode === "new" ? "NUEVO PROYECTO" : `EDITANDO / ${form.id}`}</small><h2>{mode === "new" ? "Agregar proyecto" : form.title}</h2></div><button type="button" className="secondary" onClick={newProject}>+ Nuevo</button></div>
        <div className="admin-form-grid">
          <label><span>Título</span><input value={form.title} onChange={(e) => change("title", e.target.value)} required /></label>
          <label><span>ID / slug {mode === "edit" && "(fijo)"}</span><input value={form.id} onChange={(e) => change("id", e.target.value)} disabled={mode === "edit"} placeholder="se-genera-del-titulo" /></label>
          <label><span>Categoría</span><input value={form.category} onChange={(e) => change("category", e.target.value)} placeholder="web, ecommerce, app…" /></label>
          <label><span>Año</span><input value={form.year} onChange={(e) => change("year", e.target.value)} /></label>
          <label><span>Estado</span><input value={form.status} onChange={(e) => change("status", e.target.value)} placeholder="completed, testing…" /></label>
          <label><span>Publicación</span><select value={form.visibility} onChange={(e) => change("visibility", e.target.value)}><option value="published">Publicado</option><option value="draft">Borrador</option></select></label>
          <label><span>Destacado</span><select value={form.featured} onChange={(e) => change("featured", e.target.value)}><option value="auto">Automático</option><option value="yes">Sí</option><option value="no">No</option></select></label>
          <label><span>Ajuste de imagen</span><select value={form.imageMode} onChange={(e) => change("imageMode", e.target.value)}><option value="cover">Cubrir tarjeta</option><option value="contain">Mostrar completa</option></select></label>
        </div>
        <label className="admin-wide"><span>Resumen corto</span><textarea rows={2} value={form.summary} onChange={(e) => change("summary", e.target.value)} /></label>
        <label className="admin-wide"><span>Descripción</span><textarea rows={3} value={form.description} onChange={(e) => change("description", e.target.value)} /></label>
        <div className="admin-form-grid admin-three"><label><span>Reto</span><textarea rows={5} value={form.challenge} onChange={(e) => change("challenge", e.target.value)} /></label><label><span>Solución</span><textarea rows={5} value={form.solution} onChange={(e) => change("solution", e.target.value)} /></label><label><span>Resultado</span><textarea rows={5} value={form.result} onChange={(e) => change("result", e.target.value)} /></label></div>
        <div className="admin-form-grid"><label><span>Web publicada</span><input value={form.website} onChange={(e) => change("website", e.target.value)} placeholder="https://…" /></label><label><span>GitHub</span><input value={form.repository} onChange={(e) => change("repository", e.target.value)} placeholder="https://github.com/…" /></label></div>
        <div className="admin-form-grid"><label><span>Tecnologías (separadas por coma)</span><input value={form.tags} onChange={(e) => change("tags", e.target.value)} placeholder="Next.js, Neon, TypeScript" /></label><label><span>Funciones (una por línea)</span><textarea rows={4} value={form.features} onChange={(e) => change("features", e.target.value)} /></label></div>

        <div className="admin-media-box"><div><span>IMÁGENES</span><p>La primera imagen será la portada. Puedes subir varias para el carrusel.</p></div><label className="admin-upload">{uploading ? "Subiendo…" : "+ Subir imagen"}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e) => { upload(e.target.files?.[0]); e.currentTarget.value = ""; }} disabled={uploading} /></label></div>
        {form.images.length > 0 && <div className="admin-media-grid">{form.images.map((image, index) => <article key={`${image.url}-${index}`}><img src={image.url} alt={image.alt || ""}/><div><span>{index === 0 ? "PORTADA" : `IMAGEN ${index + 1}`}</span><button type="button" onClick={() => removeImage(index)}>Quitar</button></div></article>)}</div>}
        {message && <p className={message.startsWith("Error") ? "admin-error" : "admin-success"}>{message}</p>}
        <div className="admin-savebar"><button className="primary" disabled={saving}>{saving ? "Guardando…" : mode === "new" ? "Crear proyecto →" : "Guardar cambios →"}</button><span>El contador de la portada se actualiza con los proyectos publicados.</span></div>
      </form>

      <aside className="admin-list"><div className="admin-list-head"><div><span>PROYECTOS</span><h2>{loading ? "Cargando…" : `${rows.length} registrados`}</h2></div><button onClick={newProject}>+</button></div>
        <div className="admin-project-list">{rows.map((row) => <article key={row.id} className={form.id === row.id && mode === "edit" ? "active" : ""}><button className="admin-project-main" onClick={() => edit(row)}><span className={`admin-dot ${row.visibility}`} /><div><strong>{row.content?.title || row.id}</strong><small>{row.content?.category || "Proyecto"} · rev. {row.revision}</small></div><b>→</b></button><button className="admin-delete" onClick={() => removeProject(row)} title="Eliminar">×</button></article>)}</div>
      </aside>
    </div>
  </section>;
}
