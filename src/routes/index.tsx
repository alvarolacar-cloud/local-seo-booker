import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, MapPin, Briefcase, Compass,
  BookOpen, Trophy, Route as RouteIcon, Home as HomeIcon,
  ChevronDown, ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { sectors } from "@/data/sectors";
import { cities } from "@/data/cities";
import { opportunities } from "@/data/opportunities";
import heroBanner from "@/assets/hero-banner.jpg";
import cityMadrid from "@/assets/city-madrid.jpg";
import cityBarcelona from "@/assets/city-barcelona.jpg";
import cityValencia from "@/assets/city-valencia.jpg";
import citySevilla from "@/assets/city-sevilla.jpg";
import cityBilbao from "@/assets/city-bilbao.jpg";
import cityMalaga from "@/assets/city-malaga.jpg";
import editorialImg from "@/assets/report-map.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rankin — Miles de búsquedas locales sin cubrir. Encuentra la tuya." },
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
  { id: "oportunidades", label: "Oportunidades locales", icon: Compass, to: "/oportunidades" as const, novelty: true },
  { id: "casos", label: "Casos de éxito", icon: Trophy, to: "/casos-exito" as const, novelty: false },
  { id: "como-funciona", label: "Cómo funciona", icon: RouteIcon, to: "/como-funciona" as const, novelty: false },
  { id: "guias", label: "Guías", icon: BookOpen, to: "/guias" as const, novelty: false },
];



const cityImageMap: Record<string, string> = {
  madrid: cityMadrid, barcelona: cityBarcelona, valencia: cityValencia,
  sevilla: citySevilla, bilbao: cityBilbao, malaga: cityMalaga,
};

const faqs = [
  { q: "¿Cómo funciona Rankin?", a: "Analizamos qué busca la gente en tu ciudad para tu sector, cuántos competidores hay y qué hueco tienes. Te entregamos un informe con un plan de acción priorizado." },
  { q: "¿Cuánto cuesta un informe de oportunidad?", a: "El informe inicial es gratuito si tu sector y ciudad están en nuestro catálogo. Para informes a medida, 290€ con entrega en 48h." },
  { q: "¿En cuánto tiempo veo resultados?", a: "Los primeros movimientos en Google Maps suelen aparecer entre 30 y 60 días. Posiciones top 3 estables, entre 3 y 6 meses." },
  { q: "¿Hay permanencia?", a: "No. Trabajamos mes a mes. Si en 90 días no ves mejoras medibles, te devolvemos la última cuota." },
  { q: "¿Trabajáis con cualquier sector?", a: "Sí, siempre que tenga demanda local en Google. Tenemos casos en 14 sectores y abrimos nuevos bajo demanda." },
  { q: "¿Qué incluye el servicio mensual?", a: "Ficha de Google Business, contenido local, reseñas, enlaces, monitorización de competencia e informe mensual de resultados." },
];

const cityTabsList = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Málaga"];

