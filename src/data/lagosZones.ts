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
  outline: string;
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

const kanoZones: HeatZone[] = [
  { id: "nasarawa-gra", name: "Nasarawa GRA", borough: "Nasarawa", cx: 50, cy: 42, intensity: 0.88, activeCount: 20, topRating: 4.7, label: "On fire 🔥" },
  { id: "sabon-gari", name: "Sabon Gari", borough: "Fagge", cx: 45, cy: 50, intensity: 0.75, activeCount: 16, topRating: 4.5, label: "Very hot 🌶️" },
  { id: "bompai", name: "Bompai", borough: "Bompai", cx: 55, cy: 38, intensity: 0.68, activeCount: 14, topRating: 4.4, label: "Heating up 🔥" },
  { id: "zoo-road", name: "Zoo Road", borough: "Zoo Road", cx: 40, cy: 35, intensity: 0.6, activeCount: 11, topRating: 4.3, label: "Active" },
  { id: "tarauni", name: "Tarauni", borough: "Tarauni", cx: 58, cy: 55, intensity: 0.52, activeCount: 9, topRating: 4.2, label: "Growing" },
  { id: "hotoro", name: "Hotoro", borough: "Hotoro", cx: 35, cy: 28, intensity: 0.45, activeCount: 7, topRating: 4.0, label: "Emerging" },
];

const kadunaZones: HeatZone[] = [
  { id: "barnawa", name: "Barnawa", borough: "Barnawa", cx: 50, cy: 55, intensity: 0.85, activeCount: 18, topRating: 4.7, label: "On fire 🔥" },
  { id: "crocodile", name: "Crocodile Market", borough: "Kaduna South", cx: 48, cy: 45, intensity: 0.72, activeCount: 15, topRating: 4.5, label: "Very hot 🌶️" },
  { id: "malali", name: "Malali", borough: "Kaduna North", cx: 45, cy: 32, intensity: 0.65, activeCount: 12, topRating: 4.4, label: "Active" },
  { id: "ungwan-rimi", name: "Ungwan Rimi", borough: "Ungwan Rimi", cx: 55, cy: 40, intensity: 0.7, activeCount: 14, topRating: 4.5, label: "Heating up 🔥" },
  { id: "narayi", name: "Narayi", borough: "Chikun", cx: 40, cy: 62, intensity: 0.48, activeCount: 8, topRating: 4.1, label: "Emerging" },
];

const warriZones: HeatZone[] = [
  { id: "effurun", name: "Effurun", borough: "Effurun", cx: 48, cy: 40, intensity: 0.82, activeCount: 16, topRating: 4.6, label: "On fire 🔥" },
  { id: "dsc", name: "DSC Town", borough: "DSC", cx: 55, cy: 50, intensity: 0.7, activeCount: 13, topRating: 4.4, label: "Very hot 🌶️" },
  { id: "okumagba", name: "Okumagba Ave", borough: "Warri South", cx: 42, cy: 48, intensity: 0.65, activeCount: 11, topRating: 4.3, label: "Active" },
  { id: "jakpa", name: "Jakpa Road", borough: "Jakpa", cx: 38, cy: 35, intensity: 0.55, activeCount: 9, topRating: 4.2, label: "Warming up" },
  { id: "ekpan", name: "Ekpan", borough: "Ekpan", cx: 58, cy: 60, intensity: 0.48, activeCount: 7, topRating: 4.1, label: "Emerging" },
];

const calabarZones: HeatZone[] = [
  { id: "marian", name: "Marian Road", borough: "Calabar South", cx: 50, cy: 55, intensity: 0.8, activeCount: 14, topRating: 4.6, label: "On fire 🔥" },
  { id: "state-housing", name: "State Housing", borough: "State Housing", cx: 45, cy: 40, intensity: 0.7, activeCount: 12, topRating: 4.5, label: "Very hot 🌶️" },
  { id: "ekorinim", name: "Ekorinim", borough: "Ekorinim", cx: 55, cy: 45, intensity: 0.6, activeCount: 10, topRating: 4.3, label: "Active" },
  { id: "satellite", name: "Satellite Town", borough: "Satellite", cx: 40, cy: 32, intensity: 0.52, activeCount: 8, topRating: 4.2, label: "Growing" },
  { id: "etta-agbor", name: "Etta Agbor", borough: "Etta Agbor", cx: 58, cy: 62, intensity: 0.45, activeCount: 6, topRating: 4.0, label: "Emerging" },
];

