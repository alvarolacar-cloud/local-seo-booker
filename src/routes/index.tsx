import { createFileRoute, Link } from "@tanstack/react-router";
import cityMadrid from "@/assets/city-madrid.jpg";
import cityBarcelona from "@/assets/city-barcelona.jpg";
import cityValencia from "@/assets/city-valencia.jpg";
import citySevilla from "@/assets/city-sevilla.jpg";
import cityBilbao from "@/assets/city-bilbao.jpg";
import cityMalaga from "@/assets/city-malaga.jpg";
import { Search, MapPin, ChevronRight, Phone, Wrench, TrendingUp, TrendingDown, Minus, BarChart3, Target, Compass, FileSearch, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { opportunities } from "@/data/opportunities";
import { cities } from "@/data/cities";
import { cases } from "@/data/cases";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rankin — Oportunidades de SEO local para tu negocio" },
      { name: "description", content: "Descubre qué oportunidad de SEO local tiene tu sector en tu ciudad: búsquedas mensuales, competencia y potencial real. Informes de oportunidad para fontaneros, dentistas, peluquerías, talleres y más." },
      { property: "og:title", content: "Rankin — Oportunidades de SEO local" },
      { property: "og:description", content: "Encontramos los huecos de Google donde tu negocio puede ganar clientes locales. Sector + ciudad + datos reales." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function compBadge(c: "Baja" | "Media" | "Alta") {
  if (c === "Baja") return { cls: "bg-primary/10 text-primary", icon: <TrendingDown className="h-3 w-3" /> };
  if (c === "Alta") return { cls: "bg-destructive/15 text-destructive", icon: <TrendingUp className="h-3 w-3" /> };
  return { cls: "bg-accent/30 text-accent-foreground", icon: <Minus className="h-3 w-3" /> };
}

const sectorOptions = Array.from(
  new Map(opportunities.map((o) => [o.sectorSlug, o.sectorName])).entries()
);

const cityImageMap: Record<string, string> = {
  madrid: cityMadrid,
  barcelona: cityBarcelona,
  valencia: cityValencia,
  sevilla: citySevilla,
  bilbao: cityBilbao,
  malaga: cityMalaga,
};

function Index() {
  const featuredOpps = opportunities.slice(0, 6);
  const featuredCases = cases.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-20">
          <span className="inline-flex items-center gap-1 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
            <Compass className="h-3 w-3" /> Oportunidades de SEO local
          </span>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight max-w-4xl">
            ¿Cuánta gente está buscando tu servicio en tu ciudad ahora mismo?
          </h1>
          <p className="mt-3 text-lg text-white/85 max-w-3xl">
            Detectamos los huecos de Google donde tu sector tiene demanda real y la competencia está floja. Te lo enseñamos en un informe de oportunidad con datos, no humo.
          </p>
        </div>
      </section>

      {/* Selector de oportunidad */}
      <div className="mx-auto max-w-7xl px-4 -mt-12 relative z-10">
        <div className="bg-accent rounded-md p-1 shadow-[var(--shadow-card)]">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_auto] gap-1">
            <label className="bg-background rounded-sm flex items-center gap-2 px-3 py-3">
              <Wrench className="h-5 w-5 text-primary" />
              <select className="flex-1 bg-transparent border-0 outline-none text-base text-foreground">
                <option value="">Elige tu sector…</option>
                {sectorOptions.map(([slug, name]) => (
                  <option key={slug} value={slug}>{name}</option>
                ))}
              </select>
            </label>
            <label className="bg-background rounded-sm flex items-center gap-2 px-3 py-3">
              <MapPin className="h-5 w-5 text-primary" />
              <select className="flex-1 bg-transparent border-0 outline-none text-base text-foreground">
                <option value="">Elige tu ciudad…</option>
                {cities.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </label>
            <Button asChild className="bg-primary hover:bg-[var(--brand-deep)] text-primary-foreground h-auto px-6 text-base font-semibold rounded-sm">
              <Link to="/oportunidades"><Search className="h-5 w-5 mr-1" /> Ver mi oportunidad</Link>
            </Button>
          </div>
        </div>
        <p className="mt-3 text-sm text-foreground">
          Resultados públicos para 6 sectores y 6 ciudades. ¿No ves el tuyo? <Link to="/oportunidades" className="text-primary font-semibold underline">Pídenos un informe a medida</Link>.
        </p>
      </div>

      <main className="mx-auto max-w-7xl px-4 mt-16 space-y-16">
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
                <Link to="/oportunidades">Ver oportunidades abiertas</Link>
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
            <Button asChild variant="outline">
              <Link to="/oportunidades">Ver todas <ChevronRight className="h-4 w-4" /></Link>
            </Button>
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

        {/* Ciudades cubiertas */}
        <section>
          <h2 className="text-2xl font-bold mb-1">Ciudades con oportunidades activas</h2>
          <p className="text-sm text-muted-foreground mb-4">Tenemos informes públicos para estas ciudades. Trabajamos en toda España bajo demanda.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities.map((c) => (
              <Link key={c.slug} to="/oportunidades" className="block group">
                <div className="aspect-square overflow-hidden rounded-full mb-2">
                  <img src={c.img} alt={`Oportunidades de SEO local en ${c.name}`} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
                </div>
                <p className="font-semibold text-center group-hover:text-primary">{c.name}</p>
                <p className="text-xs text-muted-foreground text-center">{c.note}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">¿Tu sector o ciudad no están en la lista?</h2>
          <p className="text-white/85 mb-5 max-w-2xl mx-auto">Te montamos un informe de oportunidad a medida en 48h. Gratis y sin compromiso: solo necesitamos saber a qué te dedicas y dónde.</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">Pedir informe a medida</Button>
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
