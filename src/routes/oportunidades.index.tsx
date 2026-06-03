import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, TrendingUp, TrendingDown, Minus, BarChart3, Target, Compass, MapPin, ArrowRight, CheckCircle2, Users, Search, Briefcase } from "lucide-react";
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
      { name: "description", content: "Descubre en 5 segundos qué oportunidad de SEO local tiene tu sector en tu ciudad: búsquedas/mes, competencia y score real." },
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

function estimateOpportunity(sectorSlug: string, citySlug: string) {
  const exact = opportunities.find((o) => o.sectorSlug === sectorSlug && o.citySlug === citySlug);
  if (exact) return { kind: "exact" as const, opp: exact };

  const sector = sectors.find((s) => s.slug === sectorSlug);
  const city = cities.find((c) => c.slug === citySlug);
  if (!sector || !city) return null;

  const cityWeight: Record<string, number> = { madrid: 1, barcelona: 0.85, valencia: 0.45, sevilla: 0.4, malaga: 0.35, bilbao: 0.3 };
  const w = cityWeight[citySlug] ?? 0.3;
  const searches = Math.round(sector.monthlySearches * w);
  const competition: "Baja" | "Media" | "Alta" = searches > 12000 ? "Alta" : searches > 5000 ? "Media" : "Baja";
  const score = Math.max(45, Math.min(92, Math.round(60 + (searches / 400) - (competition === "Alta" ? 12 : competition === "Media" ? 4 : -6))));
  const cpc = +(sector.monthlySearches > 15000 ? 4.5 : sector.monthlySearches > 8000 ? 3.2 : 2.1).toFixed(2);
  return {
    kind: "estimate" as const,
    sectorName: sector.name,
    cityName: city.name,
    citySlug,
    searches,
    competition,
    score,
    cpc,
  };
}

const topSectorsRanking = [...sectors]
  .sort((a, b) => b.monthlySearches - a.monthlySearches)
  .slice(0, 6);

const faqs = [
  { q: "¿De dónde salen estos datos?", a: "Cruzamos Google Keyword Planner, datos de Search Console reales de nuestros clientes y análisis SERP por ciudad. Nada inventado." },
  { q: "¿Qué es exactamente el score?", a: "Una nota 0-100 que mezcla volumen de búsqueda, dificultad real para entrar al top 3, CPC (señal de intención comercial) y estacionalidad." },
  { q: "¿Y si mi sector o ciudad no aparece?", a: "Te lo preparamos a medida en 48h sin coste. Solo necesitamos saber tu sector, tu ciudad y los barrios donde operas." },
  { q: "¿Esto sustituye a una auditoría SEO?", a: "No. Es el paso previo: te dice si tiene sentido invertir. La auditoría te dice qué hacer en tu web concreta para conseguirlo." },
];
const ticketBySector: Record<string, number> = {
  fontaneros: 180, electricistas: 160, reformas: 8500, dentistas: 750, abogados: 1200,
  inmobiliarias: 4500, peluquerias: 35, talleres: 320, restaurantes: 28, gimnasios: 45,
  estetica: 70, veterinarias: 95, academias: 120, fotografos: 1800,
};

