import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = { title: "Servicios" };
const services = [
  { n: "01", title: "Desarrollo web", text: "Landing pages, sitios corporativos, portafolios, catálogos y aplicaciones web responsive.", items: ["Next.js / React", "Responsive", "Formularios", "Vercel", "Integraciones"] },
  { n: "02", title: "IA & automatización", text: "Procesos que conectan herramientas, reducen tareas repetitivas y organizan información.", items: ["n8n", "APIs", "Webhooks", "IA aplicada", "Flujos de negocio"] },
  { n: "03", title: "E-commerce & sistemas", text: "Tiendas, paneles administrativos, pedidos, bases de datos y herramientas internas.", items: ["Catálogo", "Carrito", "Admin", "PostgreSQL", "Autenticación"] },
  { n: "04", title: "LLC en Estados Unidos", text: "Acompañamiento práctico para organizar el proceso de creación de una LLC de forma online.", items: ["Orientación", "Registro", "EIN", "Proceso online", "Seguimiento"], llc: true },
];

export default function ServicesPage(){return <main><div className="page-glow"/><SiteHeader />
  <section className="page-hero shell"><span>SERVICIOS</span><h1>Soluciones digitales con enfoque en <em>resultado.</em></h1><p>No vendo una sola tecnología. Elijo una combinación de herramientas según el problema que necesitas resolver.</p></section>
  <section className="services-list shell">{services.map((s)=><article key={s.title}><div className="service-number">{s.n}</div><div><span>SERVICIO</span><h2>{s.title}</h2><p>{s.text}</p><div className="pill-row">{s.items.map(i=><b key={i}>{i}</b>)}</div>{s.llc ? <Link className="primary" href="/servicios/llc-usa">Ver servicio LLC →</Link> : <Link href="/contacto">Solicitar información →</Link>}</div></article>)}</section>
  <SiteFooter /></main>}