function Home() {
  
  const [sectorSlug, setSectorSlug] = useState(sectors[0]?.slug ?? "");
  const [citySlug, setCitySlug] = useState(cities[0]?.slug ?? "");
  const [activeCity, setActiveCity] = useState("Madrid");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const cityOpps = opportunities.filter((o) => o.cityName === activeCity).slice(0, 6);

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


          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-4xl">
            Miles de búsquedas locales sin cubrir. Encuentra la tuya.
          </h1>

          {/* Buscador grande */}
          <div className="mt-6 bg-card text-foreground rounded-md p-2 shadow-2xl">
            <div className="mb-2 px-2 pt-1">
              <button className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/80 border border-border rounded px-3 py-1">
                Análisis completo <ChevronDown className="h-3 w-3" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.1fr_1fr_1fr_auto] gap-2">
              <FieldSelect
                label="Sector"
                icon={<Briefcase className="h-4 w-4" />}
                value={sectorSlug}
                onChange={setSectorSlug}
                options={sectors.map((s) => ({ value: s.slug, label: s.name }))}
              />
              <FieldSelect
                label="Ciudad"
                icon={<MapPin className="h-4 w-4" />}
                value={citySlug}
                onChange={setCitySlug}
                options={cities.map((c) => ({ value: c.slug, label: c.name }))}
              />
              <FieldStatic label="Zona / barrios" value="Todos los distritos" />
              <FieldStatic label="Volumen mínimo" value="500 búsq/mes" />
              <Button asChild className="h-14 md:w-16 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-md">
                <Link to="/oportunidades">
                  <Search className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 px-3 pt-3 pb-1">
              <label className="flex items-center gap-2 text-xs text-foreground/70 cursor-pointer">
                <input type="checkbox" className="accent-[#0066ff]" defaultChecked /> Solo baja competencia
              </label>
              <label className="flex items-center gap-2 text-xs text-foreground/70 cursor-pointer">
                <input type="checkbox" className="accent-[#0066ff]" /> Incluir barrios limítrofes
              </label>
              <label className="flex items-center gap-2 text-xs text-foreground/70 cursor-pointer">
                <input type="checkbox" className="accent-[#0066ff]" /> Solo sectores en tendencia
              </label>
            </div>
          </div>
        </div>

        {/* Banner inmersivo grande */}
        <div className="mx-auto max-w-7xl px-4 pb-10">
          <div className="relative rounded-lg overflow-hidden h-[360px] md:h-[440px]">
            <img
              src={heroBanner}
              alt="Salamanca, Madrid"
              className="absolute inset-0 w-full h-full object-cover"
              width={1920}
              height={1024}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
              <p className="text-white/85 text-sm font-semibold mb-2">Oportunidad destacada</p>
              <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight max-w-2xl">
                Salamanca, Madrid — 312 búsquedas/mes sin cubrir
              </h2>
            </div>
            <Button asChild className="absolute bottom-6 right-6 md:bottom-10 md:right-10 bg-white text-foreground hover:bg-white/90 font-semibold">
              <Link to="/oportunidades">Más información</Link>
            </Button>
            <div className="absolute bottom-3 left-6 md:left-10 flex items-center gap-2 text-xs text-white/80">
              <span className="bg-accent text-accent-foreground font-extrabold px-2 py-0.5 rounded">RANKIN</span>
              <span>Con datos reales de Google Keyword Planner</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chips de acceso rápido */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {navItems.map((c) => {
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
              <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight">
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

      {/* Sección extra de cards — 4 barrios destacados (ÚNICA adición) */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="text-2xl font-extrabold mb-1">Barrios con más hueco esta semana</h2>
          <p className="text-sm text-muted-foreground mb-6">Búsquedas reales que nadie está cubriendo bien en Google Maps.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {opportunities.slice(0, 4).map((o) => {
              const img = cityImageMap[o.citySlug];
              return (
                <Link
                  key={o.slug}
                  to="/oportunidades/$slug"
                  params={{ slug: o.slug }}
                  className="group block rounded-lg overflow-hidden border border-border bg-card hover:shadow-lg transition"
                >
                  <div className="relative h-40 overflow-hidden">
                    {img && (
                      <img src={img} alt={o.cityName} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="text-[11px] uppercase tracking-wide opacity-80">{o.cityName}</p>
                      <p className="font-bold text-lg leading-tight">{o.sectorName}</p>
                    </div>
                    <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-[11px] font-bold px-2 py-0.5 rounded">
                      Score {o.score}
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
          <h2 className="text-2xl font-extrabold mb-6">Trabajar con Rankin</h2>
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
          <h2 className="text-2xl font-extrabold mb-1">Empieza a explorar tu ciudad</h2>
          <p className="text-sm text-muted-foreground mb-5">Oportunidades activas por sector en las principales ciudades de España.</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {cityTabsList.map((c) => {
              const active = activeCity === c;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCity(c)}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-2">
            {cityOpps.length === 0 && (
              <p className="text-sm text-muted-foreground col-span-3">Próximamente más oportunidades en {activeCity}.</p>
            )}
            {cityOpps.map((o) => (
              <Link
                key={o.slug}
                to="/oportunidades/$slug"
                params={{ slug: o.slug }}
                className="text-sm text-primary hover:underline py-1"
              >
                {o.sectorName} en {o.cityName}
              </Link>
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
    <div className="bg-secondary/60 rounded-md px-4 h-14 flex flex-col justify-center">
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
    <label className="bg-secondary/60 rounded-md px-4 h-14 flex items-center gap-3 cursor-pointer">
      <span className="text-muted-foreground shrink-0">{icon}</span>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-[11px] text-muted-foreground">{label}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent text-sm font-semibold focus:outline-none cursor-pointer -ml-0.5"
        >
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    </label>
  );
}
