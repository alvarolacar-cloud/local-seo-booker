import { Link } from "@tanstack/react-router";

export function SiteHeader({ variant = "solid" }: { variant?: "solid" | "transparent" }) {
  const bg = variant === "transparent" ? "bg-transparent" : "bg-primary";
  const navItems = [
    { label: "Servicios", href: "#servicios" },
    { label: "Sectores", href: "#sectores" },
    { label: "Casos de éxito", href: "#casos" },
    { label: "Precios", href: "#precios" },
    { label: "Blog", href: "#blog" },
  ];
  return (
    <header className={`${bg} text-primary-foreground`}>
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold tracking-tight shrink-0">
          Rankin<span className="text-accent">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-accent transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="mailto:hola@rankin.es"
          className="inline-flex items-center rounded-md bg-white text-foreground px-4 py-2 text-sm font-semibold hover:bg-white/90 transition shrink-0"
        >
          Contacto
        </a>
      </div>
    </header>
  );
}

