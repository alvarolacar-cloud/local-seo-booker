import { createFileRoute } from "@tanstack/react-router";
import { Search, MapPin, Star, BarChart3, MessageSquare, FileText, ChevronRight, Award, ShieldCheck, Wrench, Stethoscope, Scissors, Car, Scale, Home, UtensilsCrossed, Dumbbell, Sparkles, GraduationCap, PawPrint, Camera, TrendingUp, Phone } from "lucide-react";
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
      { title: "Rankin — Agencia de SEO local para negocios de barrio" },
      { name: "description", content: "Somos una agencia de SEO local especializada en posicionar fontaneros, clínicas dentales, peluquerías, talleres y otros negocios de barrio en Google y Google Maps." },
      { property: "og:title", content: "Rankin — SEO local que llena tu agenda" },
      { property: "og:description", content: "Posicionamos tu negocio local en Google para que los clientes de tu zona te encuentren a ti, no a tu competencia." },
    ],
  }),
  component: Index,
});

const sectors = [
  { name: "Fontanería", icon: Wrench, img: agency1, desc: "Aparece el primero cuando alguien busca 'fontanero urgente' en tu ciudad.", keyword: "fontanero 24h", clients: "+120 fontaneros" },
  { name: "Clínicas dentales", icon: Stethoscope, img: agency2, desc: "Llena tu agenda de primeras visitas locales sin depender de Doctoralia.", keyword: "dentista cerca de mí", clients: "+85 clínicas" },
  { name: "Peluquerías y barberías", icon: Scissors, img: agency3, desc: "Más reservas desde Google Maps y reseñas reales de clientes de tu barrio.", keyword: "barbería en [tu ciudad]", clients: "+200 salones" },
  { name: "Talleres mecánicos", icon: Car, img: agency4, desc: "Que tu taller aparezca antes que las cadenas cuando buscan 'taller cerca'.", keyword: "taller mecánico cerca", clients: "+60 talleres" },
  { name: "Abogados y gestorías", icon: Scale, img: serviceAudit, desc: "Capta clientes de tu provincia con SEO local y contenido jurídico.", keyword: "abogado laboralista [ciudad]", clients: "+45 despachos" },
  { name: "Inmobiliarias", icon: Home, img: localBusiness, desc: "Posiciona tu inmobiliaria por cada barrio y tipo de inmueble.", keyword: "pisos en [barrio]", clients: "+70 inmobiliarias" },
  { name: "Restaurantes y bares", icon: UtensilsCrossed, img: serviceContent, desc: "Más reservas directas desde Google y menos comisiones a TheFork.", keyword: "restaurante [zona]", clients: "+150 locales" },
  { name: "Gimnasios y centros deportivos", icon: Dumbbell, img: serviceReviews, desc: "Capta socios de tu zona en lugar de competir con franquicias por Ads.", keyword: "gimnasio cerca de mí", clients: "+35 centros" },
  { name: "Estética y belleza", icon: Sparkles, img: serviceGmb, desc: "Llena tu cabina con clientas de tu barrio gracias a Google y reseñas.", keyword: "centro estética [ciudad]", clients: "+90 centros" },
  { name: "Academias y formación", icon: GraduationCap, img: cityValencia, desc: "Más matrículas locales sin depender de portales de cursos.", keyword: "academia inglés [ciudad]", clients: "+40 academias" },
  { name: "Veterinarias y mascotas", icon: PawPrint, img: cityBilbao, desc: "Clientes fieles de tu zona buscando 'veterinario 24h' o 'peluquería canina'.", keyword: "veterinario cerca", clients: "+30 clínicas" },
  { name: "Fotógrafos y eventos", icon: Camera, img: citySevilla, desc: "Posiciónate para 'fotógrafo de boda [ciudad]' y deja de pagar a plataformas.", keyword: "fotógrafo boda [ciudad]", clients: "+25 estudios" },
];

const services = [
  { title: "Google Business Profile", img: serviceGmb, desc: "Optimizamos tu ficha para que aparezcas en el Map Pack", price: "Desde 149€/mes" },
  { title: "Gestión de reseñas", img: serviceReviews, desc: "Más estrellas reales, menos negativas que duelen", price: "Desde 89€/mes" },
  { title: "Auditoría SEO local", img: serviceAudit, desc: "Informe completo de tu visibilidad en 72h", price: "Desde 199€" },
  { title: "Contenido geolocalizado", img: serviceContent, desc: "Landings por barrio, servicio y ciudad", price: "Desde 59€/artículo" },
];

