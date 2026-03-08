import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ClientScore {
  avg: number;
  count: number;
}

export const useClientScore = (userId: string | undefined) => {
  const [score, setScore] = useState<ClientScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetch = async () => {
      const { data } = await supabase
        .from("client_ratings")
        .select("respect_rating, communication_rating, vibes_rating")
        .eq("client_id", userId);

      if (data && data.length > 0) {
        const total = data.reduce(
          (sum, r) => sum + (r.respect_rating + r.communication_rating + r.vibes_rating) / 3,
          0
        );
        setScore({ avg: Math.round((total / data.length) * 10) / 10, count: data.length });
      } else {
        setScore(null);
      }
      setLoading(false);
    };

    fetch();
  }, [userId]);

  return { score, loading };
};
