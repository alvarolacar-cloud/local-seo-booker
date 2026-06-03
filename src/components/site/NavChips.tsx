import { Link } from "@tanstack/react-router";
import { Compass, BookOpen, Trophy, Route as RouteIcon, Home as HomeIcon } from "lucide-react";
import { SiteHeader } from "@/components/site/Header";

const navItems = [
  { id: "inicio", label: "Inicio", icon: HomeIcon, to: "/" as const, novelty: false },
  { id: "oportunidades", label: "Oportunidades locales", icon: Compass, to: "/oportunidades" as const, novelty: true },
  { id: "casos", label: "Casos de éxito", icon: Trophy, to: "/casos-exito" as const, novelty: false },
  { id: "como-funciona", label: "Cómo funciona", icon: RouteIcon, to: "/como-funciona" as const, novelty: false },
  { id: "guias", label: "Guías", icon: BookOpen, to: "/guias" as const, novelty: false },
];

export function NavChips() {
  return (
    <section className="bg-primary text-primary-foreground">
      <SiteHeader variant="transparent" />
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-8 md:pt-10">
        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.id}
                to={t.to}
                activeOptions={{ exact: t.to === "/" }}
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 text-white hover:bg-white/10 text-sm font-semibold transition"
                activeProps={{ className: "!bg-[#0066ff] !border-[#0066ff]" }}
              >
                <Icon className="h-4 w-4" />
                {t.label}
                {t.novelty && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#e91e63] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    Novedad
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
