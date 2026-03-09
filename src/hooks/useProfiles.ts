import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ProfileData } from "@/components/ProfileCard";

interface UseProfilesOptions {
  searchQuery?: string;
  city?: string;
  limit?: number;
  offset?: number;
}

export const useProfiles = ({ searchQuery, city, limit = 20, offset = 0 }: UseProfilesOptions = {}) => {
  return useQuery({
    queryKey: ["profiles", searchQuery, city, limit, offset],
    queryFn: async (): Promise<ProfileData[]> => {
      // Build the query
      let query = supabase
        .from("profiles")
        .select(`
          id,
          display_name,
          avatar_url,
          bio,
          city,
          created_at,
          reviews!reviews_profile_id_fkey(
            technique_rating,
            stamina_rating,
            vibe_rating
          ),
          vouches:vouches!vouches_profile_id_fkey(count)
        `)
        .range(offset, offset + limit - 1)
        .order("created_at", { ascending: false });

      // Apply city filter
      if (city) {
        query = query.eq("city", city);
      }

      // Apply search filter (search in display_name and bio)
      if (searchQuery && searchQuery.trim()) {
        query = query.or(`display_name.ilike.%${searchQuery}%,bio.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      if (!data) return [];

      // Transform the data to match ProfileData interface
      return data.map((profile: any) => {
        const reviews = profile.reviews || [];
        const reviewCount = reviews.length;
        const vouchCount = profile.vouches?.[0]?.count || 0;

        // Calculate average ratings
        let avgTechnique = 0;
        let avgStamina = 0;
        let avgVibe = 0;
        let overallRating = 0;

        if (reviewCount > 0) {
          avgTechnique = reviews.reduce((sum: number, r: any) => sum + r.technique_rating, 0) / reviewCount;
          avgStamina = reviews.reduce((sum: number, r: any) => sum + r.stamina_rating, 0) / reviewCount;
          avgVibe = reviews.reduce((sum: number, r: any) => sum + r.vibe_rating, 0) / reviewCount;
          overallRating = (avgTechnique + avgStamina + avgVibe) / 3;
        }

        // Extract specialties from bio or use defaults
        const specialties = extractSpecialties(profile.bio || "");

        return {
          id: profile.id,
          displayName: profile.display_name,
          avatar: profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id}`,
          bio: profile.bio || "No bio yet",
          rating: Math.round(overallRating * 10) / 10,
          reviewCount,
          vouchCount,
          specialties,
          verified: vouchCount >= 10, // Auto-verify profiles with 10+ vouches
          city: profile.city || "Lagos",
          metrics: {
            technique: Math.round(avgTechnique * 10) / 10,
            stamina: Math.round(avgStamina * 10) / 10,
            vibe: Math.round(avgVibe * 10) / 10,
          },
        };
      });
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Helper function to extract specialty tags from bio
function extractSpecialties(bio: string): string[] {
  const specialtyKeywords = [
    { keywords: ["precision", "precise", "accurate", "expert"], tag: "Precision" },
    { keywords: ["slow", "patient", "gradual"], tag: "Slow Burn" },
    { keywords: ["elite", "premium", "luxury", "high-end"], tag: "Elite" },
    { keywords: ["endurance", "marathon", "stamina", "energy"], tag: "Endurance" },
    { keywords: ["passionate", "intense", "fire"], tag: "Passionate" },
    { keywords: ["top tier", "top-tier", "best", "excellent"], tag: "Top Tier" },
    { keywords: ["bespoke", "custom", "tailored"], tag: "Bespoke" },
    { keywords: ["sensual", "soft", "gentle"], tag: "Sensual" },
    { keywords: ["consistent", "reliable", "dependable"], tag: "Consistent" },
    { keywords: ["creative", "innovative", "unique"], tag: "Creative" },
    { keywords: ["versatile", "flexible", "adaptable"], tag: "Versatile" },
  ];

  const lowerBio = bio.toLowerCase();
  const found: string[] = [];

  for (const { keywords, tag } of specialtyKeywords) {
    if (keywords.some(keyword => lowerBio.includes(keyword))) {
      found.push(tag);
      if (found.length >= 3) break; // Max 3 specialties
    }
  }

  return found.length > 0 ? found : ["Certified", "Rising Star", "New"];
}
