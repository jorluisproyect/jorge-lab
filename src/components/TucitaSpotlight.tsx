import Link from "next/link";
import Image from "next/image";

export default function TucitaSpotlight() {
  return <section className="tucita-compact shell" aria-label="TUCITA">
    <div className="tucita-compact-copy"><div className="tucita-brand"><Image unoptimized src="/projects/logos/tucita.png" width={48} height={48} alt="Logo de TUCITA" /><h2>TUCITA</h2></div>
      <p>Agenda y reservas para profesionales y negocios.</p><small>Next.js · TypeScript · PostgreSQL</small>
      <div className="tucita-compact-actions"><a className="primary" href="https://tucita.com.ve" target="_blank" rel="noreferrer">Visitar TUCITA ↗</a><Link href="/proyectos/tucita">Ver detalles →</Link></div>
    </div><Link className="tucita-real-preview" href="/proyectos/tucita"><Image unoptimized width={1265} height={712} src="/projects/tucita-publica.jpg" alt="Captura real de la página pública de tucita.com.ve" /><span>tucita.com.ve · Página pública</span></Link>
  </section>;
}
