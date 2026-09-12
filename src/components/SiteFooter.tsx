import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <div><b>JORGE LAB</b><span>Web · IA · Automatización · Productos digitales</span></div>
      <p>© 2026 Jorge Luis Añanguren</p>
      <div className="footer-links"><Link href="/proyectos">Proyectos</Link><a href="/CV_Jorge_Luis_Ananguren_Remoto_2026.pdf" target="_blank" rel="noreferrer">CV</a><a href="https://www.linkedin.com/in/jorgeluisananguren" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/jorluisproyect" target="_blank" rel="noreferrer">GitHub</a><Link href="/contacto">Contacto</Link></div>
    </footer>
  );
}