const caseStudies = [
  { name: "Fontanería Ríos", city: "Madrid", img: agency1, before: "Posición 14", after: "Top 3 Maps", rating: 9.4, reviews: 312, growth: "+180% llamadas", sector: "Fontanería" },
  { name: "Clínica Dental Sonríe", city: "Barcelona", img: agency2, before: "0 reseñas", after: "198 reseñas 4.9★", rating: 9.2, reviews: 198, growth: "+62 primeras visitas/mes", sector: "Odontología" },
  { name: "Barbería El Capitán", city: "Valencia", img: agency3, before: "Invisible en Maps", after: "1º en su barrio", rating: 8.9, reviews: 87, growth: "Agenda llena 3 semanas", sector: "Barbería" },
  { name: "Taller Distrito Norte", city: "Sevilla", img: agency4, before: "Sin web", after: "Top 5 'taller cerca'", rating: 9.6, reviews: 421, growth: "+210% presupuestos", sector: "Mecánica" },
];

const cities = [
  { name: "Madrid", img: cityMadrid, note: "Cobertura por distritos" },
  { name: "Barcelona", img: cityBarcelona, note: "Cobertura por barrios" },
  { name: "Valencia", img: cityValencia, note: "Cobertura completa" },
  { name: "Sevilla", img: citySevilla, note: "Cobertura completa" },
  { name: "Bilbao", img: cityBilbao, note: "Cobertura completa" },
  { name: "Málaga", img: cityMalaga, note: "Cobertura completa" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight">Rankin<span className="text-accent">.</span></span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm">
            <a href="#sectores" className="px-3 py-1.5 rounded hover:bg-white/10">Sectores</a>
            <a href="#servicios" className="px-3 py-1.5 rounded hover:bg-white/10">Servicios</a>
            <a href="#casos" className="px-3 py-1.5 rounded hover:bg-white/10">Casos de éxito</a>
            <a href="#contacto" className="px-3 py-1.5 rounded hover:bg-white/10">Contacto</a>
            <button className="px-3 py-1.5 rounded border border-white/40 bg-white text-primary hover:bg-white/90 font-semibold">Auditoría gratis</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto max-w-7xl px-4 pb-4 flex gap-2 flex-wrap">
          {[
            { icon: MapPin, label: "SEO Local" },
            { icon: Star, label: "Reseñas Google" },
            { icon: BarChart3, label: "Google Maps" },
            { icon: FileText, label: "Contenido local" },
            { icon: TrendingUp, label: "Google Ads local" },
            { icon: ShieldCheck, label: "Auditoría gratis" },
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
            Que te encuentren los clientes de tu ciudad, no los de Google a 600 km
          </h1>
          <p className="mt-2 text-lg text-white/85 max-w-3xl">
            Somos una agencia de SEO local. Posicionamos negocios de barrio —fontaneros, dentistas, peluquerías, talleres— en Google y Google Maps para que tu agenda se llene sola.
          </p>
        </div>
      </header>

      {/* Search bar -> Diagnóstico gratuito */}
      <div className="mx-auto max-w-7xl px-4 -mt-8 relative z-10">
        <div className="bg-accent rounded-md p-1 shadow-[var(--shadow-card)]">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1.5fr_auto] gap-1">
            <div className="bg-background rounded-sm flex items-center gap-2 px-3 py-3 border border-accent">
              <MapPin className="h-5 w-5 text-primary" />
              <Input
                placeholder="¿Dónde está tu negocio?"
                className="border-0 shadow-none focus-visible:ring-0 px-0 text-base"
                defaultValue="Madrid, España"
              />
            </div>
            <div className="bg-background rounded-sm flex items-center gap-2 px-3 py-3 border border-accent">
              <Wrench className="h-5 w-5 text-primary" />
              <Input
                placeholder="¿A qué te dedicas? (fontanero, dentista…)"
                className="border-0 shadow-none focus-visible:ring-0 px-0 text-base"
              />
            </div>
            <div className="bg-background rounded-sm flex items-center gap-2 px-3 py-3 border border-accent">
              <Phone className="h-5 w-5 text-primary" />
              <Input
                placeholder="Teléfono o email"
                className="border-0 shadow-none focus-visible:ring-0 px-0 text-base"
              />
            </div>
            <Button className="bg-primary hover:bg-[var(--brand-deep)] text-primary-foreground h-auto px-8 text-base font-semibold rounded-sm">
              <Search className="h-5 w-5 mr-1" /> Diagnóstico gratis
            </Button>
          </div>
        </div>
        <p className="mt-3 text-sm text-foreground">
          Te decimos en 48h qué posición ocupas hoy, quién te está adelantando y qué tendríamos que hacer. Sin compromiso.
        </p>
      </div>

      <main className="mx-auto max-w-7xl px-4 mt-12 space-y-14">
        {/* Promesa */}
        <section>
          <h2 className="text-xl font-bold mb-1">Sin permanencia, solo resultados</h2>
          <p className="text-sm text-muted-foreground mb-4">Trabajamos por objetivos medibles: llamadas, formularios y citas reales en tu agenda.</p>
          <div className="border border-border rounded-lg p-5 flex flex-col md:flex-row gap-5 items-center bg-card">
            <div className="flex-1">
              <h3 className="text-2xl font-bold">Si en 90 días no subes posiciones, no pagas el siguiente mes</h3>
              <p className="text-muted-foreground mt-1 mb-4">Te enseñamos cada mes el informe de Google Search Console y Google Business Profile. Lo que medimos, lo mejoramos.</p>
              <Button className="bg-primary hover:bg-[var(--brand-deep)]">Quiero mi auditoría gratis</Button>
            </div>
            <img src={localBusiness} alt="Negocio local posicionado en Google" width={280} height={180} className="rounded-md object-cover w-full md:w-72 h-44" loading="lazy" />
          </div>
        </section>

        {/* SECTORES — el bloque principal */}
        <section id="sectores">
          <h2 className="text-2xl font-bold mb-1">¿A qué se dedica tu negocio?</h2>
          <p className="text-sm text-muted-foreground mb-6">Estos son los sectores donde mejor sabemos lo que funciona. Entra y mira cómo posicionamos a negocios como el tuyo.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectors.map((s) => {
              const Icon = s.icon;
              return (
                <a key={s.name} href="#" className="group block border border-border rounded-lg overflow-hidden bg-card shadow-[var(--shadow-card)] hover:shadow-lg hover:border-primary transition">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={s.img} alt={`SEO local para ${s.name}`} width={400} height={250} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
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
                    <div className="flex items-center justify-between text-xs">
                      <span className="bg-primary/10 text-primary font-semibold px-2 py-1 rounded">"{s.keyword}"</span>
                      <span className="text-muted-foreground">{s.clients}</span>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Ver plan SEO para {s.name.toLowerCase()} <ChevronRight className="h-4 w-4" />
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios">
          <h2 className="text-xl font-bold mb-1">Lo que hacemos por tu negocio</h2>
          <p className="text-sm text-muted-foreground mb-4">Servicios pensados para negocios locales que dependen de clientes de su zona.</p>
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

        {/* Cómo trabajamos */}
        <section>
          <h2 className="text-xl font-bold mb-1">Cómo trabajamos contigo</h2>
          <p className="text-sm text-muted-foreground mb-4">Un proceso transparente y medible, sin humo de marketing.</p>
          <div className="flex gap-2 flex-wrap mb-5">
            {["Diagnóstico", "Plan a 90 días", "Ejecución mensual", "Informe transparente"].map((t, i) => (
              <button
                key={t}
                className={`px-4 py-1.5 text-sm rounded-full border ${
                  i === 0 ? "border-primary text-primary bg-primary/5" : "border-border text-foreground hover:border-primary"
                }`}
              >
                {i + 1}. {t}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { t: "Auditoría gratuita", d: "Analizamos tu ficha de Google, tu web y tus 5 competidores locales más fuertes." },
              { t: "Plan a 90 días", d: "Te entregamos un plan claro con objetivos medibles y palabras clave de tu ciudad." },
              { t: "Ejecutamos cada mes", d: "Fichas, contenido, reseñas, enlaces locales y técnica. Tú sigues atendiendo clientes." },
              { t: "Informe mensual", d: "Sabes en todo momento qué posición ocupas y cuántas llamadas trajo Google." },
            ].map((step, i) => (
              <div key={step.t} className="border border-border rounded-lg p-4 bg-card">
                <div className="text-3xl font-extrabold text-primary mb-1">0{i + 1}</div>
                <h3 className="font-bold mb-1">{step.t}</h3>
                <p className="text-sm text-muted-foreground">{step.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Casos de éxito */}
        <section id="casos">
          <h2 className="text-xl font-bold mb-1">Negocios como el tuyo, posicionados por nosotros</h2>
          <p className="text-sm text-muted-foreground mb-4">Casos reales con números reales. Sin "estimaciones".</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {caseStudies.map((a) => (
              <article key={a.name} className="border border-border rounded-lg overflow-hidden bg-card shadow-[var(--shadow-card)] hover:shadow-lg transition">
                <div className="relative aspect-[4/3]">
                  <img src={a.img} alt={a.name} width={400} height={300} className="h-full w-full object-cover" loading="lazy" />
                  <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded">
                    {a.sector}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-base leading-tight">{a.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{a.city}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-1.5 py-1 rounded">{a.rating}</span>
                    <span className="text-xs"><strong>Excelente</strong> · {a.reviews} reseñas</span>
                  </div>
                  <div className="text-xs space-y-1 border-t border-border pt-2">
                    <p><span className="text-muted-foreground">Antes:</span> {a.before}</p>
                    <p><span className="text-muted-foreground">Ahora:</span> <strong>{a.after}</strong></p>
                    <p className="text-primary font-semibold mt-1">{a.growth}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Ciudades donde trabajamos */}
        <section>
          <h2 className="text-xl font-bold mb-1">Ciudades donde ya posicionamos negocios</h2>
          <p className="text-sm text-muted-foreground mb-4">Trabajamos en toda España, con foco en estas zonas.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities.map((c) => (
              <a key={c.name} href="#" className="group">
                <div className="aspect-square overflow-hidden rounded-full mb-2">
                  <img src={c.img} alt={`SEO local en ${c.name}`} width={200} height={200} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
                </div>
                <p className="font-semibold text-center">{c.name}</p>
                <p className="text-xs text-muted-foreground text-center">{c.note}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Genius -> Plan de fidelidad */}
        <section className="border border-border rounded-lg p-6 bg-card flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">Auditoría SEO local gratis para tu negocio</h2>
            <p className="text-muted-foreground mb-4">En 48h te enviamos un informe con tu posición actual, tus competidores en Google Maps y 5 acciones concretas para mejorar. Sin compromiso, sin tarjeta.</p>
            <div className="flex gap-2">
              <Button className="bg-primary hover:bg-[var(--brand-deep)]">Pedir auditoría gratis</Button>
              <Button variant="outline">Hablar con un consultor</Button>
            </div>
          </div>
          <div className="bg-accent text-accent-foreground rounded-md px-6 py-4 flex items-center gap-2">
            <Award className="h-8 w-8" />
            <span className="font-extrabold text-xl">Gratis</span>
          </div>
        </section>

        {/* Por qué Rankin */}
        <section>
          <h2 className="text-xl font-bold mb-6 text-center">¿Por qué elegirnos para tu SEO local?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, t: "Solo SEO local", d: "No hacemos de todo. Vivimos del SEO de negocios de barrio desde hace años." },
              { icon: Star, t: "Sin permanencia", d: "Si no ves resultados en 90 días, te vas sin penalización. Así de simple." },
              { icon: MessageSquare, t: "Hablamos claro", d: "Nada de informes con humo. Cada mes ves posiciones, llamadas y reseñas." },
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

        {/* Popular -> SEO por sector y ciudad */}
        <section>
          <h2 className="text-xl font-bold mb-4">Servicios destacados de SEO local</h2>
          <div className="flex gap-4 border-b border-border mb-4 text-sm flex-wrap">
            {["Por ciudad", "Por sector", "Por servicio"].map((t, i) => (
              <button key={t} className={`pb-2 ${i === 0 ? "border-b-2 border-primary font-semibold text-primary" : "text-muted-foreground"}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-2 gap-x-4 text-sm">
            {[
              "SEO local en Madrid", "SEO local en Barcelona", "SEO local en Valencia", "SEO local en Sevilla", "SEO local en Bilbao",
              "SEO para fontaneros", "SEO para dentistas", "SEO para peluquerías", "SEO para talleres", "SEO para abogados",
              "SEO para restaurantes", "SEO para gimnasios", "SEO para inmobiliarias", "SEO para clínicas estéticas", "SEO para veterinarias",
            ].map((k) => (
              <a key={k} href="#" className="text-primary hover:underline flex items-center gap-1">
                <ChevronRight className="h-3 w-3" /> {k}
              </a>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section id="contacto" className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">¿Listo para que te encuentren en tu ciudad?</h2>
          <p className="text-white/85 mb-5 max-w-2xl mx-auto">Cuéntanos a qué te dedicas y dónde. En 48h te decimos qué posición ocupas y qué haríamos por ti.</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">Pedir auditoría gratis</Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <Phone className="h-4 w-4 mr-1" /> 911 23 45 67
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-secondary border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          {[
            { h: "Sectores", items: ["Fontanería", "Clínicas dentales", "Peluquerías", "Talleres", "Abogados", "Restaurantes"] },
            { h: "Servicios", items: ["SEO local", "Google Business Profile", "Gestión de reseñas", "Contenido geolocalizado", "Auditoría SEO"] },
            { h: "Ciudades", items: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Málaga"] },
            { h: "Agencia", items: ["Sobre Rankin", "Casos de éxito", "Blog SEO local", "Trabaja con nosotros"] },
            { h: "Legal", items: ["Aviso legal", "Política de privacidad", "Política de cookies", "Contacto"] },
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
          <p>Rankin · Agencia de SEO local para negocios de barrio en España.</p>
          <p className="mt-2">© 2026 Rankin</p>
        </div>
      </footer>
    </div>
  );
}
