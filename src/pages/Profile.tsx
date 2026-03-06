import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BadgeCheck, Heart, MessageSquare, MapPin, Loader2, Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import StarRating from "@/components/StarRating";
import ReviewFeed from "@/components/ReviewFeed";
import WriteReviewDialog from "@/components/WriteReviewDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProfileDetail {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  city: string | null;
  is_anonymous: boolean;
}

interface MetricsSummary {
  technique: number;
  stamina: number;
  vibe: number;
  overall: number;
  reviewCount: number;
}

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();

  const [profile, setProfile] = useState<ProfileDetail | null>(null);
  const [metrics, setMetrics] = useState<MetricsSummary>({ technique: 0, stamina: 0, vibe: 0, overall: 0, reviewCount: 0 });
  const [vouchCount, setVouchCount] = useState(0);
  const [hasVouched, setHasVouched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [vouchLoading, setVouchLoading] = useState(false);
  const [reviewKey, setReviewKey] = useState(0);

  const fetchProfile = useCallback(async () => {
    if (!id) return;
    const { data } = await supabase.from("profiles").select("*").eq("id", id).single();
    if (data) setProfile(data);
  }, [id]);

  const fetchMetrics = useCallback(async () => {
    if (!id) return;
    const { data: reviews } = await supabase.from("reviews").select("technique_rating, stamina_rating, vibe_rating").eq("profile_id", id);
    if (reviews && reviews.length > 0) {
      const t = reviews.reduce((a, r) => a + r.technique_rating, 0) / reviews.length;
      const s = reviews.reduce((a, r) => a + r.stamina_rating, 0) / reviews.length;
      const v = reviews.reduce((a, r) => a + r.vibe_rating, 0) / reviews.length;
      setMetrics({ technique: t, stamina: s, vibe: v, overall: (t + s + v) / 3, reviewCount: reviews.length });
    }
  }, [id]);

  const fetchVouches = useCallback(async () => {
    if (!id) return;
    const { count } = await supabase.from("vouches").select("*", { count: "exact", head: true }).eq("profile_id", id);
    setVouchCount(count ?? 0);
    if (user) {
      const { data } = await supabase.from("vouches").select("id").eq("profile_id", id).eq("voucher_id", user.id).maybeSingle();
      setHasVouched(!!data);
    }
  }, [id, user]);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchProfile(), fetchMetrics(), fetchVouches()]).finally(() => setLoading(false));
  }, [fetchProfile, fetchMetrics, fetchVouches]);

  const handleVouch = useCallback(async () => {
    if (!user || !id) {
      toast({ title: "Sign in first", description: "You need an account to vouch." });
      return;
    }
    if (user.id === profile?.user_id) {
      toast({ title: "Can't vouch for yourself", variant: "destructive" });
      return;
    }
    setVouchLoading(true);
    try {
      if (hasVouched) {
        await supabase.from("vouches").delete().eq("profile_id", id).eq("voucher_id", user.id);
        setHasVouched(false);
        setVouchCount((c) => c - 1);
      } else {
        await supabase.from("vouches").insert({ profile_id: id, voucher_id: user.id });
        setHasVouched(true);
        setVouchCount((c) => c + 1);
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    }
    setVouchLoading(false);
  }, [user, id, profile?.user_id, hasVouched, toast]);

  const handleReviewSubmitted = useCallback(() => {
    fetchMetrics();
    setReviewKey((k) => k + 1);
  }, [fetchMetrics]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4 noise">
        <p className="text-muted-foreground font-display text-lg">Profile not found</p>
        <Link to="/" className="text-primary font-mono text-xs uppercase tracking-wider hover:underline">Go Home</Link>
      </div>
    );
  }

  const metricEntries: [string, number][] = [
    ["Technique", metrics.technique],
    ["Stamina", metrics.stamina],
    ["Vibe", metrics.vibe],
  ];

  return (
    <div className="min-h-screen bg-background noise">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-14 px-4">
          <Link to="/" className="font-display font-extrabold text-lg tracking-tight">
            RATE<span className="text-primary">EATERS</span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Link>
        </div>
      </nav>

      <div className="container max-w-3xl mx-auto pt-20 sm:pt-24 pb-20 px-4">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-border p-5 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-secondary overflow-hidden shrink-0">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.display_name} className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl font-display font-bold text-muted-foreground">
                  {profile.display_name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display font-extrabold text-xl sm:text-3xl">{profile.display_name}</h1>
                {!profile.is_anonymous && <BadgeCheck className="w-5 h-5 text-primary" />}
              </div>
              {profile.city && (
                <p className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  <MapPin className="w-3 h-3" /> {profile.city}
                </p>
              )}
              {profile.bio && (
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{profile.bio}</p>
              )}
              <div className="flex items-center gap-4 mt-4 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {metrics.reviewCount} reviews
                </span>
                <span className="flex items-center gap-1 text-primary">
                  <Heart className="w-3.5 h-3.5" />
                  {vouchCount} vouches
                </span>
              </div>
            </div>

            {/* Overall */}
            <div className="flex flex-row sm:flex-col items-center gap-2 sm:gap-1 shrink-0 border border-border p-4 sm:min-w-[100px] w-full sm:w-auto justify-center">
              <span className="text-2xl sm:text-3xl font-display font-extrabold text-gradient">
                {metrics.overall > 0 ? metrics.overall.toFixed(1) : "—"}
              </span>
              <StarRating rating={metrics.overall} size="sm" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">overall</span>
            </div>
          </div>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-border p-5 sm:p-6 mt-4"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4">Detailed Ratings</p>
          <div className="space-y-4">
            {metricEntries.map(([label, value]) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{label}</span>
                  <span className="font-mono text-xs text-primary">{value > 0 ? value.toFixed(1) : "—"} / 5</span>
                </div>
                <div className="h-px bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(value / 5) * 100}%` }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 mt-4"
        >
          <Button
            onClick={handleVouch}
            disabled={vouchLoading}
            className={`flex-1 h-11 text-xs font-display font-bold uppercase tracking-wider gap-2 rounded-none ${
              hasVouched
                ? "bg-primary text-primary-foreground hover:bg-primary/80"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            <Heart className={`w-4 h-4 ${hasVouched ? "fill-current" : ""}`} />
            {hasVouched ? "Vouched ✓" : "Vouch"}
          </Button>
          <WriteReviewDialog profileId={profile.id} profileName={profile.display_name} onReviewSubmitted={handleReviewSubmitted} />
          {user?.id === profile.user_id && (
            <Link to="/edit-profile">
              <Button variant="outline" className="h-11 text-xs font-display font-bold uppercase tracking-wider gap-2 rounded-none">
                <Pencil className="w-4 h-4" />
                Edit
              </Button>
            </Link>
          )}
        </motion.div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4">Reviews</p>
          <ReviewFeed key={reviewKey} profileId={profile.id} />
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
