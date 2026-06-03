import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import serviceGmb from "@/assets/service-gmb.jpg";
import serviceReviews from "@/assets/service-reviews.jpg";
import serviceAudit from "@/assets/service-audit.jpg";
import serviceContent from "@/assets/service-content.jpg";
import cityMadrid from "@/assets/city-madrid.jpg";
import localBusiness from "@/assets/local-business.jpg";
import { useState } from "react";

export const Route = createFileRoute("/guias")({
  head: () => ({
    meta: [
      { title: "Guías de SEO local para negocios de barrio | Rankin" },
      { name: "description", content: "Recursos y guías prácticas para mejorar tu visibilidad en Google y Google Maps: ficha de Google Business, reseñas, palabras clave locales y captación." },
      { property: "og:title", content: "Guías de SEO local | Rankin" },
      { property: "og:description", content: "Aprende a posicionar tu negocio local con nuestras guías prácticas." },
      { property: "og:url", content: "/guias" },
    ],
    links: [{ rel: "canonical", href: "/guias" }],
  }),
  component: Guias,
});

const guides = [
  { slug: "google-business-profile", category: "Google Maps", title: "Guía completa de Google Business Profile en 2026", excerpt: "Cómo optimizar tu ficha paso a paso para aparecer en el Map Pack de tu ciudad.", read: 12, img: serviceGmb },
  { slug: "como-conseguir-resenas", category: "Reseñas", title: "Cómo conseguir reseñas reales (sin pedirlas mal)", excerpt: "Plantillas, momentos clave y errores que te penalizan al pedir reseñas a tus clientes.", read: 8, img: serviceReviews },
  { slug: "seo-local-basico", category: "SEO local", title: "SEO local para autónomos: lo mínimo que debes hacer", excerpt: "Si solo tienes 2 horas a la semana, dedícalas a estas 5 acciones que mueven la aguja.", read: 10, img: serviceAudit },
  { slug: "palabras-clave-locales", category: "Keywords", title: "Cómo encontrar las palabras clave de tu ciudad", excerpt: "Herramientas gratuitas y método manual para descubrir qué busca la gente cerca de tu negocio.", read: 9, img: serviceContent },
  { slug: "captacion-google-maps", category: "Captación", title: "De Google Maps a llamada: optimiza tu conversión", excerpt: "Trucos para que quien ve tu ficha en Maps acabe llamando o reservando, no comparando.", read: 7, img: cityMadrid },
  { slug: "errores-seo-local", category: "SEO local", title: "10 errores que están hundiendo tu SEO local", excerpt: "NAP inconsistentes, categorías mal elegidas, contenido duplicado… revisa si los cometes.", read: 11, img: localBusiness },
];

const categories = ["Todas", "Google Maps", "Reseñas", "SEO local", "Keywords", "Captación"];

function Guias() {
  const [cat, setCat] = useState("Todas");
  const filtered = cat === "Todas" ? guides : guides.filter((g) => g.category === cat);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-sm text-white/70 mb-2">Guías y recursos</p>
          <h1 className="text-3xl md:text-4xl font-extrabold">Aprende SEO local para tu negocio</h1>
          <p className="mt-2 text-white/85 max-w-3xl">Guías prácticas para entender Google Maps, las reseñas, el SEO local y todo lo que afecta a tu visibilidad en tu ciudad.</p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 mt-10 mb-16">
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 text-sm rounded-full border ${cat === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((g) => (
            <article key={g.slug} className="border border-border rounded-lg overflow-hidden bg-card shadow-[var(--shadow-card)] hover:shadow-lg transition group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={g.img} alt={g.title} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
                <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded">{g.category}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <BookOpen className="h-3 w-3" /> Guía
                  <span>·</span>
                  <Clock className="h-3 w-3" /> {g.read} min de lectura
                </div>
                <h3 className="font-bold leading-snug mb-2">{g.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{g.excerpt}</p>
                <p className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Leer guía <ChevronRight className="h-4 w-4" />
                </p>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-12 border border-border rounded-lg p-8 bg-card flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">¿Prefieres que lo hagamos por ti?</h2>
            <p className="text-muted-foreground mb-4">Las guías están bien para entender. Si quieres resultados sin dedicarle 10 horas a la semana, pide una valoración gratis.</p>
            <div className="flex gap-2 flex-wrap">
              <Button asChild className="bg-primary hover:bg-[var(--brand-deep)]"><Link to="/como-funciona">Cómo trabajamos</Link></Button>
              <Button variant="outline">Pedir auditoría gratis</Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
