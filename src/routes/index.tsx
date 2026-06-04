import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, ArrowRight, Check, Wrench, Stethoscope, Scale, Scissors,
  UtensilsCrossed, Hammer, Zap, HeartPulse, Briefcase, Car,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site/Footer";
import { SiteHeader } from "@/components/site/Header";
import { sectors } from "@/data/sectors";
import { cities } from "@/data/cities";

import heroBg from "@/assets/report-handshake.jpg";
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
  { label: "Fontanería", Icon: Wrench, slug: "fontaneros" },
  { label: "Electricistas", Icon: Zap, slug: "electricistas" },
  { label: "Dentistas", Icon: Stethoscope, slug: "dentistas" },
  { label: "Abogados", Icon: Scale, slug: "abogados" },
  { label: "Peluquerías", Icon: Scissors, slug: "peluquerias" },
  { label: "Restaurantes", Icon: UtensilsCrossed, slug: "restaurantes" },
  { label: "Reformas", Icon: Hammer, slug: "reformas" },
  { label: "Talleres", Icon: Car, slug: "talleres" },
  { label: "Sanidad", Icon: HeartPulse, slug: "sanidad" },
  { label: "Profesionales", Icon: Briefcase, slug: "profesionales" },
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

      {/* ============== TOP THIN PROMO BAR ============== */}
      <div className="bg-accent/20 border-y border-accent/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 text-sm">
          <p className="font-medium">
            Deja de adivinar. Encuentra el hueco con el plan <b>Pro</b>.
          </p>
          <Link to="/oportunidades" className="inline-flex items-center gap-1 font-semibold hover:underline shrink-0">
            Empezar <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* ============== HERO CARD ============== */}
      <section className="mx-auto max-w-7xl px-4 pt-6">
        <div className="relative overflow-hidden rounded-xl bg-primary text-primary-foreground">
          <img
            src={heroBg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/40" />
          <div className="relative px-8 py-14 md:px-14 md:py-20 max-w-2xl">
            <h1 className="text-balance text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-tight">
              Posiciona al ritmo de tu ambición
            </h1>
            <p className="mt-4 max-w-lg text-base md:text-lg text-primary-foreground/85">
              Negocios locales que usan datos reales de Google para detectar
              oportunidades y convertirlas en clientes.
            </p>

            {/* Tabs */}
            <div className="mt-7 inline-flex rounded-full bg-white/10 p-1 text-sm font-semibold">
              <button
                onClick={() => setAudience("negocio")}
                className={`px-5 py-2 rounded-full transition ${audience === "negocio" ? "bg-white text-primary" : "text-white/80 hover:text-white"}`}
              >
                Quiero posicionar mi negocio
              </button>
              <button
                onClick={() => setAudience("agencia")}
                className={`px-5 py-2 rounded-full transition ${audience === "agencia" ? "bg-white text-primary" : "text-white/80 hover:text-white"}`}
              >
                Soy agencia/consultor
              </button>
            </div>

            {/* Search */}
            <div className="mt-4 flex items-stretch overflow-hidden rounded-full bg-white shadow-xl">
              <div className="flex flex-1 items-center gap-2 px-5">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <select
                  value={sectorSlug}
                  onChange={(e) => setSectorSlug(e.target.value)}
                  className="flex-1 min-w-0 bg-transparent py-3.5 text-sm font-medium text-foreground outline-none"
                >
                  <option value="">Sector</option>
                  {sectors.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                </select>
                <span className="h-5 w-px bg-border" />
                <select
                  value={citySlug}
                  onChange={(e) => setCitySlug(e.target.value)}
                  className="flex-1 min-w-0 bg-transparent py-3.5 text-sm font-medium text-foreground outline-none"
                >
                  <option value="">Ciudad</option>
                  {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
              </div>
              <Button asChild className="h-auto rounded-none rounded-r-full bg-accent px-7 text-accent-foreground hover:brightness-110 font-bold">
                {canSearch ? (
                  <Link to="/oportunidades/$slug" params={{ slug: searchSlug }}>Buscar</Link>
                ) : (
                  <Link to="/oportunidades">Buscar</Link>
                )}
              </Button>
            </div>

            {/* Chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {sectorChips.map((c) => (
                <button
                  key={c}
                  className="rounded-full border border-white/30 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 hover:bg-white/15 transition"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============== LOGOS ============== */}
      <section className="mx-auto max-w-7xl px-4 pt-14 pb-10">
        <p className="text-center text-xs font-semibold tracking-widest text-muted-foreground">
          CONFÍAN EN NOSOTROS
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-lg font-semibold text-muted-foreground/70">
          {partnerLogos.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </section>

      {/* ============== SECTORES GRID ============== */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-bold">Encuentra oportunidades para cada tipo de negocio</h2>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {sectorCards.map(({ label, Icon, slug }) => (
            <Link
              key={slug}
              to="/oportunidades"
              className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 hover:border-accent hover:shadow-sm transition"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent-foreground">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============== CÓMO FUNCIONA ============== */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Cómo funciona</h2>
          <div className="inline-flex rounded-full border border-border p-1 text-sm font-semibold">
            <button
              onClick={() => setHowAudience("negocio")}
              className={`px-4 py-1.5 rounded-full transition ${howAudience === "negocio" ? "bg-foreground text-background" : "text-muted-foreground"}`}
            >
              Para negocios
            </button>
            <button
              onClick={() => setHowAudience("agencia")}
              className={`px-4 py-1.5 rounded-full transition ${howAudience === "agencia" ? "bg-foreground text-background" : "text-muted-foreground"}`}
            >
              Para agencias
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div>
            <div className="relative overflow-hidden rounded-xl bg-accent/20 aspect-[4/3]">
              <img src={howPost} alt="" className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-90" />
              <div className="absolute left-5 top-5 text-2xl font-extrabold text-primary">Rankin<span className="text-accent">.</span></div>
              <span className="absolute left-5 bottom-5 rounded-full bg-card px-3 py-1 text-xs font-semibold shadow">Empieza aquí</span>
            </div>
            <h3 className="mt-4 font-bold">Analizar tu sector es gratis</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Elige sector y ciudad. Te mostramos volumen, competencia y CPC en segundos.
            </p>
            <Button asChild className="mt-4 bg-accent text-accent-foreground hover:brightness-110 font-bold">
              <Link to="/oportunidades">Hacer análisis</Link>
            </Button>
          </div>

          <div>
            <div className="overflow-hidden rounded-xl aspect-[4/3]">
              <img src={howHire} alt="Recibe tu informe" className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-4 font-bold">Recibe tu informe accionable</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Detectamos los huecos donde hay demanda real y la competencia está floja.
            </p>
          </div>

          <div>
            <div className="overflow-hidden rounded-xl aspect-[4/3]">
              <img src={howPay} alt="Posiciona y mide" className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-4 font-bold">Posiciona y mide resultados</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Ejecuta el plan paso a paso. Te avisamos cuando aparezcan nuevas oportunidades.
            </p>
          </div>
        </div>
      </section>

      {/* ============== POTENCIAL (oscuro) ============== */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="overflow-hidden rounded-xl bg-primary text-primary-foreground">
          <div className="grid gap-8 p-8 md:grid-cols-2 md:p-12 md:items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Calcula el potencial de tu sector</h3>
              <p className="mt-3 max-w-md text-sm text-primary-foreground/80">
                Estimamos búsquedas mensuales, dificultad y retorno aproximado en
                base a los datos reales de Google de tu sector y ciudad.
              </p>
              <div className="mt-5 flex items-stretch overflow-hidden rounded-md bg-white">
                <input
                  placeholder="ej: dentistas en Valencia"
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-foreground outline-none"
                />
                <Button asChild className="rounded-none bg-accent text-accent-foreground hover:brightness-110 font-bold">
                  <Link to="/oportunidades">Calcular</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative mx-auto aspect-[5/3] w-full max-w-md rounded-lg bg-primary-foreground/5 ring-1 ring-white/10 p-5">
                <div className="text-center text-xs uppercase tracking-wider text-primary-foreground/60">Estimación retorno</div>
                <svg viewBox="0 0 300 140" className="mt-3 h-[80%] w-full">
                  <defs>
                    <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.78 0.16 75)" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="oklch(0.78 0.16 75)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,120 C60,100 90,40 150,30 C210,20 240,100 300,120 L300,140 L0,140 Z" fill="url(#g)" />
                  <path d="M0,120 C60,100 90,40 150,30 C210,20 240,100 300,120" stroke="oklch(0.78 0.16 75)" strokeWidth="2" fill="none" />
                  <circle cx="150" cy="30" r="5" fill="oklch(0.78 0.16 75)" />
                </svg>
                <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-primary-foreground/60">
                  <span>Bajo</span><span>Medio</span><span>Alto</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== PRICING ============== */}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Elige cómo quieres trabajar con nosotros</h2>
        <p className="mt-2 text-sm text-muted-foreground">Opciones flexibles para tu negocio o agencia.</p>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2 text-left">
          {[
            {
              name: "Básico", price: "Gratis", popular: false,
              desc: "Para explorar oportunidades en tu sector y ciudad.",
              features: [
                "Análisis sector + ciudad",
                "Volumen y competencia básica",
                "1 informe estándar al mes",
                "Acceso a guías gratuitas",
              ],
              cta: "Empezar gratis",
            },
            {
              name: "Pro", price: "29 €/mes", popular: true,
              desc: "Todo lo del básico, más datos avanzados y alertas.",
              features: [
                "Todo lo de Básico",
                "Informes ilimitados sector × ciudad",
                "Alertas de nuevas oportunidades",
                "CPC, intención y dificultad detallados",
                "Soporte prioritario",
              ],
              cta: "Empezar gratis",
            },
          ].map((p) => (
            <div
              key={p.name}
              className={`relative rounded-xl border bg-card p-7 shadow-sm ${p.popular ? "border-accent shadow-md" : "border-border"}`}
            >
              {p.popular && (
                <span className="absolute right-5 top-5 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                  Popular
                </span>
              )}
              <div className="text-lg font-bold">{p.name}</div>
              <div className="mt-1 text-sm text-muted-foreground">{p.desc}</div>
              <div className="mt-4 text-2xl font-extrabold">{p.price}</div>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-accent shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-7 w-full font-bold ${p.popular ? "bg-accent text-accent-foreground hover:brightness-110" : "bg-primary text-primary-foreground hover:brightness-110"}`}
              >
                <Link to="/oportunidades">{p.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <Link to="/como-funciona" className="mt-6 inline-block text-sm font-medium text-primary underline">
          Comparar planes en detalle
        </Link>
      </section>

      {/* ============== TESTIMONIOS ============== */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute -right-32 top-10 h-72 w-[60%] rotate-12 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -left-32 bottom-10 h-72 w-[60%] -rotate-12 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4">
          <h2 className="text-center text-2xl md:text-3xl font-bold">Resultados reales en Rankin</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <blockquote className="text-sm leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-bold">
                    {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============== BADGES ============== */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Reconocidos por el sector
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          {badges.map((b) => (
            <div
              key={b}
              className="flex h-20 w-24 flex-col items-center justify-center rounded-md border border-border bg-card text-center text-[10px] font-semibold leading-tight text-muted-foreground px-2"
            >
              <span className="text-accent text-base">★</span>
              {b}
            </div>
          ))}
        </div>
      </section>

      {/* ============== BANNER FINAL ============== */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-xl bg-accent px-8 py-10 text-center text-accent-foreground">
          <h3 className="text-2xl md:text-3xl font-bold">
            Encuentra el hueco que tu negocio necesita
          </h3>
          <Button asChild className="mt-5 bg-card text-foreground hover:bg-card/90 font-bold">
            <Link to="/oportunidades">Ver oportunidades</Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
