import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, MapPin, Briefcase, Compass,
  BookOpen, Trophy, Route as RouteIcon, Home as HomeIcon,
  ChevronDown, ChevronRight, FileSearch, Wrench, Stethoscope,
  Scale, Scissors, UtensilsCrossed, Hammer, Calculator, Users,
  Headphones, TrendingUp, Target, Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { sectors } from "@/data/sectors";
import { cities } from "@/data/cities";
import { opportunities } from "@/data/opportunities";

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
import serviceContent from "@/assets/service-content.jpg";
import serviceAudit from "@/assets/service-audit.jpg";
import serviceGmb from "@/assets/service-gmb.jpg";
import serviceReviews from "@/assets/service-reviews.jpg";
import agency1 from "@/assets/agency-1.jpg";
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

const navItems = [
  { id: "inicio", label: "Inicio", icon: HomeIcon, to: "/" as const, novelty: false },
  { id: "oportunidades", label: "Oportunidades en Google", icon: Compass, to: "/oportunidades" as const, novelty: true },
  { id: "casos", label: "Nuestros Casos de Éxito", icon: Trophy, to: "/casos-exito" as const, novelty: false },
  { id: "como-funciona", label: "Cómo funciona", icon: RouteIcon, to: "/como-funciona" as const, novelty: false },
  { id: "guias", label: "Guías", icon: BookOpen, to: "/guias" as const, novelty: false },
];

const heroTabs = [
  { id: "fontaneros", label: "Fontaneros", icon: Wrench },
  { id: "dentistas", label: "Dentistas", icon: Stethoscope },
  { id: "abogados", label: "Abogados", icon: Scale },
  { id: "peluquerias", label: "Peluquerías", icon: Scissors },
  { id: "restaurantes", label: "Restaurantes", icon: UtensilsCrossed },
  { id: "reformas", label: "Reformas", icon: Hammer },
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
  { q: "¿Está Rankin disponible para sectores fuera de España?", a: "Por ahora trabajamos solo España (6 ciudades principales + sus áreas metropolitanas). Estamos ampliando a Portugal y Latinoamérica en 2026." },
  { q: "¿Qué recursos formativos ofrece Rankin?", a: "Tenemos guías gratuitas de SEO local, Google Maps y reseñas. Además publicamos análisis sectoriales mensuales en Oportunidades." },
  { q: "¿Cómo elijo entre informe genérico y plan personalizado?", a: "Si solo quieres ver el potencial de tu sector+ciudad, el informe gratuito basta. Si vas a contratar acciones, recomendamos el plan personalizado (290€)." },
  { q: "¿Qué necesito saber antes de invertir en SEO local?", a: "Tres cosas: que tu sector tenga búsquedas reales en tu ciudad, que tengas ficha de Google Business activa y que aceptes que los resultados llegan entre 60 y 180 días." },
];

const articles = [
  { tag: "Más rentables", title: "Los 5 sectores con mejor ROI en SEO local en 2026", img: editorialImg, badge: "Sectores más rentables" },
  { tag: "Valoración", title: "Cómo calculamos la oportunidad real de tu negocio", img: serviceAudit, badge: undefined },
  { tag: "Captación", title: "Cómo conseguir leads cualificados desde Google Maps", img: serviceContent, badge: undefined },
  { tag: "Captación", title: "Cómo encontrar clientes locales para tu negocio", img: serviceGmb, badge: undefined },
];

