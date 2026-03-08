export interface HeatZone {
  id: string;
  name: string;
  borough: string;
  cx: number;
  cy: number;
  intensity: number;
  activeCount: number;
  topRating: number;
  label: string;
}

export interface CityData {
  name: string;
  zones: HeatZone[];
  outline: string; // SVG path
  tagline: string;
}

const lagosZones: HeatZone[] = [
  { id: "vi", name: "Victoria Island", borough: "Lagos Island", cx: 52, cy: 72, intensity: 0.95, activeCount: 34, topRating: 4.8, label: "On fire 🔥" },
  { id: "lekki", name: "Lekki Phase 1", borough: "Eti-Osa", cx: 68, cy: 65, intensity: 0.88, activeCount: 28, topRating: 4.7, label: "Very hot 🌶️" },
  { id: "ikeja", name: "Ikeja", borough: "Ikeja", cx: 38, cy: 30, intensity: 0.82, activeCount: 22, topRating: 4.6, label: "Trending up 📈" },
  { id: "surulere", name: "Surulere", borough: "Surulere", cx: 35, cy: 52, intensity: 0.7, activeCount: 18, topRating: 4.5, label: "Warming up" },
  { id: "yaba", name: "Yaba", borough: "Yaba", cx: 42, cy: 48, intensity: 0.78, activeCount: 20, topRating: 4.6, label: "Heating up 🔥" },
  { id: "ajah", name: "Ajah", borough: "Eti-Osa", cx: 82, cy: 58, intensity: 0.55, activeCount: 12, topRating: 4.3, label: "Growing" },
  { id: "ikoyi", name: "Ikoyi", borough: "Lagos Island", cx: 48, cy: 65, intensity: 0.9, activeCount: 30, topRating: 4.9, label: "Elite zone 👑" },
  { id: "gbagada", name: "Gbagada", borough: "Kosofe", cx: 50, cy: 35, intensity: 0.6, activeCount: 14, topRating: 4.4, label: "Steady" },
  { id: "festac", name: "Festac Town", borough: "Amuwo-Odofin", cx: 18, cy: 58, intensity: 0.5, activeCount: 10, topRating: 4.2, label: "New spot" },
  { id: "maryland", name: "Maryland", borough: "Ikeja", cx: 45, cy: 38, intensity: 0.65, activeCount: 16, topRating: 4.5, label: "Active" },
  { id: "ogba", name: "Ogba", borough: "Ifako-Ijaiye", cx: 32, cy: 22, intensity: 0.45, activeCount: 8, topRating: 4.1, label: "Emerging" },
  { id: "oshodi", name: "Oshodi", borough: "Oshodi-Isolo", cx: 30, cy: 40, intensity: 0.52, activeCount: 11, topRating: 4.2, label: "Picking up" },
];

const abujaZones: HeatZone[] = [
  { id: "wuse", name: "Wuse 2", borough: "Wuse", cx: 48, cy: 42, intensity: 0.92, activeCount: 26, topRating: 4.8, label: "On fire 🔥" },
  { id: "maitama", name: "Maitama", borough: "Maitama", cx: 40, cy: 32, intensity: 0.88, activeCount: 24, topRating: 4.9, label: "Elite zone 👑" },
  { id: "garki", name: "Garki", borough: "Garki", cx: 52, cy: 55, intensity: 0.75, activeCount: 18, topRating: 4.5, label: "Heating up 🔥" },
  { id: "asokoro", name: "Asokoro", borough: "Asokoro", cx: 58, cy: 48, intensity: 0.85, activeCount: 22, topRating: 4.7, label: "Very hot 🌶️" },
  { id: "gwarinpa", name: "Gwarinpa", borough: "Gwarinpa", cx: 30, cy: 25, intensity: 0.68, activeCount: 15, topRating: 4.4, label: "Growing fast" },
  { id: "jabi", name: "Jabi", borough: "Jabi", cx: 38, cy: 38, intensity: 0.72, activeCount: 17, topRating: 4.5, label: "Warming up" },
  { id: "utako", name: "Utako", borough: "Utako", cx: 42, cy: 45, intensity: 0.65, activeCount: 14, topRating: 4.3, label: "Active" },
  { id: "kubwa", name: "Kubwa", borough: "Bwari", cx: 35, cy: 15, intensity: 0.45, activeCount: 8, topRating: 4.1, label: "Emerging" },
  { id: "lugbe", name: "Lugbe", borough: "Lugbe", cx: 55, cy: 72, intensity: 0.5, activeCount: 10, topRating: 4.2, label: "New spot" },
  { id: "central", name: "Central Area", borough: "Central", cx: 50, cy: 50, intensity: 0.8, activeCount: 20, topRating: 4.6, label: "Trending up 📈" },
];

