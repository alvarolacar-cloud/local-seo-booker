import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin, ArrowRight, Search, Briefcase, Star,
  PiggyBank, Flame, Database, BadgeCheck, ChevronRight,
  TrendingUp, Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { opportunities } from "@/data/opportunities";
import { cities } from "@/data/cities";
import { sectors } from "@/data/sectors";
import { useMemo, useState } from "react";
import localBusiness from "@/assets/local-business.jpg";
import serviceGmb from "@/assets/service-gmb.jpg";
import serviceAudit from "@/assets/service-audit.jpg";
import serviceContent from "@/assets/service-content.jpg";

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

const ticketBySector: Record<string, number> = {
  fontaneros: 180, electricistas: 160, reformas: 8500, dentistas: 750, abogados: 1200,
  inmobiliarias: 4500, peluquerias: 35, talleres: 320, restaurantes: 28, gimnasios: 45,
  estetica: 70, veterinarias: 95, academias: 120, fotografos: 1800,
};

const flashImages = [localBusiness, serviceGmb, serviceAudit, serviceContent];

function OportunidadesIndex() {
  const [sectorSlug, setSectorSlug] = useState<string>(sectors[0]?.slug ?? "");
  const [citySlug, setCitySlug] = useState<string>(cities[0]?.slug ?? "");

  const competitionWeight = { Baja: 1, Media: 2, Alta: 3 } as const;
  const trendPct = (o: typeof opportunities[number]) => {
    const first = o.trend[0]?.value ?? 1;
    const last = o.trend[o.trend.length - 1]?.value ?? first;
    return Math.round(((last - first) / first) * 100);
  };

  const hotWeek = useMemo(
    () => [...opportunities].sort((a, b) => trendPct(b) - trendPct(a)).slice(0, 3),
    [],
  );
  const bestRoi = useMemo(
    () => [...opportunities]
      .map((o) => ({ o, ratio: (ticketBySector[o.sectorSlug] ?? 100) / competitionWeight[o.competition] }))
      .sort((a, b) => b.ratio - a.ratio)
      .slice(0, 3)
      .map((x) => x.o),
    [],
  );
  const trending = useMemo(
    () => [...opportunities]
      .filter((o) => !hotWeek.find((h) => h.slug === o.slug))
      .sort((a, b) => trendPct(b) - trendPct(a))
      .slice(0, 3),
    [hotWeek],
  );

  return (
    <div className="min-h-screen bg-background">
      {/* HERO — estilo lastminute */}
      <section className="relative bg-primary">
        <SiteHeader variant="transparent" />
        <div className="mx-auto max-w-7xl px-4 pt-6 pb-28 md:pt-10 md:pb-32 text-primary-foreground relative">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Encuentra tu Sector + Ciudad
            </h1>
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
        {/* 1. Oportunidades calientes esta semana */}
        <section>
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold flex items-center gap-2">
                <Flame className="h-6 w-6 text-accent" /> Oportunidades calientes esta semana
              </h2>
              <p className="text-sm text-muted-foreground">Los cruces sector + ciudad con más subida de búsquedas en los últimos días.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {hotWeek.map((o, i) => {
              const pct = trendPct(o);
              return (
                <article key={o.slug} className="border border-border rounded-md bg-card overflow-hidden flex flex-col">
                  <div className="relative h-52">
                    <img src={flashImages[i % flashImages.length]} alt={`${o.sectorName} en ${o.cityName}`} className="absolute inset-0 w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 bg-foreground text-background text-[11px] font-bold px-2 py-1 rounded inline-flex items-center gap-1">
                      <Flame className="h-3 w-3" /> Caliente esta semana
                    </span>
                    <span className="absolute top-12 right-3 bg-accent text-accent-foreground text-[11px] font-bold px-2 py-1 rounded inline-flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> +{pct}% búsquedas vs mes anterior
                    </span>
                    <span className="absolute bottom-3 left-3 text-white text-xs font-semibold inline-flex items-center gap-1 drop-shadow">
                      <MapPin className="h-3.5 w-3.5" /> {o.cityName}, España
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-sm leading-snug text-muted-foreground line-clamp-2">
                      Subida real en {o.sectorName.toLowerCase()} en {o.cityName} según Google Keyword Planner y Search Console.
                    </p>
                    <p className="font-bold mt-2">{o.sectorName} en {o.cityName}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <div className="flex text-accent">
                        {Array.from({ length: 4 }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" />)}
                      </div>
                      <span className="bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded text-[11px]">{o.score}</span>
                      <span className="text-muted-foreground">Score ({(o.searches / 10).toFixed(0)})</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2 space-y-0.5">
                      <p>{o.searches.toLocaleString("es-ES")} búsq/mes · Competencia {o.competition}</p>
                      <p>Tendencia últimos 12 meses: +{pct}%</p>
                    </div>
                    <div className="mt-auto pt-3 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">ticket medio</p>
                        <p className="text-lg"><span className="font-extrabold text-foreground">{(ticketBySector[o.sectorSlug] ?? 100).toLocaleString("es-ES")} €</span> <span className="text-xs text-muted-foreground">/ cliente</span></p>
                      </div>
                      <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                        <Link to="/oportunidades/$slug" params={{ slug: o.slug }}>Ver informe <ChevronRight className="h-4 w-4 ml-1" /></Link>
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 3 cajas info estilo lastminute */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: <Database className="h-6 w-6" />, t: "Datos reales", d: "No estimaciones. Google Keyword Planner + Search Console de 480 clientes reales." },
            { icon: <PiggyBank className="h-6 w-6" />, t: "Sin permanencia", d: "Mes a mes. Si no funciona en 90 días, te devolvemos la última cuota." },
            { icon: <BadgeCheck className="h-6 w-6" />, t: "Informe a tu medida", d: "Si tu sector o ciudad no aparece, te lo preparamos en menos de 48h." },
          ].map((b) => (
            <div key={b.t} className="border border-border rounded-md p-5 flex gap-4 bg-card">
              <div className="text-primary shrink-0">{b.icon}</div>
              <div>
                <p className="font-bold text-primary">{b.t}</p>
                <p className="text-sm text-muted-foreground mt-1 leading-snug">{b.d}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 2. Mejor ROI por menos competencia */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" /> Mejor ROI por menos competencia
            </h2>
            <p className="text-sm text-muted-foreground">Cruces con ticket alto y pocos competidores top. Entrada más fácil, retorno mayor.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {bestRoi.map((o, i) => {
              const ticket = ticketBySector[o.sectorSlug] ?? 100;
              const comps = o.competition === "Baja" ? 4 : o.competition === "Media" ? 7 : 12;
              return (
                <article key={o.slug} className="border border-border rounded-md bg-card overflow-hidden flex flex-col">
                  <div className="relative h-48">
                    <img src={flashImages[(i + 1) % flashImages.length]} alt={`${o.sectorName} en ${o.cityName}`} className="absolute inset-0 w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 bg-foreground text-background text-[11px] font-bold px-2 py-1 rounded inline-flex items-center gap-1">
                      <Target className="h-3 w-3" /> Mejor ROI
                    </span>
                    <span className="absolute top-12 right-3 bg-accent text-accent-foreground text-[11px] font-bold px-2 py-1 rounded">
                      Solo {comps} competidores top
                    </span>
                    <span className="absolute bottom-3 left-3 text-white text-xs font-semibold inline-flex items-center gap-1 drop-shadow">
                      <MapPin className="h-3.5 w-3.5" /> {o.cityName}, España
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="font-bold">{o.sectorName} en {o.cityName}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <div className="flex text-accent">{Array.from({ length: 4 }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" />)}</div>
                      <span className="bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded text-[11px]">{o.score}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {o.searches.toLocaleString("es-ES")} búsq/mes · Competencia {o.competition}<br />
                      Ratio ticket / competidor: {Math.round(ticket / comps).toLocaleString("es-ES")} €<br />
                      Entrada estimada en 60-90 días
                    </p>
                    <div className="mt-auto pt-3 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">ticket medio</p>
                        <p className="text-lg font-extrabold">{ticket.toLocaleString("es-ES")} €</p>
                      </div>
                      <Button asChild size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                        <Link to="/oportunidades/$slug" params={{ slug: o.slug }}>Ver informe <ChevronRight className="h-4 w-4 ml-1" /></Link>
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 3. Sectores en tendencia */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" /> Sectores en tendencia
            </h2>
            <p className="text-sm text-muted-foreground">Lo que más está creciendo en búsquedas este mes en España.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {trending.map((o, i) => {
              const pct = trendPct(o);
              return (
                <article key={o.slug} className="border border-border rounded-md bg-card overflow-hidden flex flex-col">
                  <div className="relative h-48">
                    <img src={flashImages[(i + 2) % flashImages.length]} alt={`${o.sectorName} en ${o.cityName}`} className="absolute inset-0 w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-[11px] font-bold px-2 py-1 rounded inline-flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> +{pct}% vs mes anterior
                    </span>
                    <span className="absolute bottom-3 left-3 text-white text-xs font-semibold inline-flex items-center gap-1 drop-shadow">
                      <MapPin className="h-3.5 w-3.5" /> {o.cityName}, España
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="font-bold">{o.sectorName} en {o.cityName}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <div className="flex text-accent">{Array.from({ length: 4 }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" />)}</div>
                      <span className="bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded text-[11px]">{o.score}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {o.searches.toLocaleString("es-ES")} búsq/mes · Competencia {o.competition}<br />
                      Crecimiento últimos 12 meses: +{pct}%<br />
                      Momento óptimo para posicionar
                    </p>
                    <div className="mt-auto pt-3 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">ticket medio</p>
                        <p className="text-lg font-extrabold">{(ticketBySector[o.sectorSlug] ?? 100).toLocaleString("es-ES")} €</p>
                      </div>
                      <Button asChild size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                        <Link to="/oportunidades/$slug" params={{ slug: o.slug }}>Ver informe <ChevronRight className="h-4 w-4 ml-1" /></Link>
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>


        {/* CTA final */}
        <section className="bg-primary text-primary-foreground rounded-md p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold mb-1">¿No ves tu sector o tu ciudad?</h2>
            <p className="text-white/85 text-sm max-w-xl">Informe a medida en 48h. Te decimos cuántas búsquedas tiene tu servicio en tu zona y cómo de difícil sería posicionarte top 3.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
              <Link to="/como-funciona">Pedir informe <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent border-white/30 text-primary-foreground hover:bg-white/10 font-semibold">
              <Link to="/casos-exito">Ver casos</Link>
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
