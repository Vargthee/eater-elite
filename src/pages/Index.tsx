import { useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, TrendingUp, MapPin, Users, LogOut, Loader as Loader2, ArrowUpRight, Flame } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import ProfileCard from "@/components/ProfileCard";
import ProfileCardSkeleton from "@/components/ProfileCardSkeleton";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useProfiles } from "@/hooks/useProfiles";

const nigerianCities = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Benin City", "Enugu"];

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const Index = () => {
  const { user, signInAnonymously, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [creating, setCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const { scrollYProgress } = useScroll();
  const navBorder = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // Fetch real profiles from database
  const { data: profiles = [], isLoading } = useProfiles({
    searchQuery,
    city: selectedCity,
    limit: 50,
  });

  const handleCreateProfile = useCallback(async () => {
    setCreating(true);
    try {
      let userId = user?.id;
      if (!userId) {
        await signInAnonymously();
        const { data: { session } } = await supabase.auth.getSession();
        userId = session?.user?.id;
      }
      if (!userId) throw new Error("Could not authenticate");
      await new Promise((r) => setTimeout(r, 500));
      const { data: profile } = await supabase.from("profiles").select("id").eq("user_id", userId).maybeSingle();
      if (profile) {
        navigate(`/profile/${profile.id}`);
      } else {
        toast({ title: "Error", description: "Profile not found. Try again.", variant: "destructive" });
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
    setCreating(false);
  }, [user, signInAnonymously, navigate, toast]);

  const handleSignOut = useCallback(() => signOut(), [signOut]);

  return (
    <div className="min-h-screen bg-background noise">
      {/* Nav */}
      <motion.nav
        className="fixed top-0 inset-x-0 z-50 border-b bg-background/80 backdrop-blur-xl"
        style={{ borderColor: useTransform(navBorder, (v) => `hsl(var(--border) / ${v})`) }}
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container flex items-center justify-between h-14 px-4">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <span className="font-display font-extrabold text-lg tracking-tight text-foreground">
              RATE<span className="text-primary">EATERS</span>
            </span>
            <span className="tag hidden sm:inline-flex">BETA</span>
          </motion.div>
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/heatmap"
                className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                <Flame className="w-3.5 h-3.5 text-primary" />
                Heatmap
              </Link>
            </motion.div>
            {user ? (
              <motion.button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exit</span>
              </motion.button>
            ) : (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/auth"
                  className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-display font-bold uppercase tracking-wider hover:opacity-90 transition-opacity inline-block"
                >
                  Enter
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="pt-28 sm:pt-40 pb-10 sm:pb-20 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            className="max-w-3xl"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.p
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-[0.35em] text-primary mb-4 sm:mb-6 flex items-center gap-2"
            >
              <span className="inline-block w-8 h-[1px] bg-primary/40"></span>
              Anonymous Rating Platform — Naija Edition
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.88] mb-5 sm:mb-7 tracking-[-0.04em]"
            >
              Discover who<br />
              <span className="text-gradient">dey chop well</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-sm sm:text-lg max-w-xl leading-relaxed mb-8 sm:mb-12 font-body tracking-[-0.01em]"
            >
              Anonymous reviews. Real ratings. <span className="text-primary/80 font-medium">Technique, Stamina & Vibe</span> — all scored. Your identity stays hidden. No wahala. 🇳🇬
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scaleX: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl origin-left"
          >
            <SearchBar onSearch={setSearchQuery} />
          </motion.div>

          {/* City pills */}
          <motion.div
            className="flex flex-wrap items-center gap-2 mt-6"
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.05, delayChildren: 0.5 } } }}
          >
            {nigerianCities.map((city) => (
              <motion.button
                key={city}
                variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCity(selectedCity === city ? undefined : city)}
                className={`flex items-center gap-1.5 px-3 py-1.5 border text-[11px] font-mono uppercase tracking-wider transition-colors ${
                  selectedCity === city
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                <MapPin className="w-3 h-3" />
                {city}
              </motion.button>
            ))}
          </motion.div>

          {/* Trust signals */}
          <motion.div
            className="flex flex-wrap items-center gap-6 mt-8 sm:mt-12"
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } } }}
          >
            {[
              { icon: Shield, label: "100% Anonymous", color: "text-primary" },
              { icon: TrendingUp, label: "2,400+ Reviews", color: "text-muted-foreground" },
              { icon: Users, label: "Naija Only 🇳🇬", color: "text-muted-foreground" },
            ].map(({ icon: Icon, label, color }) => (
              <motion.span
                key={label}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground"
                variants={{ initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 } }}
                whileHover={{ x: 3 }}
              >
                <Icon className={`w-4 h-4 ${color}`} />
                {label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="container max-w-5xl mx-auto px-4">
        <motion.div
          className="h-px bg-border"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* Leaderboard */}
      <section className="py-12 sm:py-20 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-end justify-between mb-8 sm:mb-12"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2">
                {searchQuery || selectedCity ? "Search Results" : "Leaderboard"}
              </p>
              <h2 className="font-display font-extrabold text-xl sm:text-4xl leading-tight">
                {isLoading ? (
                  "Loading..."
                ) : searchQuery || selectedCity ? (
                  <>
                    {profiles.length} {profiles.length === 1 ? "Match" : "Matches"} Found
                  </>
                ) : (
                  <>
                    Top Rated<br className="hidden sm:block" /> This Month
                  </>
                )}
              </h2>
            </div>
            {(searchQuery || selectedCity) && (
              <motion.button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCity(undefined);
                }}
                className="flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Filters
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </motion.div>

          {filteredProfiles.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProfiles.map((profile, i) => (
                <ProfileCard key={profile.id} profile={profile} rank={i + 1} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <p className="text-muted-foreground text-sm mb-4">No eaters found matching your search.</p>
              <p className="text-xs text-muted-foreground mb-6">
                Try adjusting your search terms or clearing the filters.
              </p>
              <motion.button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCity(undefined);
                }}
                className="px-4 py-2 border border-border text-foreground text-xs font-mono uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:pb-24">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ borderColor: "hsl(var(--primary) / 0.3)" }}
            className="border border-border p-8 sm:p-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-shadow duration-500 hover:shadow-[0_0_40px_hsl(var(--primary)/0.06)]"
          >
            <div className="max-w-md">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">Get Listed</p>
              <h3 className="font-display font-extrabold text-xl sm:text-3xl leading-tight mb-2">
                You sabi chop?<br />Get rated. 🍽️
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Create your anonymous profile, collect reviews, and climb the leaderboard. No real name needed.
              </p>
            </div>
            <motion.button
              onClick={handleCreateProfile}
              disabled={creating}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-primary-foreground font-display font-bold text-sm uppercase tracking-[0.08em] hover:opacity-90 transition-all duration-400 glow-primary disabled:opacity-50 shrink-0 border border-primary/20 relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              {creating && <Loader2 className="w-4 h-4 animate-spin relative z-10" />}
              <span className="relative z-10">{user ? "View Profile" : "Create Profile"}</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="border-t border-border py-6 sm:py-8 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-sm text-foreground tracking-tight">
              RATE<span className="text-primary">EATERS</span>
            </span>
            <span>🇳🇬</span>
          </div>
          <p className="normal-case tracking-normal text-[11px]">Your reviews stay anonymous. Always. No wahala.</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
