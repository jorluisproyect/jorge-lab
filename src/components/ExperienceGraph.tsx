"use client";

import { useState } from "react";
import Link from "next/link";

export type ExperienceArea = {
  name: string;
  tools: string[];
  icon: string;
  note?: string;
  reportedCoverage?: number;
  projects: { slug: string; name: string }[];
};

export default function ExperienceGraph({ areas }: { areas: ExperienceArea[] }) {
  const [active, setActive] = useState(() => Math.max(0, areas.findIndex((area) => area.name === "Next.js")));
  const selected = areas[active];
  const max = Math.max(1, ...areas.map((area) => area.projects.length));
  return (
    <section className="section shell experience-section" aria-labelledby="experience-title">
      <div className="section-heading"><div><span>EXPERIENCIA APLICADA</span><h2 id="experience-title">Lo que construyo. Con qué lo hago.</h2></div><Link href="/proyectos">Explorar proyectos →</Link></div>
      <p className="experience-intro">Pasa el cursor o toca una herramienta para ver los proyectos donde la uso.</p>
      <div className="experience-layout">
        <div className="experience-bars" role="group" aria-label="Herramientas y tecnologías">
          {areas.map((area, index) => (
            <button key={area.name} type="button" className={index === active ? "experience-bar active" : "experience-bar"} aria-pressed={index === active} aria-controls="experience-evidence" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
              <span className="experience-bar-label"><strong><img src={area.icon} alt="" width="24" height="24" />{area.name}</strong><small>{area.reportedCoverage !== undefined ? `≈ ${area.reportedCoverage}% de proyectos` : area.projects.length ? `${area.projects.length} ${area.projects.length === 1 ? "proyecto" : "proyectos"}` : "Por vincular"}</small></span>
              <span className="experience-track" aria-hidden="true"><span style={{ width: `${area.reportedCoverage ?? area.projects.length / max * 100}%` }} /></span>
            </button>
          ))}
          <small className="experience-scale">Barras por cantidad de proyectos · VS Code: uso aproximado declarado.</small>
        </div>
        <div className="experience-evidence" id="experience-evidence" aria-live="polite" aria-atomic="true">
          <span className="experience-caption">APLICADO EN PROYECTOS</span>
          <h3><img src={selected.icon} alt="" width="32" height="32" />{selected.name}</h3>
          <div className="experience-tools">{selected.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
          <div className="experience-projects">{selected.projects.map((project) => <Link key={project.slug} href={`/proyectos/${project.slug}`}>{project.name}<span aria-hidden="true">↗</span></Link>)}</div>
          {selected.reportedCoverage !== undefined && <Link className="private-all" href="/proyectos">Ver mi portafolio →</Link>}
          {selected.note && <p className="experience-note">{selected.note}</p>}
          <p>Desarrollo asistido por IA · Proyectos en distintas etapas.</p>
        </div>
      </div>
    </section>
  );
}
