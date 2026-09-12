import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProjectGallery from "@/components/ProjectGallery";
import { loadProjects } from "@/lib/projects-db";

export const dynamic = "force-dynamic";

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = await loadProjects();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return <main><div className="page-glow"/><SiteHeader />
    <section className="project-detail-hero shell">
      <div className="project-detail-copy"><Link href="/proyectos">← Todos los proyectos</Link><span>{project.kicker}</span><h1>{project.name}</h1><p>{project.description}</p><div className="pill-row">{project.stack.map((item) => <b key={item}>{item}</b>)}</div><div className="detail-actions">{project.live && <a className="primary" href={project.live} target="_blank" rel="noreferrer">Ver proyecto en vivo ↗</a>}{project.github && <a className="secondary" href={project.github} target="_blank" rel="noreferrer">Ver código ↗</a>}<span className="status-badge">{project.status}</span></div></div>
      <ProjectGallery images={project.gallery} name={project.name} mode={project.imageMode} />
    </section>

    <section className="case-grid shell"><article><span>01 / RETO</span><h2>El problema</h2><p>{project.challenge}</p></article><article><span>02 / SOLUCIÓN</span><h2>Lo que construí</h2><p>{project.solution}</p></article><article><span>03 / RESULTADO</span><h2>El resultado</h2><p>{project.outcome}</p></article></section>

    {project.features.length > 0 && <section className="detail-features shell"><div><span>FUNCIONES</span><h2>Qué incluye.</h2></div><div className="feature-list">{project.features.map((feature, index) => <article key={feature}><b>{String(index + 1).padStart(2, "0")}</b><h3>{feature}</h3></article>)}</div></section>}

    {next && <section className="next-project shell"><span>SIGUIENTE CASO</span><h2>{next.name}</h2><p>{next.summary}</p><Link className="primary" href={`/proyectos/${next.slug}`}>Ver {next.name} →</Link></section>}
    <SiteFooter />
  </main>;
}