const phZones: HeatZone[] = [
  { id: "gra", name: "GRA Phase 2", borough: "Old GRA", cx: 50, cy: 40, intensity: 0.9, activeCount: 22, topRating: 4.8, label: "On fire 🔥" },
  { id: "trans-amadi", name: "Trans Amadi", borough: "Trans Amadi", cx: 60, cy: 50, intensity: 0.75, activeCount: 16, topRating: 4.5, label: "Heating up 🔥" },
  { id: "dline", name: "D-Line", borough: "D-Line", cx: 45, cy: 45, intensity: 0.7, activeCount: 14, topRating: 4.4, label: "Active" },
  { id: "rumuola", name: "Rumuola", borough: "Rumuola", cx: 42, cy: 35, intensity: 0.65, activeCount: 12, topRating: 4.3, label: "Warming up" },
  { id: "elekahia", name: "Elekahia", borough: "Elekahia", cx: 55, cy: 55, intensity: 0.55, activeCount: 10, topRating: 4.2, label: "Growing" },
  { id: "woji", name: "Woji", borough: "Woji", cx: 62, cy: 38, intensity: 0.6, activeCount: 11, topRating: 4.3, label: "Steady" },
  { id: "ada-george", name: "Ada George", borough: "Ada George", cx: 38, cy: 60, intensity: 0.72, activeCount: 15, topRating: 4.5, label: "Very hot 🌶️" },
  { id: "choba", name: "Choba", borough: "Choba", cx: 30, cy: 30, intensity: 0.42, activeCount: 7, topRating: 4.0, label: "Emerging" },
];

const ibadanZones: HeatZone[] = [
  { id: "bodija", name: "Bodija", borough: "Bodija", cx: 45, cy: 35, intensity: 0.85, activeCount: 20, topRating: 4.7, label: "On fire 🔥" },
  { id: "ring-road", name: "Ring Road", borough: "Ring Road", cx: 50, cy: 50, intensity: 0.78, activeCount: 18, topRating: 4.6, label: "Very hot 🌶️" },
  { id: "challenge", name: "Challenge", borough: "Challenge", cx: 55, cy: 60, intensity: 0.6, activeCount: 12, topRating: 4.3, label: "Active" },
  { id: "ui", name: "UI Area", borough: "University", cx: 35, cy: 28, intensity: 0.72, activeCount: 16, topRating: 4.5, label: "Trending up 📈" },
  { id: "dugbe", name: "Dugbe", borough: "Dugbe", cx: 48, cy: 55, intensity: 0.55, activeCount: 10, topRating: 4.2, label: "Warming up" },
  { id: "agodi", name: "Agodi GRA", borough: "Agodi", cx: 52, cy: 40, intensity: 0.68, activeCount: 14, topRating: 4.4, label: "Growing fast" },
  { id: "mokola", name: "Mokola", borough: "Mokola", cx: 42, cy: 45, intensity: 0.5, activeCount: 9, topRating: 4.1, label: "Steady" },
];

const beninZones: HeatZone[] = [
  { id: "gra-benin", name: "GRA", borough: "GRA", cx: 50, cy: 38, intensity: 0.88, activeCount: 20, topRating: 4.7, label: "On fire 🔥" },
  { id: "ring-road-benin", name: "Ring Road", borough: "Ring Road", cx: 48, cy: 50, intensity: 0.75, activeCount: 16, topRating: 4.5, label: "Very hot 🌶️" },
  { id: "uselu", name: "Uselu", borough: "Uselu", cx: 40, cy: 35, intensity: 0.7, activeCount: 15, topRating: 4.5, label: "Heating up 🔥" },
  { id: "sapele-rd", name: "Sapele Road", borough: "Sapele Road", cx: 55, cy: 58, intensity: 0.6, activeCount: 12, topRating: 4.3, label: "Active" },
  { id: "ugbowo", name: "Ugbowo", borough: "Ugbowo", cx: 38, cy: 30, intensity: 0.65, activeCount: 14, topRating: 4.4, label: "Growing fast" },
  { id: "siluko", name: "Siluko", borough: "Siluko", cx: 52, cy: 65, intensity: 0.45, activeCount: 8, topRating: 4.1, label: "Emerging" },
];

