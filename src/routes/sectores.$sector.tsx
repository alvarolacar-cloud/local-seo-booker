import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, MapPin, Phone, Star, TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { getSector } from "@/data/sectors";
import { cases } from "@/data/cases";
import { opportunities } from "@/data/opportunities";

export const Route = createFileRoute("/sectores/$sector")({
  loader: ({ params }) => {
    const sector = getSector(params.sector);
    if (!sector) throw notFound();
    return { sector: sector! };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.sector;
    const title = s ? `SEO local para ${s.name} | Rankin` : "Sector | Rankin";
    const desc = s ? `Posicionamos ${s.name.toLowerCase()} en Google y Google Maps. Más llamadas, más reseñas y más clientes locales sin permanencia.` : "";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:url", content: s ? `/sectores/${s.slug}` : "/sectores" },
      ],
      links: s ? [{ rel: "canonical", href: `/sectores/${s.slug}` }] : [],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Sector no encontrado</h1>
        <Button asChild className="mt-4"><Link to="/sectores">Ver todos los sectores</Link></Button>
      </div>
    </div>
  ),
  errorComponent: () => <div className="p-10 text-center">Error cargando el sector.</div>,
  component: SectorDetail,
});

function SectorDetail() {
  const { sector } = Route.useLoaderData();
  const Icon = sector.icon;
  const relatedCases = cases.filter((c) => c.sectorSlug === sector.slug);
  const relatedOpps = opportunities.filter((o) => o.sectorSlug === sector.slug);

  const benefits = [
    "Aparecer en el Map Pack (top 3 de Google Maps) en tu ciudad",
    `Captar búsquedas como "${sector.keyword}" sin pagar por clic`,
    "Más reseñas reales de clientes locales",
    "Una ficha de Google optimizada que convierte",
    "Contenido geolocalizado por barrio o distrito",
  ];

  const faqs = [
    { q: `¿Cuánto tarda el SEO local para ${sector.short.toLowerCase()}?`, a: "Los primeros movimientos se ven en 30-60 días en Google Maps. Las posiciones orgánicas estables, entre 3 y 6 meses." },
    { q: "¿Tengo que firmar permanencia?", a: "No. Si en 90 días no ves resultados, te vas sin penalización." },
    { q: "¿Trabajáis con mi competencia en la misma ciudad?", a: "No. Exclusividad por sector y ciudad. Si trabajamos contigo, no trabajamos con tu competencia directa." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <Link to="/sectores" className="text-sm text-white/70 hover:text-white inline-flex items-center gap-1 mb-3">
            <ChevronRight className="h-3 w-3 rotate-180" /> Volver a sectores
          </Link>
          <div className="flex items-start gap-4">
            <span className="bg-accent text-accent-foreground rounded-full h-14 w-14 flex items-center justify-center shrink-0">
              <Icon className="h-7 w-7" />
            </span>
            <div>
              <p className="text-sm text-white/70 mb-1">Plan SEO local</p>
              <h1 className="text-3xl md:text-4xl font-extrabold">SEO local para {sector.name.toLowerCase()}</h1>
              <p className="mt-2 text-white/85 max-w-3xl">{sector.desc}</p>
              <div className="mt-4 flex items-center gap-3 flex-wrap text-sm">
                <span className="bg-white/10 px-3 py-1 rounded-full">"{sector.keyword}" · {sector.monthlySearches.toLocaleString("es-ES")} búsquedas/mes</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">{sector.clients} ya posicionados</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 mt-10 space-y-12 mb-16">
        {/* Oportunidad */}
        <section className="border border-border rounded-lg p-6 bg-card">
          <div className="flex items-start gap-3 mb-4">
            <TrendingUp className="h-6 w-6 text-primary shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold">La oportunidad local para {sector.short.toLowerCase()}</h2>
              <p className="text-sm text-muted-foreground">Datos reales que usamos al diseñar tu plan.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Metric label="Búsquedas/mes en España" value={sector.monthlySearches.toLocaleString("es-ES")} />
            <Metric label="Ciudades disponibles" value={String(sector.cities.length)} />
            <Metric label="Clientes en este sector" value={sector.clients.replace("+", "+")} />
            <Metric label="Plazo a resultados" value="60-90 días" />
          </div>
          {sector.cities.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-semibold mb-2">Disponible en:</p>
              <div className="flex gap-2 flex-wrap">
                {sector.cities.map((c) => (
                  <span key={c} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Servicios */}
        <section>
          <h2 className="text-xl font-bold mb-1">Qué incluye tu plan</h2>
          <p className="text-sm text-muted-foreground mb-5">Todo lo que hacemos por ti cada mes.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 border border-border rounded-lg p-4 bg-card">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Casos */}
        {relatedCases.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-1">Casos reales de {sector.short.toLowerCase()}</h2>
            <p className="text-sm text-muted-foreground mb-5">Negocios del mismo sector que ya posicionamos.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {relatedCases.map((c) => (
                <article key={c.slug} className="border border-border rounded-lg overflow-hidden bg-card flex">
                  <img src={c.img} alt={c.name} className="w-32 h-auto object-cover" loading="lazy" />
                  <div className="p-4 flex-1">
                    <h3 className="font-bold">{c.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{c.city}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                      <span className="text-sm font-semibold">{c.rating} · {c.reviews} reseñas</span>
                    </div>
                    <p className="text-sm text-primary font-semibold">{c.growth}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Oportunidades enlazadas */}
        {relatedOpps.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-1">Informes de oportunidad relacionados</h2>
            <p className="text-sm text-muted-foreground mb-4">Análisis de mercado para tu sector en cada ciudad.</p>
            <div className="flex gap-2 flex-wrap">
              {relatedOpps.map((o) => (
                <Link key={o.slug} to="/oportunidades/$slug" params={{ slug: o.slug }} className="px-4 py-2 text-sm border border-border rounded-full hover:border-primary hover:text-primary">
                  {o.sectorName} en {o.cityName} →
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold mb-4">Preguntas frecuentes</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="border border-border rounded-lg p-4 bg-card">
                <summary className="font-semibold cursor-pointer">{f.q}</summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Solicita tu valoración gratis</h2>
          <p className="text-white/85 mb-5 max-w-2xl mx-auto">En 48h te enviamos tu posición actual, tus competidores en Google Maps y un plan de 5 acciones para tu negocio de {sector.short.toLowerCase()}.</p>
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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center md:text-left">
      <p className="text-2xl font-extrabold text-primary">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
