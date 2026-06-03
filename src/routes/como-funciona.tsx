import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ClipboardList, Rocket, BarChart3, Repeat, Phone, MapPin, Globe, MessageSquare, Star, Camera, FileText, Link2, Smartphone, Gauge, Calendar, ShieldCheck, TrendingUp, Users, Megaphone, PenTool, Wrench, Eye, Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { NavChips } from "@/components/site/NavChips";
import { SiteFooter } from "@/components/site/Footer";
import imgSeoLocal from "@/assets/service-seo-local.jpg";
import imgWeb from "@/assets/service-web.jpg";
import imgContent from "@/assets/service-content.jpg";
import imgAnalytics from "@/assets/service-analytics.jpg";

export const Route = createFileRoute("/como-funciona")({
  head: () => ({
    meta: [
      { title: "Cómo funciona nuestro SEO local | Rankin" },
      { name: "description", content: "Nuestro proceso de SEO local en 5 pasos: valoración gratuita, plan personalizado, implementación, medición y mejora continua. Sin permanencia y con informes claros." },
      { property: "og:title", content: "Cómo funciona el SEO local de Rankin" },
      { property: "og:description", content: "Proceso transparente en 5 pasos para posicionar tu negocio local en Google y Google Maps." },
      { property: "og:url", content: "/como-funciona" },
    ],
    links: [{ rel: "canonical", href: "/como-funciona" }],
  }),
  component: ComoFunciona,
});

const steps = [
  {
    n: "01",
    icon: Search,
    title: "Valoración gratuita",
    deliverable: "Informe de diagnóstico en 48h",
    time: "Día 1-2",
    desc: "Analizamos tu ficha de Google Business Profile, tu web (si tienes), tus competidores locales más fuertes y la demanda real en tu zona.",
    items: ["Auditoría de tu ficha de Google Maps", "Análisis de 5 competidores directos", "Volumen de búsquedas por servicio y barrio", "Lista de las 5 acciones más urgentes"],
  },
  {
    n: "02",
    icon: ClipboardList,
    title: "Plan personalizado a 90 días",
    deliverable: "Roadmap mensual con objetivos",
    time: "Semana 1",
    desc: "Diseñamos un plan con objetivos medibles, palabras clave por barrio y un cronograma claro. Sin paquetes cerrados: lo construimos para tu negocio.",
    items: ["Keywords objetivo por servicio y zona", "Plan de contenidos geolocalizados", "Estrategia de reseñas y reputación", "KPIs y objetivos a 30/60/90 días"],
  },
  {
    n: "03",
    icon: Rocket,
    title: "Implementación mensual",
    deliverable: "Ejecutamos todo nosotros",
    time: "Mes 1 en adelante",
    desc: "Tú sigues atendiendo clientes mientras nosotros optimizamos tu ficha, publicamos contenido, gestionamos reseñas y trabajamos los enlaces locales.",
    items: ["Optimización continua de Google Business Profile", "Publicación de contenido geolocalizado", "Solicitud y respuesta de reseñas", "Enlaces locales y citas (NAP)"],
  },
  {
    n: "04",
    icon: BarChart3,
    title: "Medición transparente",
    deliverable: "Informe mensual claro",
    time: "Cada mes",
    desc: "Cada mes recibes un informe sin humo: posiciones, llamadas que generó Google, formularios, reseñas nuevas y comparativa con tu competencia.",
    items: ["Posiciones en Google y Maps", "Llamadas y rutas desde Google", "Reseñas nuevas y rating medio", "Comparativa con competidores"],
  },
  {
    n: "05",
    icon: Repeat,
    title: "Mejora continua",
    deliverable: "Iteración en base a datos",
    time: "Mes 3+",
    desc: "Lo que funciona, lo multiplicamos. Lo que no, lo cambiamos. El SEO local cambia cada trimestre y tu estrategia también.",
    items: ["Ajustes según resultados", "Nuevos servicios y barrios objetivo", "Aprovechamiento de cambios de Google", "Reuniones trimestrales de revisión"],
  },
];

const faqs = [
  { q: "¿Cuánto cuesta?", a: "Depende del sector y la ciudad. Desde 350€/mes para negocios pequeños. La valoración inicial es siempre gratis y sin compromiso." },
  { q: "¿Necesito tener web?", a: "No es imprescindible. Podemos empezar solo con Google Business Profile y crear la web más adelante si hace falta." },
  { q: "¿Hay permanencia?", a: "No. Si en 90 días no ves mejora en posiciones, llamadas o reseñas, te vas sin penalización." },
  { q: "¿Trabajáis con mi competencia?", a: "No. Exclusividad por sector y ciudad. Si te llevamos a ti, no llevamos a nadie más de tu sector en tu zona." },
];

