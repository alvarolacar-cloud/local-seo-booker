import cityMadrid from "@/assets/city-madrid.jpg";
import cityBarcelona from "@/assets/city-barcelona.jpg";
import cityValencia from "@/assets/city-valencia.jpg";
import citySevilla from "@/assets/city-sevilla.jpg";
import cityBilbao from "@/assets/city-bilbao.jpg";
import cityMalaga from "@/assets/city-malaga.jpg";

export type City = { slug: string; name: string; img: string; note: string };

export const cities: City[] = [
  { slug: "madrid", name: "Madrid", img: cityMadrid, note: "Cobertura por distritos" },
  { slug: "barcelona", name: "Barcelona", img: cityBarcelona, note: "Cobertura por barrios" },
  { slug: "valencia", name: "Valencia", img: cityValencia, note: "Cobertura completa" },
  { slug: "sevilla", name: "Sevilla", img: citySevilla, note: "Cobertura completa" },
  { slug: "bilbao", name: "Bilbao", img: cityBilbao, note: "Cobertura completa" },
  { slug: "malaga", name: "Málaga", img: cityMalaga, note: "Cobertura completa" },
];

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
