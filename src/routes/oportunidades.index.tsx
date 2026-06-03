import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, TrendingUp, TrendingDown, Minus, BarChart3, Target, Compass, Search, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { opportunities } from "@/data/opportunities";
import { cities } from "@/data/cities";
import { sectors } from "@/data/sectors";
import { useMemo, useState } from "react";
import cityMadrid from "@/assets/city-madrid.jpg";
import cityBarcelona from "@/assets/city-barcelona.jpg";
import cityValencia from "@/assets/city-valencia.jpg";
import citySevilla from "@/assets/city-sevilla.jpg";
import cityBilbao from "@/assets/city-bilbao.jpg";
import cityMalaga from "@/assets/city-malaga.jpg";

export const Route = createFileRoute("/oportunidades/")({
  head: () => ({
    meta: [
      { title: "Oportunidades de SEO local por sector y ciudad | Rankin" },
      { name: "description", content: "Descubre qué oportunidad de SEO local tiene tu sector en tu ciudad: búsquedas mensuales, competencia y score real. Selecciona sector y ciudad y obtén una estimación al instante." },
      { property: "og:title", content: "Oportunidades de SEO local" },
      { property: "og:description", content: "Selecciona sector + ciudad y descubre tu oportunidad SEO local con datos reales." },
      { property: "og:url", content: "/oportunidades" },
    ],
    links: [{ rel: "canonical", href: "/oportunidades" }],
  }),
  component: OportunidadesIndex,
});

const cityImageMap: Record<string, string> = {
  madrid: cityMadrid,
  barcelona: cityBarcelona,
  valencia: cityValencia,
  sevilla: citySevilla,
  bilbao: cityBilbao,
  malaga: cityMalaga,
};

function compBadge(c: "Baja" | "Media" | "Alta") {
  if (c === "Baja") return { cls: "bg-primary/10 text-primary", icon: <TrendingDown className="h-3 w-3" /> };
  if (c === "Alta") return { cls: "bg-destructive/15 text-destructive", icon: <TrendingUp className="h-3 w-3" /> };
  return { cls: "bg-accent/30 text-accent-foreground", icon: <Minus className="h-3 w-3" /> };
}

// Estima una oportunidad cuando no existe ese cruce concreto en el dataset
function estimateOpportunity(sectorSlug: string, citySlug: string) {
  const exact = opportunities.find((o) => o.sectorSlug === sectorSlug && o.citySlug === citySlug);
  if (exact) return { kind: "exact" as const, opp: exact };

  const sector = sectors.find((s) => s.slug === sectorSlug);
  const city = cities.find((c) => c.slug === citySlug);
  if (!sector || !city) return null;

  // Heurística sencilla a partir del volumen mensual del sector y del peso de la ciudad
  const cityWeight: Record<string, number> = { madrid: 1, barcelona: 0.85, valencia: 0.45, sevilla: 0.4, malaga: 0.35, bilbao: 0.3 };
  const w = cityWeight[citySlug] ?? 0.3;
  const searches = Math.round(sector.monthlySearches * w);
  const competition: "Baja" | "Media" | "Alta" = searches > 12000 ? "Alta" : searches > 5000 ? "Media" : "Baja";
  const score = Math.max(45, Math.min(92, Math.round(60 + (searches / 400) - (competition === "Alta" ? 12 : competition === "Media" ? 4 : -6))));
  return {
    kind: "estimate" as const,
    sectorName: sector.name,
    cityName: city.name,
    citySlug,
    searches,
    competition,
    score,
  };
}

