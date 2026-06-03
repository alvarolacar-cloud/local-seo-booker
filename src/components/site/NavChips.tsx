import { Link } from "@tanstack/react-router";
import { Compass, BookOpen, Trophy, Route as RouteIcon, Home as HomeIcon } from "lucide-react";

const navItems = [
  { id: "inicio", label: "Inicio", icon: HomeIcon, to: "/" as const, novelty: false },
  { id: "oportunidades", label: "Oportunidades locales", icon: Compass, to: "/oportunidades" as const, novelty: true },
  { id: "casos", label: "Casos de éxito", icon: Trophy, to: "/casos-exito" as const, novelty: false },
  { id: "como-funciona", label: "Cómo funciona", icon: RouteIcon, to: "/como-funciona" as const, novelty: false },
  { id: "guias", label: "Guías", icon: BookOpen, to: "/guias" as const, novelty: false },
];

export function NavChips() {
  return (
    <section className="bg-background border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {navItems.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.id}
                to={c.to}
                className="relative flex items-center gap-3 bg-primary text-primary-foreground rounded-md px-4 py-4 font-semibold text-sm hover:bg-[var(--brand-deep)] transition"
                activeOptions={{ exact: c.to === "/" }}
                activeProps={{ className: "!bg-[#0066ff]" }}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="truncate">{c.label}</span>
                {c.novelty && (
                  <span className="absolute -top-2 right-3 bg-[#e91e63] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
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
