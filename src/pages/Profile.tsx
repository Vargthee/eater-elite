import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, ArrowLeft, BadgeCheck, Heart, MessageSquare, MapPin, Loader2 } from "lucide-react";
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

  const fetchProfile = async () => {
    if (!id) return;
    const { data } = await supabase.from("profiles").select("*").eq("id", id).single();
    if (data) setProfile(data);
  };

  const fetchMetrics = async () => {
    if (!id) return;
    const { data: reviews } = await supabase.from("reviews").select("technique_rating, stamina_rating, vibe_rating").eq("profile_id", id);
    if (reviews && reviews.length > 0) {
      const t = reviews.reduce((a, r) => a + r.technique_rating, 0) / reviews.length;
      const s = reviews.reduce((a, r) => a + r.stamina_rating, 0) / reviews.length;
      const v = reviews.reduce((a, r) => a + r.vibe_rating, 0) / reviews.length;
      setMetrics({ technique: t, stamina: s, vibe: v, overall: (t + s + v) / 3, reviewCount: reviews.length });
    }
  };

  const fetchVouches = async () => {
    if (!id) return;
    const { count } = await supabase.from("vouches").select("*", { count: "exact", head: true }).eq("profile_id", id);
    setVouchCount(count ?? 0);
    if (user) {
      const { data } = await supabase.from("vouches").select("id").eq("profile_id", id).eq("voucher_id", user.id).maybeSingle();
      setHasVouched(!!data);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchProfile(), fetchMetrics(), fetchVouches()]).finally(() => setLoading(false));
  }, [id, user]);

  const handleVouch = async () => {
    if (!user || !id) {
      toast({ title: "Sign in first", description: "You need an account to vouch for someone." });
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
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg">Profile not found</p>
        <Link to="/" className="text-primary hover:underline">Go Home</Link>
      </div>
    );
  }

  const metricEntries: [string, number][] = [
    ["Technique", metrics.technique],
    ["Stamina", metrics.stamina],
    ["Vibe", metrics.vibe],
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-border">
        <div className="container flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            <span className="font-display font-bold text-lg text-gradient">RateEaters</span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </nav>

      <div className="container max-w-3xl mx-auto pt-24 pb-20 px-4">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-20 h-20 rounded-2xl bg-secondary overflow-hidden shrink-0">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.display_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-display font-bold text-muted-foreground">
                  {profile.display_name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display font-bold text-2xl sm:text-3xl">{profile.display_name}</h1>
                {!profile.is_anonymous && <BadgeCheck className="w-6 h-6 text-primary" />}
              </div>
              {profile.city && (
                <p className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {profile.city}
                </p>
              )}
              {profile.bio && (
                <p className="text-secondary-foreground text-sm mt-3 leading-relaxed">{profile.bio}</p>
              )}

              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  {metrics.reviewCount} reviews
                </span>
                <span className="flex items-center gap-1 text-vouch">
                  <Heart className="w-4 h-4" />
                  {vouchCount} vouches
                </span>
              </div>
            </div>

            {/* Overall rating */}
            <div className="flex flex-col items-center shrink-0 glass rounded-xl p-4 min-w-[100px]">
              <span className="text-3xl font-display font-bold text-gradient">
                {metrics.overall > 0 ? metrics.overall.toFixed(1) : "—"}
              </span>
              <StarRating rating={metrics.overall} size="sm" />
              <span className="text-xs text-muted-foreground mt-1">overall</span>
            </div>
          </div>
        </motion.div>

        {/* Detailed metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 mt-4"
        >
          <h2 className="font-display font-semibold text-lg mb-4">Detailed Ratings</h2>
          <div className="space-y-4">
            {metricEntries.map(([label, value]) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{label}</span>
                  <span className="text-sm font-semibold text-primary">{value > 0 ? value.toFixed(1) : "—"} / 5</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(value / 5) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
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
            className={`flex-1 rounded-xl h-12 text-sm font-semibold gap-2 ${
              hasVouched
                ? "bg-vouch text-vouch-foreground hover:bg-vouch/80"
                : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Heart className={`w-4 h-4 ${hasVouched ? "fill-current" : ""}`} />
            {hasVouched ? "Vouched ✓" : "Vouch"}
          </Button>
          <WriteReviewDialog profileId={profile.id} profileName={profile.display_name} onReviewSubmitted={() => { fetchMetrics(); }} />
        </motion.div>

        {/* Review feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <h2 className="font-display font-semibold text-lg mb-4">Reviews</h2>
          <ReviewFeed profileId={profile.id} />
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
