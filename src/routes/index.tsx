import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site/Footer";
import { SiteHeader } from "@/components/site/Header";
import { sectors } from "@/data/sectors";
import { cities } from "@/data/cities";
import { opportunities } from "@/data/opportunities";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rankin — Te ayudamos a escalar posiciones en Google" },
      { name: "description", content: "Analizamos tu sector y ciudad, vemos el hueco real de ROI y solo trabajamos contigo si podemos moverte. SEO local con datos reales, no humo." },
      { property: "og:title", content: "Rankin — Te ayudamos a escalar en Google" },
      { property: "og:description", content: "Datos reales por sector y ciudad. Solo trabajamos contigo si podemos hacerte subir." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const featuredSectors = [
  {
    slug: "dentistas",
    name: "Clínicas dentales",
    why: "Ticket alto y recurrente",
    detail: "CPC 4,8€ y un paciente vale miles. Cada posición ganada se paga sola en semanas.",
  },
  {
    slug: "reformas",
    name: "Reformas integrales",
    why: "Presupuestos de 5 cifras",
    detail: "Un solo cliente cubre un año de SEO. Búsquedas con intención clarísima de contratar.",
  },
  {
    slug: "abogados",
    name: "Abogados",
    why: "Urgencia y alto valor",
    detail: "Penal, laboral, extranjería. El usuario busca hoy y contrata hoy. Margen real en local.",
  },
  {
    slug: "fontaneros",
    name: "Fontanería y urgencias",
    why: "Competencia floja, demanda dura",
    detail: "+2.4k búsquedas/mes con SEO local mal hecho por casi todos. Hueco evidente.",
  },
  {
    slug: "clinicas-esteticas",
    name: "Clínicas estéticas",
    why: "LTV y márgenes brutales",
    detail: "Tratamientos recurrentes, ticket medio alto y mercado en expansión sostenida.",
  },
  {
    slug: "talleres",
    name: "Talleres mecánicos",
    why: "Conversión local clarísima",
    detail: "El 80% busca 'cerca de mí'. Quien sale primero, se lleva la cita. Sin más.",
  },
];

const testimonials = [
  { quote: "Detectamos un nicho que nadie cubría. En 4 meses estábamos en top 3.", name: "Sandra Ortiz", role: "CEO · Reformas Aurea" },
  { quote: "Rankin es nuestra fuente de verdad para decidir en qué ciudades abrir.", name: "David Pradas", role: "Director · DentalPro" },
  { quote: "Cada informe abre 2 o 3 oportunidades que no habíamos visto.", name: "Carlos Pedrero", role: "CMO · Grupo Lares" },
];

const today = new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const lead = opportunities.find((o) => o.slug === "dentistas-barcelona") ?? opportunities[0];

function Home() {
  const [sectorSlug, setSectorSlug] = useState("");
  const [citySlug, setCitySlug] = useState("");
  const [audience, setAudience] = useState<"negocio" | "agencia">("negocio");

  const canSearch = Boolean(sectorSlug && citySlug);
  const searchSlug = canSearch ? `${sectorSlug}-${citySlug}` : "";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* ============== MASTHEAD STRIP ============== */}
      <div className="border-y border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          <span>Rankin · Edición {today}</span>
          <span className="hidden md:inline">Datos reales de Google · sector × ciudad</span>
          <Link to="/oportunidades" className="text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
            Pedir análisis
          </Link>
        </div>
      </div>

      {/* ============== HERO ============== */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid gap-16 lg:grid-cols-12">
            {/* LEFT — editorial column */}
            <div className="lg:col-span-7">
              <div className="mb-8 inline-flex items-center gap-2 border border-foreground/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Elegimos negocios donde sabemos ganar
              </div>

              <h1 className="text-balance text-[56px] font-extrabold leading-[0.95] tracking-[-0.03em] md:text-[88px]">
                Te ayudamos a escalar{" "}
                <span className="relative whitespace-nowrap text-accent">
                  posiciones
                </span>{" "}
                en Google.
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Analizamos tu sector y ciudad, vemos el hueco real de ROI y solo
                trabajamos contigo si podemos moverte.{" "}
                <span className="text-foreground">
                  No vendemos SEO genérico: elegimos negocios donde sabemos ganar.
                </span>
              </p>

              {/* Audience tabs */}
              <div className="mt-10 inline-flex border border-border bg-card p-1">
                <button
                  onClick={() => setAudience("negocio")}
                  className={`px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest transition ${audience === "negocio" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Para mi negocio
                </button>
                <button
                  onClick={() => setAudience("agencia")}
                  className={`px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest transition ${audience === "agencia" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Soy agencia
                </button>
              </div>

              {/* Search */}
              <div className="mt-4 flex max-w-2xl flex-col items-stretch gap-0 border border-foreground/20 bg-card md:flex-row">
                <label className="flex flex-1 flex-col gap-1 border-b border-border px-5 py-3 md:border-b-0 md:border-r">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sector</span>
                  <select
                    value={sectorSlug}
                    onChange={(e) => setSectorSlug(e.target.value)}
                    className="bg-transparent text-sm font-semibold text-foreground outline-none"
                  >
                    <option value="">Elige sector</option>
                    {sectors.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                  </select>
                </label>
                <label className="flex flex-1 flex-col gap-1 px-5 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ciudad</span>
                  <select
                    value={citySlug}
                    onChange={(e) => setCitySlug(e.target.value)}
                    className="bg-transparent text-sm font-semibold text-foreground outline-none"
                  >
                    <option value="">Elige ciudad</option>
                    {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                  </select>
                </label>
                <Button asChild className="h-auto rounded-none bg-primary px-8 text-[11px] font-bold uppercase tracking-widest text-primary-foreground hover:bg-accent hover:text-accent-foreground">
                  {canSearch
                    ? <Link to="/oportunidades/$slug" params={{ slug: searchSlug }}>Analizar →</Link>
                    : <Link to="/oportunidades">Analizar →</Link>}
                </Button>
              </div>
              <p className="mt-3 max-w-2xl text-xs text-muted-foreground">
                Miramos competencia, búsquedas y CPC de tu zona. Si no hay oportunidad, te lo decimos.
              </p>
            </div>

            {/* RIGHT — featured oportunidad lead story */}
            <aside className="lg:col-span-5">
              <div className="border-l border-border lg:pl-10">
                <div className="mb-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  <span>Caso destacado · Nº 12.04</span>
                  <span className="inline-flex items-center gap-1 text-accent">
                    <TrendingUp className="h-3 w-3" /> +{Math.round((lead.trend.at(-1)!.value / lead.trend[0].value - 1) * 100)}%
                  </span>
                </div>

                <Link to="/oportunidades/$slug" params={{ slug: lead.slug }} className="group block">
                  <h2 className="text-3xl font-bold leading-tight tracking-tight transition group-hover:text-accent md:text-4xl">
                    {lead.sectorName} · {lead.cityName}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {lead.searches.toLocaleString("es-ES")} búsquedas/mes con competencia <b className="text-foreground">{lead.competition.toLowerCase()}</b> y CPC medio de {lead.cpc.toString().replace(".", ",")}€. Hueco real para entrar en top 4 en 90 días.
                  </p>
                </Link>

                {/* spec sheet */}
                <dl className="mt-8 grid grid-cols-3 border-y border-border">
                  <div className="border-r border-border py-4">
                    <dt className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Volumen</dt>
                    <dd className="mt-1 text-2xl font-bold tracking-tight">{(lead.searches / 1000).toFixed(1)}k</dd>
                  </div>
                  <div className="border-r border-border py-4 pl-4">
                    <dt className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hueco</dt>
                    <dd className="mt-1 text-2xl font-bold tracking-tight text-accent">Top {Math.max(2, 10 - Math.round(lead.score / 12))}</dd>
                  </div>
                  <div className="py-4 pl-4">
                    <dt className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">CPC</dt>
                    <dd className="mt-1 text-2xl font-bold tracking-tight">{lead.cpc.toString().replace(".", ",")}€</dd>
                  </div>
                </dl>

                {/* sparkline */}
                <div className="mt-6">
                  <svg viewBox="0 0 300 80" className="h-20 w-full" preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="oklch(0.52 0.11 255)"
                      strokeWidth="1.5"
                      points={lead.trend
                        .map((p, i) => {
                          const max = Math.max(...lead.trend.map((t) => t.value));
                          const min = Math.min(...lead.trend.map((t) => t.value));
                          const x = (i / (lead.trend.length - 1)) * 300;
                          const y = 80 - ((p.value - min) / (max - min || 1)) * 70 - 5;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                    />
                  </svg>
                  <div className="mt-2 flex justify-between text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    <span>{lead.trend[0].month}</span>
                    <span>{lead.trend[6].month}</span>
                    <span>{lead.trend.at(-1)!.month}</span>
                  </div>
                </div>

                <Link
                  to="/oportunidades/$slug"
                  params={{ slug: lead.slug }}
                  className="mt-6 inline-flex items-center gap-2 border-b border-foreground pb-1 text-[11px] font-bold uppercase tracking-widest hover:text-accent hover:border-accent"
                >
                  Leer informe completo <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============== LOGOS STRIP ============== */}
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-12 gap-y-3 px-4 py-6 text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          <span className="text-foreground">Confían en nuestros datos →</span>
          <span>Inboundcycle</span>
          <span>SEMrush</span>
          <span>Webpositer</span>
          <span>Aukera</span>
          <span>Human Level</span>
          <span>Internet República</span>
        </div>
      </section>

      {/* ============== SECTORES SELECCIONADOS ============== */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-24">
          <div className="mb-12 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Sectores que trabajamos</p>
              <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                No trabajamos<br />con cualquiera.
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground md:col-span-4">
              Hemos elegido estos nichos por una razón concreta: ROI claro, competencia floja o intención de búsqueda altísima. Si estás en uno de ellos, podemos moverte.
            </p>
          </div>

          <ul className="border-t border-border">
            {featuredSectors.map((s, i) => (
              <li key={s.slug} className="border-b border-border">
                <Link
                  to="/oportunidades"
                  className="group grid grid-cols-12 items-start gap-4 py-8 transition hover:bg-card"
                >
                  <span className="col-span-2 font-mono text-xs text-muted-foreground md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <div className="col-span-10 md:col-span-5">
                    <div className="text-xl font-bold tracking-tight transition group-hover:text-accent md:text-2xl">{s.name}</div>
                    <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-accent">{s.why}</div>
                  </div>
                  <p className="col-span-10 text-sm leading-relaxed text-muted-foreground md:col-span-5">{s.detail}</p>
                  <ArrowUpRight className="col-span-2 ml-auto h-5 w-5 text-muted-foreground transition group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:col-span-1" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-md text-xs text-muted-foreground">
              ¿Tu sector no está? Escríbenos. Si vemos hueco real, lo añadimos. Si no, te lo decimos.
            </p>
            <Link to="/oportunidades" className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-[11px] font-bold uppercase tracking-widest hover:text-accent hover:border-accent">
              Ver oportunidades por ciudad <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============== CÓMO FUNCIONA ============== */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-24">
          <div className="mb-16 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Metodología</p>
              <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                Solo ganamos si tú ganas.
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/70 md:col-span-4">
              Tres pasos. Sin permanencias, sin discursos. Si los números no te cuadran, no te cobramos.
            </p>
          </div>

          <ol className="grid gap-0 border-t border-white/15 md:grid-cols-3">
            {[
              { n: "01", t: "Auditoría de hueco", d: "Eliges sector y ciudad. Te enseñamos volumen, competencia, CPC e intención en segundos. Gratis siempre." },
              { n: "02", t: "Validación de ROI", d: "Si no vemos retorno claro en 90 días para tu negocio, te lo decimos. No aceptamos el proyecto." },
              { n: "03", t: "Escalado táctico", d: "Plan ejecutable de contenido, ficha y enlaces. Te avisamos cuando aparezcan nuevas oportunidades." },
            ].map((s, i) => (
              <li key={s.n} className={`py-10 ${i < 2 ? "md:border-r" : ""} border-white/15 md:pr-10 ${i > 0 ? "md:pl-10" : ""}`}>
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">{s.n}</div>
                <h3 className="mt-6 text-2xl font-bold tracking-tight md:text-3xl">{s.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">{s.d}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button asChild className="h-auto rounded-none bg-accent px-7 py-4 text-[11px] font-bold uppercase tracking-widest text-accent-foreground hover:brightness-110">
              <Link to="/oportunidades">Hacer mi análisis gratis</Link>
            </Button>
            <Link to="/como-funciona" className="text-[11px] font-bold uppercase tracking-widest text-primary-foreground/70 underline-offset-4 hover:text-accent hover:underline">
              Ver metodología completa →
            </Link>
          </div>
        </div>
      </section>

      {/* ============== PRICING — COMPARATIVE SPREAD ============== */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-24">
          <div className="mb-16 max-w-2xl">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Planes</p>
            <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Acceso a los datos.<br />Sin letra pequeña.
            </h2>
          </div>

          <div className="grid border border-border md:grid-cols-2">
            {/* Básico */}
            <div className="border-b border-border p-10 md:border-b-0 md:border-r md:p-14">
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Básico</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sin tarjeta</span>
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-6xl font-extrabold tracking-tight">Gratis</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Para explorar el potencial de un sector en una ciudad.</p>
              <ul className="mt-10 space-y-3 border-t border-border pt-8 text-sm">
                {["1 sector + 1 ciudad", "Volumen, competencia y CPC", "1 informe estándar / mes", "Acceso a guías SEO local"].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="mt-10 h-auto w-full rounded-none border-foreground py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-foreground hover:text-background">
                <Link to="/oportunidades">Empezar gratis</Link>
              </Button>
            </div>

            {/* Pro */}
            <div className="relative bg-primary p-10 text-primary-foreground md:p-14">
              <span className="absolute right-0 top-0 bg-accent px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
                Más popular
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Pro</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/60">Cancela cuando quieras</span>
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-6xl font-extrabold tracking-tight">29€</span>
                <span className="text-base font-medium text-primary-foreground/60">/mes</span>
              </div>
              <p className="mt-4 text-sm text-primary-foreground/70">Para tomar decisiones con datos. Cada semana.</p>
              <ul className="mt-10 space-y-3 border-t border-white/15 pt-8 text-sm">
                {["Sectores y ciudades ilimitados", "Alertas de nuevas oportunidades", "Estimación de ROI personalizada", "Intención de búsqueda y dificultad real", "Soporte prioritario 1-a-1"].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-10 h-auto w-full rounded-none bg-accent py-4 text-[11px] font-bold uppercase tracking-widest text-accent-foreground hover:brightness-110">
                <Link to="/oportunidades">Seleccionar Pro</Link>
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <Link to="/como-funciona" className="underline underline-offset-4 hover:text-accent">Comparar planes en detalle</Link>
          </p>
        </div>
      </section>

      {/* ============== PULL QUOTES ============== */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-24">
          <p className="mb-12 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Resultados reales</p>
          <div className="grid gap-0 border-t border-border md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure key={t.name} className={`py-10 ${i < 2 ? "md:border-r" : ""} border-border md:pr-10 ${i > 0 ? "md:pl-10" : ""}`}>
                <span className="font-display text-5xl leading-none text-accent">"</span>
                <blockquote className="mt-2 text-xl font-medium leading-relaxed tracking-tight">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-border pt-4 text-[11px] font-bold uppercase tracking-widest">
                  <div>{t.name}</div>
                  <div className="mt-1 text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============== FINAL CTA — FULL BAND ============== */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Pedir análisis</p>
            <h2 className="text-balance text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
              Dinos qué haces y dónde.<br />Te decimos si vale la pena.
            </h2>
            <p className="mt-6 max-w-xl text-base text-primary-foreground/70">
              Análisis de oportunidad gratuito. Si no vemos hueco real para tu negocio, te lo decimos sin venderte nada.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Button asChild className="h-auto rounded-none bg-accent px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-accent-foreground hover:brightness-110">
              <Link to="/oportunidades">Pedir mi análisis →</Link>
            </Button>
            <p className="mt-4 text-[11px] uppercase tracking-widest text-primary-foreground/50">
              Respuesta en 48h · sin compromiso
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
