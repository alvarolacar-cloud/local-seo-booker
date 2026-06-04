import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, MapPin,
  ChevronDown, ChevronRight, ChevronLeft, Heart, Wrench, Stethoscope, Scale,
  Scissors, UtensilsCrossed, Hammer, Calculator, Users, Headphones, Play,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site/Footer";
import { SiteHeader } from "@/components/site/Header";
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
import reportHandshake from "@/assets/report-handshake.jpg";

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


const sectorChips = [
  { slug: "fontaneros", label: "Fontaneros", Icon: Wrench },
  { slug: "electricistas", label: "Electricistas", Icon: Wrench },
  { slug: "dentistas", label: "Dentistas", Icon: Stethoscope },
  { slug: "abogados", label: "Abogados", Icon: Scale },
  { slug: "peluquerias", label: "Peluquerías", Icon: Scissors },
  { slug: "restaurantes", label: "Restaurantes", Icon: UtensilsCrossed },
  { slug: "reformas", label: "Reformas", Icon: Hammer },
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

const partnerLogos = ["Inboundcycle", "SEMrush", "Webpositer", "Aukera", "Human Level", "Internet República"];

const articles = [
  { tag: "Guía 2026", title: "Los 10 sectores locales más rentables este año", excerpt: "Análisis sector por sector con volumen, competencia y CPC estimado.", img: editorialImg },
  { tag: "SEO local", title: "Cómo posicionar tu ficha de Google Business en 30 días", excerpt: "Checklist práctico de señales locales que mueven la aguja en SERP.", img: serviceGmb },
  { tag: "Casos reales", title: "De 0 a 8.100 visitas: un electricista en Barcelona", excerpt: "Estrategia de contenido + reseñas + citations paso a paso.", img: serviceContent },
  { tag: "Benchmark", title: "Dentistas vs fisioterapeutas en SEO local", excerpt: "Volumen, intención de búsqueda y barreras de entrada.", img: serviceAudit },
];

const faqs = [
  { q: "¿Está Rankin disponible para sectores fuera de España?", a: "Por ahora trabajamos solo España (6 ciudades principales + sus áreas metropolitanas). Estamos ampliando a Portugal y Latinoamérica en 2026." },
  { q: "¿Qué recursos formativos ofrece Rankin?", a: "Tenemos guías gratuitas de SEO local, Google Maps y reseñas. Además publicamos análisis sectoriales mensuales en Oportunidades." },
  { q: "¿Cómo elijo entre informe genérico y plan personalizado?", a: "Si solo quieres ver el potencial de tu sector+ciudad, el informe gratuito basta. Si vas a contratar acciones, recomendamos el plan personalizado (290€)." },
  { q: "¿Qué necesito saber antes de invertir en SEO local?", a: "Tres cosas: que tu sector tenga búsquedas reales en tu ciudad, que tengas ficha de Google Business activa y que aceptes que los resultados llegan entre 60 y 180 días." },
];

function Home() {
  const [sectorSlug, setSectorSlug] = useState("");
  const [citySlug, setCitySlug] = useState("");
  const [trendingTab, setTrendingTab] = useState<"all" | "alta" | "baja" | "cpc">("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [footerTab, setFooterTab] = useState<"oportunidades" | "sectores" | "ciudades">("oportunidades");

  const trending = useMemo(() => {
    if (trendingTab === "alta") return opportunities.filter((o) => o.competition === "Alta").slice(0, 8);
    if (trendingTab === "baja") return opportunities.filter((o) => o.competition !== "Alta").slice(0, 8);
    if (trendingTab === "cpc") return [...opportunities].sort((a, b) => b.cpc - a.cpc).slice(0, 8);
    return opportunities.slice(0, 8);
  }, [trendingTab]);

  const canSearch = Boolean(sectorSlug && citySlug);
  const searchSlug = canSearch ? `${sectorSlug}-${citySlug}` : "";

  const footerLinks: Record<typeof footerTab, { label: string; slug?: string }[]> = {
    oportunidades: [
      { label: "Fontaneros en Madrid", slug: "fontaneros-madrid" },
      { label: "Dentistas en Barcelona", slug: "dentistas-barcelona" },
      { label: "Abogados en Valencia", slug: "abogados-valencia" },
      { label: "Peluquerías en Sevilla", slug: "peluquerias-sevilla" },
      { label: "Talleres en Bilbao", slug: "talleres-bilbao" },
      { label: "Reformas en Málaga", slug: "reformas-malaga" },
      { label: "Electricistas en Barcelona", slug: "electricistas-barcelona" },
      { label: "Restaurantes en Madrid", slug: "restaurantes-madrid" },
    ],
    sectores: sectors.slice(0, 8).map((s) => ({ label: `SEO para ${s.name.toLowerCase()}` })),
    ciudades: cities.map((c) => ({ label: `SEO local en ${c.name}` })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ===================== TOP BAR ===================== */}
      <SiteHeader />

      {/* ===================== HERO (Statista-style) ===================== */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1280px] px-6 pt-16 pb-32 text-center">
          <h1 className="text-balance text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
            <span className="text-accent">Oportunidades</span> de SEO local sin cubrir
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-primary-foreground/80">
            Datos reales de más de 170 sectores y 150 ciudades en España.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-10 flex max-w-3xl items-stretch overflow-hidden rounded-md bg-white shadow-2xl">
            <div className="flex flex-1 items-center gap-2 px-4">
              <select
                value={sectorSlug}
                onChange={(e) => setSectorSlug(e.target.value)}
                className="flex-1 min-w-0 bg-transparent py-4 text-sm font-medium text-foreground outline-none"
              >
                <option value="">Selecciona sector</option>
                {sectors.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
              </select>
              <span className="h-6 w-px bg-border" />
              <select
                value={citySlug}
                onChange={(e) => setCitySlug(e.target.value)}
                className="flex-1 min-w-0 bg-transparent py-4 text-sm font-medium text-foreground outline-none"
              >
                <option value="">Selecciona ciudad</option>
                {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
            <Button asChild className="h-auto rounded-none rounded-r-md bg-[#0066ff] px-8 text-white hover:brightness-110 font-bold">
              {canSearch ? (
                <Link to="/oportunidades/$slug" params={{ slug: searchSlug }}>
                  Buscar <Search className="ml-2 h-4 w-4" />
                </Link>
              ) : (
                <Link to="/oportunidades">
                  Buscar <Search className="ml-2 h-4 w-4" />
                </Link>
              )}
            </Button>
          </div>

          {/* Chips: sectores populares */}
          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
            {sectorChips.map(({ slug, label }) => (
              <button
                key={slug}
                onClick={() => setSectorSlug(slug)}
                className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 transition"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Diagonal cut bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 bg-background"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 50% 0)" }}
        />
      </section>

      {/* ===================== STATS + LOGOS ===================== */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-6 py-10 md:grid-cols-4">
          <p className="text-sm leading-relaxed text-muted-foreground md:col-span-1">
            Llevamos más de <b>5 años</b> analizando el SEO local en España, la marca de confianza para autónomos y agencias.
          </p>
          {[
            { v: "300K+", l: "Búsquedas locales analizadas" },
            { v: "13M+", l: "Datos de Keyword Planner" },
            { v: "+800", l: "Negocios ya posicionados" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-2xl font-bold">{s.v}</div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-[1280px] px-6 pb-10">
          <p className="text-center text-sm text-muted-foreground">Agencias y empresas que ya usan Rankin</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-lg font-semibold text-muted-foreground/70">
            {partnerLogos.map((l) => (
              <span key={l} className={l === "SEMrush" ? "italic" : l === "Aukera" ? "text-primary" : ""}>{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TRENDING ===================== */}
      <section className="mx-auto max-w-[1280px] px-6 py-10">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-xl font-semibold">Tendencias en Rankin</h2>
          <Link to="/oportunidades" className="text-sm font-medium text-primary hover:underline">Ver todas</Link>
        </div>

        <div className="mb-5 flex gap-6 border-b border-border text-sm">
          {[
            { id: "all", label: "Más buscados" },
            { id: "baja", label: "Baja competencia" },
            { id: "cpc", label: "CPC alto" },
            { id: "alta", label: "Alta demanda" },
          ].map((t) => {
            const active = trendingTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTrendingTab(t.id as typeof trendingTab)}
                className={`-mb-px border-b-2 pb-2 ${active ? "border-primary font-medium text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((o) => {
            const img = sectorImageMap[o.sectorSlug] ?? cityImageMap[o.citySlug];
            return (
              <Link
                key={o.slug}
                to="/oportunidades/$slug"
                params={{ slug: o.slug }}
                className="group block overflow-hidden rounded-md border border-border bg-card transition hover:shadow-lg"
              >
                <div className="relative h-36">
                  {img && <img src={img} alt={`${o.sectorName} en ${o.cityName}`} loading="lazy" className="h-full w-full object-cover" />}
                  <span className="absolute left-2 top-2 rounded bg-card/95 px-2 py-0.5 text-[11px] font-medium">{o.sectorName}</span>
                  <button className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-card/90 text-muted-foreground hover:text-primary">
                    <Heart className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="p-3">
                  <div className="text-sm font-semibold">Desde {o.searches.toLocaleString("es-ES")}/mes búsq.</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{o.sectorName} · {o.cityName}</div>
                  <div className="mt-1 text-xs text-muted-foreground">CPC medio {o.cpc.toFixed(1)} € · {o.competition}</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">Score: <b className="text-foreground">{o.score}</b></div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===================== FEATURED OPPORTUNITY ===================== */}
      <section className="bg-muted">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-6 py-14 md:grid-cols-2 md:items-center">
          <div className="relative overflow-hidden rounded-md">
            <img src={editorialImg} alt="Reformas en Málaga" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <div className="absolute left-4 top-4 rounded-md bg-card p-3 shadow-md">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Próximo informe</div>
              <div className="mt-1 text-sm font-semibold">Reformas integrales</div>
              <div className="text-xs text-muted-foreground">Málaga</div>
              <div className="mt-2 text-sm font-bold">9.700/mes búsq.</div>
              <div className="text-xs text-muted-foreground">Score 84 · Comp. media</div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Descubre tu próxima oportunidad en un informe</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Cada semana publicamos nuevos análisis sector × ciudad con datos reales de Google.
              Únete y recibe alertas cuando aparezca un nicho a tu medida.
            </p>
            <Link to="/oportunidades" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Saber más sobre oportunidades destacadas <ChevronRight className="h-4 w-4" />
            </Link>
            <div className="mt-6 inline-block rounded-md border border-border bg-card p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Próximo informe · 12 de junio</div>
              <Link to="/oportunidades" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">Reservar plaza →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== POPULAR CITIES ===================== */}
      <section className="mx-auto max-w-[1280px] px-6 py-14">
        <h2 className="text-xl font-semibold">Explora ciudades populares</h2>
        <div className="mt-2 flex gap-6 border-b border-border text-sm">
          <button className="-mb-px border-b-2 border-primary pb-2 font-medium text-primary">Ciudades ES</button>
          <button className="-mb-px border-b-2 border-transparent pb-2 text-muted-foreground hover:text-foreground">Ciudades LATAM</button>
        </div>
        <div className="relative mt-6">
          <button className="absolute -left-3 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow md:flex">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {cities.map((c) => (
              <Link key={c.slug} to="/oportunidades" className="group">
                <div className="overflow-hidden rounded-md">
                  <img src={c.img} alt={c.name} loading="lazy" className="aspect-[4/5] w-full object-cover transition group-hover:scale-105" />
                </div>
                <div className="mt-2 text-sm font-semibold">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.note}</div>
              </Link>
            ))}
          </div>
          <button className="absolute -right-3 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow md:flex">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Join banner */}
        <div className="mt-10 grid items-center gap-4 rounded-md border border-border bg-muted px-6 py-5 md:grid-cols-[1fr_auto_auto]">
          <div>
            <div className="font-semibold">Únete a Rankin</div>
            <p className="text-sm text-muted-foreground">Guarda búsquedas, recibe alertas de nuevos nichos y exporta informes en CSV.</p>
          </div>
          <div className="hidden h-16 w-40 rounded bg-gradient-to-r from-primary/20 to-primary/40 md:block" />
          <a href="#" className="justify-self-start rounded-md border border-foreground/20 bg-card px-4 py-2 text-sm font-medium hover:bg-background md:justify-self-end">
            Registrarse gratis
          </a>
        </div>
      </section>

      {/* ===================== TOOLS ===================== */}
      <section className="bg-muted">
        <div className="mx-auto grid max-w-[1280px] gap-4 px-6 py-12 md:grid-cols-2">
          {[
            { title: "Calcula tu potencial SEO", desc: "Estima tráfico y leads para tu sector + ciudad.", cta: "Calculadora SEO", icon: Calculator, img: serviceAudit, to: "/oportunidades" as const },
            { title: "Habla con un especialista", desc: "Auditamos tu negocio sin compromiso y te decimos si tiene hueco.", cta: "Pedir auditoría", icon: Users, img: reportHandshake, to: "/como-funciona" as const },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.title} className="relative overflow-hidden rounded-md bg-foreground text-white">
                <img src={t.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="relative flex h-56 flex-col justify-end p-6">
                  <h3 className="text-lg font-semibold">{t.title}</h3>
                  <p className="mt-1 text-sm text-white/80">{t.desc}</p>
                  <Button asChild className="mt-3 w-fit rounded-md bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/25">
                    <Link to={t.to}><Icon className="h-4 w-4 mr-1" />{t.cta}</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== ARTICLES ===================== */}
      <section className="mx-auto max-w-[1280px] px-6 py-14">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-xl font-semibold">SEO local explicado</h2>
          <Link to="/guias" className="text-sm font-medium text-primary hover:underline">Más artículos</Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((a) => (
            <Link key={a.title} to="/guias" className="group">
              <div className="relative overflow-hidden rounded-md">
                <img src={a.img} alt={a.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <span className="absolute left-3 top-3 rounded bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground">{a.tag}</span>
              </div>
              <h3 className="mt-3 font-semibold leading-snug group-hover:text-primary">{a.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===================== PODCAST STRIP ===================== */}
      <section className="mx-auto max-w-[1280px] px-6 pb-14">
        <div className="grid items-stretch overflow-hidden rounded-md border border-border md:grid-cols-2">
          <div className="bg-card p-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">El podcast</div>
            <h3 className="mt-1 text-xl font-semibold">En la SERP: conversaciones de SEO local</h3>
            <p className="mt-2 text-sm text-muted-foreground">Cada quincena hablamos con un profesional que ha levantado un negocio local gracias al SEO.</p>
            <Button variant="outline" className="mt-4 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
              <Headphones className="h-4 w-4 mr-1" /> Escuchar episodios
            </Button>
          </div>
          <div className="relative flex items-center justify-center bg-primary p-12 text-primary-foreground">
            <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 200 100" preserveAspectRatio="none">
              <path d="M0,80 L20,60 L40,70 L60,40 L80,55 L100,30 L120,50 L140,25 L160,45 L180,20 L200,35 L200,100 L0,100 Z" fill="white" />
            </svg>
            <div className="relative text-right leading-none">
              <div className="text-xs font-light uppercase tracking-widest opacity-80">en la</div>
              <div className="text-5xl font-black tracking-tight">SERP</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CTA STRIP ===================== */}
      <section className="relative isolate overflow-hidden bg-foreground text-white">
        <img src={editorialImg} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25" />
        <div className="mx-auto grid max-w-[1280px] gap-6 px-6 py-14 md:grid-cols-3">
          <div className="md:col-span-3">
            <h3 className="text-2xl font-semibold">Capta más clientes locales que tu competencia</h3>
          </div>
          {[
            { t: "Audiencia cualificada", d: "+95% de visitas con intención local clara." },
            { t: "Capta prospectos", d: "Leads cualificados gracias a SEO local hipersegmentado." },
            { t: "Más oportunidades", d: "Aparece antes en Google Maps y en el pack local." },
          ].map((c) => (
            <div key={c.t}>
              <div className="font-semibold">{c.t}</div>
              <p className="mt-1 text-sm text-white/70">{c.d}</p>
            </div>
          ))}
          <div className="md:col-span-3">
            <Button asChild className="rounded-md bg-white/15 px-5 py-2.5 text-sm font-medium backdrop-blur hover:bg-white/25">
              <Link to="/como-funciona">Explorar planes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="mx-auto grid max-w-[1280px] gap-10 px-6 py-14 md:grid-cols-[1fr_2fr]">
        <div>
          <h3 className="text-xl font-semibold">Fundamentos del SEO local: preguntas clave para autónomos y agencias</h3>
        </div>
        <div className="divide-y divide-border rounded-md border border-border bg-card">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium"
                >
                  {f.q}
                  <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition ${open ? "rotate-180" : ""}`} />
                </button>
                {open && <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== FOOTER TOP TABS ===================== */}
      <div className="border-t border-border bg-muted">
        <div className="mx-auto max-w-[1280px] px-6 pt-8">
          <div className="flex gap-6 border-b border-border text-sm">
            {[
              { id: "oportunidades", label: "Oportunidades" },
              { id: "sectores", label: "Sectores" },
              { id: "ciudades", label: "Ciudades" },
            ].map((t) => {
              const active = footerTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setFooterTab(t.id as typeof footerTab)}
                  className={`-mb-px border-b-2 pb-2 ${active ? "border-primary font-medium text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 py-6 text-xs text-muted-foreground md:grid-cols-4">
            {footerLinks[footerTab].map((l) => (
              l.slug ? (
                <Link key={l.label} to="/oportunidades/$slug" params={{ slug: l.slug }} className="hover:text-primary">{l.label}</Link>
              ) : (
                <Link key={l.label} to="/oportunidades" className="hover:text-primary">{l.label}</Link>
              )
            ))}
            <Link to="/oportunidades" className="font-medium text-primary">Ver más →</Link>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
