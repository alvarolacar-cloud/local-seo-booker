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
      { name: "El Palo", potential: 89 }, { name: "Huelin", potential: 84 },
      { name: "La Trinidad", potential: 78 }, { name: "Cruz de Humilladero", potential: 71 },
      { name: "Churriana", potential: 68 }, { name: "Campanillas", potential: 64 },
      { name: "Málaga Este", potential: 82 }, { name: "Teatinos", potential: 79 },
    ],
    topKeywords: [
      { kw: "reformas integrales málaga", volume: 2900 }, { kw: "reforma cocina málaga", volume: 1300 },
      { kw: "reforma baño málaga", volume: 1100 }, { kw: "empresa reformas málaga", volume: 880 },
    ],
    topServices: ["Reformas integrales", "Cocinas", "Baños", "Locales comerciales"],
  },
  {
    slug: "electricistas-barcelona",
    sectorSlug: "electricistas", citySlug: "barcelona",
    sectorName: "Electricistas", cityName: "Barcelona",
    searches: 10200, cpc: 2.8, competition: "Media", score: 79,
    trend: trend(7800, 0.04),
    districts: [
      { name: "Eixample", potential: 91 }, { name: "Gràcia", potential: 85 },
      { name: "Sants", potential: 78 }, { name: "Sant Martí", potential: 73 },
    ],
    topKeywords: [
      { kw: "electricista barcelona", volume: 3600 }, { kw: "electricista urgente barcelona", volume: 1900 },
      { kw: "reformas eléctricas barcelona", volume: 1100 }, { kw: "boletín eléctrico barcelona", volume: 880 },
    ],
    topServices: ["Averías urgentes", "Reformas eléctricas", "Boletines", "Iluminación LED"],
  },
  {
    slug: "restaurantes-madrid",
    sectorSlug: "restaurantes", citySlug: "madrid",
    sectorName: "Restaurantes", cityName: "Madrid",
    searches: 35800, cpc: 1.9, competition: "Alta", score: 76,
    trend: trend(28000, 0.035),
    districts: [
      { name: "Centro", potential: 95 }, { name: "Salamanca", potential: 90 },
      { name: "Chamberí", potential: 86 }, { name: "Retiro", potential: 81 },
      { name: "Latina", potential: 75 }, { name: "Tetuán", potential: 70 },
    ],
    topKeywords: [
      { kw: "restaurante madrid", volume: 12100 }, { kw: "restaurante romántico madrid", volume: 3600 },
      { kw: "restaurante grupo madrid", volume: 2400 }, { kw: "restaurante terraza madrid", volume: 1900 },
    ],
    topServices: ["Reservas online", "Menú degustación", "Eventos privados", "Terraza"],
  },
];

export const getOpportunity = (slug: string) => opportunities.find((o) => o.slug === slug);

// Builds a synthetic opportunity for any sector + city combo not present in the curated dataset.
// Allows /oportunidades/{sector}-{city} to always render an informe.
export function getOrBuildOpportunity(slug: string): Opportunity | undefined {
  const existing = getOpportunity(slug);
  if (existing) return existing;

  // Lazy import-free lookup via slug split
  const dash = slug.indexOf("-");
  if (dash < 0) return undefined;
  const sectorSlug = slug.slice(0, dash);
  const citySlug = slug.slice(dash + 1);

  // Required minimal info — pulled from data modules via dynamic require pattern would break SSR,
  // so callers should pass sector/city names. We accept slug only and use deterministic fallbacks.
  // The route uses helpers from sectors/cities data directly (see loader).
  return undefined;
}

// Seeded pseudo-random so the same slug always renders the same numbers.
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
    return ((h >>> 0) % 10000) / 10000;
  };
}

export function buildSyntheticOpportunity(params: {
  sectorSlug: string; citySlug: string;
  sectorName: string; cityName: string;
  sectorMonthlySearches: number;
  keyword: string;
}): Opportunity {
  const { sectorSlug, citySlug, sectorName, cityName, sectorMonthlySearches, keyword } = params;
  const slug = `${sectorSlug}-${citySlug}`;
  const rnd = seeded(slug);

  // City weight (bigger cities get more share of sector demand)
  const cityWeight: Record<string, number> = {
    madrid: 0.42, barcelona: 0.32, valencia: 0.14, sevilla: 0.11, malaga: 0.10, bilbao: 0.08,
  };
  const w = cityWeight[citySlug] ?? 0.07;
  const searches = Math.max(400, Math.round(sectorMonthlySearches * w * (0.85 + rnd() * 0.3)));

  const cpc = +(1 + rnd() * 5).toFixed(1);
  const competition: "Baja" | "Media" | "Alta" = searches > 8000 ? "Alta" : searches > 3000 ? "Media" : "Baja";
  const score = Math.round(60 + rnd() * 35);

  const trend = months.map((m, i) => ({
    month: m,
    value: Math.round(searches * (0.7 + i * 0.03) * (0.85 + rnd() * 0.3) / 12 * 12),
  }));

  const districtPool = [
    "Centro", "Norte", "Sur", "Este", "Oeste", "Casco Antiguo", "Ensanche", "Zona Universitaria",
  ];
  const districts = districtPool.slice(0, 5).map((name) => ({
    name, potential: Math.round(55 + rnd() * 40),
  }));

  const base = keyword.replace(/\[ciudad\]/gi, cityName.toLowerCase()).trim();
  const variants = [
    base,
    `${base} barato`,
    `${base} urgente`,
    `${base} cerca de mí`,
    `mejor ${base}`,
  ];
  const topKeywords = variants.map((kw, i) => ({
    kw: kw.includes(cityName.toLowerCase()) ? kw : `${kw} ${cityName.toLowerCase()}`,
    volume: Math.max(120, Math.round(searches * (0.32 - i * 0.05) * (0.7 + rnd() * 0.6))),
  }));

  return {
    slug, sectorSlug, citySlug, sectorName, cityName,
    searches, cpc, competition, score,
    trend, districts, topKeywords,
    topServices: ["Servicio principal", "Atención urgente", "Presupuestos sin compromiso", "Cobertura local"],
  };
}
