import { Wrench, Stethoscope, Scissors, Car, Scale, Home, UtensilsCrossed, Dumbbell, Sparkles, GraduationCap, PawPrint, Camera, Zap, Hammer, type LucideIcon } from "lucide-react";

import agency1 from "@/assets/agency-1.jpg";
import agency2 from "@/assets/agency-2.jpg";
import agency3 from "@/assets/agency-3.jpg";
import agency4 from "@/assets/agency-4.jpg";
import serviceAudit from "@/assets/service-audit.jpg";
import serviceContent from "@/assets/service-content.jpg";
import serviceGmb from "@/assets/service-gmb.jpg";
import serviceReviews from "@/assets/service-reviews.jpg";
import localBusiness from "@/assets/local-business.jpg";
import cityValencia from "@/assets/city-valencia.jpg";
import cityBilbao from "@/assets/city-bilbao.jpg";
import citySevilla from "@/assets/city-sevilla.jpg";
import cityMalaga from "@/assets/city-malaga.jpg";

export type Sector = {
  slug: string;
  name: string;
  short: string;
  icon: LucideIcon;
  img: string;
  desc: string;
  keyword: string;
  clients: string;
  monthlySearches: number;
  cities: string[];
};

export const sectors: Sector[] = [
  { slug: "fontaneros", name: "Fontaneros", short: "Fontanería", icon: Wrench, img: agency1, desc: "Aparece el primero cuando alguien busca 'fontanero urgente' en tu ciudad.", keyword: "fontanero 24h", clients: "+120 fontaneros", monthlySearches: 14800, cities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Málaga"] },
  { slug: "electricistas", name: "Electricistas", short: "Electricidad", icon: Zap, img: serviceGmb, desc: "Capta avisos urgentes y reformas eléctricas desde Google Maps.", keyword: "electricista 24h", clients: "+80 electricistas", monthlySearches: 9900, cities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Málaga"] },
  { slug: "reformas", name: "Empresas de reformas", short: "Reformas", icon: Hammer, img: localBusiness, desc: "Genera presupuestos cualificados por barrio sin depender de portales.", keyword: "reformas integrales [ciudad]", clients: "+50 empresas", monthlySearches: 12100, cities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Málaga"] },
  { slug: "dentistas", name: "Clínicas dentales", short: "Odontología", icon: Stethoscope, img: agency2, desc: "Llena tu agenda de primeras visitas locales sin depender de Doctoralia.", keyword: "dentista cerca de mí", clients: "+85 clínicas", monthlySearches: 22300, cities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Málaga"] },
  { slug: "abogados", name: "Abogados", short: "Abogacía", icon: Scale, img: serviceAudit, desc: "Capta clientes de tu provincia con SEO local y contenido jurídico.", keyword: "abogado laboralista [ciudad]", clients: "+45 despachos", monthlySearches: 8100, cities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao"] },
  { slug: "inmobiliarias", name: "Inmobiliarias", short: "Inmobiliaria", icon: Home, img: localBusiness, desc: "Posiciona tu inmobiliaria por cada barrio y tipo de inmueble.", keyword: "pisos en [barrio]", clients: "+70 inmobiliarias", monthlySearches: 18500, cities: ["Madrid", "Barcelona", "Valencia", "Málaga"] },
  { slug: "peluquerias", name: "Peluquerías y barberías", short: "Peluquería", icon: Scissors, img: agency3, desc: "Más reservas desde Google Maps y reseñas reales de clientes de tu barrio.", keyword: "barbería en [ciudad]", clients: "+200 salones", monthlySearches: 11200, cities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Málaga"] },
  { slug: "talleres", name: "Talleres mecánicos", short: "Mecánica", icon: Car, img: agency4, desc: "Que tu taller aparezca antes que las cadenas cuando buscan 'taller cerca'.", keyword: "taller mecánico cerca", clients: "+60 talleres", monthlySearches: 9700, cities: ["Madrid", "Barcelona", "Valencia", "Sevilla"] },
  { slug: "restaurantes", name: "Restaurantes y bares", short: "Restauración", icon: UtensilsCrossed, img: serviceContent, desc: "Más reservas directas desde Google y menos comisiones a TheFork.", keyword: "restaurante [zona]", clients: "+150 locales", monthlySearches: 33400, cities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao", "Málaga"] },
  { slug: "gimnasios", name: "Gimnasios", short: "Fitness", icon: Dumbbell, img: serviceReviews, desc: "Capta socios de tu zona en lugar de competir con franquicias por Ads.", keyword: "gimnasio cerca de mí", clients: "+35 centros", monthlySearches: 7200, cities: ["Madrid", "Barcelona", "Valencia", "Málaga"] },
  { slug: "estetica", name: "Centros de estética", short: "Estética", icon: Sparkles, img: serviceGmb, desc: "Llena tu cabina con clientas de tu barrio gracias a Google y reseñas.", keyword: "centro estética [ciudad]", clients: "+90 centros", monthlySearches: 6800, cities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Málaga"] },
  { slug: "veterinarias", name: "Clínicas veterinarias", short: "Veterinaria", icon: PawPrint, img: cityBilbao, desc: "Clientes fieles de tu zona buscando 'veterinario 24h' o 'peluquería canina'.", keyword: "veterinario cerca", clients: "+30 clínicas", monthlySearches: 5400, cities: ["Madrid", "Barcelona", "Valencia", "Bilbao"] },
  { slug: "academias", name: "Academias", short: "Formación", icon: GraduationCap, img: cityValencia, desc: "Más matrículas locales sin depender de portales de cursos.", keyword: "academia inglés [ciudad]", clients: "+40 academias", monthlySearches: 6100, cities: ["Madrid", "Barcelona", "Valencia", "Sevilla"] },
  { slug: "fotografos", name: "Fotógrafos de bodas", short: "Fotografía", icon: Camera, img: citySevilla, desc: "Posiciónate para 'fotógrafo de boda [ciudad]' y deja de pagar a plataformas.", keyword: "fotógrafo boda [ciudad]", clients: "+25 estudios", monthlySearches: 3900, cities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Málaga"] },
];

export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);

// Avoid unused warnings for some asset imports
export const _assets = { cityMalaga };
