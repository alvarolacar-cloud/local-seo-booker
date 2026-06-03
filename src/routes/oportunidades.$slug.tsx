import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ChevronRight, MapPin, TrendingUp, TrendingDown, Minus, ArrowRight,
  Search, Wallet, Target, CheckCircle2, AlertTriangle, Sparkles,
  Trophy, Star, Calendar, Building2, FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { getOpportunity, type Opportunity } from "@/data/opportunities";
import { cases } from "@/data/cases";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart } from "recharts";
import { useMemo, useState } from "react";
import cityMadrid from "@/assets/city-madrid.jpg";
import cityBarcelona from "@/assets/city-barcelona.jpg";
import cityValencia from "@/assets/city-valencia.jpg";
import citySevilla from "@/assets/city-sevilla.jpg";
import cityBilbao from "@/assets/city-bilbao.jpg";
import cityMalaga from "@/assets/city-malaga.jpg";

const cityImageMap: Record<string, string> = {
  madrid: cityMadrid, barcelona: cityBarcelona, valencia: cityValencia,
  sevilla: citySevilla, bilbao: cityBilbao, malaga: cityMalaga,
};

// Ticket medio por servicio (€)
const ticketBySector: Record<string, number> = {
  fontaneros: 180, electricistas: 160, reformas: 8500, dentistas: 750, abogados: 1200,
  inmobiliarias: 4500, peluquerias: 35, talleres: 320, restaurantes: 28, gimnasios: 45,
  estetica: 70, veterinarias: 95, academias: 120, fotografos: 1800,
};
// % típico de búsquedas que se convierten en cliente real (CTR top 3 × conv. media)
const conversionBySector: Record<string, number> = {
  fontaneros: 0.08, electricistas: 0.08, reformas: 0.015, dentistas: 0.03, abogados: 0.025,
  inmobiliarias: 0.012, peluquerias: 0.06, talleres: 0.05, restaurantes: 0.07, gimnasios: 0.035,
  estetica: 0.045, veterinarias: 0.06, academias: 0.04, fotografos: 0.02,
};