const abeokutaZones: HeatZone[] = [
  { id: "oke-ilewo", name: "Oke Ilewo", borough: "Abeokuta South", cx: 48, cy: 42, intensity: 0.78, activeCount: 14, topRating: 4.5, label: "On fire 🔥" },
  { id: "ibara", name: "Ibara", borough: "Ibara", cx: 52, cy: 50, intensity: 0.7, activeCount: 12, topRating: 4.4, label: "Very hot 🌶️" },
  { id: "panseke", name: "Panseke", borough: "Abeokuta North", cx: 42, cy: 35, intensity: 0.58, activeCount: 9, topRating: 4.2, label: "Active" },
  { id: "onikolobo", name: "Onikolobo", borough: "Onikolobo", cx: 55, cy: 38, intensity: 0.5, activeCount: 8, topRating: 4.1, label: "Growing" },
  { id: "sapon", name: "Sapon", borough: "Sapon", cx: 45, cy: 58, intensity: 0.42, activeCount: 6, topRating: 4.0, label: "Emerging" },
];

const josZones: HeatZone[] = [
  { id: "rayfield", name: "Rayfield", borough: "Jos South", cx: 52, cy: 55, intensity: 0.82, activeCount: 15, topRating: 4.6, label: "On fire 🔥" },
  { id: "terminus", name: "Terminus", borough: "Jos North", cx: 48, cy: 42, intensity: 0.72, activeCount: 13, topRating: 4.5, label: "Very hot 🌶️" },
  { id: "bukuru", name: "Bukuru", borough: "Bukuru", cx: 55, cy: 62, intensity: 0.6, activeCount: 10, topRating: 4.3, label: "Active" },
  { id: "angwan-rogo", name: "Angwan Rogo", borough: "Angwan Rogo", cx: 42, cy: 35, intensity: 0.5, activeCount: 8, topRating: 4.1, label: "Growing" },
  { id: "hwolshe", name: "Hwolshe", borough: "Hwolshe", cx: 58, cy: 48, intensity: 0.45, activeCount: 6, topRating: 4.0, label: "Emerging" },
];

const owerriZones: HeatZone[] = [
  { id: "new-owerri", name: "New Owerri", borough: "New Owerri", cx: 50, cy: 45, intensity: 0.85, activeCount: 16, topRating: 4.7, label: "On fire 🔥" },
  { id: "ikenegbu", name: "Ikenegbu", borough: "Ikenegbu", cx: 45, cy: 38, intensity: 0.72, activeCount: 13, topRating: 4.5, label: "Very hot 🌶️" },
  { id: "world-bank", name: "World Bank", borough: "World Bank", cx: 55, cy: 52, intensity: 0.65, activeCount: 11, topRating: 4.4, label: "Active" },
  { id: "amakohia", name: "Amakohia", borough: "Amakohia", cx: 40, cy: 32, intensity: 0.55, activeCount: 9, topRating: 4.2, label: "Warming up" },
  { id: "okigwe-rd", name: "Okigwe Road", borough: "Okigwe Road", cx: 58, cy: 60, intensity: 0.48, activeCount: 7, topRating: 4.1, label: "Emerging" },
];

const uyo Zones: HeatZone[] = [
  { id: "ewet-housing", name: "Ewet Housing", borough: "Ewet Housing", cx: 50, cy: 42, intensity: 0.8, activeCount: 14, topRating: 4.6, label: "On fire 🔥" },
  { id: "aka", name: "Aka Road", borough: "Aka", cx: 45, cy: 50, intensity: 0.68, activeCount: 11, topRating: 4.4, label: "Very hot 🌶️" },
  { id: "shelter-afrique", name: "Shelter Afrique", borough: "Shelter Afrique", cx: 55, cy: 38, intensity: 0.6, activeCount: 10, topRating: 4.3, label: "Active" },
  { id: "itam", name: "Itam", borough: "Itam", cx: 40, cy: 30, intensity: 0.5, activeCount: 8, topRating: 4.1, label: "Growing" },
  { id: "nwaniba", name: "Nwaniba", borough: "Nwaniba", cx: 58, cy: 58, intensity: 0.42, activeCount: 6, topRating: 4.0, label: "Emerging" },
];

