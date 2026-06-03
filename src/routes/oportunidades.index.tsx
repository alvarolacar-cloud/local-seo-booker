import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin, ArrowRight, Search, Briefcase, ChevronRight, Phone,
  BarChart3, Target, Rocket, FileSearch,
  TrendingUp, TrendingDown, Minus, ShieldCheck, DollarSign, ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { NavChips } from "@/components/site/NavChips";
import { SiteFooter } from "@/components/site/Footer";
import { opportunities } from "@/data/opportunities";
import { cities } from "@/data/cities";
import { sectors } from "@/data/sectors";
import { cases } from "@/data/cases";
import { useState } from "react";
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

function OportunidadesIndex() {
  const [sectorSlug, setSectorSlug] = useState<string>(sectors[0]?.slug ?? "");
  const [citySlug, setCitySlug] = useState<string>(cities[0]?.slug ?? "");

  const featuredOpps = opportunities.slice(0, 6);
  const featuredCases = cases.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <NavChips />

      {/* HERO con buscador (se mantiene) */}
      <section className="relative bg-primary">
        <div className="mx-auto max-w-7xl px-4 pt-6 pb-28 md:pt-10 md:pb-32 text-primary-foreground relative">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <p className="text-sm text-white/70 mb-2">Oportunidades locales</p>
              <h1 className="text-3xl md:text-4xl font-extrabold mt-2">Encuentra tu Sector + Ciudad</h1>
              <p className="mt-2 text-white/85 max-w-3xl">Huecos reales en Google Maps por sector y ciudad, con datos de búsqueda y competencia.</p>
            </div>
            <div className="text-right text-xs">
              <p className="opacity-70">Powered by</p>
              <p className="bg-accent text-accent-foreground inline-block px-2 py-1 rounded font-extrabold mt-1">rankin.es</p>
            </div>
          </div>
        </div>

        {/* Search bar superpuesta */}
        <div className="absolute left-0 right-0 -bottom-10 px-4">
          <div className="mx-auto max-w-7xl bg-card text-foreground rounded-md shadow-2xl p-2">
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.1fr_1fr_1fr_auto] gap-2">
              <FieldSelect label="Sector" icon={<Briefcase className="h-4 w-4" />} value={sectorSlug} onChange={setSectorSlug}
                options={sectors.map((s) => ({ value: s.slug, label: s.name }))} />
              <FieldSelect label="Ciudad" icon={<MapPin className="h-4 w-4" />} value={citySlug} onChange={setCitySlug}
                options={cities.map((c) => ({ value: c.slug, label: c.name }))} />
              <Field label="Zona / barrios" value="Todos los distritos" />
              <Field label="Volumen mínimo" value="500 búsq/mes · Cualquiera" />
              <Button asChild className="h-full md:w-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md">
                <Link to="/oportunidades/$slug" params={{ slug: opportunities[0].slug }}>
                  <Search className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <label className="flex items-center gap-2 text-xs text-foreground/70 px-3 pt-3 pb-1 cursor-pointer">
              <input type="checkbox" className="accent-primary" /> Mostrar solo sectores con baja competencia local
            </label>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 mt-20 mb-16 space-y-16">

        {/* Qué es una oportunidad */}
        <section>
          <h2 className="text-xl font-bold mb-1">Qué es una oportunidad de SEO local</h2>
          <p className="text-sm text-muted-foreground mb-4">El concepto sobre el que gira toda nuestra forma de trabajar.</p>
          <div className="border border-border rounded-lg p-5 md:p-6 flex flex-col md:flex-row gap-6 items-center bg-card shadow-[var(--shadow-card)]">
            <div className="flex-1">
              <h3 className="text-2xl font-bold">Un cruce entre tu sector y tu ciudad donde Google tiene hueco</h3>
              <p className="text-muted-foreground mt-2 mb-4">
                Lo medimos con tres variables: <strong>demanda real</strong> (cuánta gente busca tu servicio cada mes), <strong>competencia</strong> (cuántos negocios pelean por esas búsquedas) y un <strong>score de oportunidad</strong> de 0 a 100 que te dice si merece la pena entrar ahora.
              </p>
              <Button asChild className="bg-primary hover:bg-[var(--brand-deep)]">
                <Link to="/como-funciona">Cómo trabajamos</Link>
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3 w-full md:w-80 shrink-0">
              {[
                { icon: BarChart3, t: "Demanda", v: "Búsq./mes" },
                { icon: Target, t: "Competencia", v: "Baja-Alta" },
                { icon: Rocket, t: "Score", v: "0-100" },
              ].map(({ icon: Icon, t, v }) => (
                <div key={t} className="bg-secondary rounded-md p-3 text-center">
                  <Icon className="h-5 w-5 text-primary mx-auto mb-1" />
                  <p className="text-xs font-semibold">{t}</p>
                  <p className="text-[11px] text-muted-foreground">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Oportunidades destacadas */}
        <section>
          <div className="flex items-end justify-between mb-6 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-bold mb-1">Oportunidades abiertas ahora mismo</h2>
              <p className="text-sm text-muted-foreground">Sectores y ciudades con hueco real en Google. Entra al informe y mira los números por dentro.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredOpps.map((o) => {
              const c = compBadge(o.competition);
              const cityImg = cityImageMap[o.citySlug];
              return (
                <Link key={o.slug} to="/oportunidades/$slug" params={{ slug: o.slug }} className="group block border border-border rounded-lg overflow-hidden bg-card shadow-[var(--shadow-card)] hover:shadow-lg hover:border-primary transition">
                  {cityImg && (
                    <div className="relative h-14 overflow-hidden">
                      <img src={cityImg} alt={o.cityName} className="h-full w-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card" />
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{o.cityName}</p>
                    <h3 className="text-lg font-bold mt-1 mb-3">{o.sectorName} en {o.cityName}</h3>
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <span className="bg-primary/10 text-primary font-semibold text-xs px-2 py-1 rounded">{o.searches.toLocaleString("es-ES")} búsq./mes</span>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded ${c.cls}`}>
                        {c.icon} Competencia {o.competition.toLowerCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1 h-2 bg-secondary rounded overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${o.score}%` }} />
                      </div>
                      <span className="text-sm font-bold text-primary">{o.score}/100</span>
                    </div>
                    <p className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Ver informe completo <ChevronRight className="h-4 w-4" />
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Qué contiene el informe */}
        <section className="border border-border rounded-lg p-6 md:p-8 bg-card">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">
                <FileSearch className="h-3 w-3" /> Informe de oportunidad
              </span>
              <h2 className="text-2xl font-bold mt-2 mb-2">Esto es lo que ves al abrir una oportunidad</h2>
              <p className="text-muted-foreground mb-4">
                Cada informe es un análisis concreto de tu sector en tu ciudad. Sin plantillas genéricas: los números vienen de Google y de nuestro propio crawler.
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  "Búsquedas mensuales y evolución de los últimos 12 meses",
                  "Palabras clave que más facturan en tu sector y ciudad",
                  "Barrios y distritos con más potencial sin explotar",
                  "Competidores que ya están posicionados y por qué",
                  "Plan de acción priorizado para entrar al Map Pack",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex gap-2 flex-wrap">
                <Button asChild className="bg-primary hover:bg-[var(--brand-deep)]">
                  <Link to="/oportunidades/$slug" params={{ slug: "fontaneros-madrid" }}>Ver informe de ejemplo</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/como-funciona">Cómo trabajamos</Link>
                </Button>
              </div>
            </div>
            <div className="bg-secondary rounded-md p-5 border border-border">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Vista previa</p>
              <h3 className="font-bold text-lg mb-3">Fontaneros en Madrid</h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-background rounded p-2 text-center">
                  <p className="text-xs text-muted-foreground">Búsq./mes</p>
                  <p className="font-bold text-primary">14.800</p>
                </div>
                <div className="bg-background rounded p-2 text-center">
                  <p className="text-xs text-muted-foreground">Score</p>
                  <p className="font-bold text-primary">82/100</p>
                </div>
                <div className="bg-background rounded p-2 text-center">
                  <p className="text-xs text-muted-foreground">CPC</p>
                  <p className="font-bold text-primary">3,2 €</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-1">Top barrios</p>
              <div className="space-y-1">
                {[{ n: "Centro", p: 92 }, { n: "Salamanca", p: 88 }, { n: "Chamberí", p: 84 }, { n: "Tetuán", p: 76 }].map((d) => (
                  <div key={d.n} className="flex items-center gap-2">
                    <span className="text-xs w-20">{d.n}</span>
                    <div className="flex-1 h-1.5 bg-background rounded overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${d.p}%` }} />
                    </div>
                    <span className="text-xs font-semibold w-8 text-right">{d.p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Casos */}
        <section>
          <div className="flex items-end justify-between mb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-2xl font-bold mb-1">Oportunidades que ya hemos convertido en clientes</h2>
              <p className="text-sm text-muted-foreground">Negocios reales que detectamos, posicionamos y siguen con nosotros.</p>
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

        {/* Sectores con oportunidades activas */}
        <section>
          <h2 className="text-2xl font-bold mb-1">Sectores con oportunidades activas</h2>
          <p className="text-sm text-muted-foreground mb-4">Estos son los sectores donde hemos detectado hueco real en Google. Trabajamos con cualquier negocio local bajo demanda.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sectors.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.slug} to="/oportunidades" className="group block border border-border rounded-lg p-4 bg-card shadow-[var(--shadow-card)] hover:shadow-lg hover:border-primary transition">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-sm leading-tight group-hover:text-primary transition">{s.short}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{s.desc}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="bg-primary/10 text-primary font-semibold px-1.5 py-0.5 rounded">{s.monthlySearches.toLocaleString("es-ES")} búsq./mes</span>
                    <span className="text-muted-foreground">{s.cities.length} ciudades</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">¿Tu sector o ciudad no están en la lista?</h2>
          <p className="text-white/85 mb-5 max-w-2xl mx-auto">Te montamos un informe de oportunidad a medida en 48h. Gratis y sin compromiso: solo necesitamos saber a qué te dedicas y dónde.</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              <Link to="/como-funciona">Pedir informe a medida <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
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

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-secondary/50 rounded-md px-4 py-2 h-14 flex flex-col justify-center">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold truncate">{value}</span>
    </div>
  );
}

function FieldSelect({ label, icon, value, onChange, options }: {
  label: string; icon: React.ReactNode; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="bg-secondary/50 rounded-md px-4 py-2 h-14 flex items-center gap-3 cursor-pointer">
      <span className="text-muted-foreground shrink-0">{icon}</span>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-[11px] text-muted-foreground">{label}</span>
        <select value={value} onChange={(e) => onChange(e.target.value)}
          className="bg-transparent text-sm font-semibold focus:outline-none cursor-pointer -ml-0.5">
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    </label>
  );
}
