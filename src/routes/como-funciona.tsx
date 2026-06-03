import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ClipboardList, Rocket, BarChart3, Repeat, Phone, MapPin, Globe, MessageSquare, Star, Camera, FileText, Link2, Smartphone, Gauge, Calendar, ShieldCheck, TrendingUp, Users, Megaphone, PenTool, Wrench, Eye, Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";

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
        {/* Timeline */}
        <section className="space-y-5">
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