const ilorinZones: HeatZone[] = [
  { id: "gra-ilorin", name: "GRA", borough: "GRA", cx: 50, cy: 40, intensity: 0.82, activeCount: 15, topRating: 4.6, label: "On fire 🔥" },
  { id: "tanke", name: "Tanke", borough: "Tanke", cx: 42, cy: 48, intensity: 0.7, activeCount: 13, topRating: 4.5, label: "Very hot 🌶️" },
  { id: "fate", name: "Fate Road", borough: "Fate", cx: 55, cy: 35, intensity: 0.6, activeCount: 10, topRating: 4.3, label: "Active" },
  { id: "challenge-ilorin", name: "Challenge", borough: "Challenge", cx: 48, cy: 58, intensity: 0.52, activeCount: 8, topRating: 4.2, label: "Growing" },
  { id: "basin", name: "Basin", borough: "Basin", cx: 38, cy: 32, intensity: 0.45, activeCount: 6, topRating: 4.0, label: "Emerging" },
];

const akaureZones: HeatZone[] = [
  { id: "futo-gate", name: "Ado Road", borough: "Ado Road", cx: 50, cy: 42, intensity: 0.75, activeCount: 12, topRating: 4.5, label: "On fire 🔥" },
  { id: "ajilosun", name: "Ajilosun", borough: "Ajilosun", cx: 45, cy: 50, intensity: 0.62, activeCount: 10, topRating: 4.3, label: "Very hot 🌶️" },
  { id: "basiri", name: "Basiri", borough: "Basiri", cx: 55, cy: 38, intensity: 0.55, activeCount: 8, topRating: 4.2, label: "Active" },
  { id: "iyin", name: "Iyin Road", borough: "Iyin", cx: 40, cy: 55, intensity: 0.45, activeCount: 6, topRating: 4.0, label: "Emerging" },
];

const osogboZones: HeatZone[] = [
  { id: "oke-fia", name: "Oke Fia", borough: "Oke Fia", cx: 48, cy: 42, intensity: 0.78, activeCount: 13, topRating: 4.5, label: "On fire 🔥" },
  { id: "old-garage", name: "Old Garage", borough: "Old Garage", cx: 52, cy: 52, intensity: 0.65, activeCount: 11, topRating: 4.4, label: "Very hot 🌶️" },
  { id: "gbongan-rd", name: "Gbongan Road", borough: "Gbongan", cx: 42, cy: 35, intensity: 0.55, activeCount: 9, topRating: 4.2, label: "Active" },
  { id: "ogo-oluwa", name: "Ogo Oluwa", borough: "Ogo Oluwa", cx: 55, cy: 60, intensity: 0.45, activeCount: 7, topRating: 4.1, label: "Emerging" },
];

const makurdiZones: HeatZone[] = [
  { id: "high-level", name: "High Level", borough: "High Level", cx: 48, cy: 40, intensity: 0.8, activeCount: 14, topRating: 4.6, label: "On fire 🔥" },
  { id: "wurukum", name: "Wurukum", borough: "Wurukum", cx: 52, cy: 52, intensity: 0.68, activeCount: 11, topRating: 4.4, label: "Very hot 🌶️" },
  { id: "north-bank", name: "North Bank", borough: "North Bank", cx: 45, cy: 30, intensity: 0.55, activeCount: 9, topRating: 4.2, label: "Active" },
  { id: "wadata", name: "Wadata", borough: "Wadata", cx: 55, cy: 60, intensity: 0.45, activeCount: 7, topRating: 4.1, label: "Emerging" },
];