export const Route = createFileRoute("/oportunidades/$slug")({
  loader: ({ params }) => {
    const opp = getOpportunity(params.slug);
    if (!opp) throw notFound();
    return { opp: opp! };
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

function OpportunityDetail() {
  const { opp } = Route.useLoaderData() as { opp: Opportunity };
  const related = cases.filter((c) => c.sectorSlug === opp.sectorSlug);
  const maxKw = Math.max(...opp.topKeywords.map((k) => k.volume));
  const cityImg = cityImageMap[opp.citySlug];
  const badge = compMeta(opp.competition);

  const ticket = ticketBySector[opp.sectorSlug] ?? 200;
  const baseConv = conversionBySector[opp.sectorSlug] ?? 0.04;

  // Simulador: % de búsquedas mensuales captadas
  const [capturePct, setCapturePct] = useState(10);
  const sim = useMemo(() => {
    const visits = Math.round(opp.searches * (capturePct / 100));
    const clients = Math.round(visits * baseConv);
    const revenue = clients * ticket;
    return { visits, clients, revenue };
  }, [opp.searches, capturePct, baseConv, ticket]);

  // Potencial "techo" = capturando ~20% (top 3 Google)
  const ceilingRevenue = Math.round(opp.searches * 0.2 * baseConv * ticket);

  return (
    <div className="min-h-screen bg-background">
      {/* HERO con imagen ciudad */}
      <section className="relative overflow-hidden">
        <img src={cityImg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/90 to-primary/95" />
        <div className="relative">
          <SiteHeader variant="transparent" />
          <div className="mx-auto max-w-7xl px-4 pt-8 pb-10 md:pt-10 md:pb-14 text-primary-foreground">
            <Link to="/oportunidades" className="text-xs text-white/70 hover:text-white inline-flex items-center gap-1 mb-4">
              <ChevronRight className="h-3 w-3 rotate-180" /> Volver a oportunidades
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-white/10 backdrop-blur px-2.5 py-1 rounded">
                <FileText className="h-3 w-3" /> Informe de oportunidad
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-white/10 backdrop-blur px-2.5 py-1 rounded">
                <Calendar className="h-3 w-3" /> Actualizado hoy
              </span>
              <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider border px-2.5 py-1 rounded bg-card/90 ${badge.cls.replace('bg-primary/10','').replace('bg-destructive/10','').replace('bg-accent/30','')}`}>
                {badge.icon} {badge.text}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] max-w-4xl">
              {opp.sectorName} <span className="text-accent">en {opp.cityName}</span>
            </h1>
            <p className="mt-3 text-white/85 max-w-2xl text-lg">
              Este es el dinero real que mueve tu sector cada mes en {opp.cityName}. Y lo que podrías llevarte tú si estás en el top 3 de Google.
            </p>

            {/* 3 KPIs gigantes */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
              <HeroKpi
                icon={<Search className="h-4 w-4" />}
                label="Búsquedas al mes"
                value={fmt(opp.searches)}
                hint={`Personas buscando «${opp.sectorName.toLowerCase()}» en ${opp.cityName}`}
              />
              <HeroKpi
                icon={<Wallet className="h-4 w-4" />}
                label="Ticket medio del servicio"
                value={fmtEur(ticket)}
                hint="Lo que vale de media cada cliente captado"
              />
              <HeroKpi
                icon={<Trophy className="h-4 w-4" />}
                label="Techo de ingresos al mes"
                value={fmtEur(ceilingRevenue)}
                hint="Si dominas el top 3 de Google en tu zona"
                highlight
              />
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 mt-12 mb-20 space-y-16">
        {/* SIMULADOR — el "wow" */}
        <section className="border border-border rounded-2xl bg-card p-6 md:p-8 shadow-[var(--shadow-card)]">
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
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={capturePct}
                  onChange={(e) => setCapturePct(parseInt(e.target.value))}
                  className="w-full accent-primary h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5">
                  <span>1% (web invisible)</span>
                  <span>10% (web decente)</span>
                  <span>30% (top 3 Google)</span>
                </div>
              </label>

              <div className="mt-6 space-y-3 text-sm">
                <SimRow label="Visitas potenciales" value={fmt(sim.visits)} sub="visitas/mes a tu web o ficha" />
                <SimRow label="Clientes nuevos" value={fmt(sim.clients)} sub={`asumiendo conversión media del ${(baseConv * 100).toFixed(1)}%`} />
              </div>
            </div>

            <div className="bg-primary text-primary-foreground rounded-xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden">
              <img src={cityImg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-10" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">Facturación estimada</p>
                <p className="mt-2 text-5xl md:text-6xl font-extrabold leading-none">
                  {fmtEur(sim.revenue)}
                </p>
                <p className="mt-1 text-white/80 text-sm">al mes · solo de SEO local</p>
                <div className="mt-5 flex items-center gap-2 text-xs text-white/85">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>Equivalente a {fmtEur(sim.revenue * 12)} al año</span>
                </div>
                <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90 font-bold w-full md:w-auto">
                  <Link to="/como-funciona">
                    Quiero capturar este % <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* TENDENCIA */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 border border-border rounded-2xl p-6 bg-card">
            <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
              <h2 className="text-xl font-extrabold">Evolución de la demanda (12 meses)</h2>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                <TrendingUp className="h-3 w-3" /> Crecimiento sostenido
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Búsquedas mensuales relacionadas con «{opp.sectorName.toLowerCase()}» en {opp.cityName}.</p>
            <div className="h-64 w-full">
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
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-border rounded-2xl p-6 bg-card flex flex-col">
            <h2 className="text-xl font-extrabold mb-1">Foto del mercado hoy</h2>
            <p className="text-sm text-muted-foreground mb-4">Lo que verás si buscas en Google ahora mismo desde {opp.cityName}.</p>
            <ul className="space-y-3 text-sm">
              <FactRow icon={<AlertTriangle className="h-4 w-4" />} tone="warn"
                text={`Top 3 ocupado por ${opp.competition === "Alta" ? "agencias y portales nacionales" : opp.competition === "Media" ? "competidores locales fuertes" : "fichas mal optimizadas, hueco real"}.`} />
              <FactRow icon={<Building2 className="h-4 w-4" />} tone="info"
                text={`${opp.districts.length}+ distritos con demanda real en ${opp.cityName}.`} />
              <FactRow icon={<Star className="h-4 w-4" />} tone="warn"
                text="Reseñas concentradas en 2-3 negocios: oportunidad de adelantarles." />
              <FactRow icon={<CheckCircle2 className="h-4 w-4" />} tone="ok"
                text={`Score de oportunidad: ${opp.score}/100`} />
            </ul>
          </div>
        </section>

        {/* DISTRITOS */}
        <section>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-1">Distritos con más potencial en {opp.cityName}</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">Zonas donde la demanda es alta y la competencia local no está bien posicionada. Tu mejor punto de entrada.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {opp.districts.map((d, i) => (
              <div key={d.name} className="flex items-center gap-4 border border-border rounded-xl p-4 bg-card hover:border-primary transition">
                <div className="text-xl font-extrabold text-muted-foreground/40 w-8 shrink-0">#{i + 1}</div>
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold">{d.name}</p>
                  <div className="mt-1.5 h-2 bg-secondary rounded overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-[var(--brand-deep,oklch(0.22_0.14_255))]" style={{ width: `${d.potential}%` }} />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-extrabold text-primary leading-none">{d.potential}</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">potencial</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* KEYWORDS con €/mes */}
        <section className="border border-border rounded-2xl p-6 md:p-8 bg-card">
          <div className="flex items-end justify-between gap-3 mb-1 flex-wrap">
            <h2 className="text-2xl md:text-3xl font-extrabold">Las keywords que mueven el dinero</h2>
            <span className="text-xs text-muted-foreground">Ingresos estimados si rankeas top 3</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">No todas las búsquedas valen lo mismo. Estas son las que te llenan la agenda.</p>

          <div className="space-y-3">
            {opp.topKeywords.map((k, i) => {
              const monthlyRevenue = Math.round(k.volume * 0.18 * baseConv * ticket);
              return (
                <div key={k.kw} className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto] gap-4 items-center border border-border/60 rounded-lg p-4 bg-background">
                  <div className="text-xs font-bold text-muted-foreground w-6 shrink-0">#{i + 1}</div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm md:text-base truncate">«{k.kw}»</p>
                    <div className="mt-1.5 h-1.5 bg-secondary rounded overflow-hidden max-w-md">
                      <div className="h-full bg-primary" style={{ width: `${(k.volume / maxKw) * 100}%` }} />
                    </div>
                  </div>
                  <div className="text-right md:w-28">
                    <p className="text-sm font-bold">{fmt(k.volume)}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">búsq/mes</p>
                  </div>
                  <div className="text-right md:w-32 bg-primary/5 rounded-lg px-3 py-2">
                    <p className="text-base font-extrabold text-primary">{fmtEur(monthlyRevenue)}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">potencial/mes</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-secondary rounded-lg p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Servicios más buscados</p>
              <ul className="space-y-1.5">
                {opp.topServices.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-secondary rounded-lg p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">CPC medio (Google Ads)</p>
              <p className="text-3xl font-extrabold text-primary">{opp.cpc.toFixed(2)} €</p>
              <p className="text-xs text-muted-foreground mt-1">Cada clic por anuncios cuesta esto. Con SEO no pagas.</p>
            </div>
          </div>
        </section>

        {/* PLAN — 4 pasos */}
        <section>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-1">Cómo te llevas este dinero</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">Lo que haríamos contigo en 90 días para capturar tu trozo del mercado.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { n: "01", t: "Auditoría local", d: `Analizamos tu ficha, tu web y tus competidores reales en ${opp.cityName}.` },
              { n: "02", t: "Ficha Google Maps", d: "Optimizamos tu perfil para que aparezcas en el pack de 3 mapas." },
              { n: "03", t: "Contenido por distrito", d: `Páginas específicas para cada zona de ${opp.cityName} con demanda.` },
              { n: "04", t: "Reseñas y autoridad", d: "Sistema para conseguir reseñas reales y enlaces locales que mueven ranking." },
            ].map((s) => (
              <div key={s.n} className="border border-border rounded-xl p-5 bg-card hover:border-primary transition">
                <p className="text-3xl font-extrabold text-primary/30">{s.n}</p>
                <p className="font-bold mt-1">{s.t}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CASOS */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-1">Ya lo hemos hecho en tu sector</h2>
            <p className="text-sm text-muted-foreground mb-6">Negocios de {opp.sectorName.toLowerCase()} a los que ya hemos posicionado en su ciudad.</p>
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

        {/* CTA */}
        <section className="relative overflow-hidden rounded-2xl">
          <img src={cityImg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary/80" />
          <div className="relative p-8 md:p-12 text-center text-primary-foreground">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-accent text-accent-foreground px-2.5 py-1 rounded mb-4">
              <Target className="h-3 w-3" /> Informe a medida · gratis · 48h
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 max-w-3xl mx-auto">
              Quiero un informe igual pero con <span className="text-accent">mis competidores reales</span>
            </h2>
            <p className="text-white/85 mb-6 max-w-2xl mx-auto">
              Te lo preparamos con tu nombre, tus servicios concretos y los negocios que ahora mismo están por delante de ti en {opp.cityName}.
            </p>
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

function HeroKpi({ icon, label, value, hint, highlight }: { icon: React.ReactNode; label: string; value: string; hint: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-5 border ${highlight ? "bg-accent text-accent-foreground border-accent" : "bg-card text-foreground border-border/40"} shadow-lg`}>
      <p className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${highlight ? "text-accent-foreground/80" : "text-muted-foreground"}`}>
        {icon} {label}
      </p>
      <p className={`mt-1.5 text-4xl md:text-5xl font-extrabold leading-none ${highlight ? "text-accent-foreground" : "text-primary"}`}>{value}</p>
      <p className={`text-xs mt-2 ${highlight ? "text-accent-foreground/75" : "text-muted-foreground"}`}>{hint}</p>
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

function FactRow({ icon, text, tone }: { icon: React.ReactNode; text: string; tone: "ok" | "warn" | "info" }) {
  const cls = tone === "ok" ? "bg-primary/10 text-primary" : tone === "warn" ? "bg-accent/30 text-accent-foreground" : "bg-secondary text-foreground";
  return (
    <li className="flex items-start gap-3">
      <span className={`h-7 w-7 rounded-md flex items-center justify-center shrink-0 ${cls}`}>{icon}</span>
      <span className="text-sm leading-snug pt-0.5">{text}</span>
    </li>
  );
}
