import Link from "next/link";
import type { Project } from "@/data/projects";
import { privateBadge } from "@/data/private-projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-tile">
      <Link className="project-tile-image" href={`/proyectos/${project.slug}`}>
        <img loading="lazy" className={project.imageMode === "contain" ? "contain" : "cover"} src={project.image} alt={project.privateDemo ? `Visual conceptual de ${project.name}; no es una captura del sistema` : project.name} />
        <span>{project.privateDemo ? privateBadge : project.status}</span>
      </Link>
      <div className="project-tile-copy">
        <small>{project.kicker}</small>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        {project.privateDemo && <div className="private-meta"><p>{project.role}</p><p>Estado: {project.status}</p></div>}
        <div className="mini-stack">{project.stack.slice(0, 4).map((item) => <b key={item}>{item}</b>)}</div>
        <Link href={`/proyectos/${project.slug}`}>Ver caso de estudio →</Link>
      </div>
    </article>
  );
}