const asabaZones: HeatZone[] = [
  { id: "okpanam-rd", name: "Okpanam Road", borough: "Okpanam", cx: 48, cy: 40, intensity: 0.78, activeCount: 13, topRating: 4.5, label: "On fire 🔥" },
  { id: "nnebisi-rd", name: "Nnebisi Road", borough: "Nnebisi", cx: 52, cy: 52, intensity: 0.65, activeCount: 10, topRating: 4.3, label: "Very hot 🌶️" },
  { id: "summit-rd", name: "Summit Road", borough: "Summit", cx: 45, cy: 35, intensity: 0.55, activeCount: 8, topRating: 4.2, label: "Active" },
  { id: "cable-point", name: "Cable Point", borough: "Cable Point", cx: 55, cy: 62, intensity: 0.48, activeCount: 7, topRating: 4.1, label: "Emerging" },
];

const abaZones: HeatZone[] = [
  { id: "aba-gra", name: "GRA", borough: "GRA", cx: 50, cy: 42, intensity: 0.82, activeCount: 15, topRating: 4.6, label: "On fire 🔥" },
  { id: "aba-faulks", name: "Faulks Road", borough: "Faulks", cx: 45, cy: 50, intensity: 0.7, activeCount: 12, topRating: 4.4, label: "Very hot 🌶️" },
  { id: "aba-ariaria", name: "Ariaria", borough: "Ariaria", cx: 55, cy: 55, intensity: 0.6, activeCount: 10, topRating: 4.3, label: "Active" },
  { id: "aba-ogbor", name: "Ogbor Hill", borough: "Ogbor Hill", cx: 40, cy: 35, intensity: 0.48, activeCount: 7, topRating: 4.1, label: "Emerging" },
];

const sokotoZones: HeatZone[] = [
  { id: "sokoto-gra", name: "GRA", borough: "GRA", cx: 50, cy: 42, intensity: 0.72, activeCount: 10, topRating: 4.4, label: "On fire 🔥" },
  { id: "marina", name: "Marina Road", borough: "Marina", cx: 45, cy: 52, intensity: 0.58, activeCount: 8, topRating: 4.2, label: "Active" },
  { id: "old-airport", name: "Old Airport", borough: "Old Airport", cx: 55, cy: 38, intensity: 0.48, activeCount: 6, topRating: 4.1, label: "Growing" },
  { id: "arkilla", name: "Arkilla", borough: "Arkilla", cx: 42, cy: 32, intensity: 0.4, activeCount: 5, topRating: 3.9, label: "Emerging" },
];

const maborneZones: HeatZone[] = [
  { id: "maiduguri-gra", name: "GRA", borough: "GRA", cx: 50, cy: 40, intensity: 0.7, activeCount: 10, topRating: 4.4, label: "On fire 🔥" },
  { id: "london-ciki", name: "London Ciki", borough: "London Ciki", cx: 45, cy: 50, intensity: 0.58, activeCount: 8, topRating: 4.2, label: "Active" },
  { id: "gwange", name: "Gwange", borough: "Gwange", cx: 55, cy: 55, intensity: 0.45, activeCount: 6, topRating: 4.0, label: "Growing" },
  { id: "bulumkutu", name: "Bulumkutu", borough: "Bulumkutu", cx: 40, cy: 35, intensity: 0.38, activeCount: 5, topRating: 3.9, label: "Emerging" },
];

const defaultOutline = "M10,45 Q15,30 25,25 Q35,18 45,22 Q55,15 65,20 Q75,18 85,25 Q90,35 88,50 Q90,60 85,70 Q78,78 65,75 Q55,80 45,78 Q35,82 25,75 Q15,68 12,55 Z";
const outline2 = "M15,40 Q20,25 35,20 Q50,15 65,22 Q78,28 82,40 Q85,55 78,68 Q68,78 50,80 Q32,78 20,68 Q12,55 15,40 Z";
const outline3 = "M12,42 Q18,28 30,22 Q45,18 60,24 Q72,30 78,42 Q82,55 75,66 Q62,75 48,78 Q32,76 20,65 Q14,55 12,42 Z";
const outline4 = "M14,38 Q22,24 38,20 Q52,16 66,22 Q76,30 80,44 Q82,58 74,70 Q60,78 44,80 Q28,76 18,64 Q12,52 14,38 Z";
const outline5 = "M16,40 Q24,26 38,22 Q52,18 64,24 Q74,32 78,46 Q80,58 72,68 Q58,76 44,78 Q30,74 20,62 Q14,52 16,40 Z";
const outline6 = "M18,38 Q26,24 40,20 Q54,16 66,24 Q76,32 80,46 Q82,58 74,68 Q60,76 46,78 Q32,74 22,62 Q16,50 18,38 Z";

