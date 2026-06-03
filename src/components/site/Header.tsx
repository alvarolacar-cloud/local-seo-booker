import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/oportunidades", label: "Oportunidades" },
  { to: "/casos-exito", label: "Casos de éxito" },
  { to: "/como-funciona", label: "Cómo funciona" },
  { to: "/guias", label: "Guías" },
] as const;

export function SiteHeader({ variant = "solid" }: { variant?: "solid" | "transparent" }) {
  const bg = variant === "transparent" ? "bg-transparent" : "bg-primary";
  return (
    <header className={`${bg} text-primary-foreground`}>
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold tracking-tight shrink-0">
          Rankin<span className="text-accent">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-1.5 rounded hover:bg-white/10"
              activeProps={{ className: "px-3 py-1.5 rounded bg-white/15 font-semibold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shrink-0">
          <Link to="/como-funciona">Auditoría gratis</Link>
        </Button>
      </div>
    </header>
  );
}
