import { Link } from "@tanstack/react-router";
import { HelpCircle, Globe, Heart, User } from "lucide-react";

export function SiteHeader({ variant = "solid" }: { variant?: "solid" | "transparent" }) {
  const bg = variant === "transparent" ? "bg-transparent" : "bg-primary";
  return (
    <header className={`${bg} text-primary-foreground`}>
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold tracking-tight shrink-0">
          Rankin<span className="text-accent">.</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a href="#ayuda" className="hidden sm:inline-flex items-center gap-2 hover:text-accent transition-colors">
            <HelpCircle className="h-4 w-4" />
            Ayuda
          </a>
          <button type="button" aria-label="Idioma" className="hover:text-accent transition-colors">
            <Globe className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Favoritos" className="hover:text-accent transition-colors">
            <Heart className="h-5 w-5" />
          </button>
          <a href="mailto:hola@rankin.es" className="inline-flex items-center gap-2 hover:text-accent transition-colors">
            <User className="h-5 w-5" />
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}


