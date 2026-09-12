import Link from "next/link";

export default function MobileDock() {
  return (
    <nav className="mobile-dock" aria-label="Navegación móvil">
      <Link href="/"><b>⌂</b><span>Inicio</span></Link>
      <Link href="/proyectos"><b>▦</b><span>Proyectos</span></Link>
      <Link href="/servicios"><b>✦</b><span>Servicios</span></Link>
      <Link href="/contacto"><b>✉</b><span>Contacto</span></Link>
    </nav>
  );
}
