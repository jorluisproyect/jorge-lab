import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import type { Project } from "@/data/projects";

export default function PrivateProjectDetail({ project }: { project: Project }) {
  const tucita = project.slug === "tucita";
  return <main><SiteHeader /><section className="private-case shell">
    <Link href="/proyectos#proyectos-privados">← Proyectos</Link>
    <div className="private-case-title"><Image unoptimized width={72} height={72} src={project.logo!} alt={`Logo de ${project.name}`} /><div><h1>{project.name}</h1><p>{project.summary}</p></div></div>
    <div className="pill-row">{project.stack.map((item) => <b key={item}>{item}</b>)}</div>
    <p className="private-case-role">Desarrollo asistido por IA · {tucita ? "Producto propio" : "Proyecto privado / Demo conceptual"}</p>
    {tucita && <figure><Image unoptimized width={1265} height={712} src={project.image} alt="Captura real de la página pública de TUCITA" /><figcaption>Captura de tucita.com.ve · 12 de octubre de 2026</figcaption></figure>}
    <div className="private-case-status"><h2>{project.status}</h2><p>{project.outcome}</p></div>
    {tucita && <a className="primary" href="https://tucita.com.ve" target="_blank" rel="noreferrer">Visitar TUCITA ↗</a>}
  </section><SiteFooter /></main>;
}
