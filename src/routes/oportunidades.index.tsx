import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/Header";
import { SiteFooter } from "@/components/site/Footer";
import { opportunities } from "@/data/opportunities";
import { cities } from "@/data/cities";
import { sectors } from "@/data/sectors";
import { useState } from "react";

export const Route = createFileRoute("/oportunidades/")({
  head: () => ({
    meta: [
      { title: "Oportunidades destacadas de SEO local | Rankin" },
      { name: "description", content: "Listado comparativo de sectores y ciudades con potencial de SEO local: búsquedas mensuales, competencia y oportunidad. Encuentra el hueco para tu negocio." },
      { property: "og:title", content: "Oportunidades de SEO local por sector y ciudad" },
      { property: "og:description", content: "Compara búsquedas, competencia y oportunidad por sector y ciudad antes de invertir en SEO local." },
      { property: "og:url", content: "/oportunidades" },
    ],
    links: [{ rel: "canonical", href: "/oportunidades" }],
  }),
  component: OportunidadesIndex,
});

function competitionBadge(c: "Baja" | "Media" | "Alta") {
  const map = { Baja: "bg-primary/10 text-primary", Media: "bg-accent/30 text-accent-foreground", Alta: "bg-destructive/15 text-destructive" } as const;
  return map[c];
}

function competitionIcon(c: "Baja" | "Media" | "Alta") {
  if (c === "Baja") return <TrendingDown className="h-3 w-3" />;
  if (c === "Alta") return <TrendingUp className="h-3 w-3" />;
  return <Minus className="h-3 w-3" />;
}

function OportunidadesIndex() {
  const [city, setCity] = useState("Todas");
  const [sector, setSector] = useState("Todos");

  const filtered = opportunities.filter((o) => (city === "Todas" || o.cityName === city) && (sector === "Todos" || o.sectorName === sector));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-sm text-white/70 mb-2">Oportunidades</p>
          <h1 className="text-3xl md:text-4xl font-extrabold">Dónde está el hueco para tu negocio</h1>
          <p className="mt-2 text-white/85 max-w-3xl">Análisis por sector y ciudad: búsquedas mensuales, competencia y un score de oportunidad. Pincha en cualquier fila para ver el informe completo.</p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 mt-10 mb-16">
        {/* Filtros */}
        <div className="bg-card border border-border rounded-md p-3 mb-6 flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">Ciudad</p>
            <div className="flex gap-2 flex-wrap">
              {["Todas", ...cities.map((c) => c.name)].map((c) => (
                <button key={c} onClick={() => setCity(c)} className={`px-3 py-1 text-sm rounded-full border ${city === c ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">Sector</p>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setSector("Todos")} className={`px-3 py-1 text-sm rounded-full border ${sector === "Todos" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>Todos</button>
              {sectors.map((s) => (
                <button key={s.slug} onClick={() => setSector(s.name)} className={`px-3 py-1 text-sm rounded-full border ${sector === s.name ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary"}`}>
                  {s.short}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabla / Cards */}
        <div className="border border-border rounded-lg bg-card overflow-hidden">
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-3 px-5 py-3 bg-secondary text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <div>Sector / Ciudad</div>
            <div>Búsquedas/mes</div>
            <div>CPC medio</div>
            <div>Competencia</div>
            <div>Oportunidad</div>
            <div></div>
          </div>
          {filtered.map((o) => (
            <Link key={o.slug} to="/oportunidades/$slug" params={{ slug: o.slug }} className="block border-t border-border first:border-t-0 hover:bg-secondary/40 transition">
              <div className="md:grid md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] md:gap-3 px-5 py-4 md:items-center">
                <div>
                  <p className="font-bold">{o.sectorName} en {o.cityName}</p>
                  <p className="text-xs text-muted-foreground md:hidden mt-1">{o.searches.toLocaleString("es-ES")} búsquedas/mes · CPC {o.cpc}€</p>
                </div>
                <div className="hidden md:block text-sm font-semibold">{o.searches.toLocaleString("es-ES")}</div>
                <div className="hidden md:block text-sm">{o.cpc.toFixed(2)} €</div>
                <div className="mt-2 md:mt-0">
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded ${competitionBadge(o.competition)}`}>
                    {competitionIcon(o.competition)} {o.competition}
                  </span>
                </div>
                <div className="mt-2 md:mt-0 flex items-center gap-2">
                  <div className="flex-1 md:w-24 h-2 bg-secondary rounded overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${o.score}%` }} />
                  </div>
                  <span className="text-sm font-bold text-primary">{o.score}</span>
                </div>
                <div className="hidden md:flex items-center justify-end text-primary">
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="px-5 py-10 text-center text-muted-foreground">No hay oportunidades para esos filtros todavía.</div>
          )}
        </div>

        {/* CTA */}
        <section className="mt-12 bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">¿No ves tu sector y tu ciudad?</h2>
          <p className="text-white/85 mb-5 max-w-2xl mx-auto">Hacemos informes a medida en 48h. Te decimos cuántas búsquedas tiene tu servicio en tu zona y cómo de difícil sería posicionarlo.</p>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">Pedir informe a medida</Button>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
