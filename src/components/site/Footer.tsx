import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  const cols = [
    { h: "Oportunidades", links: [
      { label: "Fontaneros en Madrid", to: "/oportunidades/$slug", params: { slug: "fontaneros-madrid" } as const },
      { label: "Dentistas en Barcelona", to: "/oportunidades/$slug", params: { slug: "dentistas-barcelona" } as const },
      { label: "Abogados en Valencia", to: "/oportunidades/$slug", params: { slug: "abogados-valencia" } as const },
      { label: "Reformas en Málaga", to: "/oportunidades/$slug", params: { slug: "reformas-malaga" } as const },
      { label: "Talleres en Bilbao", to: "/oportunidades/$slug", params: { slug: "talleres-bilbao" } as const },
      { label: "Ver todas", to: "/oportunidades", params: undefined },
    ] },
    { h: "Agencia", links: [
      { label: "Cómo funciona", to: "/como-funciona", params: undefined },
      { label: "Casos de éxito", to: "/casos-exito", params: undefined },
      { label: "Guías SEO local", to: "/guias", params: undefined },
    ] },
  ];

  return (
    <footer className="mt-20 bg-secondary border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
        {cols.map((col) => (
          <div key={col.h}>
            <h4 className="font-bold mb-3">{col.h}</h4>
            <ul className="space-y-2 text-muted-foreground">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.params ? (
                    <Link to={l.to as any} params={l.params as any} className="hover:text-primary">{l.label}</Link>
                  ) : (
                    <Link to={l.to as any} className="hover:text-primary">{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="font-bold mb-3">Contacto</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>911 23 45 67</li>
            <li>hola@rankin.es</li>
            <li>Madrid · Barcelona · Valencia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        <p>Rankin · Agencia de SEO local para negocios de barrio en España.</p>
        <p className="mt-2">© 2026 Rankin</p>
      </div>
    </footer>
  );
}
