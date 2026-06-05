import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ChevronRight, MapPin, TrendingUp, TrendingDown, Minus, ArrowRight,
  Search, Wallet, Target, CheckCircle2, AlertTriangle, Sparkles,
  Trophy, Calendar, Building2, FileText, Share2, Heart, Clock,
  Smartphone, Users, BarChart3, Globe, MessageSquare, Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { SiteHeader } from "@/components/site/Header";
import { NavChips } from "@/components/site/NavChips";
import { SiteFooter } from "@/components/site/Footer";
import { getOpportunity, parseOpportunitySlug, buildSyntheticOpportunity, type Opportunity } from "@/data/opportunities";
import { getSector } from "@/data/sectors";
import { getCity } from "@/data/cities";
import { cases } from "@/data/cases";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useMemo, useState } from "react";
import cityMadrid from "@/assets/city-madrid.jpg";
import cityBarcelona from "@/assets/city-barcelona.jpg";
import cityValencia from "@/assets/city-valencia.jpg";
import citySevilla from "@/assets/city-sevilla.jpg";
import cityBilbao from "@/assets/city-bilbao.jpg";
import cityMalaga from "@/assets/city-malaga.jpg";
import imgStorefront from "@/assets/report-storefront.jpg";
import imgMap from "@/assets/report-map.jpg";
import imgPhone from "@/assets/report-phone.jpg";
import imgHandshake from "@/assets/report-handshake.jpg";

const cityImageMap: Record<string, string> = {
  madrid: cityMadrid, barcelona: cityBarcelona, valencia: cityValencia,
  sevilla: citySevilla, bilbao: cityBilbao, malaga: cityMalaga,
};

const ticketBySector: Record<string, number> = {
  fontaneros: 180, electricistas: 160, reformas: 8500, dentistas: 750, abogados: 1200,
  inmobiliarias: 4500, peluquerias: 35, talleres: 320, restaurantes: 28, gimnasios: 45,
  estetica: 70, veterinarias: 95, academias: 120, fotografos: 1800,
};
const conversionBySector: Record<string, number> = {
  fontaneros: 0.08, electricistas: 0.08, reformas: 0.015, dentistas: 0.03, abogados: 0.025,
  inmobiliarias: 0.012, peluquerias: 0.06, talleres: 0.05, restaurantes: 0.07, gimnasios: 0.035,
  estetica: 0.045, veterinarias: 0.06, academias: 0.04, fotografos: 0.02,
};

export const Route = createFileRoute("/oportunidades/$slug")({
  loader: ({ params }) => {
    const existing = getOpportunity(params.slug);
    if (existing) return { opp: existing };
    const parsed = parseOpportunitySlug(params.slug);
    if (!parsed) throw notFound();
    const sector = getSector(parsed.sectorSlug);
    const city = getCity(parsed.citySlug);
    if (!sector || !city) throw notFound();
    const opp = buildSyntheticOpportunity({
      sectorSlug: sector.slug,
      citySlug: city.slug,
      sectorName: sector.name,
      cityName: city.name,
      sectorMonthlySearches: sector.monthlySearches,
      keyword: sector.keyword,
    });
    return { opp };
  },
  head: ({ loaderData }) => {
    const o = loaderData?.opp;
    const title = o ? `${o.sectorName} en ${o.cityName}: informe de oportunidad SEO local | Rankin` : "Informe | Rankin";
    const desc = o ? `${o.searches.toLocaleString("es-ES")} búsquedas/mes de ${o.sectorName.toLowerCase()} en ${o.cityName}. Mira cuánto dinero hay sobre la mesa, qué keywords lo mueven y qué distritos están menos saturados.` : "";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:url", content: o ? `/oportunidades/${o.slug}` : "/oportunidades" },
        { property: "og:image", content: o ? cityImageMap[o.citySlug] : "" },
      ],
      links: o ? [{ rel: "canonical", href: `/oportunidades/${o.slug}` }] : [],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Informe no encontrado</h1>
        <Button asChild className="mt-4"><Link to="/oportunidades">Ver oportunidades</Link></Button>
      </div>
    </div>
  ),
  errorComponent: () => <div className="p-10 text-center">Error cargando el informe.</div>,
  component: OpportunityDetail,
});

const fmtEur = (n: number) => new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
const fmt = (n: number) => n.toLocaleString("es-ES");