const enuguZones: HeatZone[] = [
  { id: "independence", name: "Independence Layout", borough: "Independence", cx: 48, cy: 40, intensity: 0.85, activeCount: 18, topRating: 4.7, label: "On fire 🔥" },
  { id: "new-haven", name: "New Haven", borough: "New Haven", cx: 52, cy: 50, intensity: 0.72, activeCount: 14, topRating: 4.5, label: "Heating up 🔥" },
  { id: "ogui", name: "Ogui New Layout", borough: "Ogui", cx: 45, cy: 35, intensity: 0.65, activeCount: 12, topRating: 4.4, label: "Active" },
  { id: "trans-ekulu", name: "Trans Ekulu", borough: "Trans Ekulu", cx: 58, cy: 38, intensity: 0.7, activeCount: 13, topRating: 4.4, label: "Warming up" },
  { id: "achara", name: "Achara Layout", borough: "Achara", cx: 42, cy: 55, intensity: 0.55, activeCount: 10, topRating: 4.2, label: "Growing" },
  { id: "gra-enugu", name: "GRA", borough: "GRA", cx: 50, cy: 45, intensity: 0.78, activeCount: 16, topRating: 4.6, label: "Very hot 🌶️" },
];

const defaultOutline = "M10,45 Q15,30 25,25 Q35,18 45,22 Q55,15 65,20 Q75,18 85,25 Q90,35 88,50 Q90,60 85,70 Q78,78 65,75 Q55,80 45,78 Q35,82 25,75 Q15,68 12,55 Z";

export const cityData: Record<string, CityData> = {
  Lagos: { name: "Lagos", zones: lagosZones, outline: defaultOutline, tagline: "Where Lagos dey hot right now" },
  Abuja: { name: "Abuja", zones: abujaZones, outline: "M15,40 Q20,25 35,20 Q50,15 65,22 Q78,28 82,40 Q85,55 78,68 Q68,78 50,80 Q32,78 20,68 Q12,55 15,40 Z", tagline: "Where Abuja dey pepper right now" },
  "Port Harcourt": { name: "Port Harcourt", zones: phZones, outline: "M12,42 Q18,28 30,22 Q45,18 60,24 Q72,30 78,42 Q82,55 75,66 Q62,75 48,78 Q32,76 20,65 Q14,55 12,42 Z", tagline: "Where PH dey burst right now" },
  Ibadan: { name: "Ibadan", zones: ibadanZones, outline: "M14,38 Q22,24 38,20 Q52,16 66,22 Q76,30 80,44 Q82,58 74,70 Q60,78 44,80 Q28,76 18,64 Q12,52 14,38 Z", tagline: "Where Ibadan dey ginger right now" },
  "Benin City": { name: "Benin City", zones: beninZones, outline: "M16,40 Q24,26 38,22 Q52,18 64,24 Q74,32 78,46 Q80,58 72,68 Q58,76 44,78 Q30,74 20,62 Q14,52 16,40 Z", tagline: "Where Benin dey shake right now" },
  Enugu: { name: "Enugu", zones: enuguZones, outline: "M18,38 Q26,24 40,20 Q54,16 66,24 Q76,32 80,46 Q82,58 74,68 Q60,76 46,78 Q32,74 22,62 Q16,50 18,38 Z", tagline: "Where Enugu dey cook right now" },
};

export const cityNames = Object.keys(cityData);

export const getBoroughs = (cityName: string): string[] => {
  const city = cityData[cityName];
  if (!city) return [];
  return [...new Set(city.zones.map((z) => z.borough))];
};

// Re-export for backward compat
export const lagoBoroughs = getBoroughs("Lagos");
export { lagosZones };
export type { HeatZone };