function Home() {
  const [activeTab, setActiveTab] = useState(heroTabs[0].id);
  const [query, setQuery] = useState("");
  const [sectorSlug, setSectorSlug] = useState("");
  const [citySlug, setCitySlug] = useState("");
  const [trendingTab, setTrendingTab] = useState<"all" | "alta" | "baja">("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const trending = useMemo(() => {
    if (trendingTab === "alta") return opportunities.filter((o) => o.competition === "Alta").slice(0, 8);
    if (trendingTab === "baja") return opportunities.filter((o) => o.competition !== "Alta").slice(0, 8);
    return opportunities.slice(0, 8);
  }, [trendingTab]);

  const canSearch = Boolean(sectorSlug && citySlug);
  const searchSlug = canSearch ? `${sectorSlug}-${citySlug}` : "";

  return (
    <div className="min-h-screen bg-background">
      {/* ===================== HERO ===================== */}
      <section className="relative text-white">
        <div className="absolute inset-0">
          <img src={cityMadrid} alt="Skyline España" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-primary/90" />
        </div>
        <div className="relative">
          <SiteHeader variant="transparent" />
          <div className="mx-auto max-w-7xl px-4 pt-4 pb-3">
            <nav className="flex flex-wrap items-center gap-2">
              {navItems.map((t) => {
                const Icon = t.icon;
                return (
                  <Link
                    key={t.id}
                    to={t.to}
                    activeOptions={{ exact: t.to === "/" }}
                    className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/30 text-white hover:bg-white/10 text-xs md:text-sm font-semibold transition"
                    activeProps={{ className: "!bg-[#0066ff] !border-[#0066ff]" }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {t.label}
                    {t.novelty && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#e91e63] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        Novedad
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mx-auto max-w-5xl px-4 pt-16 pb-24 md:pt-24 md:pb-32">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] text-white max-w-4xl">
              Detectamos oportunidades en Google sin cubrir. Encuentra la tuya.
            </h1>

            {/* Pill badge */}
            <div className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold">
              <Compass className="h-3.5 w-3.5" />
              Oportunidades en Google
              <ChevronDown className="h-3.5 w-3.5" />
            </div>

            {/* Search row — 4 fields */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-[1.1fr_1.1fr_1.1fr_0.9fr_auto] gap-2">
              <label className="flex flex-col justify-center bg-white rounded-md px-4 h-16 text-foreground border border-white/10">
                <span className="text-[11px] text-muted-foreground font-medium">Sector</span>
                <select
                  value={sectorSlug}
                  onChange={(e) => setSectorSlug(e.target.value)}
                  className="bg-transparent text-sm font-semibold focus:outline-none -ml-0.5"
                >
                  <option value="">Selecciona industria</option>
                  {sectors.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                </select>
              </label>
              <label className="flex flex-col justify-center bg-white rounded-md px-4 h-16 text-foreground border border-white/10">
                <span className="text-[11px] text-muted-foreground font-medium">Ciudad</span>
                <select
                  value={citySlug}
                  onChange={(e) => setCitySlug(e.target.value)}
                  className="bg-transparent text-sm font-semibold focus:outline-none -ml-0.5"
                >
                  <option value="">Selecciona ciudad</option>
                  {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
              </label>
              <label className="flex flex-col justify-center bg-white rounded-md px-4 h-16 text-foreground border border-white/10">
                <span className="text-[11px] text-muted-foreground font-medium">Zona / barrios</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Todos los distritos"
                  className="bg-transparent text-sm font-semibold focus:outline-none placeholder:text-foreground/70"
                />
              </label>
              <label className="flex flex-col justify-center bg-white rounded-md px-4 h-16 text-foreground border border-white/10">
                <span className="text-[11px] text-muted-foreground font-medium">Volumen mínimo</span>
                <select defaultValue="500" className="bg-transparent text-sm font-semibold focus:outline-none -ml-0.5">
                  <option value="100">100 búsq/mes</option>
                  <option value="500">500 búsq/mes</option>
                  <option value="1000">1.000 búsq/mes</option>
                  <option value="5000">5.000 búsq/mes</option>
                </select>
              </label>
              {canSearch ? (
                <Button asChild className="h-16 px-8 bg-primary text-primary-foreground hover:brightness-110 font-bold text-base">
                  <Link to="/oportunidades/$slug" params={{ slug: searchSlug }}>
                    Buscar
                  </Link>
                </Button>
              ) : (
                <Button asChild className="h-16 px-8 bg-primary text-primary-foreground hover:brightness-110 font-bold text-base">
                  <Link to="/oportunidades">
                    Buscar
                  </Link>
                </Button>
              )}
            </div>

            {/* Trust signals */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-white/90 text-sm">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary rounded" />
                Datos de Google KeywordPlanner
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary rounded" />
                Datos de Google Trends
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== STATS STRIP ===================== */}
      <section className="bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-6 items-center">
          <p className="text-sm md:text-base text-foreground/80">
            Desde hace más de 5 años, <span className="font-bold">Rankin</span> es la referencia de confianza para negocios locales que quieren crecer con SEO en Google.
          </p>
          {[
            { v: "300K+", l: "Búsquedas locales analizadas" },
            { v: "13M+", l: "Datos de Keyword Planner" },
            { v: "+800", l: "Negocios ya posicionados" },
          ].map((s) => (
            <div key={s.l} className="text-center md:text-left border-l border-border pl-6 first:border-l-0 first:pl-0 md:first:border-l md:first:pl-6">
              <p className="text-2xl md:text-3xl font-extrabold text-primary">{s.v}</p>
              <p className="text-xs text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== TRENDING ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
            <h2 className="text-xl md:text-2xl font-extrabold">Trending en Rankin</h2>
            <Link to="/oportunidades" className="text-sm font-semibold text-primary hover:underline">Ver todas</Link>
          </div>
          <div className="flex gap-5 border-b border-border mb-5 text-sm font-semibold">
            {[
              { id: "all", label: "Todas las oportunidades" },
              { id: "alta", label: "Alta demanda" },
              { id: "baja", label: "Baja competencia" },
            ].map((t) => {
              const active = trendingTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTrendingTab(t.id as typeof trendingTab)}
                  className={`relative py-3 transition ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {t.label}
                  {active && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" />}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trending.map((o) => {
              const img = sectorImageMap[o.sectorSlug] ?? cityImageMap[o.citySlug];
              return (
                <Link
                  key={o.slug}
                  to="/oportunidades/$slug"
                  params={{ slug: o.slug }}
                  className="group block rounded-lg overflow-hidden border border-border bg-card hover:shadow-lg transition"
                >
                  <div className="relative h-40 overflow-hidden">
                    {img && <img src={img} alt={`${o.sectorName} en ${o.cityName}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />}
                    <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded">
                      {o.sectorName}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground">Desde</p>
                    <p className="font-bold text-sm">{o.searches.toLocaleString("es-ES")} búsq/mes</p>
                    <p className="text-xs text-muted-foreground mt-2 truncate">{o.cityName}</p>
                    <p className="text-xs text-muted-foreground">CPC medio {o.cpc.toFixed(1)} € · {o.competition}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== EDITORIAL BANNER ===================== */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 items-center">
            <div className="relative rounded-lg overflow-hidden">
              <img src={editorialImg} alt="Próximo informe" className="w-full h-64 md:h-72 object-cover" />
              <div className="absolute top-3 left-3 bg-white rounded-md p-3 shadow-md text-foreground">
                <p className="text-[11px] font-bold uppercase text-accent-foreground/70">Próximo informe</p>
                <p className="font-extrabold text-sm">Reformas en Málaga</p>
                <p className="text-xs text-muted-foreground">9.700 búsq/mes</p>
                <p className="font-extrabold text-primary mt-1">Score 84/100</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Descubre tu próxima oportunidad en un informe</h2>
              <p className="text-muted-foreground mb-5">
                Cada semana publicamos nuevos análisis sector × ciudad con datos reales de Google. Únete a los negocios que ya han encontrado su hueco gracias a un informe Rankin.
              </p>
              <Link to="/oportunidades" className="text-sm font-semibold text-primary hover:underline">Más información sobre los informes →</Link>
              <div className="mt-4">
                <Button asChild className="bg-primary hover:bg-[var(--brand-deep)]">
                  <Link to="/oportunidades">Próximo informe · 8 de junio</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== EXPLORA CIUDADES ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="text-xl md:text-2xl font-extrabold mb-1">Explora ciudades populares</h2>
          <p className="text-sm text-muted-foreground mb-5">Ciudades españolas donde tenemos cobertura completa.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {cities.map((c) => (
              <Link
                key={c.slug}
                to="/oportunidades"
                className="group block"
              >
                <div className="relative rounded-md overflow-hidden h-28">
                  <img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                </div>
                <p className="mt-2 text-sm font-bold text-center">{c.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== JOIN BAND ===================== */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 items-center overflow-hidden">
            <div>
              <p className="text-[11px] font-bold uppercase text-accent-foreground/70">Únete a Rankin</p>
              <h3 className="text-xl md:text-2xl font-extrabold mt-1 mb-2">Sigue oportunidades, recibe alertas y compara informes — gratis.</h3>
              <p className="text-sm text-muted-foreground mb-4">Crea tu cuenta y guarda los sectores y ciudades que te interesan. Te avisamos cuando se publica un nuevo análisis.</p>
              <Button className="bg-primary hover:bg-[var(--brand-deep)]">Crear cuenta gratis</Button>
            </div>
            <div className="relative h-40 md:h-48 rounded-md overflow-hidden">
              <img src={reportPhone} alt="App Rankin" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== DUAL TOOLS ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Calcula tu potencial SEO", desc: "Estima cuántos clientes podrías captar al mes en tu sector y ciudad.",
              cta: "Calculadora de potencial", icon: Calculator, img: serviceAudit, to: "/oportunidades" as const,
            },
            {
              title: "Encuentra un especialista", desc: "Conecta con un consultor Rankin para auditar tu negocio sin compromiso.",
              cta: "Hablar con un especialista", icon: Users, img: reportHandshake, to: "/como-funciona" as const,
            },
          ].map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="relative rounded-lg overflow-hidden h-56 md:h-64">
                <img src={b.img} alt={b.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                <div className="relative h-full flex flex-col justify-end p-5 text-white">
                  <h3 className="font-extrabold text-lg">{b.title}</h3>
                  <p className="text-sm text-white/85 mb-3 max-w-md">{b.desc}</p>
                  <Button asChild className="self-start bg-white text-foreground hover:bg-white/90 font-semibold">
                    <Link to={b.to}>
                      <Icon className="h-4 w-4 mr-1" /> {b.cta}
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== SEO LOCAL EXPLICADO ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex items-end justify-between mb-5">
            <h2 className="text-xl md:text-2xl font-extrabold">SEO Local Explicado</h2>
            <Link to="/guias" className="text-sm font-semibold text-primary hover:underline">Más artículos</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {articles.map((a) => (
              <Link key={a.title} to="/guias" className="group block rounded-lg overflow-hidden border border-border bg-card hover:shadow-md transition">
                <div className="relative h-36 overflow-hidden">
                  <img src={a.img} alt={a.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                  {a.badge && (
                    <span className="absolute bottom-2 left-2 bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                      {a.badge}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{a.tag}</p>
                  <p className="font-bold text-sm mt-1 leading-snug">{a.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PODCAST BANNER ===================== */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4 items-stretch">
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-xs font-semibold uppercase text-accent-foreground/70">En Rankin · Un podcast de SEO local</p>
              <h3 className="font-extrabold text-lg mt-1 mb-2">Conversaciones honestas sobre cómo crecen los negocios locales en Google.</h3>
              <div className="flex items-center gap-3 text-muted-foreground text-xs mb-3">
                <span>Spotify</span><span>·</span><span>Apple Podcasts</span><span>·</span><span>YouTube</span>
              </div>
              <Button variant="outline" className="font-semibold">
                <Headphones className="h-4 w-4 mr-1" /> Escuchar ahora
              </Button>
            </div>
            <div className="relative rounded-lg overflow-hidden min-h-[180px] bg-red-600 text-white flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs uppercase tracking-widest">en el</p>
                <p className="text-4xl font-black tracking-tight">LOOP</p>
                <p className="text-[10px] mt-1 opacity-80">© Rankin</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== DARK STATS BAND ===================== */}
      <section className="relative text-white">
        <div className="absolute inset-0">
          <img src={agency1} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-extrabold">Los negocios en Rankin captan un 14% más de clientes locales.*</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { icon: Target, t: "Audiencia local cualificada", d: "El 95% del tráfico proviene de búsquedas con intención de compra cercana." },
              { icon: TrendingUp, t: "Convierte mejor", d: "Las llamadas y rutas a Google Maps aumentan de media un 180% en 6 meses." },
              { icon: Sparkles, t: "Más oportunidad", d: "Detectamos huecos de demanda antes de que tu competencia los vea." },
            ].map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.t}>
                  <Icon className="h-6 w-6 text-accent mb-2" />
                  <p className="font-bold">{b.t}</p>
                  <p className="text-sm text-white/80 mt-1">{b.d}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8">
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-foreground">
              Soluciones para tu negocio
            </Button>
          </div>
          <p className="text-[11px] text-white/60 mt-4">*Datos internos sobre una muestra de 320 negocios locales activos entre 2024-2026.</p>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold">SEO local: lo básico que todo negocio debe saber</h2>
            <p className="text-sm text-muted-foreground mt-2">Preguntas frecuentes de los negocios que llegan a Rankin.</p>
            <div className="mt-4">
              <Button asChild variant="outline">
                <Link to="/guias">Ver todas las guías <FileSearch className="h-4 w-4 ml-1" /></Link>
              </Button>
            </div>
          </div>
          <div className="border border-border rounded-lg bg-card divide-y divide-border">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-sm">{f.q}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 transition ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== SECTOR SHORTCUTS ===================== */}
      <section className="bg-background border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2">
            {sectors.slice(0, 12).map((s) => (
              <Link
                key={s.slug}
                to="/oportunidades"
                className="text-sm text-primary hover:underline py-1"
              >
                SEO para {s.name.toLowerCase()}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

// kept (unused vars below avoid "noUnused" if any)
export const _ = { Briefcase, ChevronRight };
