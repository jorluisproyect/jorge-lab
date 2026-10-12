import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-tile${project.privateDemo ? " private-reference" : ""}`}>
      <Link className="project-tile-image" href={`/proyectos/${project.slug}`}>
        <img loading="lazy" className={project.imageMode === "contain" ? "contain" : "cover"} src={project.image} alt={project.privateDemo ? `Captura de referencia de ${project.name}` : project.name} />
        {!project.privateDemo && <span>{project.status}</span>}
      </Link>
      <div className="project-tile-copy">
        {!project.privateDemo && <small>{project.kicker}</small>}
        <h3 className={project.privateDemo ? "project-brand-title" : undefined}>{project.privateDemo && project.logo && <img src={project.logo} width={28} height={28} alt="" />}{project.name}</h3>
        <p>{project.summary}</p>
        <div className="mini-stack">{project.stack.slice(0, 4).map((item) => <b key={item}>{item}</b>)}</div>
        <Link href={`/proyectos/${project.slug}`}>Ver caso de estudio →</Link>
      </div>
    </article>
  );
}
