export type Opportunity = {
  slug: string;
  sectorSlug: string;
  citySlug: string;
  sectorName: string;
  cityName: string;
  searches: number;
  cpc: number;
  competition: "Baja" | "Media" | "Alta";
  score: number; // 0-100 opportunity score
  trend: { month: string; value: number }[];
  districts: { name: string; potential: number }[];
  topKeywords: { kw: string; volume: number }[];
  topServices: string[];
};

const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

const trend = (base: number, growth = 0.04) =>
  months.map((m, i) => ({ month: m, value: Math.round(base * (1 + i * growth) * (0.85 + Math.random() * 0.3)) }));

export const opportunities: Opportunity[] = [
  {
    slug: "fontaneros-madrid",
    sectorSlug: "fontaneros", citySlug: "madrid",
    sectorName: "Fontaneros", cityName: "Madrid",
    searches: 14800, cpc: 3.2, competition: "Alta", score: 82,
    trend: trend(11000, 0.03),
    districts: [
      { name: "Centro", potential: 92 }, { name: "Salamanca", potential: 88 },
      { name: "Chamberí", potential: 84 }, { name: "Tetuán", potential: 76 },
      { name: "Carabanchel", potential: 71 }, { name: "Vallecas", potential: 68 },
    ],
    topKeywords: [
      { kw: "fontanero madrid", volume: 4400 }, { kw: "fontanero urgente madrid", volume: 2900 },
      { kw: "fontanero 24h madrid", volume: 1900 }, { kw: "fontanero barato madrid", volume: 1300 },
      { kw: "reparación calentador madrid", volume: 880 },
    ],
    topServices: ["Avisos urgentes 24h", "Reparación calentadores", "Detección de fugas", "Desatascos"],
  },
  {
    slug: "dentistas-barcelona",
    sectorSlug: "dentistas", citySlug: "barcelona",
    sectorName: "Clínicas dentales", cityName: "Barcelona",
    searches: 22300, cpc: 4.8, competition: "Alta", score: 78,
    trend: trend(18000, 0.025),
    districts: [
      { name: "Eixample", potential: 94 }, { name: "Sarrià-Sant Gervasi", potential: 89 },
      { name: "Gràcia", potential: 82 }, { name: "Sants", potential: 74 },
      { name: "Sant Martí", potential: 70 }, { name: "Horta", potential: 64 },
    ],
    topKeywords: [
      { kw: "dentista barcelona", volume: 6600 }, { kw: "implantes dentales barcelona", volume: 3600 },
      { kw: "ortodoncia invisible barcelona", volume: 1900 }, { kw: "dentista urgente barcelona", volume: 1300 },
      { kw: "blanqueamiento dental barcelona", volume: 880 },
    ],
    topServices: ["Implantes dentales", "Ortodoncia invisible", "Estética dental", "Endodoncia"],
  },
  {
    slug: "abogados-valencia",
    sectorSlug: "abogados", citySlug: "valencia",
    sectorName: "Abogados", cityName: "Valencia",
    searches: 8100, cpc: 5.6, competition: "Media", score: 74,
    trend: trend(6500, 0.035),
    districts: [
      { name: "Ciutat Vella", potential: 86 }, { name: "L'Eixample", potential: 81 },
      { name: "Extramurs", potential: 72 }, { name: "Camins al Grau", potential: 65 },
    ],
    topKeywords: [
      { kw: "abogado valencia", volume: 2400 }, { kw: "abogado laboralista valencia", volume: 880 },
      { kw: "abogado divorcio valencia", volume: 720 }, { kw: "abogado herencias valencia", volume: 590 },
    ],
    topServices: ["Derecho laboral", "Divorcios", "Herencias", "Penal"],
  },
  {
    slug: "peluquerias-sevilla",
    sectorSlug: "peluquerias", citySlug: "sevilla",
    sectorName: "Peluquerías", cityName: "Sevilla",
    searches: 6400, cpc: 1.4, competition: "Media", score: 86,
    trend: trend(4800, 0.05),
    districts: [
      { name: "Casco Antiguo", potential: 90 }, { name: "Nervión", potential: 84 },
      { name: "Triana", potential: 79 }, { name: "Los Remedios", potential: 72 },
    ],
    topKeywords: [
      { kw: "barbería sevilla", volume: 1900 }, { kw: "peluquería sevilla centro", volume: 880 },
      { kw: "peluquería hombres sevilla", volume: 720 }, { kw: "peluquería novia sevilla", volume: 390 },
    ],
    topServices: ["Barbería clásica", "Coloración", "Peinados de novia", "Tratamientos capilares"],
  },
  {
    slug: "talleres-bilbao",
    sectorSlug: "talleres", citySlug: "bilbao",
    sectorName: "Talleres mecánicos", cityName: "Bilbao",
    searches: 4200, cpc: 2.1, competition: "Baja", score: 88,
    trend: trend(3400, 0.045),
    districts: [
      { name: "Abando", potential: 87 }, { name: "Indautxu", potential: 82 },
      { name: "Deusto", potential: 76 }, { name: "Begoña", potential: 70 },
    ],
    topKeywords: [
      { kw: "taller mecánico bilbao", volume: 1300 }, { kw: "taller chapa pintura bilbao", volume: 590 },
      { kw: "cambio aceite bilbao", volume: 480 }, { kw: "neumáticos bilbao", volume: 880 },
    ],
    topServices: ["Mecánica general", "Chapa y pintura", "Neumáticos", "Pre-ITV"],
  },
  {
    slug: "reformas-malaga",
    sectorSlug: "reformas", citySlug: "malaga",
    sectorName: "Reformas integrales", cityName: "Málaga",
    searches: 9700, cpc: 3.9, competition: "Media", score: 84,
    trend: trend(7200, 0.06),
    districts: [
      { name: "Centro Histórico", potential: 89 }, { name: "Teatinos", potential: 84 },
      { name: "Pedregalejo", potential: 78 }, { name: "Carretera de Cádiz", potential: 71 },
    ],
    topKeywords: [
      { kw: "reformas integrales málaga", volume: 2900 }, { kw: "reforma cocina málaga", volume: 1300 },
      { kw: "reforma baño málaga", volume: 1100 }, { kw: "empresa reformas málaga", volume: 880 },
    ],
    topServices: ["Reformas integrales", "Cocinas", "Baños", "Locales comerciales"],
  },
];

export const getOpportunity = (slug: string) => opportunities.find((o) => o.slug === slug);
