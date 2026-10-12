import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { privateProjects } from "@/data/private-projects";

export default function PrivateProjects({ preview = false }: { preview?: boolean }) {
  const others = privateProjects.filter((project) => project.slug !== "tucita");
  const cases = preview ? others.slice(0, 3) : others;
  return <section id="proyectos-privados" className="section shell private-projects" aria-labelledby="private-projects-title">
    <div className="section-heading"><div><span>PRODUCTOS PROPIOS</span><h2 id="private-projects-title">Proyectos privados.</h2></div>{preview && <Link href="/proyectos#proyectos-privados">Ver todos →</Link>}</div>
    <p className="private-intro">Desarrollo asistido por IA · Proyecto privado / Demo conceptual</p>
    <div className="all-projects-grid">{cases.map((project) => <ProjectCard project={project} key={project.slug} />)}</div>
    {preview && <Link className="private-all" href="/proyectos#proyectos-privados">Ver todos los proyectos privados →</Link>}
  </section>;
}
