import { createFileRoute } from "@tanstack/react-router";
import { Search, MapPin, Briefcase, Star, Globe, BarChart3, MessageSquare, FileText, Phone, ChevronRight, Check, Award, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import cityMadrid from "@/assets/city-madrid.jpg";
import cityBarcelona from "@/assets/city-barcelona.jpg";
import cityValencia from "@/assets/city-valencia.jpg";
import citySevilla from "@/assets/city-sevilla.jpg";
import cityBilbao from "@/assets/city-bilbao.jpg";
import cityMalaga from "@/assets/city-malaga.jpg";
import agency1 from "@/assets/agency-1.jpg";
import agency2 from "@/assets/agency-2.jpg";
import agency3 from "@/assets/agency-3.jpg";
import agency4 from "@/assets/agency-4.jpg";
import serviceGmb from "@/assets/service-gmb.jpg";
import serviceReviews from "@/assets/service-reviews.jpg";
import serviceAudit from "@/assets/service-audit.jpg";
import serviceContent from "@/assets/service-content.jpg";
import localBusiness from "@/assets/local-business.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rankin.com — Reserva servicios de SEO local para tu negocio" },
      { name: "description", content: "Compara y contrata agencias y freelancers de SEO local en España. Posiciona tu negocio en Google Maps, mejora reseñas y consigue más clientes." },
      { property: "og:title", content: "Rankin.com — SEO local que llena tu negocio" },
      { property: "og:description", content: "Compara agencias SEO en tu ciudad. Más visibilidad en Google, más reseñas, más clientes." },
    ],
  }),
  component: Index,
});

const cities = [
  { name: "Madrid", img: cityMadrid, providers: "1.247 agencias" },
  { name: "Barcelona", img: cityBarcelona, providers: "986 agencias" },
  { name: "Valencia", img: cityValencia, providers: "412 agencias" },
  { name: "Sevilla", img: citySevilla, providers: "356 agencias" },
  { name: "Bilbao", img: cityBilbao, providers: "243 agencias" },
  { name: "Málaga", img: cityMalaga, providers: "298 agencias" },
];

const services = [
  { title: "Google Business Profile", img: serviceGmb, desc: "Optimización de ficha y Maps", price: "Desde 149€/mes" },
  { title: "Gestión de Reseñas", img: serviceReviews, desc: "Más estrellas, menos negativas", price: "Desde 89€/mes" },
  { title: "Auditoría SEO Local", img: serviceAudit, desc: "Informe completo en 72h", price: "Desde 199€" },
  { title: "Contenido geolocalizado", img: serviceContent, desc: "Landings por barrio/ciudad", price: "Desde 59€/artículo" },
];

const agencies = [
  { name: "LocalRank Studio", city: "Madrid, España", img: agency1, rating: 9.4, reviews: 312, label: "Top valorada", price: 349, oldPrice: 499 },
  { name: "Mapa Visible", city: "Barcelona, España", img: agency2, rating: 9.2, reviews: 198, label: "Genius", price: 289, oldPrice: null },
  { name: "Calle SEO Freelance", city: "Valencia, España", img: agency3, rating: 8.9, reviews: 87, label: "Nuevo en Rankin", price: 179, oldPrice: 220 },
  { name: "Distrito Digital", city: "Sevilla, España", img: agency4, rating: 9.6, reviews: 421, label: "Premiada", price: 499, oldPrice: 650 },
];

