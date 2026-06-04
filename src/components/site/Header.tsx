import { Link } from "@tanstack/react-router";
import { ChevronDown, Search, Globe, User } from "lucide-react";

const navItems: { label: string; to?: string; href?: string; hasMenu?: boolean; badge?: string; cta?: boolean }[] = [
  { label: "Oportunidades", to: "/oportunidades", hasMenu: true },
  { label: "Sectores", href: "#sectores", hasMenu: true },
  { label: "Ciudades", href: "#ciudades", hasMenu: true },
  { label: "Guías", to: "/guias", badge: "NEW" },
  { label: "Casos de éxito", to: "/casos-exito" },
  { label: "Cómo funciona", to: "/como-funciona", hasMenu: true },
  { label: "Informes", href: "#informes", hasMenu: true },
  { label: "Planes", href: "#planes", hasMenu: true, cta: true },
];

export function SiteHeader({ variant = "solid" }: { variant?: "solid" | "transparent" }) {
  const bg = variant === "transparent" ? "bg-transparent" : "bg-primary";
  return (
    <header className={`${bg} text-primary-foreground`}>
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-3">
        {/* Row 1: Logo + Search */}
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="text-3xl font-bold tracking-tight shrink-0">
            Rankin<span className="text-accent">.</span>
          </Link>
          <div className="relative w-full max-w-sm hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar oportunidades"
              className="w-full rounded-md bg-background text-foreground placeholder:text-muted-foreground pl-9 pr-3 py-2 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Row 2: Nav + utilities */}
        <div className="mt-3 flex items-center justify-between gap-4">
          <nav className="flex items-center gap-5 text-sm font-medium flex-wrap">
            {navItems.map((item) => {
              const inner = (
                <span className="inline-flex items-center gap-1.5">
                  <span className={item.cta ? "rounded-md bg-accent text-accent-foreground px-3 py-1.5" : ""}>{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5">
                      {item.badge}
                    </span>
                  )}
                  {item.hasMenu && !item.cta && <ChevronDown className="h-3.5 w-3.5 opacity-80" />}
                  {item.hasMenu && item.cta && <ChevronDown className="h-3.5 w-3.5" />}
                </span>
              );
              const cls = "hover:text-accent transition-colors";
              return item.to ? (
                <Link key={item.label} to={item.to} className={cls}>
                  {inner}
                </Link>
              ) : (
                <a key={item.label} href={item.href} className={cls}>
                  {inner}
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-4 text-sm font-medium shrink-0">
            <button type="button" aria-label="Idioma" className="hover:text-accent transition-colors">
              <Globe className="h-5 w-5" />
            </button>
            <a href="mailto:hola@rankin.es" className="inline-flex items-center gap-2 hover:text-accent transition-colors">
              <User className="h-5 w-5" />
              Login
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
