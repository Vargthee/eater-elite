import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ProfileData } from "@/components/ProfileCard";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterProfiles(
  profiles: ProfileData[],
  query: string,
  selectedCity?: string
): ProfileData[] {
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm && !selectedCity) {
    return profiles;
  }

  return profiles.filter((profile) => {
    const matchesCity = !selectedCity || profile.city === selectedCity;

    if (!searchTerm) {
      return matchesCity;
    }

    const matchesName = profile.displayName.toLowerCase().includes(searchTerm);
    const matchesCity2 = profile.city.toLowerCase().includes(searchTerm);
    const matchesBio = profile.bio.toLowerCase().includes(searchTerm);
    const matchesSpecialty = profile.specialties.some((spec) =>
      spec.toLowerCase().includes(searchTerm)
    );

    const textMatch = matchesName || matchesCity2 || matchesBio || matchesSpecialty;

    return matchesCity && textMatch;
  });
}