function OportunidadesIndex() {
  const [sectorSlug, setSectorSlug] = useState<string>(sectors[0]?.slug ?? "");
  const [citySlug, setCitySlug] = useState<string>(cities[0]?.slug ?? "");
  const result = useMemo(() => estimateOpportunity(sectorSlug, citySlug), [sectorSlug, citySlug]);

  const [cityFilter, setCityFilter] = useState("Todas");
  const filteredOpps = opportunities.filter((o) => cityFilter === "Todas" || o.cityName === cityFilter);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero + buscador */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-1 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
            <Sparkles className="h-3 w-3" /> Oportunidades locales
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight max-w-3xl">
            ¿Qué oportunidad SEO tiene tu negocio en tu ciudad?
          </h1>
          <p className="mt-3 text-white/85 max-w-2xl">
            Elige tu sector y tu ciudad. Te mostramos cuánto se busca, qué competencia hay y un score de oportunidad real.
          </p>

          {/* Buscador */}
          <div className="mt-8 bg-card text-foreground rounded-lg shadow-[var(--shadow-card)] p-4 md:p-5">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 items-end">
              <label className="block">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Sector</span>
                <select
                  value={sectorSlug}
                  onChange={(e) => setSectorSlug(e.target.value)}
                  className="mt-1 w-full h-11 px-3 rounded-md border border-border bg-background text-sm font-medium"
                >
                  {sectors.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.name}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Ciudad</span>
                <select
                  value={citySlug}
                  onChange={(e) => setCitySlug(e.target.value)}
                  className="mt-1 w-full h-11 px-3 rounded-md border border-border bg-background text-sm font-medium"
                >
                  {cities.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </label>
              <Button className="h-11 bg-primary hover:bg-[var(--brand-deep)] font-semibold">
                <Search className="h-4 w-4 mr-1" /> Ver oportunidad
              </Button>
            </div>

            {/* Resultado en vivo */}
            {result && (
              <div className="mt-5 border-t border-border pt-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      {result.kind === "exact" ? "Informe disponible" : "Estimación preliminar"}
                    </p>
                    <p className="text-lg md:text-xl font-bold">
                      {result.kind === "exact" ? result.opp.sectorName : result.sectorName} en {result.kind === "exact" ? result.opp.cityName : result.cityName}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 md:gap-4">
                    <MiniStat label="Búsquedas/mes" value={(result.kind === "exact" ? result.opp.searches : result.searches).toLocaleString("es-ES")} />
                    <MiniStat
                      label="Competencia"
                      value={result.kind === "exact" ? result.opp.competition : result.competition}
                    />
                    <MiniStat label="Score" value={`${result.kind === "exact" ? result.opp.score : result.score}/100`} highlight />
                  </div>
                  {result.kind === "exact" ? (
                    <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shrink-0">
                      <Link to="/oportunidades/$slug" params={{ slug: result.opp.slug }}>
                        Ver informe completo <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shrink-0">
                      <Link to="/como-funciona">Pedir informe a medida</Link>
                    </Button>
                  )}
                </div>
                {result.kind === "estimate" && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    No tenemos aún un informe publicado para este cruce concreto. Te lo preparamos a medida en 48h con datos reales.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 mt-14 mb-16 space-y-14">
        {/* Qué medimos */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-1">Qué medimos en cada oportunidad</h2>
          <p className="text-sm text-muted-foreground mb-5 max-w-2xl">Tres señales sencillas para saber si vale la pena invertir en SEO local en tu sector y ciudad.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard icon={<BarChart3 className="h-5 w-5" />} title="Demanda real" text="Cuánta gente busca tu servicio cada mes en tu ciudad. Sin demanda no hay SEO que valga." />
            <MetricCard icon={<Target className="h-5 w-5" />} title="Competencia" text="Cómo de difícil es entrar en el top 3 de Google: webs fuertes, fichas optimizadas, anuncios." />
            <MetricCard icon={<Compass className="h-5 w-5" />} title="Score de oportunidad" text="Una nota 0-100 que combina demanda, competencia y rentabilidad por clic en tu zona." />
          </div>
        </section>

        {/* Cards de oportunidades */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Oportunidades destacadas</h2>
              <p className="text-sm text-muted-foreground">Cruces sector × ciudad que ya hemos analizado con datos reales.</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {["Todas", ...cities.map((c) => c.name)].map((c) => (
                <button
                  key={c}
                  onClick={() => setCityFilter(c)}
                  className={`px-3 py-1 text-xs rounded-full border transition ${cityFilter === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {filteredOpps.length === 0 ? (
            <div className="border border-border rounded-lg bg-card px-5 py-10 text-center text-muted-foreground">
              No hay oportunidades publicadas para esa ciudad todavía.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOpps.map((o) => {
                const badge = compBadge(o.competition);
                return (
                  <Link
                    key={o.slug}
                    to="/oportunidades/$slug"
                    params={{ slug: o.slug }}
                    className="group block border border-border rounded-lg overflow-hidden bg-card shadow-[var(--shadow-card)] hover:border-primary transition"
                  >
                    <div className="relative h-24 overflow-hidden">
                      <img
                        src={cityImageMap[o.citySlug]}
                        alt={o.cityName}
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground bg-card/90 backdrop-blur px-2 py-0.5 rounded">
                          <MapPin className="h-3 w-3 text-primary" /> {o.cityName}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${badge.cls}`}>
                          {badge.icon} {o.competition}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-base leading-snug group-hover:text-primary transition">
                        {o.sectorName} en {o.cityName}
                      </h3>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-secondary rounded p-2">
                          <p className="text-muted-foreground">Búsquedas/mes</p>
                          <p className="font-bold text-foreground">{o.searches.toLocaleString("es-ES")}</p>
                        </div>
                        <div className="bg-secondary rounded p-2">
                          <p className="text-muted-foreground">CPC medio</p>
                          <p className="font-bold text-foreground">{o.cpc.toFixed(2)} €</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Oportunidad</span>
                          <span className="font-bold text-primary">{o.score}/100</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${o.score}%` }} />
                        </div>
                      </div>
                      <div className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                        Ver informe completo <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">¿No ves tu sector o tu ciudad?</h2>
          <p className="text-white/85 mb-5 max-w-2xl mx-auto">Hacemos informes a medida en 48h. Te decimos cuántas búsquedas tiene tu servicio en tu zona y cómo de difícil sería posicionarlo.</p>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">Pedir informe a medida</Button>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function MiniStat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-md px-3 py-2 text-center ${highlight ? "bg-primary/10" : "bg-secondary"}`}>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className={`text-sm font-extrabold ${highlight ? "text-primary" : "text-foreground"}`}>{value}</p>
    </div>
  );
}

function MetricCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="border border-border rounded-lg p-5 bg-card shadow-[var(--shadow-card)]">
      <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-3">{icon}</div>
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
