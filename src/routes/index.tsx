import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, ArrowRight, ArrowUpRight, Check, Wrench, Stethoscope, Scale, Scissors,
  UtensilsCrossed, Hammer, Zap, HeartPulse, Briefcase, Car, Sparkles, TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site/Footer";
import { SiteHeader } from "@/components/site/Header";
import { sectors } from "@/data/sectors";
import { cities } from "@/data/cities";

import howPost from "@/assets/service-audit.jpg";
import howHire from "@/assets/service-content.jpg";
import howPay from "@/assets/service-gmb.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rankin — Oportunidades en Google para tu Empresa" },
      { name: "description", content: "Datos reales de Google para detectar huecos de SEO local en tu sector y ciudad. Informes accionables para negocios y agencias." },
      { property: "og:title", content: "Rankin — Oportunidades en Google" },
      { property: "og:description", content: "Sector + ciudad + datos reales. Encuentra el hueco." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const sectorCards = [
  { label: "Fontanería", Icon: Wrench, hint: "+2.4k búsquedas/mes" },
  { label: "Electricistas", Icon: Zap, hint: "Oportunidad alta" },
  { label: "Dentistas", Icon: Stethoscope, hint: "CPC competitivo" },
  { label: "Abogados", Icon: Scale, hint: "+1.2k búsquedas/mes" },
  { label: "Peluquerías", Icon: Scissors, hint: "Demanda estable" },
  { label: "Restaurantes", Icon: UtensilsCrossed, hint: "Local intent alta" },
  { label: "Reformas", Icon: Hammer, hint: "Estacional ↑" },
  { label: "Talleres", Icon: Car, hint: "Conversión alta" },
  { label: "Sanidad", Icon: HeartPulse, hint: "Alta intención" },
  { label: "Profesionales", Icon: Briefcase, hint: "Nicho B2B" },
];

const sectorChips = ["Fontaneros", "Dentistas", "Abogados", "Restaurantes"];
const partnerLogos = ["Inboundcycle", "SEMrush", "Webpositer", "Aukera", "Human Level", "Internet República"];

const testimonials = [
  { quote: "Detectamos un nicho de búsquedas que nadie estaba cubriendo y montamos un plan en 2 semanas. En 4 meses ya rankeábamos top 3.", name: "Sandra Ortiz", role: "CEO · Reformas Aurea" },
  { quote: "Rankin se convirtió en nuestra fuente de verdad para decidir en qué ciudades abrir antes que la competencia.", name: "David Pradas", role: "Director comercial · DentalPro" },
  { quote: "He trabajado con varias herramientas SEO y ninguna explica tan bien el potencial real por sector y ciudad como Rankin.", name: "Mathieu García", role: "SEO Lead · Agencia Norte" },
  { quote: "Pasamos de adivinar a tener un mapa claro. Sabemos qué keywords atacar y en qué orden, sin perder presupuesto.", name: "Roger Cabrera", role: "Head of Growth · Talleres Bilbao" },
  { quote: "El equipo de Rankin entiende el negocio local de verdad. No vende humo, vende datos accionables.", name: "Ana Vila", role: "Fundadora · Clínica Vila" },
  { quote: "La confianza en Rankin es altísima. Cada informe nos abre 2 o 3 oportunidades que no habíamos visto.", name: "Carlos Pedrero", role: "CMO · Grupo Lares" },
];

const badges = ["Top 50 SEO Tools", "Líder España", "Mejor soporte", "Mayor usabilidad", "Mejor inversión", "Resultados rápidos"];

function Home() {
  const [sectorSlug, setSectorSlug] = useState("");
  const [citySlug, setCitySlug] = useState("");
  const [audience, setAudience] = useState<"negocio" | "agencia">("negocio");
  const [howAudience, setHowAudience] = useState<"negocio" | "agencia">("negocio");

  const canSearch = Boolean(sectorSlug && citySlug);
  const searchSlug = canSearch ? `${sectorSlug}-${citySlug}` : "";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* ============== PROMO BAR ============== */}
      <div className="bg-accent/15 border-b border-accent/25">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 text-sm">
          <p className="font-medium">
            Solo trabajamos contigo si <b>podemos hacerte subir</b> en Google. Primero los datos.
          </p>
          <Link to="/oportunidades" className="inline-flex items-center gap-1 font-semibold hover:underline shrink-0">
            Pedir análisis <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        {/* glow */}
        <div className="pointer-events-none absolute -top-40 left-1/3 h-[600px] w-[600px] rounded-full bg-accent/25 blur-[140px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            {/* Left */}
            <div className="lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span>Te elegimos por datos · No al revés</span>
              </div>

              <h1 className="text-balance text-5xl font-extrabold leading-[1.02] tracking-tight md:text-[64px]">
                Te ayudamos a escalar
                <br />
                posiciones en <span className="bg-gradient-to-r from-accent to-amber-300 bg-clip-text text-transparent">Google</span>.
              </h1>

              <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
                Analizamos tu sector y ciudad, vemos el hueco real de ROI y solo
                trabajamos contigo si podemos moverte. No vendemos SEO genérico:
                <span className="text-primary-foreground"> elegimos negocios donde sabemos ganar.</span>
              </p>

              {/* Tabs */}
              <div className="mt-8 inline-flex rounded-full bg-white/10 p-1 text-sm font-semibold backdrop-blur">
                <button
                  onClick={() => setAudience("negocio")}
                  className={`px-5 py-2 rounded-full transition ${audience === "negocio" ? "bg-white text-primary shadow-sm" : "text-white/75 hover:text-white"}`}
                >
                  Quiero posicionar mi negocio
                </button>
                <button
                  onClick={() => setAudience("agencia")}
                  className={`px-5 py-2 rounded-full transition ${audience === "agencia" ? "bg-white text-primary shadow-sm" : "text-white/75 hover:text-white"}`}
                >
                  Soy agencia / consultor
                </button>
              </div>

              {/* Search */}
              <div className="mt-4 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.06] p-2 backdrop-blur-xl">
                <div className="flex flex-col items-stretch gap-2 md:flex-row">
                  <div className="flex flex-1 items-center gap-2 rounded-xl bg-white/95 px-4">
                    <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                    <select
                      value={sectorSlug}
                      onChange={(e) => setSectorSlug(e.target.value)}
                      className="min-w-0 flex-1 bg-transparent py-3.5 text-sm font-medium text-foreground outline-none"
                    >
                      <option value="">Sector</option>
                      {sectors.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                    </select>
                    <span className="h-5 w-px bg-border" />
                    <select
                      value={citySlug}
                      onChange={(e) => setCitySlug(e.target.value)}
                      className="min-w-0 flex-1 bg-transparent py-3.5 text-sm font-medium text-foreground outline-none"
                    >
                      <option value="">Ciudad</option>
                      {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                    </select>
                  </div>
                  <Button asChild className="h-auto rounded-xl bg-accent px-8 text-accent-foreground hover:brightness-110 font-bold">
                    {canSearch
                      ? <Link to="/oportunidades/$slug" params={{ slug: searchSlug }}>Buscar</Link>
                      : <Link to="/oportunidades">Buscar</Link>}
                  </Button>
                </div>
              </div>

              {/* Chips */}
              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold uppercase tracking-wider text-white/50">Populares:</span>
                {sectorChips.map((c) => (
                  <button key={c} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-medium text-white/85 transition hover:border-accent/50 hover:bg-white/10">
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: dashboard mock */}
            <div className="relative hidden lg:col-span-5 lg:block">
              <div className="absolute -inset-6 rounded-[2rem] bg-accent/20 blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-[oklch(0.22_0.04_265)]/80 p-5 shadow-2xl backdrop-blur-xl">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
                  </div>
                  <span className="font-mono text-[10px] text-white/40">rankin / dentistas-valencia</span>
                </div>

                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-white/50">Oportunidad detectada</div>
                    <div className="mt-1 text-3xl font-extrabold">+12.400€<span className="ml-1 text-sm font-semibold text-emerald-400">/mes</span></div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-bold text-emerald-300">
                    <TrendingUp className="h-3 w-3" /> +38%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
                    <div className="text-[9px] uppercase text-white/40">Volumen</div>
                    <div className="mt-1 text-sm font-bold">2.9k</div>
                  </div>
                  <div className="rounded-lg border border-accent/20 bg-accent/10 p-3">
                    <div className="text-[9px] uppercase text-accent">Hueco</div>
                    <div className="mt-1 text-sm font-bold text-accent">Top 4</div>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
                    <div className="text-[9px] uppercase text-white/40">CPC</div>
                    <div className="mt-1 text-sm font-bold">3,2€</div>
                  </div>
                </div>

                <div className="mt-3 flex h-32 items-end gap-1.5 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                  {[30, 45, 38, 60, 52, 75, 68, 88, 72, 95, 82, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-accent/30 to-accent"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] text-white/40">
                  <span>Ene</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== LOGOS ============== */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Empresas que confían en nuestros datos
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-5 opacity-60 grayscale">
            {partnerLogos.map((l) => (
              <span key={l} className="text-lg font-bold tracking-tight text-foreground/70">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============== SECTORES (BENTO) ============== */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">Sectores</p>
            <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Explora oportunidades por sector
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Analizamos más de 50 nichos de mercado para detectar dónde la competencia es más débil.
            </p>
          </div>
          <Link to="/oportunidades" className="group inline-flex items-center gap-2 border-b-2 border-accent pb-1 text-sm font-bold">
            Ver todos los sectores
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {sectorCards.map(({ label, Icon, hint }) => (
            <Link
              key={label}
              to="/oportunidades"
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_10px_30px_-10px_color-mix(in_oklab,var(--accent)_30%,transparent)]"
            >
              <div className="mb-8 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-base font-bold">{label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
              <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground/30 transition group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      {/* ============== CÓMO FUNCIONA ============== */}
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-24">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">Proceso</p>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Cómo funciona</h2>
            </div>
            <div className="inline-flex rounded-full border border-border bg-background p-1 text-sm font-semibold">
              <button
                onClick={() => setHowAudience("negocio")}
                className={`px-5 py-2 rounded-full transition ${howAudience === "negocio" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >
                Para negocios
              </button>
              <button
                onClick={() => setHowAudience("agencia")}
                className={`px-5 py-2 rounded-full transition ${howAudience === "agencia" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >
                Para agencias
              </button>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "Analizar tu sector es gratis", desc: "Elige sector y ciudad. Te mostramos volumen, competencia y CPC en segundos.", img: howPost, cta: true },
              { step: "02", title: "Recibe tu informe accionable", desc: "Detectamos los huecos donde hay demanda real y la competencia está floja.", img: howHire },
              { step: "03", title: "Posiciona y mide resultados", desc: "Ejecuta el plan paso a paso. Te avisamos cuando aparezcan nuevas oportunidades.", img: howPay },
            ].map((s) => (
              <div key={s.step} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-background">
                  <img src={s.img} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 font-mono text-xs font-bold backdrop-blur">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                {s.cta && (
                  <Button asChild variant="ghost" className="mt-4 -ml-3 font-bold text-foreground hover:text-accent">
                    <Link to="/oportunidades">Hacer análisis <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== POTENCIAL ============== */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground">
          <div className="grid items-center gap-10 p-10 md:grid-cols-2 md:p-16">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">Calculadora</p>
              <h3 className="text-3xl font-bold tracking-tight md:text-4xl">Calcula el potencial<br />de tu sector</h3>
              <p className="mt-5 max-w-md text-primary-foreground/75">
                Estimamos búsquedas mensuales, dificultad y retorno aproximado en base a los datos reales de Google de tu sector y ciudad.
              </p>
              <div className="mt-7 flex items-stretch overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1.5 backdrop-blur">
                <input
                  placeholder="ej: dentistas en Valencia"
                  className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-white/40"
                />
                <Button asChild className="rounded-lg bg-accent px-6 text-accent-foreground hover:brightness-110 font-bold">
                  <Link to="/oportunidades">Calcular</Link>
                </Button>
              </div>
              <p className="mt-3 text-xs text-white/40">* Basado en el algoritmo de Rankin de dificultad local.</p>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-white/50">Estimación retorno</div>
                  <div className="mt-1 text-3xl font-extrabold">+12.400€<span className="ml-1 text-sm font-semibold text-emerald-400">/mes</span></div>
                </div>
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <svg viewBox="0 0 300 140" className="mt-4 w-full">
                <defs>
                  <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.16 75)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="oklch(0.78 0.16 75)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,120 C60,100 90,40 150,30 C210,20 240,100 300,120 L300,140 L0,140 Z" fill="url(#g)" />
                <path d="M0,120 C60,100 90,40 150,30 C210,20 240,100 300,120" stroke="oklch(0.78 0.16 75)" strokeWidth="2" fill="none" />
                <circle cx="150" cy="30" r="5" fill="oklch(0.78 0.16 75)" />
              </svg>
              <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-white/40">
                <span>Bajo</span><span>Medio</span><span>Alto</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== PRICING ============== */}
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-24">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">Planes</p>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Planes flexibles para cada etapa</h2>
            <p className="mt-4 text-muted-foreground">Sin permanencia. Cancela cuando quieras.</p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {/* Básico */}
            <div className="rounded-3xl border border-border bg-background p-10">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">Básico</div>
              <div className="text-sm text-muted-foreground">Para explorar oportunidades en tu sector.</div>
              <div className="mt-6 text-5xl font-extrabold">Gratis</div>
              <ul className="mt-8 space-y-3 text-sm">
                {["Análisis sector + ciudad", "Volumen y competencia básica", "1 informe estándar al mes", "Acceso a guías gratuitas"].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-10 w-full bg-foreground py-6 font-bold text-background hover:bg-foreground/90">
                <Link to="/oportunidades">Empezar gratis</Link>
              </Button>
            </div>

            {/* Pro */}
            <div className="relative rounded-3xl border border-accent bg-primary p-10 text-primary-foreground shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--accent)_50%,transparent)] md:-mt-2 md:mb-2">
              <span className="absolute -top-3 right-8 rounded-full bg-accent px-3 py-1 text-[10px] font-black uppercase tracking-widest text-accent-foreground">
                Más popular
              </span>
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">Pro</div>
              <div className="text-sm text-primary-foreground/70">Todo lo del básico + datos avanzados y alertas.</div>
              <div className="mt-6 text-5xl font-extrabold">29€<span className="text-lg font-medium text-primary-foreground/60">/mes</span></div>
              <ul className="mt-8 space-y-3 text-sm">
                {["Todo lo de Básico", "Informes ilimitados sector × ciudad", "Alertas de nuevas oportunidades", "CPC, intención y dificultad detallados", "Soporte prioritario"].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-10 w-full bg-accent py-6 font-bold text-accent-foreground hover:brightness-110">
                <Link to="/oportunidades">Seleccionar Pro</Link>
              </Button>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link to="/como-funciona" className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
              Comparar planes en detalle
            </Link>
          </div>
        </div>
      </section>

      {/* ============== TESTIMONIOS ============== */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">Testimonios</p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Resultados reales en Rankin</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-2xl border border-border bg-card p-7 transition hover:border-accent/40 hover:shadow-md">
              <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent-foreground">
                  {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </span>
                <span>
                  <span className="block text-sm font-bold">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ============== BADGES ============== */}
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Reconocidos por el sector
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {badges.map((b) => (
              <div
                key={b}
                className="flex h-24 w-28 flex-col items-center justify-center gap-1 rounded-xl border border-border bg-background px-3 text-center text-[11px] font-semibold leading-tight"
              >
                <span className="text-base text-accent">★</span>
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== BANNER FINAL ============== */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-accent px-10 py-20 text-center text-accent-foreground">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative">
            <h3 className="text-balance text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Encuentra el hueco que<br />tu negocio necesita
            </h3>
            <Button asChild className="mt-10 bg-primary px-8 py-6 text-base font-bold text-primary-foreground hover:bg-primary/90">
              <Link to="/oportunidades">Ver oportunidades ahora</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
