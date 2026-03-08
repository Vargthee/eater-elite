export interface HeatZone {
  id: string;
  name: string;
  borough: string;
  cx: number; // percentage x position on map
  cy: number; // percentage y position on map
  intensity: number; // 0-1, how "hot" the zone is
  activeCount: number;
  topRating: number;
  label: string; // flavor text
}

export const lagosZones: HeatZone[] = [
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

export const lagoBoroughs = [...new Set(lagosZones.map((z) => z.borough))];
