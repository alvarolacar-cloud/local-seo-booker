import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, MapPin, Star, ShieldCheck, MessageSquare, ChevronRight, Phone, Wrench, Award, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { opportunities } from "@/data/opportunities";
import { cities } from "@/data/cities";
import { cases } from "@/data/cases";
import localBusiness from "@/assets/local-business.jpg";
import serviceGmb from "@/assets/service-gmb.jpg";
import serviceReviews from "@/assets/service-reviews.jpg";
import serviceAudit from "@/assets/service-audit.jpg";
import serviceContent from "@/assets/service-content.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rankin — Agencia de SEO local para negocios de barrio" },
      { name: "description", content: "Posicionamos fontaneros, clínicas dentales, peluquerías, talleres y otros negocios locales en Google y Google Maps. Más llamadas, más reseñas, más clientes de tu ciudad." },
      { property: "og:title", content: "Rankin — SEO local que llena tu agenda" },
      { property: "og:description", content: "Posicionamos tu negocio local en Google para que los clientes de tu zona te encuentren a ti, no a tu competencia." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const homeServices = [
  { title: "Google Business Profile", img: serviceGmb, desc: "Optimizamos tu ficha para que aparezcas en el Map Pack." },
  { title: "Gestión de reseñas", img: serviceReviews, desc: "Más estrellas reales, menos negativas que duelen." },
  { title: "Auditoría SEO local", img: serviceAudit, desc: "Informe completo de tu visibilidad en 72h." },
  { title: "Contenido geolocalizado", img: serviceContent, desc: "Landings por barrio, servicio y ciudad." },
];

function compBadge(c: "Baja" | "Media" | "Alta") {
  if (c === "Baja") return { cls: "bg-primary/10 text-primary", icon: <TrendingDown className="h-3 w-3" /> };
  if (c === "Alta") return { cls: "bg-destructive/15 text-destructive", icon: <TrendingUp className="h-3 w-3" /> };
  return { cls: "bg-accent/30 text-accent-foreground", icon: <Minus className="h-3 w-3" /> };
}

function Index() {
  const featuredOpps = opportunities.slice(0, 6);
  const featuredCases = cases.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 pt-8 pb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-4xl">
            Que te encuentren los clientes de tu ciudad, no los de Google a 600 km
          </h1>
          <p className="mt-3 text-lg text-white/85 max-w-3xl">
            Somos una agencia de SEO local. Posicionamos negocios de barrio —fontaneros, dentistas, peluquerías, talleres— en Google y Google Maps para que tu agenda se llene sola.
          </p>
        </div>
      </section>

      {/* Form */}
      <div className="mx-auto max-w-7xl px-4 -mt-8 relative z-10">
        <div className="bg-accent rounded-md p-1 shadow-[var(--shadow-card)]">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1.5fr_auto] gap-1">
            <div className="bg-background rounded-sm flex items-center gap-2 px-3 py-3">
              <MapPin className="h-5 w-5 text-primary" />
              <Input placeholder="¿Dónde está tu negocio?" className="border-0 shadow-none focus-visible:ring-0 px-0 text-base" defaultValue="Madrid, España" />
            </div>
            <div className="bg-background rounded-sm flex items-center gap-2 px-3 py-3">
              <Wrench className="h-5 w-5 text-primary" />
              <Input placeholder="¿A qué te dedicas?" className="border-0 shadow-none focus-visible:ring-0 px-0 text-base" />
            </div>
            <div className="bg-background rounded-sm flex items-center gap-2 px-3 py-3">
              <Phone className="h-5 w-5 text-primary" />
              <Input placeholder="Teléfono o email" className="border-0 shadow-none focus-visible:ring-0 px-0 text-base" />
            </div>
            <Button className="bg-primary hover:bg-[var(--brand-deep)] text-primary-foreground h-auto px-6 text-base font-semibold rounded-sm">
              <Search className="h-5 w-5 mr-1" /> Diagnóstico gratis
            </Button>
          </div>
        </div>
        <p className="mt-3 text-sm text-foreground">
          Te decimos en 48h qué posición ocupas hoy, quién te está adelantando y qué tendríamos que hacer. Sin compromiso.
        </p>
      </div>

      <main className="mx-auto max-w-7xl px-4 mt-12 space-y-14">
        {/* Promesa */}
        <section>
          <h2 className="text-xl font-bold mb-1">Sin permanencia, solo resultados</h2>
          <p className="text-sm text-muted-foreground mb-4">Trabajamos por objetivos medibles: llamadas, formularios y citas reales en tu agenda.</p>
          <div className="border border-border rounded-lg p-5 flex flex-col md:flex-row gap-5 items-center bg-card">
            <div className="flex-1">
              <h3 className="text-2xl font-bold">Si en 90 días no subes posiciones, no pagas el siguiente mes</h3>
              <p className="text-muted-foreground mt-1 mb-4">Te enseñamos cada mes el informe de Google Search Console y Google Business Profile. Lo que medimos, lo mejoramos.</p>
              <Button asChild className="bg-primary hover:bg-[var(--brand-deep)]">
                <Link to="/como-funciona">Cómo trabajamos contigo</Link>
              </Button>
            </div>
            <img src={localBusiness} alt="Negocio local posicionado en Google" width={280} height={180} className="rounded-md object-cover w-full md:w-72 h-44" loading="lazy" />
          </div>
        </section>

        {/* Sectores destacados */}
        <section>
          <div className="flex items-end justify-between mb-6 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-bold mb-1">¿A qué se dedica tu negocio?</h2>
              <p className="text-sm text-muted-foreground">Sectores donde mejor sabemos lo que funciona. Entra y mira cómo posicionamos a negocios como el tuyo.</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/sectores">Ver todos los sectores <ChevronRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredSectors.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.slug} to="/sectores/$sector" params={{ sector: s.slug }} className="group block border border-border rounded-lg overflow-hidden bg-card shadow-[var(--shadow-card)] hover:shadow-lg hover:border-primary transition">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={s.img} alt={`SEO local para ${s.name}`} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 flex items-center gap-2">
                      <span className="bg-background rounded-full h-9 w-9 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </span>
                      <span className="text-white font-bold text-lg drop-shadow">{s.name}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-foreground mb-3">{s.desc}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="bg-primary/10 text-primary font-semibold px-2 py-1 rounded">"{s.keyword}"</span>
                      <span className="text-muted-foreground">{s.clients}</span>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Ver plan SEO para {s.short.toLowerCase()} <ChevronRight className="h-4 w-4" />
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Servicios */}
        <section>
          <h2 className="text-xl font-bold mb-1">Lo que hacemos por tu negocio</h2>
          <p className="text-sm text-muted-foreground mb-4">Servicios pensados para negocios locales que dependen de clientes de su zona.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {homeServices.map((s) => (
              <div key={s.title} className="block">
                <div className="aspect-[4/3] overflow-hidden rounded-md mb-2 border border-border">
                  <img src={s.img} alt={s.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <p className="font-semibold">{s.title}</p>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Casos destacados */}
        <section>
          <div className="flex items-end justify-between mb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-xl font-bold mb-1">Negocios como el tuyo, posicionados por nosotros</h2>
              <p className="text-sm text-muted-foreground">Casos reales con números reales.</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/casos-exito">Ver todos los casos <ChevronRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCases.map((a) => (
              <article key={a.slug} className="border border-border rounded-lg overflow-hidden bg-card shadow-[var(--shadow-card)] hover:shadow-lg transition">
                <div className="relative aspect-[4/3]">
                  <img src={a.img} alt={a.name} className="h-full w-full object-cover" loading="lazy" />
                  <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded">{a.sector}</span>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-base leading-tight">{a.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{a.city}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-1.5 py-1 rounded">{a.rating}</span>
                    <span className="text-xs"><strong>Excelente</strong> · {a.reviews} reseñas</span>
                  </div>
                  <div className="text-xs space-y-1 border-t border-border pt-2">
                    <p><span className="text-muted-foreground">Antes:</span> {a.before}</p>
                    <p><span className="text-muted-foreground">Ahora:</span> <strong>{a.after}</strong></p>
                    <p className="text-primary font-semibold mt-1">{a.growth}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Oportunidades teaser */}
        <section className="border border-border rounded-lg p-6 bg-card flex flex-col md:flex-row items-center gap-6">
          <TrendingUp className="h-12 w-12 text-primary shrink-0" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">¿Cuánto se busca tu servicio en tu ciudad?</h2>
            <p className="text-muted-foreground mb-4">Mira nuestro listado de oportunidades por sector y ciudad: búsquedas mensuales, competencia y potencial real.</p>
            <Button asChild className="bg-primary hover:bg-[var(--brand-deep)]">
              <Link to="/oportunidades">Ver oportunidades destacadas</Link>
            </Button>
          </div>
        </section>

        {/* Ciudades */}
        <section>
          <h2 className="text-xl font-bold mb-1">Ciudades donde ya posicionamos negocios</h2>
          <p className="text-sm text-muted-foreground mb-4">Trabajamos en toda España, con foco en estas zonas.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities.map((c) => (
              <div key={c.slug} className="block">
                <div className="aspect-square overflow-hidden rounded-full mb-2">
                  <img src={c.img} alt={`SEO local en ${c.name}`} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <p className="font-semibold text-center">{c.name}</p>
                <p className="text-xs text-muted-foreground text-center">{c.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Auditoría */}
        <section className="border border-border rounded-lg p-6 bg-card flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">Auditoría SEO local gratis para tu negocio</h2>
            <p className="text-muted-foreground mb-4">En 48h te enviamos un informe con tu posición actual, tus competidores en Google Maps y 5 acciones concretas para mejorar. Sin compromiso, sin tarjeta.</p>
            <div className="flex gap-2 flex-wrap">
              <Button className="bg-primary hover:bg-[var(--brand-deep)]">Pedir auditoría gratis</Button>
              <Button asChild variant="outline"><Link to="/como-funciona">Cómo funciona</Link></Button>
            </div>
          </div>
          <div className="bg-accent text-accent-foreground rounded-md px-6 py-4 flex items-center gap-2">
            <Award className="h-8 w-8" />
            <span className="font-extrabold text-xl">Gratis</span>
          </div>
        </section>

        {/* Por qué Rankin */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-center">¿Por qué elegirnos para tu SEO local?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, t: "Solo SEO local", d: "No hacemos de todo. Vivimos del SEO de negocios de barrio desde hace años." },
              { icon: Star, t: "Sin permanencia", d: "Si no ves resultados en 90 días, te vas sin penalización." },
              { icon: MessageSquare, t: "Hablamos claro", d: "Nada de informes con humo. Cada mes ves posiciones, llamadas y reseñas." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="text-center">
                <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold mb-1">{t}</h3>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">¿Listo para que te encuentren en tu ciudad?</h2>
          <p className="text-white/85 mb-5 max-w-2xl mx-auto">Cuéntanos a qué te dedicas y dónde. En 48h te decimos qué posición ocupas y qué haríamos por ti.</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">Pedir auditoría gratis</Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <Phone className="h-4 w-4 mr-1" /> 911 23 45 67
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
