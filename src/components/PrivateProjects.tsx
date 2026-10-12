import Link from "next/link";
import Image from "next/image";
import { privateProjects } from "@/data/private-projects";

export default function PrivateProjects({ preview = false }: { preview?: boolean }) {
  const others = privateProjects.filter((project) => project.slug !== "tucita");
  const cases = preview ? others.slice(0, 3) : others;
  return <section id="proyectos-privados" className="section shell private-projects" aria-labelledby="private-projects-title">
    <div className="section-heading"><div><span>PRODUCTOS PROPIOS</span><h2 id="private-projects-title">Proyectos privados.</h2></div>{preview && <Link href="/proyectos#proyectos-privados">Ver todos →</Link>}</div>
    <p className="private-intro">Desarrollo asistido por IA · Proyecto privado / Demo conceptual</p>
    <div className="private-grid">{cases.map((project) => <Link className="private-card" href={`/proyectos/${project.slug}`} key={project.slug}>
      <Image unoptimized width={56} height={56} src={project.logo!} alt={`Logo de ${project.name}`} />
      <div><h3>{project.name}</h3><p>{project.summary}</p><small>{project.stack.slice(0, 3).join(" · ")}</small></div><span aria-hidden="true">↗</span>
    </Link>)}</div>
    {preview && <Link className="private-all" href="/proyectos#proyectos-privados">Ver todos los proyectos privados →</Link>}
  </section>;
}
