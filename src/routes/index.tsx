import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, MapPin, Briefcase, Compass,
  BookOpen, Trophy, Route as RouteIcon, Home as HomeIcon,
  ChevronDown, ChevronRight, FileSearch,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { sectors } from "@/data/sectors";
import { cities } from "@/data/cities";
import { opportunities } from "@/data/opportunities";
import sectorAbogados1 from "@/assets/sector-abogados-1.jpg";
import sectorAbogados2 from "@/assets/sector-abogados-2.jpg";
import cityMadrid from "@/assets/city-madrid.jpg";
import cityBarcelona from "@/assets/city-barcelona.jpg";
import cityValencia from "@/assets/city-valencia.jpg";
import citySevilla from "@/assets/city-sevilla.jpg";
import cityBilbao from "@/assets/city-bilbao.jpg";
import cityMalaga from "@/assets/city-malaga.jpg";
import sectorFontaneros from "@/assets/sector-fontaneros.jpg";
import sectorDentistas from "@/assets/sector-dentistas.jpg";
import sectorAbogadosImg from "@/assets/sector-abogados.jpg";
import sectorPeluquerias from "@/assets/sector-peluquerias.jpg";
import sectorTalleres from "@/assets/sector-talleres.jpg";
import sectorReformas from "@/assets/sector-reformas.jpg";
import sectorElectricistas from "@/assets/sector-electricistas.jpg";
import sectorRestaurantes from "@/assets/sector-restaurantes.jpg";
import editorialImg from "@/assets/report-map.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rankin — Miles de oportunidades en Google sin cubrir. Encuentra la tuya." },
      { name: "description", content: "Detectamos los huecos de Google donde tu sector tiene demanda real y la competencia está floja. Informes de oportunidad para negocios locales." },
      { property: "og:title", content: "Rankin — Oportunidades de SEO local" },
      { property: "og:description", content: "Sector + ciudad + datos reales. Encuentra el hueco." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const navItems = [
  { id: "inicio", label: "Inicio", icon: HomeIcon, to: "/" as const, novelty: false },
  { id: "oportunidades", label: "Oportunidades en Google", icon: Compass, to: "/oportunidades" as const, novelty: true },
  { id: "casos", label: "Nuestros Casos de Éxito", icon: Trophy, to: "/casos-exito" as const, novelty: false },
  { id: "como-funciona", label: "Cómo funciona", icon: RouteIcon, to: "/como-funciona" as const, novelty: false },
  { id: "guias", label: "Guías", icon: BookOpen, to: "/guias" as const, novelty: false },
];



const cityImageMap: Record<string, string> = {
  madrid: cityMadrid, barcelona: cityBarcelona, valencia: cityValencia,
  sevilla: citySevilla, bilbao: cityBilbao, malaga: cityMalaga,
};

const sectorImageMap: Record<string, string> = {
  fontaneros: sectorFontaneros,
  dentistas: sectorDentistas,
  abogados: sectorAbogadosImg,
  peluquerias: sectorPeluquerias,
  talleres: sectorTalleres,
  reformas: sectorReformas,
  electricistas: sectorElectricistas,
  restaurantes: sectorRestaurantes,
};

const faqs = [
  { q: "¿Cómo funciona Rankin?", a: "Analizamos qué busca la gente en tu ciudad para tu sector, cuántos competidores hay y qué hueco tienes. Te entregamos un informe con un plan de acción priorizado." },
  { q: "¿Cuánto cuesta un informe de oportunidad?", a: "El informe inicial es gratuito si tu sector y ciudad están en nuestro catálogo. Para informes a medida, 290€ con entrega en 48h." },
  { q: "¿En cuánto tiempo veo resultados?", a: "Los primeros movimientos en Google Maps suelen aparecer entre 30 y 60 días. Posiciones top 3 estables, entre 3 y 6 meses." },
  { q: "¿Hay permanencia?", a: "No. Trabajamos mes a mes. Si en 90 días no ves mejoras medibles, te devolvemos la última cuota." },
  { q: "¿Trabajáis con cualquier sector?", a: "Sí, siempre que tenga demanda local en Google. Tenemos casos en 14 sectores y abrimos nuevos bajo demanda." },
  { q: "¿Qué incluye el servicio mensual?", a: "Ficha de Google Business, contenido local, reseñas, enlaces, monitorización de competencia e informe mensual de resultados." },
];

const sectorTabsList = sectors.slice(0, 6).map((s) => s.name);

function Home() {
  
  const [sectorSlug, setSectorSlug] = useState("");
  const [citySlug, setCitySlug] = useState("");
  const [activeSector, setActiveSector] = useState(sectorTabsList[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      {/* HERO azul marino — Skyscanner clone */}
      <section className="bg-primary text-primary-foreground">
        <SiteHeader variant="transparent" />
        <div className="mx-auto max-w-7xl px-4 pt-6 pb-10 md:pt-10">
          {/* Tabs categorías = navegación principal */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {navItems.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.id}
                  to={t.to}
                  className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 text-white hover:bg-white/10 text-sm font-semibold transition"
                  activeProps={{ className: "!bg-[#0066ff] !border-[#0066ff]" }}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                  {t.novelty && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#e91e63] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      Novedad
                    </span>
                  )}
                </Link>
              );
            })}
          </div>


          <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-4xl">
            Miles de oportunidades en Google <em className="text-accent not-italic font-serif">sin cubrir</em>. Encuentra la tuya.
          </h1>

          {/* Buscador grande */}
          <div className="mt-6">
            <div className="mb-2">
              <button className="inline-flex items-center gap-1 text-xs font-semibold text-white/80 border border-white/30 rounded px-3 py-1 hover:bg-white/10 transition">
                Oportunidades en Google <ChevronDown className="h-3 w-3" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.1fr_1fr_1fr_auto] gap-2">
              <FieldSelect
                label="Sector"
                icon={<Briefcase className="h-4 w-4" />}
                value={sectorSlug}
                onChange={setSectorSlug}
                options={sectors.map((s) => ({ value: s.slug, label: s.name }))}
                placeholder="Selecciona industria"
              />
              <FieldSelect
                label="Ciudad"
                icon={<MapPin className="h-4 w-4" />}
                value={citySlug}
                onChange={setCitySlug}
                options={cities.map((c) => ({ value: c.slug, label: c.name }))}
                placeholder="Selecciona ciudad"
              />
              <FieldStatic label="Zona / barrios" value="Todos los distritos" />
              <FieldStatic label="Volumen mínimo" value="500 búsq/mes" />
              {(() => {
                const canSearch = Boolean(sectorSlug && citySlug);
                const slug = `${sectorSlug}-${citySlug}`;
                const btnClass = "h-14 md:px-8 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-md text-base font-semibold";
                return canSearch ? (
                  <Button asChild className={btnClass}>
                    <Link to="/oportunidades/$slug" params={{ slug }}>Buscar</Link>
                  </Button>
                ) : (
                  <Button className={btnClass} disabled>Buscar</Button>
                );
              })()}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 pt-3">
              <label className="flex items-center gap-2 text-xs text-white/70 cursor-pointer">
                <input type="checkbox" className="accent-[#0066ff]" defaultChecked /> Datos de Google KeywordPlanner
              </label>
              <label className="flex items-center gap-2 text-xs text-white/70 cursor-pointer">
                <input type="checkbox" className="accent-[#0066ff]" defaultChecked /> Datos de Google Trends
              </label>
            </div>
          </div>
        </div>

        {/* Mosaico estilo informe: mapa real + 2 imágenes del sector */}
        <div className="mx-auto max-w-7xl px-4 pb-10">
          <div className="relative">
            <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[360px] md:h-[440px] rounded-lg overflow-hidden">
              <iframe
                title="Mapa de Madrid"
                src="https://www.google.com/maps?q=Madrid,%20Espa%C3%B1a&output=embed"
                className="col-span-2 row-span-2 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="relative">
                <img src={sectorAbogados1} alt="Despacho de abogados en Madrid" loading="lazy" width={800} height={640} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-black/80 text-white text-[11px] font-bold px-2.5 py-1 rounded">Despacho Madrid · Ticket medio 850 €</span>
              </div>
              <div className="relative">
                <img src={sectorAbogados2} alt="Abogados firmando un acuerdo" loading="lazy" width={800} height={640} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-black/80 text-white text-[11px] font-bold px-2.5 py-1 rounded">Despacho Valencia · Ticket medio 700 €</span>
              </div>
            </div>
            <div className="pointer-events-none absolute left-4 bottom-4 md:left-6 md:bottom-6 max-w-2xl">
              <span className="inline-block bg-black/80 text-white text-xl md:text-3xl font-extrabold leading-tight px-4 py-2.5 rounded-lg">
                Abogados en Madrid — 480 búsquedas/mes sin cubrir
              </span>
            </div>
            <Button asChild className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white text-foreground hover:bg-white/90 font-semibold shadow-lg">
              <Link to="/oportunidades">Más información</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Chips de acceso rápido */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {navItems.filter((c) => c.id !== "inicio").map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.id}
                  to={c.to}
                  className="flex items-center gap-3 bg-primary text-primary-foreground rounded-md px-4 py-4 font-semibold text-sm hover:bg-[var(--brand-deep)] transition"
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="truncate">{c.label}</span>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* Banner editorial secundario */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 pb-8">
          <div className="relative rounded-lg overflow-hidden h-[280px] md:h-[340px]">
            <img
              src={editorialImg}
              alt="Cómo funciona Rankin"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10" />
            <div className="relative h-full flex flex-col justify-center p-6 md:p-10 max-w-xl">
              <h2 className="font-serif text-white text-4xl md:text-5xl leading-tight">
                Así trabajamos contigo<br />paso a paso
              </h2>
              <p className="text-white/85 mt-3 text-sm md:text-base">
                Detectamos el hueco, montamos el plan, ejecutamos cada mes y te lo enseñamos en un informe sin paja.
              </p>
              <div className="mt-5">
                <Button asChild className="bg-white text-foreground hover:bg-white/90 font-semibold">
                  <Link to="/como-funciona">¿Cómo lo hacemos?</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qué contiene el informe (movido desde Oportunidades) */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 pb-8">
          <div className="border border-border rounded-lg p-6 md:p-8 bg-card">
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
          </div>
        </div>
      </section>

      {/* LIVE DEALS — tabla densa estilo Flippa */}
      <section className="bg-background border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground/70">— Oportunidades en vivo</p>
              <h2 className="font-serif text-3xl md:text-5xl leading-tight mt-1">
                Datos reales. Sectores reales. <em>Huecos reales.</em>
              </h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                Lo que ves debajo son búsquedas mensuales en Google que nadie está cubriendo bien en su ciudad. Actualizado cada semana.
              </p>
            </div>
            <Link to="/oportunidades" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
              Ver todas las oportunidades <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 rounded-lg border border-border overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[760px]">
                <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">Sector</th>
                    <th className="text-left font-semibold px-4 py-3">Ciudad</th>
                    <th className="text-right font-semibold px-4 py-3">Búsq. / mes</th>
                    <th className="text-right font-semibold px-4 py-3">CPC</th>
                    <th className="text-left font-semibold px-4 py-3">Competencia</th>
                    <th className="text-right font-semibold px-4 py-3">Oportunidad</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {opportunities.slice(0, 8).map((o) => {
                    const compClass = o.competition === "Baja"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : o.competition === "Media"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-rose-50 text-rose-700 border-rose-200";
                    return (
                      <tr key={o.slug} className="border-t border-border hover:bg-secondary/40 transition-colors">
                        <td className="px-4 py-3 font-semibold">{o.sectorName}</td>
                        <td className="px-4 py-3 text-muted-foreground">{o.cityName}</td>
                        <td className="px-4 py-3 text-right tabular-nums font-semibold">{o.searches.toLocaleString("es-ES")}</td>
                        <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{o.cpc.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded border ${compClass}`}>{o.competition}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-secondary rounded overflow-hidden">
                              <div className="h-full bg-accent" style={{ width: `${o.score}%` }} />
                            </div>
                            <span className="tabular-nums font-bold text-primary w-9 text-right">{o.score}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Link to="/oportunidades/$slug" params={{ slug: o.slug }} className="text-primary font-semibold hover:underline inline-flex items-center gap-0.5 whitespace-nowrap">
                            Ver informe <ChevronRight className="h-4 w-4" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="bg-secondary/40 border-t border-border px-4 py-3 text-center">
              <Link to="/oportunidades" className="text-sm font-semibold text-primary hover:underline">
                Cargar más oportunidades →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROVEN RESULTS — testimoniales premium estilo Flippa */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground/70">— Resultados probados</p>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight mt-1 max-w-3xl">
            Negocios reales. <em>Métricas reales.</em>
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            No vendemos humo. Cada caso lleva contrato, capturas de Google Business y facturación contrastada.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {[
              { sector: "Clínica dental · Barcelona", metric: "+312%", metricLabel: "llamadas en 6 meses", quote: "Pasamos de no aparecer fuera del barrio a posicionar top 3 en 18 keywords. Tenemos lista de espera por primera vez en 9 años.", author: "Marta Ribas", role: "Directora, Clínica Ribas" },
              { sector: "Fontanería · Madrid", metric: "+184%", metricLabel: "presupuestos solicitados", quote: "Llevábamos 4 años pagando Google Ads sin medir nada. Con Rankin entendí qué buscaba la gente y cerré la grifería de Adwords.", author: "Javier Núñez", role: "Fundador, Fontanería Núñez" },
            ].map((t) => (
              <article key={t.author} className="bg-card rounded-lg border border-border p-6 md:p-8 flex flex-col" style={{ boxShadow: "var(--shadow-card)" }}>
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{t.sector}</p>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-serif text-5xl md:text-6xl text-primary leading-none">{t.metric}</span>
                  <span className="text-sm text-muted-foreground">{t.metricLabel}</span>
                </div>
                <blockquote className="mt-5 text-base md:text-lg leading-relaxed text-foreground/90">
                  <span className="font-serif text-2xl text-accent leading-none mr-1">“</span>
                  {t.quote}
                </blockquote>
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                  <Link to="/casos-exito" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-0.5">
                    Ver caso <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS / POWERED BY */}
      <section className="bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Datos y herramientas con las que trabajamos
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
            {["Google Search Console", "Google Business Profile", "Google Trends", "Keyword Planner", "Semrush", "Ahrefs", "Looker Studio"].map((p) => (
              <span key={p} className="text-sm font-semibold tracking-tight text-foreground/70 hover:text-foreground transition-colors">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>



      {/* Sección extra de cards — 4 barrios destacados (ÚNICA adición) */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="font-serif text-3xl md:text-4xl mb-1">Algunos sectores con oportunidades en Google</h2>
          <p className="text-sm text-muted-foreground mb-6">Búsquedas reales que nadie está cubriendo bien en Google Maps.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {opportunities.slice(0, 4).map((o) => {
              const img = sectorImageMap[o.sectorSlug] ?? cityImageMap[o.citySlug];
              return (
                <Link
                  key={o.slug}
                  to="/oportunidades/$slug"
                  params={{ slug: o.slug }}
                  className="group block rounded-lg overflow-hidden border border-border bg-card hover:shadow-lg transition"
                >
                  <div className="relative h-40 overflow-hidden">
                    {img && (
                      <img src={img} alt={`${o.sectorName} en ${o.cityName}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-[11px] uppercase tracking-wide opacity-80">{o.cityName}</p>
                      <p className="font-bold text-lg leading-tight">{o.sectorName}</p>
                    </div>
                    <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-[11px] font-bold px-2 py-0.5 rounded">
                      {o.sectorName.toLowerCase()} en {o.cityName.toLowerCase()}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold">{o.searches.toLocaleString("es-ES")} búsq/mes</span>
                      <span className="text-muted-foreground">Comp. {o.competition.toLowerCase()}</span>
                    </div>
                    <p className="text-sm font-semibold text-primary mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Ver informe <ChevronRight className="h-4 w-4" />
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {opportunities.slice(4, 8).map((o) => {
              const img = sectorImageMap[o.sectorSlug] ?? cityImageMap[o.citySlug];
              return (
                <Link
                  key={o.slug}
                  to="/oportunidades/$slug"
                  params={{ slug: o.slug }}
                  className="group block rounded-lg overflow-hidden border border-border bg-card hover:shadow-lg transition"
                >
                  <div className="relative h-40 overflow-hidden">
                    {img && (
                      <img src={img} alt={`${o.sectorName} en ${o.cityName}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-[11px] uppercase tracking-wide opacity-80">{o.cityName}</p>
                      <p className="font-bold text-lg leading-tight">{o.sectorName}</p>
                    </div>
                    <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-[11px] font-bold px-2 py-0.5 rounded">
                      {o.sectorName.toLowerCase()} en {o.cityName.toLowerCase()}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold">{o.searches.toLocaleString("es-ES")} búsq/mes</span>
                      <span className="text-muted-foreground">Comp. {o.competition.toLowerCase()}</span>
                    </div>
                    <p className="text-sm font-semibold text-primary mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Ver informe <ChevronRight className="h-4 w-4" />
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ en 2 columnas */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Trabajar con Rankin</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="border-b border-border">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="font-semibold text-sm">{f.q}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 transition ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explora por ciudad */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 pb-16">
          <h2 className="font-serif text-3xl md:text-4xl mb-1">Explora oportunidades en tu sector</h2>
          <p className="text-sm text-muted-foreground mb-5">Oportunidades activas por ciudad en los sectores con más demanda.</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {sectorTabsList.map((c) => {
              const active = activeSector === c;
              return (
                <button
                  key={c}
                  onClick={() => setActiveSector(c)}
                  className={`px-4 py-1.5 rounded-full border text-sm font-semibold transition ${
                    active
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-foreground hover:bg-secondary"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { zone: "Centro", cities: ["Madrid", "Toledo", "Guadalajara", "Ávila", "Segovia", "Cuenca", "Salamanca", "Valladolid"] },
              { zone: "Cataluña y Levante", cities: ["Barcelona", "Valencia", "Tarragona", "Girona", "Lleida", "Castellón", "Alicante", "Murcia"] },
              { zone: "Sur", cities: ["Sevilla", "Málaga", "Granada", "Córdoba", "Cádiz", "Almería", "Huelva", "Jaén"] },
              { zone: "Norte", cities: ["Bilbao", "San Sebastián", "Santander", "Oviedo", "Gijón", "A Coruña", "Vigo", "Pamplona"] },
            ].map((block) => (
              <div key={block.zone}>
                <h3 className="text-sm font-extrabold uppercase tracking-wide text-foreground mb-3">{block.zone}</h3>
                <ul className="space-y-1.5">
                  {block.cities.map((c) => (
                    <li key={c}>
                      <Link to="/oportunidades" className="text-sm text-primary hover:underline">
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>




      <SiteFooter />
    </div>
  );
}

function FieldStatic({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card text-foreground border border-border rounded-md px-4 h-14 flex flex-col justify-center">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold truncate">{value}</span>
    </div>
  );
}

function FieldSelect({ label, icon: _icon, value, onChange, options, placeholder }: {
  label: string; icon: React.ReactNode; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; placeholder?: string;
}) {
  return (
    <label className="bg-card text-foreground border border-border rounded-md px-4 h-14 flex flex-col justify-center cursor-pointer focus-within:border-[#0066ff] hover:border-foreground/40 transition-colors">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-foreground text-sm font-semibold focus:outline-none cursor-pointer -ml-0.5 truncate"
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}