export const cityData: Record<string, CityData> = {
  Lagos: { name: "Lagos", zones: lagosZones, outline: defaultOutline, tagline: "Where Lagos dey hot right now" },
  Abuja: { name: "Abuja", zones: abujaZones, outline: outline2, tagline: "Where Abuja dey pepper right now" },
  "Port Harcourt": { name: "Port Harcourt", zones: phZones, outline: outline3, tagline: "Where PH dey burst right now" },
  Ibadan: { name: "Ibadan", zones: ibadanZones, outline: outline4, tagline: "Where Ibadan dey ginger right now" },
  "Benin City": { name: "Benin City", zones: beninZones, outline: outline5, tagline: "Where Benin dey shake right now" },
  Enugu: { name: "Enugu", zones: enuguZones, outline: outline6, tagline: "Where Enugu dey cook right now" },
  Kano: { name: "Kano", zones: kanoZones, outline: outline2, tagline: "Where Kano dey turn up right now" },
  Kaduna: { name: "Kaduna", zones: kadunaZones, outline: outline3, tagline: "Where Kaduna dey move right now" },
  Warri: { name: "Warri", zones: warriZones, outline: outline4, tagline: "Where Warri dey scatter right now" },
  Calabar: { name: "Calabar", zones: calabarZones, outline: outline5, tagline: "Where Calabar dey groove right now" },
  Abeokuta: { name: "Abeokuta", zones: abeokutaZones, outline: outline6, tagline: "Where Abeokuta dey rise right now" },
  Jos: { name: "Jos", zones: josZones, outline: outline2, tagline: "Where Jos dey blaze right now" },
  Owerri: { name: "Owerri", zones: owerriZones, outline: outline3, tagline: "Where Owerri dey flame right now" },
  Uyo: { name: "Uyo", zones: uyoZones, outline: outline4, tagline: "Where Uyo dey shine right now" },
  Ilorin: { name: "Ilorin", zones: ilorinZones, outline: outline5, tagline: "Where Ilorin dey spark right now" },
  "Ado-Ekiti": { name: "Ado-Ekiti", zones: akaureZones, outline: outline6, tagline: "Where Ekiti dey glow right now" },
  Osogbo: { name: "Osogbo", zones: osogboZones, outline: outline2, tagline: "Where Osogbo dey pop right now" },
  Makurdi: { name: "Makurdi", zones: makurdiZones, outline: outline3, tagline: "Where Makurdi dey heat right now" },
  Asaba: { name: "Asaba", zones: asabaZones, outline: outline4, tagline: "Where Asaba dey buzz right now" },
  Aba: { name: "Aba", zones: abaZones, outline: outline5, tagline: "Where Aba dey run things right now" },
  Sokoto: { name: "Sokoto", zones: sokotoZones, outline: outline6, tagline: "Where Sokoto dey warm right now" },
  Maiduguri: { name: "Maiduguri", zones: maborneZones, outline: outline2, tagline: "Where Maiduguri dey stir right now" },
};

export const cityNames = Object.keys(cityData);

export const getBoroughs = (cityName: string): string[] => {
  const city = cityData[cityName];
  if (!city) return [];
  return [...new Set(city.zones.map((z) => z.borough))];
};

export const getCityStats = (cityName: string) => {
  const city = cityData[cityName];
  if (!city) return { totalActive: 0, avgRating: 0, hottestZone: "" };
  const totalActive = city.zones.reduce((sum, z) => sum + z.activeCount, 0);
  const avgRating = city.zones.reduce((sum, z) => sum + z.topRating, 0) / city.zones.length;
  const hottest = city.zones.reduce((a, b) => (a.intensity > b.intensity ? a : b));
  return { totalActive, avgRating: Math.round(avgRating * 10) / 10, hottestZone: hottest.name };
};

// Re-export for backward compat
export const lagoBoroughs = getBoroughs("Lagos");
export { lagosZones };
