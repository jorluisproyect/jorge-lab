import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = { title: "Contacto" };
const whatsapp = "https://wa.me/584225400361?text=Hola%20Jorge,%20vi%20tu%20portafolio%20y%20quiero%20conversar%20sobre%20un%20proyecto.";

export default function ContactPage(){return <main><div className="page-glow"/><SiteHeader />
  <section className="contact-page shell"><span>CONTACTO</span><h1>¿Construimos algo <em>juntos?</em></h1><p>Cuéntame qué necesitas: una página web, automatización, tienda, sistema interno, mejora de un proyecto existente o acompañamiento para tu LLC.</p><div className="contact-options"><a href={whatsapp} target="_blank" rel="noreferrer"><small>WHATSAPP</small><strong>Escríbeme directamente</strong><span>Responder conversación ↗</span></a><a href="mailto:30jorluis06@gmail.com"><small>CORREO</small><strong>30jorluis06@gmail.com</strong><span>Enviar email ↗</span></a><a href="https://www.linkedin.com/in/jorgeluisananguren/" target="_blank" rel="noreferrer"><small>LINKEDIN</small><strong>Jorge Luis Añanguren</strong><span>Ver perfil ↗</span></a><a href="https://github.com/jorluisproyect" target="_blank" rel="noreferrer"><small>GITHUB</small><strong>@jorluisproyect</strong><span>Ver repositorios ↗</span></a></div></section>
  <SiteFooter /></main>}
