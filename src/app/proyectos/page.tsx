import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProjectCard from "@/components/ProjectCard";
import { loadProjects } from "@/lib/projects-db";

export const metadata: Metadata = { title: "Proyectos", description: "Casos de estudio y proyectos de Jorge Lab." };

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await loadProjects();
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);
  return <main><div className="page-glow"/><SiteHeader />
    <section className="page-hero shell"><span>PORTAFOLIO</span><h1>Proyectos que muestran <em>cómo resuelvo.</em></h1><p>Los primeros casos son los más representativos por alcance, funcionalidad o estado de publicación. Cada proyecto abre su propia página con reto, solución, tecnologías y resultado.</p></section>
    <section className="section shell project-group"><div className="section-heading"><div><span>DESTACADOS</span><h2>Casos principales.</h2></div></div><div className="all-projects-grid">{featured.map((project) => <ProjectCard project={project} key={project.slug} />)}</div></section>
    <section className="section shell project-group secondary-projects"><div className="section-heading"><div><span>MÁS TRABAJO</span><h2>Proyectos y experimentos.</h2></div></div><div className="all-projects-grid">{others.map((project) => <ProjectCard project={project} key={project.slug} />)}</div></section>
    <SiteFooter />
  </main>;
}
