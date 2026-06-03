import agency1 from "@/assets/agency-1.jpg";
import agency2 from "@/assets/agency-2.jpg";
import agency3 from "@/assets/agency-3.jpg";
import agency4 from "@/assets/agency-4.jpg";
import serviceAudit from "@/assets/service-audit.jpg";
import localBusiness from "@/assets/local-business.jpg";

export type CaseStudy = {
  slug: string;
  name: string;
  city: string;
  sector: string;
  sectorSlug: string;
  img: string;
  before: string;
  after: string;
  rating: number;
  reviews: number;
  growth: string;
  quote: string;
  author: string;
};

export const cases: CaseStudy[] = [
  { slug: "fontaneria-rios-madrid", name: "Fontanería Ríos", city: "Madrid", sector: "Fontanería", sectorSlug: "fontaneros", img: agency1, before: "Posición 14 en Google", after: "Top 3 en Google Maps", rating: 9.4, reviews: 312, growth: "+180% llamadas en 6 meses", quote: "Pasamos de no recibir llamadas un lunes a tener que contratar a dos personas más.", author: "Javier R., propietario" },
  { slug: "clinica-sonrie-barcelona", name: "Clínica Dental Sonríe", city: "Barcelona", sector: "Clínicas dentales", sectorSlug: "dentistas", img: agency2, before: "0 reseñas en Google", after: "198 reseñas 4.9★", rating: 9.2, reviews: 198, growth: "+62 primeras visitas/mes", quote: "Dejamos Doctoralia. Ahora el 70% de pacientes llegan por Google.", author: "Dra. Pérez, directora" },
  { slug: "barberia-el-capitan-valencia", name: "Barbería El Capitán", city: "Valencia", sector: "Peluquerías", sectorSlug: "peluquerias", img: agency3, before: "Invisible en Maps", after: "1º en su barrio", rating: 8.9, reviews: 87, growth: "Agenda llena 3 semanas vista", quote: "No tenía web. Ahora la gente reserva por Google sin que yo coja el teléfono.", author: "Marco, propietario" },
  { slug: "taller-distrito-norte-sevilla", name: "Taller Distrito Norte", city: "Sevilla", sector: "Talleres mecánicos", sectorSlug: "talleres", img: agency4, before: "Sin web", after: "Top 5 'taller cerca'", rating: 9.6, reviews: 421, growth: "+210% presupuestos pedidos", quote: "Antes solo venía gente del barrio. Hoy vienen de toda Sevilla Este.", author: "Antonio, gerente" },
  { slug: "abogados-luna-bilbao", name: "Abogados Luna", city: "Bilbao", sector: "Abogados", sectorSlug: "abogados", img: serviceAudit, before: "100 visitas/mes", after: "1.800 visitas/mes", rating: 9.1, reviews: 64, growth: "+18 casos cualificados/mes", quote: "Antes captábamos por recomendación. Hoy entran consultas desde Google a diario.", author: "Iratxe Luna, socia" },
  { slug: "inmobiliaria-mediterraneo-malaga", name: "Inmobiliaria Mediterráneo", city: "Málaga", sector: "Inmobiliarias", sectorSlug: "inmobiliarias", img: localBusiness, before: "Solo Idealista", after: "Captación orgánica directa", rating: 9.3, reviews: 142, growth: "-40% en gasto de portales", quote: "Hemos reducido la dependencia de Idealista y Fotocasa a la mitad.", author: "Carlos M., director" },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