const services = [
  {
    icon: MapPin,
    image: imgSeoLocal,
    color: "bg-blue-500/10 text-blue-700",
    title: "SEO Local & Google Maps",
    tagline: "Que tu negocio salga el primero cuando alguien busca cerca",
    tasks: [
      { icon: Target, label: "Investigación de keywords por barrio y servicio" },
      { icon: MapPin, label: "Optimización completa de tu ficha de Google Business Profile" },
      { icon: Camera, label: "Subida y optimización de fotos geolocalizadas cada mes" },
      { icon: FileText, label: "Publicaciones semanales en tu perfil de Google" },
      { icon: Link2, label: "Citas y enlaces locales (NAP) en directorios relevantes" },
      { icon: Star, label: "Estrategia de reseñas: solicitud automatizada y respuestas" },
      { icon: Eye, label: "Seguimiento del Local Pack (top 3 del mapa) cada semana" },
      { icon: ShieldCheck, label: "Protección frente a reseñas falsas y reportes" },
    ],
  },
  {
    icon: Globe,
    image: imgWeb,
    color: "bg-amber-500/10 text-amber-700",
    title: "Web que convierte",
    tagline: "No queremos visitas bonitas, queremos llamadas y formularios",
    tasks: [
      { icon: PenTool, label: "Diseño a medida para tu sector (no plantillas genéricas)" },
      { icon: Smartphone, label: "100% responsive y optimizada para móvil" },
      { icon: Gauge, label: "Core Web Vitals en verde: carga en menos de 2 segundos" },
      { icon: FileText, label: "Landing por servicio y por barrio (no una sola página genérica)" },
      { icon: Phone, label: "Botones de llamada, WhatsApp y formulario en cada pantalla" },
      { icon: Wrench, label: "SEO técnico: schema, sitemap, robots, canonicals" },
      { icon: ShieldCheck, label: "Certificado SSL, RGPD, aviso legal y cookies" },
      { icon: Repeat, label: "Mantenimiento, copias de seguridad y actualizaciones incluidas" },
    ],
  },
  {
    icon: Megaphone,
    image: imgContent,
    color: "bg-emerald-500/10 text-emerald-700",
    title: "Contenido & Reputación",
    tagline: "Cada mes Google ve que tu negocio está vivo y la gente lo recomienda",
    tasks: [
      { icon: PenTool, label: "2-4 artículos al mes optimizados para keywords locales" },
      { icon: FileText, label: "Fichas de servicio detalladas con FAQ y testimonios" },
      { icon: Star, label: "Gestión activa de reseñas: pedir, responder y resolver" },
      { icon: MessageSquare, label: "Plantillas de mensajes para WhatsApp y email" },
      { icon: Camera, label: "Banco de fotos profesionales de tu trabajo (cuando aplica)" },
      { icon: Users, label: "Casos de éxito redactados a partir de tus clientes reales" },
      { icon: Megaphone, label: "Difusión en directorios sectoriales y prensa local" },
      { icon: ShieldCheck, label: "Monitorización de menciones de tu marca en internet" },
    ],
  },
  {
    icon: BarChart3,
    image: imgAnalytics,
    color: "bg-rose-500/10 text-rose-700",
    title: "Medición & Estrategia",
    tagline: "Sabrás exactamente qué euro vuelve y cuál no",
    tasks: [
      { icon: BarChart3, label: "Dashboard en vivo con posiciones, llamadas y formularios" },
      { icon: Phone, label: "Seguimiento de llamadas desde Google con número trackeado" },
      { icon: TrendingUp, label: "Comparativa mensual frente a tus 3 competidores directos" },
      { icon: Eye, label: "Heatmaps y grabaciones de sesiones en tu web" },
      { icon: FileText, label: "Informe mensual claro (sin jerga) en PDF y vídeo de 5 min" },
      { icon: Calendar, label: "Reunión estratégica trimestral por videollamada" },
      { icon: Target, label: "Roadmap actualizado cada trimestre con nuevos objetivos" },
      { icon: CheckCircle2, label: "ROI calculado: cuánto inviertes vs cuánto facturas" },
    ],
  },
];

