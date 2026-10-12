import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { privateProjects } from "@/data/private-projects";

export default function PrivateProjects({ preview = false }: { preview?: boolean }) {
  const cases = preview ? privateProjects.slice(0, 3) : privateProjects;
  return <section id="proyectos-privados" className="section shell private-projects" aria-labelledby="private-projects-title">
    <div className="section-heading"><div><span>LABORATORIO / PRODUCTOS PROPIOS</span><h2 id="private-projects-title">Ideas propias. Casos para explorar.</h2></div>{preview && <Link href="/proyectos#proyectos-privados">Ver los {privateProjects.length} casos →</Link>}</div>
    <p className="private-intro">Proyectos desarrollados con asistencia de IA. Cada ficha distingue el alcance documentado de lo pendiente. Los visuales son placeholders conceptuales; los sistemas y sus datos permanecen privados.</p>
    <div className="all-projects-grid">{cases.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
    {preview && <Link className="secondary private-all" href="/proyectos#proyectos-privados">Explorar todos los proyectos privados →</Link>}
  </section>;
}
