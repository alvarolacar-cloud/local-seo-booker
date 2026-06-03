import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { sectors } from "@/data/sectors";
import { cities } from "@/data/cities";
import { useState } from "react";

export const Route = createFileRoute("/sectores/")({
  head: () => ({
    meta: [
      { title: "Sectores que posicionamos | Rankin SEO local" },
      { name: "description", content: "Elige tu sector y ciudad: fontaneros, dentistas, peluquerías, talleres, abogados, inmobiliarias, restaurantes y más. SEO local especializado por nicho." },
      { property: "og:title", content: "Sectores que posicionamos en Google | Rankin" },
      { property: "og:description", content: "Servicios de SEO local por sector y ciudad para negocios de barrio en España." },
      { property: "og:url", content: "/sectores" },
    ],
    links: [{ rel: "canonical", href: "/sectores" }],
  }),
  component: SectoresIndex,
});

function SectoresIndex() {
  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState<string>("Todas");

  const filtered = sectors.filter((s) => {
    const matchQ = !query || s.name.toLowerCase().includes(query.toLowerCase()) || s.short.toLowerCase().includes(query.toLowerCase());
    const matchCity = cityFilter === "Todas" || s.cities.includes(cityFilter);
    return matchQ && matchCity;
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-sm text-white/70 mb-2">Sectores</p>
          <h1 className="text-3xl md:text-4xl font-extrabold">Elige tu sector y tu ciudad</h1>
          <p className="mt-2 text-white/85 max-w-3xl">Mostramos cómo posicionamos cada tipo de negocio local en Google y Google Maps. Cada sector tiene su plan, sus palabras clave y sus métricas.</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 -mt-6">
        <div className="bg-card border border-border rounded-md shadow-[var(--shadow-card)] p-3 flex flex-col md:flex-row gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 border border-border rounded-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Busca tu sector (ej. fontanero)" className="border-0 shadow-none focus-visible:ring-0 px-0" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Todas", ...cities.map((c) => c.name)].map((c) => (
              <button key={c} onClick={() => setCityFilter(c)} className={`px-3 py-1.5 text-sm rounded-full border ${cityFilter === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 mt-10 mb-16">
        <p className="text-sm text-muted-foreground mb-4">{filtered.length} sectores disponibles</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.slug} to="/sectores/$sector" params={{ sector: s.slug }} className="group block border border-border rounded-lg overflow-hidden bg-card shadow-[var(--shadow-card)] hover:shadow-lg hover:border-primary transition">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={s.img} alt={`SEO local para ${s.name}`} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-2">
                    <span className="bg-background rounded-full h-9 w-9 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </span>
                    <span className="text-white font-bold text-lg drop-shadow">{s.name}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-foreground mb-3">{s.desc}</p>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="bg-primary/10 text-primary font-semibold px-2 py-1 rounded">"{s.keyword}"</span>
                    <span className="text-muted-foreground">{s.clients}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Disponible en {s.cities.length} ciudades · {s.monthlySearches.toLocaleString("es-ES")} búsquedas/mes</p>
                  <p className="mt-3 text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Ver plan SEO <ChevronRight className="h-4 w-4" />
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No encontramos sectores que coincidan. ¿Tu negocio es distinto?</p>
            <Button className="bg-primary hover:bg-[var(--brand-deep)]">Pide tu auditoría personalizada</Button>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