function ComoFunciona() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-sm text-white/70 mb-2">Cómo funciona</p>
          <h1 className="text-3xl md:text-4xl font-extrabold">Un proceso transparente, sin humo de marketing</h1>
          <p className="mt-2 text-white/85 max-w-3xl">Así trabajamos contigo desde la primera llamada hasta que tu agenda está llena. 5 pasos, plazos claros y un informe mensual que cualquiera entiende.</p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 mt-10 space-y-12 mb-16">
        {/* Servicios — qué incluye cada plan */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <p className="text-sm font-semibold text-accent-foreground bg-accent/40 inline-block px-3 py-1 rounded-full mb-3">Todo lo que hacemos por ti cada mes</p>
            <h2 className="text-2xl md:text-3xl font-extrabold">Más de 30 tareas trabajando para llenar tu agenda</h2>
            <p className="mt-2 text-muted-foreground">No es un servicio único: son 4 áreas trabajando en paralelo. Esto es lo que ejecutamos mientras tú atiendes a tus clientes.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <article key={s.title} className="border border-border rounded-xl bg-card overflow-hidden flex flex-col">
                  <div className="relative h-44 w-full overflow-hidden bg-muted">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      width={1024}
                      height={640}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
                      <div className={`h-11 w-11 rounded-lg flex items-center justify-center shrink-0 bg-white ${s.color.split(' ')[1]}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-white">
                        <h3 className="text-lg font-bold leading-tight">{s.title}</h3>
                        <p className="text-xs text-white/85">{s.tagline}</p>
                      </div>
                    </div>
                  </div>
                  <ul className="p-4 space-y-1 flex-1">
                    {s.tasks.map((t) => {
                      const TI = t.icon;
                      return (
                        <li key={t.label} className="flex items-start gap-3 px-3 py-2 rounded-md hover:bg-muted/40 transition-colors">
                          <div className="h-7 w-7 rounded-md bg-muted flex items-center justify-center shrink-0 mt-0.5">
                            <TI className="h-3.5 w-3.5 text-foreground" />
                          </div>
                          <span className="text-sm leading-snug">{t.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="px-6 py-3 bg-muted/40 border-t border-border text-xs text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    Incluido en todos los planes
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-6 border border-dashed border-border rounded-xl p-5 bg-muted/30 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <Wrench className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">+ Trabajo extra cuando hace falta</p>
                <p className="text-sm text-muted-foreground">Sesiones de fotos, vídeo, integraciones con tu CRM, campañas puntuales en Google Ads… Si lo necesita tu negocio, lo proponemos.</p>
              </div>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link to="/casos-exito">Ver resultados reales</Link>
            </Button>
          </div>
        </section>

        {/* Timeline — proceso paso a paso */}
        <section className="space-y-5">
          <div className="text-center max-w-3xl mx-auto mb-2">
            <p className="text-sm font-semibold text-accent-foreground bg-accent/40 inline-block px-3 py-1 rounded-full mb-3">El proceso, paso a paso</p>
            <h2 className="text-2xl md:text-3xl font-extrabold">Así organizamos todo ese trabajo</h2>
            <p className="mt-2 text-muted-foreground">Desde la primera llamada hasta el informe mensual. Plazos claros y entregables concretos en cada paso.</p>
          </div>
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <article key={s.n} className="border border-border rounded-lg p-6 bg-card grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6">
                <div className="flex md:flex-col items-center md:items-start gap-3 md:w-40">
                  <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Paso {s.n}</p>
                    <p className="text-sm font-semibold">{s.time}</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-1">{s.title}</h2>
                  <p className="text-sm text-accent-foreground bg-accent/30 inline-block px-2 py-0.5 rounded mb-3">{s.deliverable}</p>
                  <p className="text-sm text-foreground mb-4">{s.desc}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {s.items.map((i) => (
                      <li key={i} className="flex items-start gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />{i}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </section>




        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold mb-4">Preguntas frecuentes</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="border border-border rounded-lg p-4 bg-card">
                <summary className="font-semibold cursor-pointer">{f.q}</summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">¿Empezamos por la valoración gratuita?</h2>
          <p className="text-white/85 mb-5 max-w-2xl mx-auto">Sin tarjeta, sin compromiso. En 48h te decimos exactamente qué haríamos por tu negocio.</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">Pedir mi valoración gratis</Button>
            <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <Link to="/casos-exito"><Phone className="h-4 w-4 mr-1" /> Ver casos reales</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
