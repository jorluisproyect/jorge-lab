import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProjectCard from "@/components/ProjectCard";
import PrivateProjects from "@/components/PrivateProjects";
import TucitaSpotlight from "@/components/TucitaSpotlight";
import { loadProjects } from "@/lib/projects-db";

export const metadata: Metadata = { title: "Proyectos", description: "Casos de estudio y proyectos de Jorge Lab." };

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await loadProjects();
  const tucita = projects.find((project) => project.slug === "tucita");
  const featured = projects.filter((project) => project.featured && !project.privateDemo);
  const others = projects.filter((project) => !project.featured && !project.privateDemo);
  return <main><div className="page-glow"/><SiteHeader />
    <section className="page-hero shell"><span>PORTAFOLIO</span><h1>Proyectos que muestran <em>cómo resuelvo.</em></h1><p>Sitios web y productos propios.</p></section>
    {tucita && <TucitaSpotlight />}
    <section className="section shell project-group"><div className="section-heading"><div><span>DESTACADOS</span><h2>Casos principales.</h2></div></div><div className="all-projects-grid">{featured.map((project) => <ProjectCard project={project} key={project.slug} />)}</div></section>
    <PrivateProjects />
    <section className="section shell project-group secondary-projects"><div className="section-heading"><div><span>LABORATORIO</span><h2>Experimentos.</h2></div></div><div className="all-projects-grid">{others.map((project) => <ProjectCard project={project} key={project.slug} />)}</div></section>
    <SiteFooter />
  </main>;
}
