import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { isAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const configured = Boolean(process.env.DATABASE_URL && process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && process.env.SESSION_SECRET);
  const loggedIn = configured && await isAdmin();
  return <main><div className="page-glow"/><SiteHeader/>{!configured ? <section className="page-hero shell"><span>CONFIGURACIÓN PENDIENTE</span><h1>Activa el panel <em>privado.</em></h1><p>Configura DATABASE_URL, ADMIN_USERNAME, ADMIN_PASSWORD y SESSION_SECRET en <code>.env.local</code> o en las variables de entorno de Vercel. El README incluye los pasos.</p></section> : loggedIn ? <AdminDashboard/> : <AdminLogin/>}<SiteFooter/></main>;
}
