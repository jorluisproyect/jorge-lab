import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = { title: "LLC en Estados Unidos" };
const whatsapp = "https://wa.me/584225400361?text=Hola%20Jorge,%20quiero%20información%20sobre%20el%20servicio%20de%20LLC%20en%20EE.%20UU.";

export default function LLCPage(){return <main><div className="page-glow"/><SiteHeader />
  <section className="llc-page-hero shell"><div className="llc-page-copy"><span>LLC / ESTADOS UNIDOS</span><h1>Te acompaño a organizar el proceso para crear tu <em>LLC.</em></h1><p>Orientación práctica para emprendedores que quieren estructurar una empresa en Estados Unidos y necesitan una ruta clara para comenzar.</p><div className="pill-row"><b>Orientación inicial</b><b>Registro</b><b>EIN</b><b>100% online</b></div><a className="primary" href={whatsapp} target="_blank" rel="noreferrer">Consultar por WhatsApp ↗</a><small>El servicio es de acompañamiento y orientación. No sustituye asesoría legal, fiscal o contable profesional cuando esta sea necesaria.</small></div><div className="llc-page-image"><img src="/projects/llc.png" alt="Asistencia para registrar una LLC en Estados Unidos" /></div></section>
  <section className="llc-steps shell"><article><b>01</b><h2>Orientación inicial</h2><p>Revisamos tu objetivo, tipo de actividad y la información básica que necesitarás.</p></article><article><b>02</b><h2>Registro</h2><p>Te acompaño paso a paso durante el proceso de creación y organización de la documentación.</p></article><article><b>03</b><h2>EIN</h2><p>Te explico el proceso relacionado con la solicitud del identificador fiscal federal.</p></article><article><b>04</b><h2>Siguiente etapa</h2><p>Te indico qué puntos conviene revisar después: banca, cumplimiento, operación y soporte profesional.</p></article></section>
  <section className="llc-proof shell"><div><span>EXPERIENCIA DIRECTA</span><h2>No es solo teoría.</h2><p>Cuento con mi propia LLC en Estados Unidos y he pasado personalmente por parte de este proceso. Esa experiencia me permite acompañarte con una visión práctica de los pasos, documentos y decisiones iniciales.</p></div><a className="primary" href={whatsapp} target="_blank" rel="noreferrer">Quiero información →</a></section>
  <SiteFooter /></main>}
