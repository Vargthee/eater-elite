import { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import StarRating from "./StarRating";
import { MessageSquare } from "lucide-react";
import { cacheManager, CACHE_KEYS } from "@/integrations/supabase/cache";

interface Review {
  id: string;
  technique_rating: number;
  stamina_rating: number;
  vibe_rating: number;
  comment: string | null;
  created_at: string;
  is_anonymous: boolean;
  reviewer_name?: string;
}

const ReviewFeed = ({ profileId }: { profileId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const cacheKey = `${CACHE_KEYS.REVIEWS}:${profileId}`;
    const cached = cacheManager.get<Review[]>(cacheKey);

    if (cached) {
      setReviews(cached);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false });

    if (data) {
      const enriched = await Promise.all(
        data.map(async (r) => {
          if (!r.is_anonymous) {
            const { data: p } = await supabase.from("profiles").select("display_name").eq("user_id", r.reviewer_id).maybeSingle();
            return { ...r, reviewer_name: p?.display_name };
          }
          return r;
        })
      );
      cacheManager.set(cacheKey, enriched);
      setReviews(enriched);
    }
    setLoading(false);
  }, [profileId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-border p-5 animate-pulse h-28" />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="border border-border p-8 text-center">
        <MessageSquare className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground text-sm">No reviews yet. Be the first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reviews.map((review, i) => {
        const avg = (review.technique_rating + review.stamina_rating + review.vibe_rating) / 3;
        return (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="border border-border p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary flex items-center justify-center font-mono text-xs text-muted-foreground">
                  {review.is_anonymous ? "?" : (review.reviewer_name?.charAt(0) ?? "?")}
                </div>
                <div>
                  <span className="text-sm font-medium">
                    {review.is_anonymous ? "Anonymous" : (review.reviewer_name ?? "Anonymous")}
                  </span>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    {new Date(review.created_at).toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <StarRating rating={avg} size="sm" />
                <span className="font-mono text-xs font-medium text-primary">{avg.toFixed(1)}</span>
              </div>
            </div>

            {/* Mini metrics */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                ["Technique", review.technique_rating],
                ["Stamina", review.stamina_rating],
                ["Vibe", review.vibe_rating],
              ].map(([label, val]) => (
                <div key={label as string} className="text-center">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
                  <div className="text-xs font-medium">{val}/5</div>
                </div>
              ))}
            </div>

            {review.comment && (
              <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ReviewFeed;