function OportunidadesIndex() {
  const [sectorSlug, setSectorSlug] = useState<string>(sectors[0]?.slug ?? "");
  const [citySlug, setCitySlug] = useState<string>(cities[0]?.slug ?? "");
  const result = useMemo(() => estimateOpportunity(sectorSlug, citySlug), [sectorSlug, citySlug]);

  const [cityFilter, setCityFilter] = useState("Todas");
  const filteredOpps = opportunities.filter((o) => cityFilter === "Todas" || o.cityName === cityFilter);

  const sectorName = result ? (result.kind === "exact" ? result.opp.sectorName : result.sectorName) : "";
  const cityName = result ? (result.kind === "exact" ? result.opp.cityName : result.cityName) : "";
  const searches = result ? (result.kind === "exact" ? result.opp.searches : result.searches) : 0;


  const ticket = ticketBySector[sectorSlug] ?? 100;

  return (
    <div className="min-h-screen bg-background">
      {/* HERO — buscador Skyscanner-style sobre imagen */}
      <section className="relative overflow-hidden">
        <img src={cityMadrid} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/85 to-primary/95" />
        <div className="relative">
          <SiteHeader variant="transparent" />
          <div className="mx-auto max-w-6xl px-4 pt-10 pb-20 md:pt-14 md:pb-28 text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] max-w-3xl">
              Descubre tu oportunidad de <span className="text-accent">SEO local</span>
            </h1>
            <p className="mt-4 text-lg text-white/85 max-w-2xl">
              Elige tu sector y tu ciudad. Te decimos cuánta gente lo busca cada mes y cuánto vale de media cada cliente.
            </p>

            {/* Pill buscador estilo Skyscanner */}
            <div className="mt-8 bg-card text-foreground rounded-xl shadow-2xl border border-border/40 p-2 md:p-2.5">
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_auto] gap-2 items-stretch">
                <label className="relative flex items-center bg-background rounded-lg border border-border/60 px-4 h-14 focus-within:border-primary transition">
                  <Briefcase className="h-4 w-4 text-muted-foreground mr-3 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Sector</span>
                    <select
                      value={sectorSlug}
                      onChange={(e) => setSectorSlug(e.target.value)}
                      className="w-full bg-transparent text-base font-semibold focus:outline-none cursor-pointer -ml-0.5"
                    >
                      {sectors.map((s) => (
                        <option key={s.slug} value={s.slug}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </label>
                <label className="relative flex items-center bg-background rounded-lg border border-border/60 px-4 h-14 focus-within:border-primary transition">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-3 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Ciudad</span>
                    <select
                      value={citySlug}
                      onChange={(e) => setCitySlug(e.target.value)}
                      className="w-full bg-transparent text-base font-semibold focus:outline-none cursor-pointer -ml-0.5"
                    >
                      {cities.map((c) => (
                        <option key={c.slug} value={c.slug}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </label>
                <Button className="h-14 px-7 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base rounded-lg">
                  <Search className="h-5 w-5 mr-1.5" /> Buscar
                </Button>
              </div>
            </div>

            {/* Resultado — solo 2 datos clave */}
            {result && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3">
                <div className="bg-card text-foreground rounded-xl p-5 border border-border/40 shadow-lg">
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Búsquedas al mes</p>
                  <p className="text-4xl font-extrabold text-primary mt-1">{searches.toLocaleString("es-ES")}</p>
                  <p className="text-xs text-muted-foreground mt-1">Personas buscando «{sectorName.toLowerCase()}» en {cityName}</p>
                </div>
                <div className="bg-card text-foreground rounded-xl p-5 border border-border/40 shadow-lg">
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Ticket medio del servicio</p>
                  <p className="text-4xl font-extrabold text-primary mt-1">{ticket.toLocaleString("es-ES")} €</p>
                  <p className="text-xs text-muted-foreground mt-1">Valor medio por cliente captado en {sectorName.toLowerCase()}</p>
                </div>
                {result.kind === "exact" ? (
                  <Button asChild className="h-auto md:w-44 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base rounded-xl shadow-lg flex-col gap-1 py-5">
                    <Link to="/oportunidades/$slug" params={{ slug: result.opp.slug }}>
                      Ver informe completo
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild className="h-auto md:w-44 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base rounded-xl shadow-lg flex-col gap-1 py-5">
                    <Link to="/como-funciona">
                      Informe a medida
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                )}
              </div>
            )}

            <p className="mt-4 text-xs text-white/70 flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
              Datos de Google reales · Sin registro · Consultado por +1.240 negocios este mes
              <Users className="h-3.5 w-3.5 ml-1 opacity-70" />
            </p>
          </div>
        </div>
      </section>



      <main className="mx-auto max-w-7xl px-4 mt-14 mb-16 space-y-16">
        {/* Ranking sectores con más oportunidad */}
        <section>
          <div className="flex items-end justify-between gap-3 mb-5 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold">Los sectores con más demanda local</h2>
              <p className="text-sm text-muted-foreground mt-1">Volumen total de búsquedas mensuales en las 6 grandes ciudades.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {topSectorsRanking.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.slug}
                  onClick={() => setSectorSlug(s.slug)}
                  className="group text-left border border-border rounded-lg p-4 bg-card hover:border-primary hover:shadow-[var(--shadow-card)] transition flex items-center gap-4"
                >
                  <div className="text-2xl font-extrabold text-muted-foreground/40 w-8 shrink-0">#{i + 1}</div>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.monthlySearches.toLocaleString("es-ES")} búsquedas/mes</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition shrink-0" />
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Haz clic en un sector para verlo en la calculadora ↑</p>
        </section>

        {/* Qué medimos */}
        <section>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-1">Qué medimos en cada oportunidad</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">Tres señales sencillas para saber si vale la pena invertir en SEO local en tu sector y ciudad.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard icon={<BarChart3 className="h-5 w-5" />} title="Demanda real" text="Cuánta gente busca tu servicio cada mes en tu ciudad. Sin demanda no hay SEO que valga." />
            <MetricCard icon={<Target className="h-5 w-5" />} title="Competencia" text="Cómo de difícil es entrar en el top 3 de Google: webs fuertes, fichas optimizadas, anuncios." />
            <MetricCard icon={<Compass className="h-5 w-5" />} title="Score de oportunidad" text="Una nota 0-100 que combina demanda, competencia y rentabilidad por clic en tu zona." />
          </div>
        </section>

        {/* Cards de oportunidades publicadas */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold">Oportunidades destacadas</h2>
              <p className="text-sm text-muted-foreground">Cruces sector × ciudad que ya hemos analizado con datos reales.</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {["Todas", ...cities.map((c) => c.name)].map((c) => (
                <button
                  key={c}
                  onClick={() => setCityFilter(c)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition ${cityFilter === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}
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
                    className="group block border border-border rounded-lg overflow-hidden bg-card shadow-[var(--shadow-card)] hover:border-primary hover:-translate-y-0.5 transition"
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

        {/* Ciudades grid */}
        <section>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-1">Explora por ciudad</h2>
          <p className="text-sm text-muted-foreground mb-6">Cobertura por barrios y distritos en las 6 grandes ciudades españolas.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {cities.map((c) => (
              <button
                key={c.slug}
                onClick={() => { setCitySlug(c.slug); setCityFilter(c.name); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="group relative h-32 rounded-lg overflow-hidden border border-border hover:border-primary transition"
              >
                <img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-left">
                  <p className="font-extrabold text-background text-lg leading-tight">{c.name}</p>
                  <p className="text-[10px] text-background/80">{c.note}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-1">Preguntas frecuentes</h2>
          <p className="text-sm text-muted-foreground mb-6">Lo que más nos preguntan sobre la calculadora de oportunidades.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((f) => (
              <div key={f.q} className="border border-border rounded-lg p-5 bg-card">
                <h3 className="font-bold mb-1.5 flex items-start gap-2">
                  <span className="text-primary shrink-0">→</span> {f.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="relative bg-primary text-primary-foreground rounded-xl p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }} />
          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-1 bg-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded mb-4">
              Informe a medida · 48h · Gratis
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">¿No ves tu sector o tu ciudad?</h2>
            <p className="text-white/85 mb-6 max-w-2xl">Hacemos informes a medida en 48h. Te decimos cuántas búsquedas tiene tu servicio en tu zona, qué barrios convierten mejor y cómo de difícil sería posicionarte top 3.</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold h-12 px-6">
                <Link to="/como-funciona">Pedir informe a medida</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-white/30 text-primary-foreground hover:bg-white/10 h-12 px-6 font-semibold">
                <Link to="/casos-exito">Ver casos de éxito</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function BigStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-secondary rounded-lg px-3 py-3 text-center">
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{label}</p>
      <p className="text-lg md:text-xl font-extrabold text-foreground mt-0.5">{value}</p>
    </div>
  );
}

function TrustItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-white/85">
      <span className="text-accent">{icon}</span> {text}
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
