import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { NavChips } from "@/components/site/NavChips";
import { SiteFooter } from "@/components/site/Footer";
import { cases } from "@/data/cases";
import { sectors } from "@/data/sectors";
import { useState } from "react";

export const Route = createFileRoute("/casos-exito")({
  head: () => ({
    meta: [
      { title: "Casos de éxito de SEO local | Rankin" },
      { name: "description", content: "Negocios locales reales que han crecido con nuestra estrategia de SEO local: fontaneros, dentistas, abogados, electricistas, inmobiliarias y reformas." },
      { property: "og:title", content: "Casos de éxito de SEO local | Rankin" },
      { property: "og:description", content: "Resultados reales en llamadas, reseñas y visibilidad para negocios de barrio en España." },
      { property: "og:url", content: "/casos-exito" },
    ],
    links: [{ rel: "canonical", href: "/casos-exito" }],
  }),
  component: CasosExito,
});

function CasosExito() {
  const [filter, setFilter] = useState("Todos");
  const filtered = filter === "Todos" ? cases : cases.filter((c) => c.sectorSlug === filter);
  const sectorOptions = Array.from(new Set(cases.map((c) => c.sectorSlug)));

  return (
    <div className="min-h-screen bg-background">
      <NavChips />

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-sm text-white/70 mb-2">Casos de éxito</p>
          <h1 className="text-3xl md:text-4xl font-extrabold">Negocios de barrio que crecieron con SEO local</h1>
          <p className="mt-2 text-white/85 max-w-3xl">Resultados reales con números reales. Sin "estimaciones" ni gráficos de plantilla.</p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 mt-10 mb-16">
        {/* Filtros */}
        <div className="flex gap-2 flex-wrap mb-6">
          <button onClick={() => setFilter("Todos")} className={`px-3 py-1.5 text-sm rounded-full border ${filter === "Todos" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>Todos los sectores</button>
          {sectorOptions.map((slug) => {
            const sec = sectors.find((s) => s.slug === slug);
            if (!sec) return null;
            return (
              <button key={slug} onClick={() => setFilter(slug)} className={`px-3 py-1.5 text-sm rounded-full border ${filter === slug ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
                {sec.short}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <article key={c.slug} className="border border-border rounded-lg overflow-hidden bg-card shadow-[var(--shadow-card)] hover:shadow-lg transition flex flex-col">
              <div className="relative aspect-[16/10]">
                <img src={c.img} alt={c.name} className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded">{c.sector}</span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg leading-tight">{c.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{c.city}</p>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-4 w-4 text-accent fill-accent" />
                  <span className="text-sm font-semibold">{c.rating} · {c.reviews} reseñas</span>
                </div>
                <div className="text-sm space-y-1 border-t border-border pt-3 mb-3">
                  <p><span className="text-muted-foreground">Antes:</span> {c.before}</p>
                  <p><span className="text-muted-foreground">Ahora:</span> <strong>{c.after}</strong></p>
                </div>
                <p className="text-primary font-extrabold text-lg mb-3">{c.growth}</p>
                <blockquote className="border-l-2 border-accent pl-3 text-sm text-muted-foreground italic mt-auto">
                  <Quote className="h-4 w-4 text-accent inline mr-1" />
                  {c.quote}
                  <footer className="not-italic mt-2 text-xs">— {c.author}</footer>
                </blockquote>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-12 bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">¿Quieres ser el próximo caso?</h2>
          <p className="text-white/85 mb-5 max-w-2xl mx-auto">Pide tu auditoría gratuita y descubre qué posición ocupas hoy y cuánto puedes crecer.</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">Pedir auditoría gratis</Button>
            <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <Link to="/como-funciona">Cómo trabajamos</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
