import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-tile">
      <Link className="project-tile-image" href={`/proyectos/${project.slug}`}>
        <img className={project.imageMode === "contain" ? "contain" : "cover"} src={project.image} alt={project.name} />
        <span>{project.status}</span>
      </Link>
      <div className="project-tile-copy">
        <small>{project.kicker}</small>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <div className="mini-stack">{project.stack.slice(0, 4).map((item) => <b key={item}>{item}</b>)}</div>
        <Link href={`/proyectos/${project.slug}`}>Ver caso de estudio →</Link>
      </div>
    </article>
  );
}
