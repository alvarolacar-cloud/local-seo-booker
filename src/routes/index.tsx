import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, MapPin, Compass, BookOpen, Trophy, Route as RouteIcon, Home as HomeIcon,
  FileSearch, Briefcase, BarChart3, ShieldCheck, Users, HeartHandshake,
  TrendingUp, TrendingDown, Target, Calendar, ChevronRight, Heart, Star,
  Sparkles, Gift, Building2, Stethoscope, Scale, Scissors, Wrench, UtensilsCrossed,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { sectors } from "@/data/sectors";
import { cities } from "@/data/cities";
import { opportunities } from "@/data/opportunities";
import { cases } from "@/data/cases";

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
import serviceAudit from "@/assets/service-audit.jpg";
import serviceContent from "@/assets/service-content.jpg";
import serviceGmb from "@/assets/service-gmb.jpg";
import reportHandshake from "@/assets/report-handshake.jpg";
import reportPhone from "@/assets/report-phone.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rankin — La plataforma #1 de oportunidades SEO local en España" },
      { name: "description", content: "Detectamos los huecos de Google donde tu sector tiene demanda real y la competencia está floja. Informes de oportunidad para negocios locales." },
      { property: "og:title", content: "Rankin — Oportunidades de SEO local" },
      { property: "og:description", content: "Sector + ciudad + datos reales. Encuentra el hueco." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

// Top tabs estilo Booking (Alojamiento/Vuelos...) → categorías de oportunidad
const heroCategoryTabs = [
  { id: "oportunidades", label: "Oportunidades", icon: Compass, to: "/oportunidades" as const, active: true },
  { id: "sectores", label: "Sectores", icon: Briefcase, to: "/oportunidades" as const },
  { id: "ciudades", label: "Ciudades", icon: MapPin, to: "/oportunidades" as const },
  { id: "casos", label: "Casos de éxito", icon: Trophy, to: "/casos-exito" as const },
  { id: "guias", label: "Guías", icon: BookOpen, to: "/guias" as const },
  { id: "como", label: "Cómo funciona", icon: RouteIcon, to: "/como-funciona" as const },
];

const navItems = [
  { id: "inicio", label: "Inicio", icon: HomeIcon, to: "/" as const },
  { id: "oportunidades", label: "Oportunidades", icon: Compass, to: "/oportunidades" as const, novelty: true },
  { id: "casos", label: "Casos de Éxito", icon: Trophy, to: "/casos-exito" as const },
  { id: "como-funciona", label: "Cómo funciona", icon: RouteIcon, to: "/como-funciona" as const },
  { id: "guias", label: "Guías", icon: BookOpen, to: "/guias" as const },
];

const whyCards = [
  { icon: BarChart3, title: "Datos reales de Google", desc: "300K+ búsquedas locales analizadas con Keyword Planner y SERP." },
  { icon: Target, title: "Detectamos el hueco antes que nadie", desc: "Cruzamos demanda × competencia para encontrar tu mejor oportunidad." },
  { icon: ShieldCheck, title: "+800 negocios ya posicionados", desc: "Casos reales con métricas verificadas en Maps y orgánico." },
  { icon: HeartHandshake, title: "Acompañamiento de especialistas", desc: "Un consultor humano detrás de cada informe, no un robot." },
];

// "Busca por tipo de alojamiento" → tipos de oportunidad
const oppTypes = [
  { label: "Alta demanda", img: sectorRestaurantes, sub: "+5K búsq/mes", filter: "alta" },
  { label: "Baja competencia", img: sectorAbogadosImg, sub: "Hueco real en Maps", filter: "baja" },
  { label: "Top ROI", img: sectorReformas, sub: "Ticket alto", filter: "all" },
  { label: "En tendencia", img: sectorFontaneros, sub: "Creciendo este mes", filter: "all" },
];

// "Planificador" → tabs + 6 ciudades
const planningTabs = ["Ciudades top", "Por sector", "Por presupuesto", "Por intención", "Más filtros"];

const planningCities = [
  { name: "Málaga", slug: "malaga", count: "47 oportunidades", img: cityMalaga },
  { name: "Sevilla", slug: "sevilla", count: "39 oportunidades", img: citySevilla },
  { name: "Bilbao", slug: "bilbao", count: "33 oportunidades", img: cityBilbao },
  { name: "Valencia", slug: "valencia", count: "45 oportunidades", img: cityValencia },
  { name: "Madrid", slug: "madrid", count: "62 oportunidades", img: cityMadrid },
  { name: "Barcelona", slug: "barcelona", count: "58 oportunidades", img: cityBarcelona },
];

// "Destinos de moda" mosaico → sectores+ciudades trending
const trendingMosaic = [
  { label: "Reformas en Málaga", img: cityMalaga, flag: "🔥" },
  { label: "Dentistas en Bilbao", img: cityBilbao, flag: "📈" },
  { label: "Fontaneros en Sevilla", img: citySevilla, flag: "🇪🇸" },
  { label: "Abogados en Madrid", img: cityMadrid, flag: "⚖️" },
  { label: "Talleres en Valencia", img: cityValencia, flag: "🔧" },
];

const cityImageMap: Record<string, string> = {
  madrid: cityMadrid, barcelona: cityBarcelona, valencia: cityValencia,
  sevilla: citySevilla, bilbao: cityBilbao, malaga: cityMalaga,
};
const sectorImageMap: Record<string, string> = {
  fontaneros: sectorFontaneros, dentistas: sectorDentistas, abogados: sectorAbogadosImg,
  peluquerias: sectorPeluquerias, talleres: sectorTalleres, reformas: sectorReformas,
  electricistas: sectorElectricistas, restaurantes: sectorRestaurantes,
};

function Home() {
  const [query, setQuery] = useState("");
  const [sectorSlug, setSectorSlug] = useState("");
  const [citySlug, setCitySlug] = useState("");
  const [activeCat, setActiveCat] = useState("oportunidades");
  const [activePlanTab, setActivePlanTab] = useState(planningTabs[0]);

  const canSearch = Boolean(sectorSlug && citySlug);
  const searchSlug = canSearch ? `${sectorSlug}-${citySlug}` : "";

  const featuredOpps = useMemo(() => opportunities.slice(0, 4), []);
  const weekendOpps = useMemo(() => opportunities.slice(4, 8), []);
  const loveCases = cases.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* ===================== HERO ===================== */}
      <section className="relative bg-primary text-white">
        <SiteHeader variant="transparent" />

        {/* Pills de categoría tipo Booking */}
        <div className="mx-auto max-w-7xl px-4 pt-2 pb-4">
          <nav className="flex flex-wrap gap-2">
            {heroCategoryTabs.map((t) => {
              const Icon = t.icon;
              const active = activeCat === t.id;
              return (
                <Link
                  key={t.id}
                  to={t.to}
                  onClick={() => setActiveCat(t.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold border transition ${
                    active
                      ? "bg-white text-primary border-white"
                      : "border-white/40 text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Hero content + ilustración */}
        <div className="mx-auto max-w-7xl px-4 pt-8 pb-24 md:pt-12 md:pb-32 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Grandes oportunidades<br />con tu sector en Google
            </h1>
            <p className="mt-3 text-white/85 text-base md:text-lg max-w-xl">
              Detecta huecos reales por sector y ciudad antes que tu competencia. Informe gratuito en 60 segundos.
            </p>
            <Button asChild className="mt-5 bg-accent text-accent-foreground hover:brightness-95 font-bold">
              <Link to="/oportunidades">Ver oportunidades abiertas</Link>
            </Button>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full max-w-sm aspect-square">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl" />
              <div className="relative h-full w-full flex items-center justify-center">
                <Sparkles className="h-32 w-32 text-accent drop-shadow-2xl" />
                <Compass className="absolute h-20 w-20 text-white rotate-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Search bar superpuesta */}
        <div className="absolute left-0 right-0 -bottom-7 md:-bottom-7 px-4">
          <div className="mx-auto max-w-7xl bg-card text-foreground rounded-md shadow-2xl border-2 border-accent p-1.5">
            <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_auto] gap-1.5">
              <label className="flex items-center gap-2 border border-border rounded-md px-3 h-12 bg-background">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="¿Cuál es tu sector?"
                  className="flex-1 bg-transparent text-sm font-semibold focus:outline-none"
                />
              </label>
              <label className="flex items-center gap-2 border border-border rounded-md px-3 h-12 bg-background">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <select value={sectorSlug} onChange={(e) => setSectorSlug(e.target.value)}
                  className="flex-1 bg-transparent text-sm font-semibold focus:outline-none">
                  <option value="">Sector</option>
                  {sectors.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                </select>
              </label>
              <label className="flex items-center gap-2 border border-border rounded-md px-3 h-12 bg-background">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <select value={citySlug} onChange={(e) => setCitySlug(e.target.value)}
                  className="flex-1 bg-transparent text-sm font-semibold focus:outline-none">
                  <option value="">Ciudad</option>
                  {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
              </label>
              <Button asChild className="h-12 px-8 bg-primary hover:bg-[var(--brand-deep)] text-primary-foreground font-bold rounded-md">
                <Link to={canSearch ? "/oportunidades/$slug" : "/oportunidades"} params={canSearch ? { slug: searchSlug } : undefined}>
                  <Search className="h-4 w-4 mr-1" /> Buscar
                </Link>
              </Button>
            </div>
            <label className="flex items-center gap-2 text-xs text-muted-foreground px-3 pt-2 pb-1 cursor-pointer">
              <input type="checkbox" className="accent-primary" /> Solo sectores con baja competencia
            </label>
          </div>
        </div>
      </section>

      {/* spacing por la search bar */}
      <div className="h-20 md:h-16" />

      {/* ===================== ¿POR QUÉ RANKIN? ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <h2 className="text-xl md:text-2xl font-extrabold mb-4">¿Por qué Rankin?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyCards.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="border border-border rounded-lg p-5 bg-card">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-bold text-sm">{w.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== OFERTAS (banner ancho) ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 pt-2 pb-6">
          <h2 className="text-xl md:text-2xl font-extrabold mb-1">Informes destacados</h2>
          <p className="text-sm text-muted-foreground mb-4">Promociones, descuentos y oportunidades especiales para ti.</p>
          <div className="border border-border rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-[1.5fr_1fr] bg-card">
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-extrabold">Sin sorpresas, solo datos reales</h3>
              <p className="text-sm text-muted-foreground mt-2 mb-4 max-w-xl">
                Analizamos tu sector + ciudad sin comisiones ocultas. Informe completo con búsquedas, competencia y score de oportunidad.
              </p>
              <Button asChild className="bg-primary hover:bg-[var(--brand-deep)]">
                <Link to="/oportunidades">Ahora con esta oferta destacada</Link>
              </Button>
            </div>
            <div className="relative h-44 md:h-auto">
              <img src={editorialImg} alt="Informe destacado" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== BUSCA POR TIPO DE OPORTUNIDAD ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h2 className="text-xl md:text-2xl font-extrabold mb-4">Busca por tipo de oportunidad</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {oppTypes.map((t) => (
              <Link key={t.label} to="/oportunidades" className="group block">
                <div className="relative h-40 md:h-48 rounded-md overflow-hidden">
                  <img src={t.img} alt={t.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                </div>
                <p className="mt-2 font-bold text-sm">{t.label}</p>
                <p className="text-xs text-muted-foreground">{t.sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PLANIFICADOR RÁPIDO ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h2 className="text-xl md:text-2xl font-extrabold mb-1">Planificador de oportunidades rápido y sencillo</h2>
          <p className="text-sm text-muted-foreground mb-4">Elige una ciudad y te enseñamos las mejores oportunidades activas.</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {planningTabs.map((t) => {
              const active = activePlanTab === t;
              return (
                <button
                  key={t}
                  onClick={() => setActivePlanTab(t)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold border transition ${
                    active ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:bg-secondary"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {planningCities.map((c) => (
              <Link key={c.slug} to="/oportunidades" className="group block">
                <div className="relative h-24 rounded-md overflow-hidden">
                  <img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                </div>
                <p className="mt-2 text-sm font-bold">{c.name}</p>
                <p className="text-[11px] text-muted-foreground">{c.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== QUÉDATE CON UN INFORME ÚNICO ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h2 className="text-xl md:text-2xl font-extrabold mb-1">Encuentra un informe único</h2>
          <p className="text-sm text-muted-foreground mb-4">Cruces de sector × ciudad con hueco real, datos verificados y score 0–100.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredOpps.map((o) => {
              const img = cityImageMap[o.citySlug] ?? sectorImageMap[o.sectorSlug];
              return (
                <Link key={o.slug} to="/oportunidades/$slug" params={{ slug: o.slug }} className="group block border border-border rounded-md overflow-hidden bg-card hover:shadow-lg transition">
                  <div className="relative h-40 overflow-hidden">
                    {img && <img src={img} alt={o.cityName} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />}
                    <button className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/95 flex items-center justify-center text-foreground/70 hover:text-destructive">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="font-bold text-sm leading-tight">{o.sectorName} en {o.cityName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{o.cityName}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-primary text-primary-foreground text-[11px] font-bold px-1.5 py-0.5 rounded">{o.score}</span>
                      <span className="text-[11px]"><strong>Excelente</strong> · {o.searches.toLocaleString("es-ES")} búsq.</span>
                    </div>
                    <p className="text-xs text-right mt-2">Desde <strong>{o.cpc.toFixed(2)} €</strong> CPC</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== DESTINOS DE MODA (mosaico) ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h2 className="text-xl md:text-2xl font-extrabold mb-4">Sectores y ciudades de moda</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* fila 1: 2 grandes */}
            <Link to="/oportunidades" className="group relative col-span-2 md:col-span-2 lg:col-span-2 h-44 md:h-56 rounded-md overflow-hidden">
              <img src={trendingMosaic[0].img} alt={trendingMosaic[0].label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute top-3 left-3 text-white font-extrabold text-lg flex items-center gap-2">
                {trendingMosaic[0].flag} {trendingMosaic[0].label}
              </p>
            </Link>
            <Link to="/oportunidades" className="group relative col-span-2 md:col-span-1 h-44 md:h-56 rounded-md overflow-hidden">
              <img src={trendingMosaic[1].img} alt={trendingMosaic[1].label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute top-3 left-3 text-white font-extrabold text-lg flex items-center gap-2">
                {trendingMosaic[1].flag} {trendingMosaic[1].label}
              </p>
            </Link>
            {/* fila 2: 3 medianos */}
            {trendingMosaic.slice(2).map((m) => (
              <Link key={m.label} to="/oportunidades" className="group relative h-36 md:h-44 rounded-md overflow-hidden">
                <img src={m.img} alt={m.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute top-3 left-3 text-white font-extrabold text-base flex items-center gap-2">
                  {m.flag} {m.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DESCUBRE ESPAÑA ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h2 className="text-xl md:text-2xl font-extrabold mb-1">Descubre España</h2>
          <p className="text-sm text-muted-foreground mb-4">Estos destinos populares tienen mucho que ofrecer.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {cities.map((c) => (
              <Link key={c.slug} to="/oportunidades" className="group flex items-center gap-3 border border-border rounded-md p-2 hover:shadow-md transition bg-card">
                <div className="h-12 w-12 rounded-md overflow-hidden shrink-0">
                  <img src={cityImageMap[c.slug] ?? c.img} alt={c.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm truncate">{c.name}</p>
                  <p className="text-[11px] text-muted-foreground">{(40 + Math.round(Math.random() * 20))} oportunidades</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== OFERTAS DE LA SEMANA ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h2 className="text-xl md:text-2xl font-extrabold mb-1">Oportunidades de la semana</h2>
          <p className="text-sm text-muted-foreground mb-4">Acumula oportunidades antes del lunes 17 de junio.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {weekendOpps.map((o) => {
              const img = sectorImageMap[o.sectorSlug] ?? cityImageMap[o.citySlug];
              return (
                <Link key={o.slug} to="/oportunidades/$slug" params={{ slug: o.slug }} className="group block border border-border rounded-md overflow-hidden bg-card hover:shadow-lg transition">
                  <div className="relative h-40 overflow-hidden">
                    {img && <img src={img} alt={o.sectorName} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />}
                    <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                      Hueco real
                    </span>
                    <button className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/95 flex items-center justify-center text-foreground/70 hover:text-destructive">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-3">
                    <span className="inline-block bg-chart-3/15 text-chart-3 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded mb-1">Oferta destacada</span>
                    <p className="font-bold text-sm leading-tight">{o.sectorName}</p>
                    <p className="text-xs text-muted-foreground">{o.cityName}</p>
                    <p className="text-xs mt-1">Score <strong>{o.score}/100</strong> · {o.competition}</p>
                    <p className="text-xs text-right mt-2">{o.searches.toLocaleString("es-ES")} búsq/mes</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== CASOS QUE ENCANTAN ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-end justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-xl md:text-2xl font-extrabold">Casos que encantan a los clientes</h2>
            <Link to="/casos-exito" className="text-sm font-semibold text-primary hover:underline">Descubre los casos</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {loveCases.map((c) => (
              <Link key={c.slug} to="/casos-exito" className="group block border border-border rounded-md overflow-hidden bg-card hover:shadow-lg transition">
                <div className="relative h-40 overflow-hidden">
                  <img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                  <button className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/95 flex items-center justify-center text-foreground/70 hover:text-destructive">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-3">
                  <p className="font-bold text-sm leading-tight">{c.name}</p>
                  <p className="text-[11px] text-muted-foreground">{c.city} · {c.sector}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-primary text-primary-foreground text-[11px] font-bold px-1.5 py-0.5 rounded">{c.rating}</span>
                    <span className="text-[11px]"><strong>Excelente</strong> · {c.reviews} reseñas</span>
                  </div>
                  <p className="text-xs text-right mt-2 text-primary font-semibold">{c.growth}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== VIAJA MÁS Y GASTA MENOS (banner registro) ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h2 className="text-xl md:text-2xl font-extrabold mb-1">Crece más y gasta menos</h2>
          <p className="text-sm text-muted-foreground mb-4">Apúntate y recibe las mejores oportunidades de tu sector en tu email.</p>
          <div className="border border-border rounded-md bg-secondary/40 p-5 md:p-6 grid grid-cols-1 md:grid-cols-[1.4fr_auto] gap-4 items-center">
            <div className="flex items-center gap-4">
              <Gift className="h-10 w-10 text-primary shrink-0" />
              <div>
                <p className="font-extrabold">Inicia sesión y ahorra</p>
                <p className="text-sm text-muted-foreground">
                  Accede a Rankin con tu cuenta para recibir alertas, guardar oportunidades y comparar informes.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="bg-primary hover:bg-[var(--brand-deep)]">Iniciar sesión</Button>
              <Button variant="outline">Crear cuenta</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== DUAL TOOLS (mantiene la intención) ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Calcula tu potencial SEO", desc: "Estima cuántos clientes podrías captar al mes en tu sector y ciudad.", cta: "Calculadora de potencial", img: serviceAudit, to: "/oportunidades" as const, icon: BarChart3 },
            { title: "Encuentra un especialista", desc: "Conecta con un consultor Rankin para auditar tu negocio sin compromiso.", cta: "Hablar con un especialista", img: reportHandshake, to: "/como-funciona" as const, icon: Users },
          ].map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="relative rounded-lg overflow-hidden h-56 md:h-56">
                <img src={b.img} alt={b.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                <div className="relative h-full flex flex-col justify-end p-5 text-white">
                  <h3 className="font-extrabold text-lg">{b.title}</h3>
                  <p className="text-sm text-white/85 mb-3 max-w-md">{b.desc}</p>
                  <Button asChild className="self-start bg-white text-foreground hover:bg-white/90 font-semibold">
                    <Link to={b.to}><Icon className="h-4 w-4 mr-1" /> {b.cta}</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== POPULAR EN RANKIN (link grid) ===================== */}
      <section className="bg-background border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="text-xl md:text-2xl font-extrabold mb-4">Popular entre la comunidad SEO de España</h2>
          <div className="flex flex-wrap gap-2 mb-5 border-b border-border pb-3">
            {["Ciudades más buscadas", "Sectores más rentables", "Regiones", "Áreas", "Alojamiento local"].map((t, i) => (
              <button key={t} className={`text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full ${i === 0 ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}>{t}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-2 text-sm">
            {sectors.slice(0, 20).map((s) => (
              <Link key={s.slug} to="/oportunidades" className="text-primary hover:underline py-1 truncate">
                SEO para {s.name.toLowerCase()}
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-2 text-sm mt-4 pt-4 border-t border-border">
            {cities.map((c) => (
              <Link key={c.slug} to="/oportunidades" className="text-primary hover:underline py-1 truncate">
                Oportunidades en {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

// silenciar unused imports
export const _ = { navItems, Stethoscope, Scale, Scissors, Wrench, UtensilsCrossed, Building2, TrendingUp, TrendingDown, Calendar, ChevronRight, FileSearch, serviceContent, serviceGmb, reportPhone };
