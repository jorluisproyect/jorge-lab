import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProjectCard from "@/components/ProjectCard";
import { loadProjects } from "@/lib/projects-db";

export const metadata: Metadata = { title: "Proyectos", description: "Casos de estudio y proyectos de Jorge Lab." };

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await loadProjects();
  const tucita = projects.find((project) => project.slug === "tucita");
  const featured = projects.filter((project) => project.featured && project.slug !== "tucita");
  const others = projects.filter((project) => !project.featured && project.slug !== "tucita");
  return <main><div className="page-glow"/><SiteHeader />
    <section className="page-hero shell"><span>PORTAFOLIO</span><h1>Proyectos que muestran <em>cómo resuelvo.</em></h1><p>Los primeros casos son los más representativos por alcance, funcionalidad o estado de publicación. Cada proyecto abre su propia página con reto, solución, tecnologías y resultado.</p></section>
    {tucita && <section className="tucita-spotlight tucita-portfolio-spotlight shell" aria-label="TUCITA, proyecto actual">
      <div className="tucita-spotlight-copy">
        <span className="tucita-live"><i /> PROYECTO ACTUAL · EN CONSTANTE EVOLUCIÓN</span>
        <p className="tucita-eyebrow">DE TURNAVIA A TUCITA / SAAS MULTIRUBRO</p>
        <h2>TUCITA.<br /><em>Agenda. Gestiona. Crece.</em></h2>
        <p className="tucita-spotlight-description">Mi proyecto actual: una plataforma de citas y gestión para profesionales, clínicas y negocios de servicios. Diseño una experiencia móvil simple y una operación adaptable a distintos rubros.</p>
        <div className="tucita-pills"><span>Next.js</span><span>PostgreSQL</span><span>Mobile-first</span><span>SaaS</span></div>
        <div className="tucita-spotlight-actions"><Link className="primary" href="/proyectos/tucita">Conocer el proyecto →</Link><span>Desarrollo activo</span></div>
      </div>
      <Link href="/proyectos/tucita" className="tucita-spotlight-visual" aria-label="Ver el proyecto TUCITA"><img src={tucita.image} alt="Diseño conceptual de la plataforma TUCITA" /><span>DESTACADO / PROYECTO ACTUAL</span></Link>
    </section>}
    <section className="section shell project-group"><div className="section-heading"><div><span>DESTACADOS</span><h2>Casos principales.</h2></div></div><div className="all-projects-grid">{featured.map((project) => <ProjectCard project={project} key={project.slug} />)}</div></section>
    <section className="section shell project-group secondary-projects"><div className="section-heading"><div><span>MÁS TRABAJO</span><h2>Proyectos y experimentos.</h2></div></div><div className="all-projects-grid">{others.map((project) => <ProjectCard project={project} key={project.slug} />)}</div></section>
    <SiteFooter />
  </main>;
}