const weekendDeals = [
  { name: "BarrioBoost — Pack Lanzamiento", city: "Madrid", img: agency1, rating: 9.1, price: 249, oldPrice: 399, badge: "Oferta semana" },
  { name: "GeoRanker — Auditoría exprés", city: "Bilbao", img: agency4, rating: 8.8, price: 99, oldPrice: 199, badge: "Bestseller" },
  { name: "ProximaSEO — Reseñas+", city: "Málaga", img: agency2, rating: 9.3, price: 129, oldPrice: 189, badge: "Genius" },
  { name: "Pueblo Online — Web local", city: "Granada", img: agency3, rating: 9.0, price: 590, oldPrice: 790, badge: "Limitada" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight">Rankin<span className="text-accent">.</span>com</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm">
            <button className="px-3 py-1.5 rounded hover:bg-white/10">EUR</button>
            <button className="px-3 py-1.5 rounded hover:bg-white/10">ES</button>
            <button className="px-3 py-1.5 rounded hover:bg-white/10">Soy agencia</button>
            <button className="px-3 py-1.5 rounded border border-white/40 bg-white text-primary hover:bg-white/90">Crear cuenta</button>
            <button className="px-3 py-1.5 rounded border border-white/40 bg-white text-primary hover:bg-white/90">Iniciar sesión</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto max-w-7xl px-4 pb-4 flex gap-2 flex-wrap">
          {[
            { icon: MapPin, label: "SEO Local" },
            { icon: Globe, label: "SEO Web" },
            { icon: Star, label: "Reseñas" },
            { icon: BarChart3, label: "Ads & Maps" },
            { icon: FileText, label: "Contenido" },
            { icon: Briefcase, label: "Agencias" },
          ].map(({ icon: Icon, label }, i) => (
            <button
              key={label}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border ${
                i === 0 ? "border-white bg-primary" : "border-transparent hover:border-white/60"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Hero */}
        <div className="mx-auto max-w-7xl px-4 pt-6 pb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Posiciona tu negocio en tu ciudad
          </h1>
          <p className="mt-2 text-lg text-white/85">
            Compara agencias y freelancers de SEO local. Más visibilidad en Google, más clientes en tu puerta.
          </p>
        </div>
      </header>

      {/* Search bar */}
      <div className="mx-auto max-w-7xl px-4 -mt-8 relative z-10">
        <div className="bg-accent rounded-md p-1 shadow-[var(--shadow-card)]">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1.5fr_auto] gap-1">
            <div className="bg-background rounded-sm flex items-center gap-2 px-3 py-3 border border-accent">
              <MapPin className="h-5 w-5 text-primary" />
              <Input
                placeholder="¿En qué ciudad está tu negocio?"
                className="border-0 shadow-none focus-visible:ring-0 px-0 text-base"
                defaultValue="Madrid, España"
              />
            </div>
            <div className="bg-background rounded-sm flex items-center gap-2 px-3 py-3 border border-accent">
              <Briefcase className="h-5 w-5 text-primary" />
              <Input
                placeholder="Sector (restaurante, clínica, abogado…)"
                className="border-0 shadow-none focus-visible:ring-0 px-0 text-base"
              />
            </div>
            <div className="bg-background rounded-sm flex items-center gap-2 px-3 py-3 border border-accent">
              <BarChart3 className="h-5 w-5 text-primary" />
              <select className="w-full bg-transparent outline-none text-base">
                <option>Presupuesto: cualquiera</option>
                <option>Menos de 200€/mes</option>
                <option>200 – 500€/mes</option>
                <option>500 – 1.000€/mes</option>
                <option>Más de 1.000€/mes</option>
              </select>
            </div>
            <Button className="bg-primary hover:bg-[var(--brand-deep)] text-primary-foreground h-auto px-8 text-base font-semibold rounded-sm">
              <Search className="h-5 w-5 mr-1" /> Buscar
            </Button>
          </div>
        </div>
        <label className="flex items-center gap-2 mt-3 text-sm text-foreground">
          <input type="checkbox" className="accent-primary" />
          Solo agencias con casos de éxito verificados
        </label>
      </div>

      <main className="mx-auto max-w-7xl px-4 mt-12 space-y-14">
        {/* Ofertas */}
        <section>
          <h2 className="text-xl font-bold mb-1">Ofertas</h2>
          <p className="text-sm text-muted-foreground mb-4">Promociones, descuentos y planes para impulsar tu visibilidad local.</p>
          <div className="border border-border rounded-lg p-5 flex flex-col md:flex-row gap-5 items-center bg-card">
            <div className="flex-1">
              <h3 className="text-2xl font-bold">Sin permanencia, solo resultados</h3>
              <p className="text-muted-foreground mt-1 mb-4">Mínimo 15% de descuento en planes seleccionados de SEO local. Cancela cuando quieras.</p>
              <Button className="bg-primary hover:bg-[var(--brand-deep)]">Aprovechar oferta</Button>
            </div>
            <img src={localBusiness} alt="Negocio local" width={280} height={180} className="rounded-md object-cover w-full md:w-72 h-44" loading="lazy" />
          </div>
        </section>

        {/* Tipo de servicio */}
        <section>
          <h2 className="text-xl font-bold mb-4">Busca por tipo de servicio</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((s) => (
              <a key={s.title} href="#" className="group block">
                <div className="aspect-[4/3] overflow-hidden rounded-md mb-2 border border-border">
                  <img src={s.img} alt={s.title} width={400} height={300} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
                </div>
                <p className="font-semibold">{s.title}</p>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                <p className="text-sm text-primary font-medium mt-1">{s.price}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Planificador */}
        <section>
          <h2 className="text-xl font-bold mb-1">Planificador SEO rápido y sencillo</h2>
          <p className="text-sm text-muted-foreground mb-4">Elige una ciudad y descubre las mejores agencias de SEO local en España.</p>
          <div className="flex gap-2 flex-wrap mb-5">
            {["Ciudades grandes", "Pueblos y comarcas", "Sector restauración", "Sector salud", "Servicios profesionales", "E-commerce local"].map((t, i) => (
              <button
                key={t}
                className={`px-4 py-1.5 text-sm rounded-full border ${
                  i === 0 ? "border-primary text-primary bg-primary/5" : "border-border text-foreground hover:border-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities.map((c) => (
              <a key={c.name} href="#" className="group">
                <div className="aspect-square overflow-hidden rounded-full mb-2">
                  <img src={c.img} alt={c.name} width={200} height={200} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
                </div>
                <p className="font-semibold text-center">{c.name}</p>
                <p className="text-xs text-muted-foreground text-center">{c.providers}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Agencias destacadas */}
        <section>
          <h2 className="text-xl font-bold mb-1">Contrata expertos con resultados probados</h2>
          <p className="text-sm text-muted-foreground mb-4">Agencias, freelancers y consultores verificados por Rankin.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {agencies.map((a) => (
              <article key={a.name} className="border border-border rounded-lg overflow-hidden bg-card shadow-[var(--shadow-card)] hover:shadow-lg transition">
                <div className="relative aspect-[4/3]">
                  <img src={a.img} alt={a.name} width={400} height={300} className="h-full w-full object-cover" loading="lazy" />
                  {a.label && (
                    <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded">
                      {a.label}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-base leading-tight">{a.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{a.city}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-1.5 py-1 rounded">{a.rating}</span>
                    <span className="text-xs"><strong>Excelente</strong> · {a.reviews} reseñas</span>
                  </div>
                  <div className="text-right">
                    {a.oldPrice && <span className="text-xs text-muted-foreground line-through mr-1">{a.oldPrice}€</span>}
                    <span className="font-bold text-base">{a.price}€</span>
                    <p className="text-[11px] text-muted-foreground">desde, por mes</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Sectores de moda - large hero cards */}
        <section>
          <h2 className="text-xl font-bold mb-4">Sectores que están creciendo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {[
              { city: "Restauración", img: agency2, flag: "🍽️" },
              { city: "Clínicas y salud", img: agency1, flag: "🩺" },
            ].map((c) => (
              <a key={c.city} href="#" className="relative block aspect-[2/1] rounded-lg overflow-hidden group">
                <img src={c.img} alt={c.city} width={800} height={400} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
                <span className="absolute top-3 left-3 bg-background/95 rounded px-2 py-1 text-sm font-semibold flex items-center gap-1">
                  {c.flag} {c.city}
                </span>
              </a>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { city: "Servicios legales", img: agency3, flag: "⚖️" },
              { city: "Inmobiliarias", img: agency4, flag: "🏠" },
              { city: "Tiendas locales", img: localBusiness, flag: "🛍️" },
            ].map((c) => (
              <a key={c.city} href="#" className="relative block aspect-[2/1] rounded-lg overflow-hidden group">
                <img src={c.img} alt={c.city} width={600} height={300} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
                <span className="absolute top-3 left-3 bg-background/95 rounded px-2 py-1 text-sm font-semibold flex items-center gap-1">
                  {c.flag} {c.city}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Descubre España */}
        <section>
          <h2 className="text-xl font-bold mb-1">Descubre España</h2>
          <p className="text-sm text-muted-foreground mb-4">Las ciudades donde más se está invirtiendo en SEO local.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Oviedo", count: "57 agencias", img: cityBilbao },
              { name: "San Sebastián", count: "134 agencias", img: cityBilbao },
              { name: "León", count: "48 agencias", img: cityMadrid },
              { name: "Santander", count: "76 agencias", img: cityMalaga },
              { name: "Burgos", count: "42 agencias", img: cityBarcelona },
              { name: "Alicante", count: "215 agencias", img: cityMalaga },
            ].map((c) => (
              <a key={c.name} href="#" className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-md mb-2">
                  <img src={c.img} alt={c.name} width={300} height={225} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
                </div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.count}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Ofertas para el fin de semana */}
        <section>
          <h2 className="text-xl font-bold mb-1">Ofertas del mes</h2>
          <p className="text-sm text-muted-foreground mb-4">Servicios destacados con descuento hasta el 30 de junio.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {weekendDeals.map((d) => (
              <article key={d.name} className="border border-border rounded-lg overflow-hidden bg-card shadow-[var(--shadow-card)]">
                <div className="relative aspect-[4/3]">
                  <img src={d.img} alt={d.name} width={400} height={300} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="p-3">
                  <span className="inline-block bg-accent text-accent-foreground text-[11px] font-semibold px-1.5 py-0.5 rounded mb-1">{d.badge}</span>
                  <h3 className="font-bold text-sm leading-tight">{d.name}</h3>
                  <p className="text-xs text-muted-foreground">{d.city}</p>
                  <div className="flex items-center gap-1 my-2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded">{d.rating}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground line-through mr-1">{d.oldPrice}€</span>
                    <span className="font-bold">{d.price}€</span>
                    <p className="text-[11px] text-muted-foreground">paquete inicial</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Genius */}
        <section className="border border-border rounded-lg p-6 bg-card flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">Crece más, paga menos</h2>
            <p className="text-muted-foreground mb-4">Únete a Rankin Genius y accede a descuentos del 10–20% en agencias seleccionadas, soporte prioritario y auditorías gratuitas.</p>
            <div className="flex gap-2">
              <Button className="bg-primary hover:bg-[var(--brand-deep)]">Iniciar sesión</Button>
              <Button variant="outline">Crear cuenta</Button>
            </div>
          </div>
          <div className="bg-accent text-accent-foreground rounded-md px-6 py-4 flex items-center gap-2">
            <Award className="h-8 w-8" />
            <span className="font-extrabold text-xl">Genius</span>
          </div>
        </section>

        {/* Por qué Rankin */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-center">¿Por qué reservar con Rankin?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, t: "Agencias verificadas", d: "Cada proveedor pasa por un control de identidad fiscal y revisión de casos." },
              { icon: Star, t: "Reseñas reales", d: "Solo los clientes que han contratado pueden valorar al proveedor." },
              { icon: MessageSquare, t: "Soporte 24/7 en español", d: "Estamos aquí cuando necesites ayuda con tu campaña o factura." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="text-center">
                <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold mb-1">{t}</h3>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular */}
        <section>
          <h2 className="text-xl font-bold mb-4">Popular entre la comunidad de negocios en España</h2>
          <div className="flex gap-4 border-b border-border mb-4 text-sm">
            {["Ciudades", "Sectores", "Servicios", "Packs", "Freelancers"].map((t, i) => (
              <button key={t} className={`pb-2 ${i === 0 ? "border-b-2 border-primary font-semibold text-primary" : "text-muted-foreground"}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-2 gap-x-4 text-sm">
            {[
              "SEO en Madrid", "SEO en Barcelona", "SEO en Valencia", "SEO en Sevilla", "SEO en Bilbao",
              "SEO en Málaga", "SEO en Zaragoza", "SEO en Murcia", "SEO en Palma", "SEO en Granada",
              "SEO en Alicante", "SEO en Vigo", "SEO en Gijón", "SEO en Córdoba", "SEO en Pamplona",
            ].map((k) => (
              <a key={k} href="#" className="text-primary hover:underline flex items-center gap-1">
                <ChevronRight className="h-3 w-3" /> {k}
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-secondary border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          {[
            { h: "Ayuda", items: ["Centro de ayuda", "Contactar con atención", "Recursos sobre seguridad"] },
            { h: "Descubre", items: ["Programa de fidelización", "Ofertas y promociones", "Articulos de SEO", "Casos de éxito"] },
            { h: "Términos", items: ["Configuración de cookies", "Política de privacidad", "Condiciones del servicio"] },
            { h: "Para agencias", items: ["Regístrate como agencia", "Conviértete en partner", "Panel de proveedores"] },
            { h: "Rankin", items: ["Sobre Rankin", "Empleo", "Centro de prensa", "Inversores"] },
          ].map((col) => (
            <div key={col.h}>
              <h4 className="font-bold mb-3">{col.h}</h4>
              <ul className="space-y-2 text-muted-foreground">
                {col.items.map((i) => (
                  <li key={i}><a href="#" className="hover:text-primary">{i}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
          <p>Rankin.com es un marketplace de servicios SEO local. Demo construida con Lovable.</p>
          <p className="mt-2">© 2026 Rankin.com</p>
        </div>
      </footer>
    </div>
  );
}
