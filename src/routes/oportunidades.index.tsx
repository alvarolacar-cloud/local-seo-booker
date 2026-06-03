import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronRight, TrendingUp, TrendingDown, Minus, MapPin, ArrowRight,
  Search, Briefcase, Star, Info, Shield, Clock, Sparkles, BadgeCheck, Zap, Phone,
  ChevronLeft, BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { opportunities } from "@/data/opportunities";
import { cities } from "@/data/cities";
import { sectors } from "@/data/sectors";
import { cases } from "@/data/cases";
import { useMemo, useState } from "react";
import cityMadrid from "@/assets/city-madrid.jpg";
import cityBarcelona from "@/assets/city-barcelona.jpg";
import cityValencia from "@/assets/city-valencia.jpg";
import citySevilla from "@/assets/city-sevilla.jpg";
import cityBilbao from "@/assets/city-bilbao.jpg";
import cityMalaga from "@/assets/city-malaga.jpg";
import localBusiness from "@/assets/local-business.jpg";
import serviceAudit from "@/assets/service-audit.jpg";
import serviceContent from "@/assets/service-content.jpg";
import serviceGmb from "@/assets/service-gmb.jpg";

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
  madrid: cityMadrid, barcelona: cityBarcelona, valencia: cityValencia,
  sevilla: citySevilla, bilbao: cityBilbao, malaga: cityMalaga,
};

function compBadge(c: "Baja" | "Media" | "Alta") {
  if (c === "Baja") return { cls: "bg-primary/10 text-primary", icon: <TrendingDown className="h-3 w-3" /> };
  if (c === "Alta") return { cls: "bg-destructive/15 text-destructive", icon: <TrendingUp className="h-3 w-3" /> };
  return { cls: "bg-accent/30 text-accent-foreground", icon: <Minus className="h-3 w-3" /> };
}

const ticketBySector: Record<string, number> = {
  fontaneros: 180, electricistas: 160, reformas: 8500, dentistas: 750, abogados: 1200,
  inmobiliarias: 4500, peluquerias: 35, talleres: 320, restaurantes: 28, gimnasios: 45,
  estetica: 70, veterinarias: 95, academias: 120, fotografos: 1800,
};

function estimateOpportunity(sectorSlug: string, citySlug: string) {
  const exact = opportunities.find((o) => o.sectorSlug === sectorSlug && o.citySlug === citySlug);
  if (exact) return { kind: "exact" as const, opp: exact };
  const sector = sectors.find((s) => s.slug === sectorSlug);
  const city = cities.find((c) => c.slug === citySlug);
  if (!sector || !city) return null;
  const cityWeight: Record<string, number> = { madrid: 1, barcelona: 0.85, valencia: 0.45, sevilla: 0.4, malaga: 0.35, bilbao: 0.3 };
  const w = cityWeight[citySlug] ?? 0.3;
  const searches = Math.round(sector.monthlySearches * w);
  return { kind: "estimate" as const, sectorName: sector.name, cityName: city.name, citySlug, searches };
}

const popularDestinations = [
  { citySlug: "madrid", name: "Madrid", note: "21 sectores analizados", searches: "+82.000 búsquedas/mes" },
  { citySlug: "barcelona", name: "Barcelona", note: "19 sectores analizados", searches: "+71.000 búsquedas/mes" },
  { citySlug: "valencia", name: "Valencia", note: "14 sectores analizados", searches: "+38.000 búsquedas/mes" },
];

const topSectorsMadrid = [
  { name: "Restaurantes", searches: 33400, comp: "Alta" as const, score: 76 },
  { name: "Clínicas dentales", searches: 22300, comp: "Alta" as const, score: 78 },
  { name: "Inmobiliarias", searches: 18500, comp: "Media" as const, score: 81 },
];

const articles = [
  { img: serviceAudit, tag: "Guía", title: "Cómo aparecer el primero en Google Maps en tu ciudad", read: "8 min" },
  { img: serviceContent, tag: "Casos", title: "5 negocios locales que multiplicaron x3 sus llamadas con SEO" },
  { img: serviceGmb, tag: "Truco", title: "El truco de las reseñas que duplica tu CTR en Google" },
  { img: localBusiness, tag: "Ranking", title: "Los 10 sectores con más demanda local en España 2026" },
];