function compMeta(c: "Baja" | "Media" | "Alta") {
  if (c === "Baja") return { cls: "bg-primary/10 text-primary border-primary/20", icon: <TrendingDown className="h-3.5 w-3.5" />, text: "Competencia baja" };
  if (c === "Alta") return { cls: "bg-destructive/10 text-destructive border-destructive/20", icon: <TrendingUp className="h-3.5 w-3.5" />, text: "Competencia alta" };
  return { cls: "bg-accent/30 text-accent-foreground border-accent/40", icon: <Minus className="h-3.5 w-3.5" />, text: "Competencia media" };
}

function scoreLabel(score: number) {
  if (score >= 85) return "Excelente";
  if (score >= 75) return "Muy buena";
  if (score >= 65) return "Buena";
  return "Interesante";
}

function OpportunityDetail() {
  const { opp } = Route.useLoaderData() as { opp: Opportunity };
  const related = cases.filter((c) => c.sectorSlug === opp.sectorSlug);
  const maxKw = Math.max(...opp.topKeywords.map((k) => k.volume));
  const cityImg = cityImageMap[opp.citySlug];
  const badge = compMeta(opp.competition);

  const ticket = ticketBySector[opp.sectorSlug] ?? 200;
  const baseConv = conversionBySector[opp.sectorSlug] ?? 0.04;

  const [capturePct, setCapturePct] = useState(10);
  const sim = useMemo(() => {
    const visits = Math.round(opp.searches * (capturePct / 100));
    const clients = Math.round(visits * baseConv);
    const revenue = clients * ticket;
    return { visits, clients, revenue };
  }, [opp.searches, capturePct, baseConv, ticket]);

  const ceilingRevenue = Math.round(opp.searches * 0.2 * baseConv * ticket);

  return (
    <div className="min-h-screen bg-background">
      <NavChips />

      <div className="mx-auto max-w-7xl px-4 pt-6">
        <Link to="/oportunidades" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          <ChevronRight className="h-3 w-3 rotate-180" /> Volver a oportunidades
        </Link>
      </div>

      {/* TÍTULO + SCORE + CTA (estilo cabecera hotel) */}
      <header className="mx-auto max-w-7xl px-4 pt-4 pb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-secondary text-foreground px-2 py-1 rounded">
                <FileText className="h-3 w-3" /> Informe de oportunidad
              </span>
              <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider border px-2 py-1 rounded ${badge.cls}`}>
                {badge.icon} {badge.text}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-secondary text-muted-foreground px-2 py-1 rounded">
                <Calendar className="h-3 w-3" /> Actualizado hoy
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.05]">
              {opp.sectorName} en {opp.cityName}
            </h1>
            <p className="mt-2 text-muted-foreground inline-flex items-center gap-1.5 text-sm">
              <MapPin className="h-4 w-4" /> {opp.cityName}, España · {opp.districts.length} distritos analizados
            </p>
          </div>

          {/* Score grande tipo hotel */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold">Oportunidad {scoreLabel(opp.score).toLowerCase()}</p>
              <p className="text-xs text-muted-foreground">Score sobre 100</p>
            </div>
            <div className="bg-primary text-primary-foreground rounded-lg rounded-tl-none px-4 py-2 text-2xl font-extrabold leading-none min-w-[64px] text-center">
              {opp.score}
            </div>
            <div className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="icon" aria-label="Compartir"><Share2 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" aria-label="Guardar"><Heart className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </header>

      {/* MOSAICO: mapa real grande + 2 imágenes */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[280px] md:h-[420px] rounded-2xl overflow-hidden">
          <iframe
            title={`Mapa de ${opp.cityName}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(opp.cityName + ', España')}&output=embed`}
            className="col-span-2 row-span-2 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <img src={imgStorefront} alt="" loading="lazy" className="w-full h-full object-cover" />
          <img src={imgHandshake} alt="" loading="lazy" className="w-full h-full object-cover" />
        </div>

        {/* Barra ticket + CTA, estilo "144€ Ver ofertas" */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-border rounded-xl bg-card px-4 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">Ticket medio del servicio</p>
              <p className="text-2xl font-extrabold text-primary leading-none mt-0.5">{fmtEur(ticket)}</p>
            </div>
            <div className="hidden sm:block h-10 w-px bg-border" />
            <div className="hidden sm:block">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">Techo de ingresos</p>
              <p className="text-2xl font-extrabold leading-none mt-0.5">{fmtEur(ceilingRevenue)}<span className="text-xs text-muted-foreground font-medium">/mes</span></p>
            </div>
          </div>
          <Button asChild className="font-bold h-11 px-5">
            <a href="#simulador">Calcular mi caso <ArrowRight className="h-4 w-4 ml-1" /></a>
          </Button>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 mt-12 mb-20 space-y-14">
        {/* COMPARAR KEYWORDS Y OPORTUNIDADES (tabs estilo "comparar habitaciones") */}
        <section>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-1">Comparar keywords y oportunidades</h2>
          <p className="text-sm text-muted-foreground mb-5">No todas las búsquedas valen lo mismo. Estas son las que llenan la agenda.</p>

          <Tabs defaultValue="dinero">
            <TabsList className="bg-secondary">
              <TabsTrigger value="dinero">Por dinero</TabsTrigger>
              <TabsTrigger value="volumen">Por volumen</TabsTrigger>
              <TabsTrigger value="servicios">Por servicio</TabsTrigger>
            </TabsList>

            <TabsContent value="dinero" className="mt-5 space-y-2">
              {[...opp.topKeywords]
                .map((k) => ({ ...k, revenue: Math.round(k.volume * 0.18 * baseConv * ticket) }))
                .sort((a, b) => b.revenue - a.revenue)
                .map((k, i) => (
                  <KeywordRow key={k.kw} i={i} kw={k.kw} volume={k.volume} maxVolume={maxKw} revenue={k.revenue} />
                ))}
            </TabsContent>
            <TabsContent value="volumen" className="mt-5 space-y-2">
              {[...opp.topKeywords].sort((a, b) => b.volume - a.volume).map((k, i) => {
                const revenue = Math.round(k.volume * 0.18 * baseConv * ticket);
                return <KeywordRow key={k.kw} i={i} kw={k.kw} volume={k.volume} maxVolume={maxKw} revenue={revenue} />;
              })}
            </TabsContent>
            <TabsContent value="servicios" className="mt-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {opp.topServices.map((s, i) => (
                  <div key={s} className="flex items-center justify-between border border-border rounded-lg p-4 bg-card">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-muted-foreground w-5">#{i + 1}</span>
                      <span className="font-semibold">{s}</span>
                    </div>
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1"><Tag className="h-3 w-3" /> Alta demanda</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* DATOS DE INTERÉS (4 mini stats con icono) */}
        <section>
          <h2 className="text-2xl font-extrabold mb-4">Datos de interés</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <DataPoint icon={<Search className="h-5 w-5" />} label="Búsquedas/mes" value={fmt(opp.searches)} />
            <DataPoint icon={<Wallet className="h-5 w-5" />} label="Ticket medio" value={fmtEur(ticket)} />
            <DataPoint icon={<Trophy className="h-5 w-5" />} label="Ingresos potenciales/mes" value={fmtEur(ceilingRevenue)} />
            <DataPoint icon={<Users className="h-5 w-5" />} label="CPC medio Google Ads" value={`${opp.cpc.toFixed(2)} €`} />
          </div>
        </section>

        {/* SERVICIOS (grid con iconos tipo amenities) */}
        <section>
          <h2 className="text-2xl font-extrabold mb-1">Qué incluye el ranking en Google</h2>
          <p className="text-sm text-muted-foreground mb-5">Las palancas que mueven el posicionamiento local de tu negocio.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: <MapPin className="h-5 w-5" />, t: "Ficha Google" },
              { icon: <MessageSquare className="h-5 w-5" />, t: "Reseñas" },
              { icon: <Globe className="h-5 w-5" />, t: "Web local" },
              { icon: <Building2 className="h-5 w-5" />, t: "Citaciones NAP" },
              { icon: <FileText className="h-5 w-5" />, t: "Posts GBP" },
              { icon: <BarChart3 className="h-5 w-5" />, t: "Schema local" },
            ].map((a) => (
              <div key={a.t} className="bg-secondary rounded-lg p-4 flex flex-col items-center text-center gap-2">
                <div className="text-primary">{a.icon}</div>
                <p className="text-xs font-semibold">{a.t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* VISIÓN DEL SECTOR EN LA CIUDAD */}
        <section>
          <h2 className="text-2xl font-extrabold mb-3">Visión del mercado de {opp.sectorName.toLowerCase()} en {opp.cityName}</h2>
          <div className="border border-border rounded-xl bg-card p-6 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              El mercado de <strong className="text-foreground">{opp.sectorName.toLowerCase()} en {opp.cityName}</strong> concentra <strong className="text-foreground">{fmt(opp.searches)} búsquedas mensuales</strong> en Google, lo que lo sitúa como uno de los servicios más buscados por los residentes y propietarios de la zona. Con un ticket medio de <strong className="text-foreground">{fmtEur(ticket)}</strong>, cada cliente que entra por SEO local tiene un impacto directo y medible en la facturación.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La competencia en {opp.cityName} es <strong className="text-foreground">{opp.competition.toLowerCase()}</strong>, lo que significa que hay espacio real para nuevos jugadores que inviertan en su presencia digital. Hemos analizado <strong className="text-foreground">{opp.districts.length} distritos</strong> y en varios de ellos la demanda supera con creces la oferta bien posicionada: aparecer en el top 3 del mapa local puede suponer la diferencia entre una agenda vacía y una lista de espera.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Los usuarios no buscan solo "{opp.sectorName.toLowerCase()}"; buscan urgencia, confianza y cercanía. Frases como <em>"{opp.sectorName.toLowerCase()} cerca de mí"</em> o <em>"{opp.sectorName.toLowerCase()} urgente {opp.cityName}"</em> dominan el long-tail y convierten a una velocidad muy superior al tráfico genérico. Capturar esa intención en el momento exacto de la búsqueda es lo que convierte una ficha de Google Business en un imán de clientes.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Si consigues posicionarte en los primeros resultados locales, el techo de ingresos estimado solo por este canal es de <strong className="text-foreground">{fmtEur(ceilingRevenue)}/mes</strong>, y eso sin invertir un solo euro en publicidad de pago. En sectores con ticket elevado como este, el retorno de una estrategia SEO local bien ejecutada se amortiza en semanas, no en meses.
            </p>
          </div>
        </section>

        {/* EVOLUCIÓN DEMANDA (gráfico) */}
        <section>
          <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
            <h2 className="text-2xl font-extrabold">Evolución de la demanda (12 meses)</h2>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
              <TrendingUp className="h-3 w-3" /> Crecimiento sostenido
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Búsquedas mensuales relacionadas con «{opp.sectorName.toLowerCase()}» en {opp.cityName}.</p>
          <div className="border border-border rounded-xl bg-card p-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={opp.trend} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#gradTrend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* SIMULADOR (el "wow") */}
        <section id="simulador" className="border border-border rounded-2xl bg-card p-6 md:p-8 shadow-[var(--shadow-card)]">
          <div className="flex items-start gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-accent/30 text-accent-foreground flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold">¿Cuánto puedes facturar tú?</h2>
              <p className="text-sm text-muted-foreground mt-1">Mueve la barra y simula qué porcentaje de esas {fmt(opp.searches)} búsquedas captarías al mes.</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 items-stretch">
            <div className="bg-secondary rounded-xl p-6">
              <label className="block">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-semibold text-muted-foreground">Búsquedas que captas al mes</span>
                  <span className="text-2xl font-extrabold text-primary">{capturePct}%</span>
                </div>
                <input
                  type="range" min={1} max={30} step={1} value={capturePct}
                  onChange={(e) => setCapturePct(parseInt(e.target.value))}
                  className="w-full accent-primary h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5">
                  <span>1%</span><span>10%</span><span>30% (top 3)</span>
                </div>
              </label>
              <div className="mt-6 space-y-3 text-sm">
                <SimRow label="Visitas potenciales" value={fmt(sim.visits)} sub="visitas/mes a tu web o ficha" />
                <SimRow label="Clientes nuevos" value={fmt(sim.clients)} sub={`conversión media del ${(baseConv * 100).toFixed(1)}%`} />
              </div>
            </div>
            <div className="bg-primary text-primary-foreground rounded-xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden">
              <img src={cityImg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-10" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">Facturación estimada</p>
                <p className="mt-2 text-5xl md:text-6xl font-extrabold leading-none">{fmtEur(sim.revenue)}</p>
                <p className="mt-1 text-white/80 text-sm">al mes · solo de SEO local</p>
                <div className="mt-5 flex items-center gap-2 text-xs text-white/85">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>Equivalente a {fmtEur(sim.revenue * 12)} al año</span>
                </div>
                <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90 font-bold w-full md:w-auto">
                  <Link to="/como-funciona">Quiero capturar este % <ArrowRight className="h-4 w-4 ml-1" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CASOS DE ÉXITO (estilo "opiniones de huéspedes") */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-extrabold mb-1">Casos en el sector</h2>
            <p className="text-sm text-muted-foreground mb-5">Negocios de {opp.sectorName.toLowerCase()} a los que ya hemos posicionado.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((c) => (
                <article key={c.slug} className="border border-border rounded-xl overflow-hidden bg-card hover:border-primary hover:-translate-y-0.5 transition">
                  <img src={c.img} alt={c.name} className="w-full h-36 object-cover" loading="lazy" />
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground">{c.city}</p>
                    <h3 className="font-bold mt-0.5">{c.name}</h3>
                    <p className="text-sm text-primary font-extrabold mt-2 inline-flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" /> {c.growth}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ZONA GEOGRÁFICA (barrios) */}
        <section>
          <div className="flex items-end justify-between gap-3 mb-4 flex-wrap">
            <div>
              <h2 className="text-2xl font-extrabold">Zona geográfica</h2>
              <p className="text-sm text-muted-foreground">Barrios de {opp.cityName} con demanda destacada en {opp.sectorName.toLowerCase()}.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {opp.districts.map((d) => (
              <span key={d.name} className="text-sm font-medium text-muted-foreground inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-primary shrink-0" />
                {d.name}
              </span>
            ))}
          </div>
        </section>

        {/* MEJOR MOMENTO PARA EMPEZAR (estilo entrada/salida) */}
        <section>
          <h2 className="text-2xl font-extrabold mb-4">Mejor momento para posicionarte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 border border-border rounded-xl bg-card p-5">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center"><Clock className="h-5 w-5" /></div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Pico de demanda</p>
                <p className="text-xl font-extrabold">Octubre – Marzo</p>
                <p className="text-xs text-muted-foreground">Empieza ahora para llegar posicionado.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border border-border rounded-xl bg-card p-5">
              <div className="h-12 w-12 rounded-full bg-accent/30 text-accent-foreground flex items-center justify-center"><Clock className="h-5 w-5" /></div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Valle de demanda</p>
                <p className="text-xl font-extrabold">Julio – Agosto</p>
                <p className="text-xs text-muted-foreground">Momento perfecto para crear contenido.</p>
              </div>
            </div>
          </div>
        </section>

        {/* INFORMACIÓN ÚTIL (tabla clave-valor) */}
        <section>
          <h2 className="text-2xl font-extrabold mb-4">Información útil</h2>
          <div className="border border-border rounded-xl bg-card overflow-hidden divide-y divide-border">
            <InfoRow icon={<Smartphone className="h-4 w-4" />} label="Dispositivo principal" value="78% móvil · 22% escritorio" />
            <InfoRow icon={<Clock className="h-4 w-4" />} label="Horas pico de búsqueda" value="9-11h y 18-21h" />
            <InfoRow icon={<Target className="h-4 w-4" />} label="Intención de búsqueda" value="Comercial / contratación inmediata" />
            <InfoRow icon={<AlertTriangle className="h-4 w-4" />} label="Top 3 ocupado por" value={opp.competition === "Alta" ? "Agencias y portales nacionales" : opp.competition === "Media" ? "Competidores locales fuertes" : "Fichas mal optimizadas — hueco real"} />
            <InfoRow icon={<MapPin className="h-4 w-4" />} label="Cobertura recomendada" value={`${opp.districts.length} distritos de ${opp.cityName} + municipios limítrofes`} />
            <InfoRow icon={<Calendar className="h-4 w-4" />} label="Tiempo medio a top 3" value="3 a 6 meses con trabajo constante" />
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-extrabold mb-1">{opp.sectorName} en {opp.cityName}: preguntas frecuentes</h2>
          <p className="text-sm text-muted-foreground mb-4">Las dudas habituales antes de empezar.</p>
          <Accordion type="single" collapsible className="border border-border rounded-xl bg-card divide-y divide-border">
            <AccordionItem value="q1" className="px-4 border-0">
              <AccordionTrigger className="font-semibold">¿Cuánto se tarda en aparecer en el top 3 de Google?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Entre 3 y 6 meses para keywords locales en {opp.cityName} con un sector de competencia {opp.competition.toLowerCase()}. La ficha de Google Maps suele moverse antes (4-8 semanas).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" className="px-4 border-0">
              <AccordionTrigger className="font-semibold">¿Cuánto cuesta posicionarse?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Depende de tu situación actual y de la competencia. En este sector y ciudad el retorno suele cubrir la inversión antes del mes 4.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3" className="px-4 border-0">
              <AccordionTrigger className="font-semibold">¿Y si ya estoy en Google Maps pero nadie me llama?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Es lo más común. La ficha existe pero está sin optimizar: fotos, categorías, reseñas, posts y servicios. Cuando se trabaja bien, las llamadas suben en 2-3 semanas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4" className="px-4 border-0">
              <AccordionTrigger className="font-semibold">¿De dónde sale este informe?</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Cruzamos datos públicos de Google (volúmenes, CPC, competidores), nuestra base de proyectos de SEO local y la realidad del mercado en {opp.cityName}. Actualizado mensualmente.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* CTA final */}
        <section className="relative overflow-hidden rounded-2xl">
          <img src={cityImg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary/80" />
          <div className="relative p-8 md:p-12 text-center text-primary-foreground">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-accent text-accent-foreground px-2.5 py-1 rounded mb-4">
              <Target className="h-3 w-3" /> Informe a medida · gratis · 48h
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 max-w-3xl mx-auto">
              Te ayudamos a captar clientes de {opp.sectorName.toLowerCase()} en {opp.cityName}
            </h2>
            <p className="text-white/85 mb-8 max-w-2xl mx-auto">
              No solo analizamos el mercado: ejecutamos la estrategia que te lleva a la primera página de Google, a tu ficha optimizada y a recibir llamadas reales.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-5xl mx-auto text-left">
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                <Search className="h-5 w-5 text-accent mb-3" />
                <p className="font-bold text-sm mb-1">SEO Local</p>
                <p className="text-xs text-white/75 leading-relaxed">Posicionamos tu web y tu ficha de Google Maps para que te encuentren antes que a la competencia cuando busquen {opp.sectorName.toLowerCase()} en {opp.cityName}.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                <Globe className="h-5 w-5 text-accent mb-3" />
                <p className="font-bold text-sm mb-1">Web que convierte</p>
                <p className="text-xs text-white/75 leading-relaxed">Diseñamos o optimizamos tu página para que cada visita se traduzca en contacto: velocidad, móvil-first y copy orientado a la contratación.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                <MessageSquare className="h-5 w-5 text-accent mb-3" />
                <p className="font-bold text-sm mb-1">Ficha Google Maps</p>
                <p className="text-xs text-white/75 leading-relaxed">Optimizamos tu perfil de empresa: fotos, reseñas, publicaciones y palabras clave para que Google te muestre en el mapa local.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                <BarChart3 className="h-5 w-5 text-accent mb-3" />
                <p className="font-bold text-sm mb-1">Resultados medibles</p>
                <p className="text-xs text-white/75 leading-relaxed">Te mostramos cada mes posiciones, tráfico, llamadas y formularios recibidos para que sepas exactamente qué está funcionando.</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold h-12 px-6 text-base">
                Pedir mi informe personalizado <ArrowRight className="h-5 w-5 ml-1" />
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 h-12 px-6 font-semibold">
                <Link to="/como-funciona">Ver cómo trabajamos</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function KeywordRow({ i, kw, volume, maxVolume, revenue }: { i: number; kw: string; volume: number; maxVolume: number; revenue: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto] gap-4 items-center border border-border rounded-lg p-4 bg-card">
      <div className="text-xs font-bold text-muted-foreground w-6 shrink-0">#{i + 1}</div>
      <div className="min-w-0">
        <p className="font-bold text-sm md:text-base truncate">«{kw}»</p>
        <div className="mt-1.5 h-1.5 bg-secondary rounded overflow-hidden max-w-md">
          <div className="h-full bg-primary" style={{ width: `${(volume / maxVolume) * 100}%` }} />
        </div>
      </div>
      <div className="text-right md:w-28">
        <p className="text-sm font-bold">{fmt(volume)}</p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">búsq/mes</p>
      </div>
      <div className="text-right md:w-32 bg-primary/5 rounded-lg px-3 py-2">
        <p className="text-base font-extrabold text-primary">{fmtEur(revenue)}</p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">potencial/mes</p>
      </div>
    </div>
  );
}

function DataPoint({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="border border-border rounded-xl bg-card p-4">
      <div className="h-9 w-9 rounded-lg bg-secondary text-primary flex items-center justify-center mb-2">{icon}</div>
      <p className="text-xl font-extrabold leading-tight">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}

function SimRow({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-border/60 pb-2 last:border-0">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
      <p className="text-xl font-extrabold text-foreground">{value}</p>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="grid grid-cols-[180px_1fr] md:grid-cols-[240px_1fr] gap-4 px-4 py-3 items-start">
      <div className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <div className="text-sm">{value}</div>
    </div>
  );
}
