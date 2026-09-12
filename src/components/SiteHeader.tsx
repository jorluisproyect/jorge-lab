"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav shell">
      <Link className="brand" href="/" onClick={() => setOpen(false)}>
        <span className="brand-mark">J</span>
        <span><b>JORGE</b> <i>LAB</i><small>Jorge Luis Añanguren</small></span>
      </Link>
      <nav className={open ? "open" : ""}>
        <Link href="/" onClick={() => setOpen(false)}>Inicio</Link>
        <Link href="/proyectos" onClick={() => setOpen(false)}>Proyectos</Link>
        <Link href="/servicios" onClick={() => setOpen(false)}>Servicios</Link>
        <Link href="/sobre-mi" onClick={() => setOpen(false)}>Sobre mí</Link>
        <a href="https://www.linkedin.com/in/jorgeluisananguren" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>LinkedIn ↗</a>
        <Link href="/contacto" onClick={() => setOpen(false)}>Contacto</Link>
      </nav>
      <div className="nav-actions">
        <a className="cv-mini" href="/CV_Jorge_Luis_Ananguren_Remoto_2026.pdf" target="_blank" rel="noreferrer">CV ↓</a>
        <Link className="talk" href="/contacto"><span className="status-dot" /> Hablemos <b>↗</b></Link>
        <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label="Abrir menú">☰</button>
      </div>
    </header>
  );
}