const faqs = [
  { q: "¿De dónde salen estos datos?", a: "Cruzamos Google Keyword Planner, Search Console real de nuestros clientes y análisis SERP por ciudad." },
  { q: "¿Qué es el score de oportunidad?", a: "Nota 0-100 que mezcla volumen, dificultad para entrar al top 3, CPC e intención comercial." },
  { q: "¿Y si mi sector o ciudad no aparece?", a: "Te lo preparamos a medida en 48h sin coste. Solo dinos sector, ciudad y barrios." },
  { q: "¿Esto sustituye a una auditoría SEO?", a: "No. Es el paso previo: te dice si vale la pena invertir." },
  { q: "¿Cuánto tarda en notarse el SEO local?", a: "Las primeras llamadas desde Google Maps suelen llegar entre 30 y 60 días." },
  { q: "¿Necesito tener web para posicionar?", a: "Para Maps no es imprescindible, pero una ficha + landing local rinde mucho más." },
  { q: "¿Trabajáis con autónomos o solo empresas?", a: "Ambos. Tenemos planes desde 290€/mes pensados para autónomos." },
];

function OportunidadesIndex() {
  const [sectorSlug, setSectorSlug] = useState<string>(sectors[0]?.slug ?? "");
  const [citySlug, setCitySlug] = useState<string>(cities[0]?.slug ?? "");
  const result = useMemo(() => estimateOpportunity(sectorSlug, citySlug), [sectorSlug, citySlug]);

  const sectorName = result ? (result.kind === "exact" ? result.opp.sectorName : result.sectorName) : "";
  const cityName = result ? (result.kind === "exact" ? result.opp.cityName : result.cityName) : "";
  const searches = result ? (result.kind === "exact" ? result.opp.searches : result.searches) : 0;
  const ticket = ticketBySector[sectorSlug] ?? 100;

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src={cityMadrid} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/85 to-primary/95" />
        <div className="relative">
          <SiteHeader variant="transparent" />
          <div className="mx-auto max-w-6xl px-4 pt-10 pb-16 md:pt-14 md:pb-20 text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] max-w-3xl">
              Descubre tu oportunidad de <span className="text-accent">SEO local</span>
            </h1>
            <p className="mt-4 text-lg text-white/85 max-w-2xl">
              Elige tu sector y tu ciudad. Te decimos cuánta gente lo busca y cuánto vale cada cliente.
            </p>

            <div className="mt-8 bg-card text-foreground rounded-xl shadow-2xl border border-border/40 p-2 md:p-2.5">
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_auto] gap-2 items-stretch">
                <label className="relative flex items-center bg-background rounded-lg border border-border/60 px-4 h-14 focus-within:border-primary transition">
                  <Briefcase className="h-4 w-4 text-muted-foreground mr-3 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Sector</span>
                    <select value={sectorSlug} onChange={(e) => setSectorSlug(e.target.value)} className="w-full bg-transparent text-base font-semibold focus:outline-none cursor-pointer -ml-0.5">
                      {sectors.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                    </select>
                  </div>
                </label>
                <label className="relative flex items-center bg-background rounded-lg border border-border/60 px-4 h-14 focus-within:border-primary transition">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-3 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Ciudad</span>
                    <select value={citySlug} onChange={(e) => setCitySlug(e.target.value)} className="w-full bg-transparent text-base font-semibold focus:outline-none cursor-pointer -ml-0.5">
                      {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                    </select>
                  </div>
                </label>
                <Button className="h-14 px-7 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base rounded-lg">
                  <Search className="h-5 w-5 mr-1.5" /> Buscar
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 px-2 pt-3 pb-1 text-xs text-foreground/70">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="accent-primary" /> Incluir barrios y distritos</label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-primary" /> Solo ciudades con &lt;3 competidores top</label>
              </div>
            </div>

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
                  <p className="text-xs text-muted-foreground mt-1">Valor medio por cliente captado</p>
                </div>
                {result.kind === "exact" ? (
                  <Button asChild className="h-auto md:w-44 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base rounded-xl shadow-lg flex-col gap-1 py-5">
                    <Link to="/oportunidades/$slug" params={{ slug: result.opp.slug }}>Ver informe<ArrowRight className="h-5 w-5" /></Link>
                  </Button>
                ) : (
                  <Button asChild className="h-auto md:w-44 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base rounded-xl shadow-lg flex-col gap-1 py-5">
                    <Link to="/como-funciona">Informe a medida<ArrowRight className="h-5 w-5" /></Link>
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Notice strip pegado al hero */}
          <div className="relative -mb-8">
            <div className="mx-auto max-w-6xl px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { icon: <Info className="h-4 w-4" />, title: "Datos actualizados en mayo 2026", text: "Google Keyword Planner + Search Console real de nuestros 480 clientes." },
                  { icon: <Sparkles className="h-4 w-4" />, title: "84 nuevos cruces sector × ciudad", text: "Hemos añadido nuevos sectores de servicios profesionales este mes." },
                  { icon: <BadgeCheck className="h-4 w-4" />, title: "Sin registro, sin tarjeta", text: "Toda la información de oportunidad es 100% gratuita y consultable al momento." },
                ].map((n) => (
                  <div key={n.title} className="bg-card border border-border rounded-lg p-3.5 flex gap-3 shadow-[var(--shadow-card)]">
                    <div className="h-8 w-8 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">{n.icon}</div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold leading-tight">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{n.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 mt-20 mb-16 space-y-20">
        {/* Destinos populares */}
        <section>
          <SectionHeader title="Ciudades populares para SEO local" subtitle="Donde más negocios están invirtiendo en posicionarse este mes." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {popularDestinations.map((d) => (
              <button key={d.citySlug} onClick={() => { setCitySlug(d.citySlug); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="group relative h-44 rounded-xl overflow-hidden border border-border hover:border-primary transition text-left">
                <img src={cityImageMap[d.citySlug]} alt={d.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-background">
                  <p className="text-2xl font-extrabold">{d.name}</p>
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span className="opacity-85">{d.note}</span>
                    <span className="bg-accent text-accent-foreground font-bold px-2 py-0.5 rounded">{d.searches}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Encuentra oportunidades cerca de ti — product cards estilo Skyscanner */}
        <section>
          <SectionHeader title="Encuentra oportunidades de SEO local cerca de ti" subtitle="Cruces sector × ciudad analizados con datos reales de Google." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {opportunities.map((o) => {
              const badge = compBadge(o.competition);
              const ticketVal = ticketBySector[o.sectorSlug] ?? 100;
              return (
                <Link key={o.slug} to="/oportunidades/$slug" params={{ slug: o.slug }}
                  className="group block border border-border rounded-xl overflow-hidden bg-card shadow-[var(--shadow-card)] hover:border-primary hover:-translate-y-0.5 transition">
                  <div className="relative h-32 overflow-hidden">
                    <img src={cityImageMap[o.citySlug]} alt={o.cityName} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    {o.score >= 85 && (
                      <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded">
                        ★ Oferta destacada
                      </span>
                    )}
                    <span className={`absolute top-2 right-2 inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${badge.cls}`}>
                      {badge.icon} Comp. {o.competition}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                      <MapPin className="h-3 w-3 text-primary" /> {o.cityName}
                    </div>
                    <h3 className="font-bold text-base leading-snug group-hover:text-primary transition">
                      {o.sectorName} en {o.cityName}
                    </h3>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Búsquedas/mes</p>
                        <p className="text-2xl font-extrabold text-primary leading-none">{o.searches.toLocaleString("es-ES")}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Ticket medio</p>
                        <p className="text-base font-bold">{ticketVal.toLocaleString("es-ES")} €</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Score <span className="font-bold text-foreground">{o.score}/100</span></span>
                      <span className="inline-flex items-center font-semibold text-primary">
                        Ver informe <ChevronRight className="h-3.5 w-3.5 ml-0.5 group-hover:translate-x-0.5 transition" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Logos/clientes */}
        <section>
          <p className="text-center text-sm font-semibold text-muted-foreground mb-5">
            +480 negocios locales confían en nosotros en toda España
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
            {["Fontanería Ríos", "Clínica Sonríe", "Barbería El Capitán", "Taller Norte", "Abogados Luna", "Inm. Mediterráneo"].map((b) => (
              <span key={b} className="text-sm font-bold tracking-tight text-foreground/70">{b}</span>
            ))}
          </div>
        </section>

        {/* Trabaja con tranquilidad — 6 trust cards */}
        <section>
          <SectionHeader title="Trabaja con nosotros con total tranquilidad" subtitle="Lo que incluye cada análisis y cada plan de SEO local con Rankin." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { icon: <Shield />, t: "Datos reales, no estimaciones", d: "Volúmenes, CPC y dificultad sacados de Google + Search Console de clientes reales." },
              { icon: <Clock />, t: "Informes en 48h máximo", d: "Si tu sector o ciudad no aparece, te lo preparamos a medida en menos de dos días." },
              { icon: <BadgeCheck />, t: "Sin permanencia, sin letra pequeña", d: "Trabajamos mes a mes. Si no funciona en 90 días, te devolvemos la última cuota." },
              { icon: <Sparkles />, t: "Plan accionable, no PDF de adorno", d: "Cada informe termina con 4 pasos concretos para tu negocio, tu ciudad y tu barrio." },
              { icon: <Zap />, t: "Resultados desde el día 30", d: "Las primeras llamadas desde Google Maps suelen llegar antes de que termine el primer mes." },
              { icon: <Phone />, t: "Tu account manager, una persona", d: "Sin tickets, sin chatbots. Tienes su teléfono y responde el mismo día." },
            ].map((f) => (
              <div key={f.t} className="border border-border rounded-lg p-5 bg-card">
                <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-3">{f.icon}</div>
                <h3 className="font-bold mb-1">{f.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mejores sectores ahora mismo */}
        <section>
          <div className="flex items-end justify-between gap-3 mb-5 flex-wrap">
            <SectionHeader title="Los sectores con más demanda en Madrid ahora mismo" subtitle="Ranking actualizado mensualmente según búsquedas reales en Google." compact />
            <div className="flex gap-1">
              <button className="h-8 w-8 border border-border rounded flex items-center justify-center hover:border-primary"><ChevronLeft className="h-4 w-4" /></button>
              <button className="h-8 w-8 border border-border rounded flex items-center justify-center hover:border-primary"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topSectorsMadrid.map((s, i) => {
              const b = compBadge(s.comp);
              return (
                <div key={s.name} className="border border-border rounded-xl bg-card p-5 shadow-[var(--shadow-card)]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl font-extrabold text-primary">#{i + 1}</div>
                      <div>
                        <p className="font-bold leading-tight">{s.name}</p>
                        <p className="text-xs text-muted-foreground">Madrid</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-sm font-bold px-2 py-1 rounded">
                        <Star className="h-3.5 w-3.5 fill-current" /> {(s.score / 10).toFixed(1)}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">Score oportunidad</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <Row label="Búsquedas/mes" value={s.searches.toLocaleString("es-ES")} />
                    <Row label="Competencia" value={<span className={`inline-flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded ${b.cls}`}>{b.icon} {s.comp}</span>} />
                    <Row label="Top 3 alcanzable" value="3-6 meses" />
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold">
                    Ver detalle <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Datos de interés */}
        <section>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-1">Datos de interés sobre SEO local</h2>
          <p className="text-sm text-muted-foreground mb-6">Lo que más nos preguntan los negocios antes de empezar.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: "46%", l: "de las búsquedas en Google tienen intención local" },
              { v: "78%", l: "de quien busca local llama o visita en 24h" },
              { v: "3,5x", l: "más conversión que un anuncio de Google Ads" },
              { v: "30-60", l: "días para ver las primeras llamadas reales" },
            ].map((s) => (
              <div key={s.l} className="border border-border rounded-lg p-5 bg-card text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-primary">{s.v}</p>
                <p className="text-xs text-muted-foreground mt-2 leading-snug">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cómo encontrar la mejor oportunidad */}
        <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Cómo encontrar tu mejor oportunidad de SEO local</h2>
            <p className="text-muted-foreground mb-5 leading-relaxed">
              No todos los sectores ni todas las ciudades convienen para invertir en SEO local. La clave está en cruzar tres datos: cuánta gente busca tu servicio cada mes, cómo de difícil es entrar al top 3 y cuánto vale cada cliente que captes. Estos son los pasos que seguimos:
            </p>
            <div className="space-y-3">
              {[
                { t: "Empieza por el volumen real", d: "Sin búsquedas, no hay SEO. Filtra primero por sectores con +500 búsquedas/mes en tu ciudad." },
                { t: "Mira la competencia local, no la nacional", d: "Lo que rankea por «fontanero» no es lo mismo que por «fontanero Tetuán». Mucha menos competencia." },
                { t: "Calcula tu retorno con el ticket medio", d: "10 clientes nuevos al mes a 180€ son 1.800€. ¿Cuánto te cuesta el SEO? Esa es tu cuenta." },
                { t: "Ataca primero los barrios premium", d: "Empieza por 2-3 distritos con poder adquisitivo y replica el modelo después." },
              ].map((s, i) => (
                <div key={s.t} className="flex gap-3 p-4 border border-border rounded-lg bg-card">
                  <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                  <div>
                    <p className="font-bold text-sm">{s.t}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:sticky lg:top-6">
            <div className="rounded-xl overflow-hidden border border-border shadow-[var(--shadow-card)]">
              <img src={localBusiness} alt="" className="w-full h-48 object-cover" />
              <div className="p-5 bg-card">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Casos reales</p>
                <h3 className="font-bold text-lg leading-tight mb-2">Mira cómo lo hicieron otros negocios como el tuyo</h3>
                <p className="text-sm text-muted-foreground mb-4">6 historias completas con cifras reales: visitas, llamadas, ingresos y agenda.</p>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 font-bold">
                  <Link to="/casos-exito">Ver casos de éxito <ArrowRight className="h-4 w-4 ml-1" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-1">Preguntas frecuentes sobre oportunidades de SEO local</h2>
          <p className="text-sm text-muted-foreground mb-6">Resolvemos las dudas más habituales antes de pedir tu informe.</p>
          <div className="border border-border rounded-lg bg-card divide-y divide-border">
            {faqs.map((f) => (
              <details key={f.q} className="group">
                <summary className="cursor-pointer list-none p-5 flex items-center justify-between gap-4 font-semibold text-sm hover:bg-secondary/50 transition">
                  <span>{f.q}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition shrink-0" />
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA banner con imagen */}
        <section className="relative rounded-xl overflow-hidden border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-56 md:h-auto">
              <img src={serviceGmb} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="bg-primary text-primary-foreground p-8 md:p-10">
              <span className="inline-flex items-center gap-1 bg-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded mb-4">
                Informe a medida · 48h · Gratis
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight">¿No ves tu sector o tu ciudad?</h2>
              <p className="text-white/85 mb-5 text-sm leading-relaxed">Hacemos informes a medida en 48h. Te decimos cuántas búsquedas tiene tu servicio en tu zona y cómo de difícil sería posicionarte top 3.</p>
              <div className="flex flex-wrap gap-2">
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
                  <Link to="/como-funciona">Pedir informe a medida</Link>
                </Button>
                <Button asChild variant="outline" className="bg-transparent border-white/30 text-primary-foreground hover:bg-white/10 font-semibold">
                  <Link to="/casos-exito">Ver casos</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Artículos / planes inteligentes */}
        <section>
          <SectionHeader title="Aprende más sobre SEO local" subtitle="Guías, casos y trucos para sacar más partido a Google Maps en tu ciudad." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {articles.map((a) => (
              <Link to="/guias" key={a.title} className="group block">
                <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                  <img src={a.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <span className="absolute top-2 left-2 bg-card text-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">{a.tag}</span>
                </div>
                <h3 className="font-bold text-sm leading-tight group-hover:text-primary transition">{a.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><BookOpen className="h-3 w-3" /> Lectura 6-8 min</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Casos destacados rápidos */}
        <section>
          <SectionHeader title="Casos de negocios reales con SEO local" subtitle="Resultados verificables de clientes en distintas ciudades y sectores." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cases.slice(0, 3).map((c) => (
              <div key={c.slug} className="border border-border rounded-xl bg-card overflow-hidden">
                <img src={c.img} alt="" className="w-full h-32 object-cover" />
                <div className="p-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>{c.city} · {c.sector}</span>
                    <span className="inline-flex items-center gap-1 font-bold text-foreground">
                      <Star className="h-3 w-3 fill-accent text-accent" /> {c.rating}
                    </span>
                  </div>
                  <p className="font-bold text-sm">{c.name}</p>
                  <p className="text-xs text-primary font-semibold mt-1">{c.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom popular searches grid — estilo footer Skyscanner */}
        <section>
          <SectionHeader title="Búsquedas populares en Rankin" subtitle="Los cruces sector × ciudad que más se consultan." />
          <div className="border border-border rounded-lg bg-card p-5">
            <div className="flex gap-2 flex-wrap border-b border-border pb-3 mb-4">
              {sectors.slice(0, 6).map((s, i) => (
                <button key={s.slug} onClick={() => setSectorSlug(s.slug)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition ${sectorSlug === s.slug || (i === 0 && !sectorSlug) ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
                  {s.short}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2 text-sm">
              {cities.flatMap((c) =>
                sectors.slice(0, 5).map((s) => (
                  <button key={`${s.slug}-${c.slug}`} onClick={() => { setSectorSlug(s.slug); setCitySlug(c.slug); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="text-left text-muted-foreground hover:text-primary truncate">
                    {s.short} en {c.name}
                  </button>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function SectionHeader({ title, subtitle, compact = false }: { title: string; subtitle?: string; compact?: boolean }) {
  return (
    <div className={compact ? "" : "mb-6"}>
      <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="font-semibold text-sm">{value}</span>
    </div>
  );
}
