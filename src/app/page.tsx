import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProjectCard from "@/components/ProjectCard";
import { loadProjects } from "@/lib/projects-db";

const services = [
  ["01", "Desarrollo web", "Sitios corporativos, landing pages, catálogos, portales y experiencias responsive."],
  ["02", "IA & automatización", "Flujos, integraciones, APIs y automatización de tareas repetitivas para negocios."],
  ["03", "E-commerce & sistemas", "Tiendas, paneles privados, formularios, bases de datos y herramientas internas."],
  ["04", "LLC en EE. UU.", "Acompañamiento práctico para estructurar el proceso de registro de una LLC de forma online."],
];

const process = [
  ["01", "Entender", "Aterrizo el objetivo, el usuario y qué resultado debe producir la solución."],
  ["02", "Diseñar", "Organizo la estructura, navegación, experiencia móvil y flujo principal."],
  ["03", "Construir", "Desarrollo componentes, lógica, datos e integraciones según el proyecto."],
  ["04", "Probar", "Reviso errores, comportamiento responsive, formularios y casos reales de uso."],
  ["05", "Publicar", "Preparo repositorio, despliegue y una base clara para seguir iterando."],
];

const capabilities = [
  ["Frontend", "Next.js · React · TypeScript", "Interfaces responsive, navegación, formularios y experiencias pensadas para conversión."],
  ["Datos", "PostgreSQL · Neon · Supabase", "Persistencia, consultas, estados, paneles privados y flujos de información."],
  ["Automatización", "APIs · Webhooks · n8n · IA", "Conexión de herramientas y reducción de tareas manuales mediante flujos digitales."],
  ["Entrega", "GitHub · Vercel · Netlify", "Versionado, publicación y mantenimiento de proyectos listos para compartir."],
];

export const dynamic = "force-dynamic";

const tech = ["Next.js", "React", "TypeScript", "Tailwind", "PostgreSQL", "Neon", "Vercel", "Supabase", "GitHub", "APIs", "n8n", "IA"];
export default async function Home() {
  const projects = await loadProjects();
  const featuredProjects = projects.filter((project) => project.featured);
  return (
    <main>
      <div className="page-glow" />
      <SiteHeader />

      <section className="home-hero shell">
        <div className="hero-image"><img src="/projects/jorge-hero.png" alt="Jorge Luis Añanguren trabajando en tecnología" /><div /></div>
        <div className="home-hero-copy">
          <span className="availability"><i /> Disponible para proyectos y oportunidades remotas</span>
          <p className="eyebrow">IDEAS <b>›</b> CÓDIGO <b>›</b> IMPACTO</p>
          <h1>Construyo <em>experiencias digitales</em></h1>
          <h2>Desarrollo web · IA · Automatización · Sistemas digitales</h2>
          <p>Combino experiencia en tecnología con desarrollo web y automatización para convertir necesidades reales en productos claros, funcionales y listos para crecer.</p>
          <div className="hero-actions">
            <Link className="primary" href="/proyectos">Explorar proyectos →</Link>
            <a className="secondary" href="/CV_Jorge_Luis_Ananguren_Remoto_2026.pdf" target="_blank" rel="noreferrer">Descargar CV ↓</a>
          </div>
          <div className="hero-links">
            <a href="https://www.linkedin.com/in/jorgeluisananguren" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/jorluisproyect" target="_blank" rel="noreferrer">GitHub ↗</a>
            <Link href="/contacto">Contacto ↗</Link>
          </div>
          <div className="hero-stats"><div><strong>{projects.length}+</strong><span>Proyectos</span></div><div><strong>10+</strong><span>Años en IT</span></div><div><strong>Web + IA</strong><span>Enfoque actual</span></div><div><strong>Remoto</strong><span>Disponible</span></div></div>
        </div>
      </section>

      <div className="tech-marquee"><div>{[...tech, ...tech].map((item, i) => <span key={`${item}-${i}`}>{item}<b>✦</b></span>)}</div></div>

      <section className="section shell">
        <div className="section-heading"><div><span>PROYECTOS DESTACADOS</span><h2>Primero, el trabajo más fuerte.</h2></div><Link href="/proyectos">Ver portafolio completo →</Link></div>
        <div className="featured-grid">{featuredProjects.map((project) => <ProjectCard project={project} key={project.slug} />)}</div>
      </section>

      <section className="section shell">
        <div className="section-heading"><div><span>CÓMO TRABAJO</span><h2>De la necesidad a una solución publicada.</h2></div></div>
        <div className="process-grid">{process.map(([n, title, text]) => <article key={title}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="section shell">
        <div className="section-heading"><div><span>STACK APLICADO</span><h2>Herramientas con un propósito.</h2></div></div>
        <div className="capability-grid">{capabilities.map(([title, stack, text]) => <article key={title}><small>{title}</small><h3>{stack}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="section shell">
        <div className="section-heading"><div><span>SERVICIOS</span><h2>De una idea a algo que funciona.</h2></div><Link href="/servicios">Ver servicios →</Link></div>
        <div className="service-grid">{services.map(([n, title, text]) => <article key={title}><span>{n}</span><h3>{title}</h3><p>{text}</p><Link href={title.includes("LLC") ? "/servicios/llc-usa" : "/servicios"}>Conocer más →</Link></article>)}</div>
      </section>

      <section className="llc-home shell">
        <div className="llc-home-copy"><span>NEGOCIOS / USA</span><h2>También acompaño procesos de creación de LLC.</h2><p>Además de desarrollo e IA, ofrezco orientación práctica para quienes quieren iniciar una LLC en Estados Unidos. Mi experiencia parte también de haber estructurado mi propia empresa.</p><div className="pill-row"><b>Orientación inicial</b><b>Registro</b><b>EIN</b><b>100% online</b></div><Link className="primary" href="/servicios/llc-usa">Ver servicio LLC →</Link></div>
        <div className="llc-home-image"><img src="/projects/llc.png" alt="Servicio de asistencia para registrar una LLC en Estados Unidos" /></div>
      </section>

      <section className="about-home shell">
        <div className="about-home-image"><img src="/projects/jorge-about.png" alt="Jorge Luis Añanguren" /></div>
        <div className="about-home-copy"><span>SOBRE MÍ</span><h2>Experiencia IT + construcción de <em>productos digitales.</em></h2><p>Mi trayectoria incluye soporte, infraestructura y operaciones tecnológicas, y hoy la complemento con desarrollo web, IA, automatización, datos y e-commerce. Esa combinación me ayuda a entender tanto el problema técnico como la necesidad del negocio.</p><div className="pill-row"><b>Next.js</b><b>React</b><b>TypeScript</b><b>PostgreSQL</b><b>IA</b></div><div className="about-inline-actions"><Link href="/sobre-mi">Conocer mi perfil →</Link><a href="https://www.linkedin.com/in/jorgeluisananguren" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div>
      </section>

      <section className="cta shell"><span>¿TIENES UNA IDEA O UNA VACANTE?</span><h2>Hablemos de lo que necesitas construir.</h2><p>Disponible para proyectos freelance y oportunidades remotas en desarrollo web, no-code, automatización, IA aplicada y soporte tecnológico.</p><div><Link className="primary" href="/contacto">Contactarme →</Link><a className="secondary" href="/CV_Jorge_Luis_Ananguren_Remoto_2026.pdf" target="_blank" rel="noreferrer">Ver CV</a></div></section>
      <SiteFooter />
    </main>
  );
}
