import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, MapPin, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { getOpportunity, type Opportunity } from "@/data/opportunities";
import { cases } from "@/data/cases";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/oportunidades/$slug")({
  loader: ({ params }) => {
    const opp = getOpportunity(params.slug);
    if (!opp) throw notFound();
    return { opp: opp! };
  },
  head: ({ loaderData }) => {
    const o = loaderData?.opp;
    const title = o ? `${o.sectorName} en ${o.cityName}: informe de oportunidad SEO | Rankin` : "Informe | Rankin";
    const desc = o ? `Análisis de mercado para ${o.sectorName.toLowerCase()} en ${o.cityName}: ${o.searches.toLocaleString("es-ES")} búsquedas al mes, competencia ${o.competition.toLowerCase()}, distritos con potencial y keywords top.` : "";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:url", content: o ? `/oportunidades/${o.slug}` : "/oportunidades" },
      ],
      links: o ? [{ rel: "canonical", href: `/oportunidades/${o.slug}` }] : [],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Informe no encontrado</h1>
        <Button asChild className="mt-4"><Link to="/oportunidades">Ver oportunidades</Link></Button>
      </div>
    </div>
  ),
  errorComponent: () => <div className="p-10 text-center">Error cargando el informe.</div>,
  component: OpportunityDetail,
});

function compIcon(c: "Baja" | "Media" | "Alta") {
  if (c === "Baja") return <TrendingDown className="h-4 w-4" />;
  if (c === "Alta") return <TrendingUp className="h-4 w-4" />;
  return <Minus className="h-4 w-4" />;
}

function OpportunityDetail() {
  const { opp } = Route.useLoaderData() as { opp: Opportunity };
  const related = cases.filter((c) => c.sectorSlug === opp.sectorSlug);
  const maxKw = Math.max(...opp.topKeywords.map((k) => k.volume));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <Link to="/oportunidades" className="text-sm text-white/70 hover:text-white inline-flex items-center gap-1 mb-3">
            <ChevronRight className="h-3 w-3 rotate-180" /> Volver a oportunidades
          </Link>
          <p className="text-sm text-white/70 mb-1">Informe de oportunidad</p>
          <h1 className="text-3xl md:text-4xl font-extrabold">{opp.sectorName} en {opp.cityName}</h1>
          <p className="mt-2 text-white/85 max-w-3xl">Análisis del mercado local: cuánto se busca, dónde están las oportunidades y qué tendrías que posicionar.</p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 mt-10 space-y-12 mb-16">
        {/* KPIs */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Kpi label="Búsquedas/mes" value={opp.searches.toLocaleString("es-ES")} />
          <Kpi label="CPC medio" value={`${opp.cpc.toFixed(2)} €`} />
          <Kpi label="Competencia" value={opp.competition} icon={compIcon(opp.competition)} />
          <Kpi label="Score oportunidad" value={`${opp.score}/100`} />
        </section>

        {/* Tendencia */}
        <section className="border border-border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-bold mb-1">Evolución de búsquedas (últimos 12 meses)</h2>
          <p className="text-sm text-muted-foreground mb-4">Volumen mensual de búsquedas relacionadas con {opp.sectorName.toLowerCase()} en {opp.cityName}.</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={opp.trend} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Distritos */}
        <section>
          <h2 className="text-xl font-bold mb-1">Distritos con más potencial en {opp.cityName}</h2>
          <p className="text-sm text-muted-foreground mb-5">Zonas donde el ratio búsquedas/competencia es más favorable.</p>
          <div className="space-y-2">
            {opp.districts.map((d) => (
              <div key={d.name} className="flex items-center gap-4 border border-border rounded-md p-3 bg-card">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span className="w-40 font-semibold">{d.name}</span>
                <div className="flex-1 h-2 bg-secondary rounded overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${d.potential}%` }} />
                </div>
                <span className="w-10 text-right text-sm font-bold text-primary">{d.potential}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Top keywords + servicios */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-bold mb-4">Top keywords</h2>
            <div className="space-y-3">
              {opp.topKeywords.map((k) => (
                <div key={k.kw}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{k.kw}</span>
                    <span className="text-muted-foreground">{k.volume.toLocaleString("es-ES")}/mes</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${(k.volume / maxKw) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-bold mb-4">Servicios más buscados</h2>
            <ul className="space-y-2">
              {opp.topServices.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-accent" /> {s}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6 bg-primary hover:bg-[var(--brand-deep)]">
              <Link to="/como-funciona">Cómo trabajaríamos contigo</Link>
            </Button>
          </div>
        </section>

        {/* Casos */}
        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-1">Casos relacionados</h2>
            <p className="text-sm text-muted-foreground mb-5">Negocios del mismo sector que ya hemos posicionado.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((c) => (
                <article key={c.slug} className="border border-border rounded-lg overflow-hidden bg-card">
                  <img src={c.img} alt={c.name} className="w-full h-32 object-cover" loading="lazy" />
                  <div className="p-4">
                    <h3 className="font-bold">{c.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{c.city}</p>
                    <p className="text-sm text-primary font-semibold">{c.growth}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Quiero este informe para mi negocio</h2>
          <p className="text-white/85 mb-5 max-w-2xl mx-auto">Adaptamos este análisis a tu negocio concreto: tus servicios, tu zona y tus competidores reales. Gratis en 48h.</p>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">Pedir mi informe personalizado</Button>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function Kpi({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{label}</p>
      <p className="text-2xl font-extrabold text-primary flex items-center gap-2">{icon}{value}</p>
    </div>
  );
}
