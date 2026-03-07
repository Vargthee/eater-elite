import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Shield, TrendingUp, MapPin, Users, LogOut, Loader as Loader2, ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import ProfileCard from "@/components/ProfileCard";
import { dummyProfiles } from "@/data/dummyProfiles";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { filterProfiles } from "@/lib/utils";

const nigerianCities = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Benin City", "Enugu"];

const Index = () => {
  const { user, signInAnonymously, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [creating, setCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | undefined>();

  const filteredProfiles = filterProfiles(dummyProfiles, searchQuery, selectedCity);

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
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-extrabold text-lg tracking-tight text-foreground">
              RATE<span className="text-primary">EATERS</span>
            </span>
            <span className="tag hidden sm:inline-flex">BETA</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              Explore
            </button>
            {user ? (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exit</span>
              </button>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-display font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Enter
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 sm:pt-40 pb-10 sm:pb-20 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4 sm:mb-6">
              Anonymous Rating Platform — Naija Edition
            </p>
            <h1 className="font-display font-extrabold text-3xl sm:text-6xl md:text-7xl leading-[0.9] mb-4 sm:mb-6">
              Discover who<br />
              <span className="text-gradient">dey chop well</span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-xl leading-relaxed mb-8 sm:mb-12">
              Anonymous reviews. Real ratings. Technique, Stamina & Vibe — all scored. Your identity stays hidden. No wahala. 🇳🇬
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <SearchBar onSearch={setSearchQuery} />
          </motion.div>

          {/* City pills */}
          <motion.div
            className="flex flex-wrap items-center gap-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {nigerianCities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(selectedCity === city ? undefined : city)}
                className={`flex items-center gap-1.5 px-3 py-1.5 border text-[11px] font-mono uppercase tracking-wider transition-colors ${
                  selectedCity === city
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                <MapPin className="w-3 h-3" />
                {city}
              </button>
            ))}
          </motion.div>

          {/* Trust signals */}
          <motion.div
            className="flex flex-wrap items-center gap-6 mt-8 sm:mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {[
              { icon: Shield, label: "100% Anonymous", color: "text-primary" },
              { icon: TrendingUp, label: "2,400+ Reviews", color: "text-muted-foreground" },
              { icon: Users, label: "Naija Only 🇳🇬", color: "text-muted-foreground" },
            ].map(({ icon: Icon, label, color }) => (
              <span key={label} className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                <Icon className={`w-4 h-4 ${color}`} />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="container max-w-5xl mx-auto px-4">
        <div className="h-px bg-border" />
      </div>

      {/* Leaderboard */}
      <section className="py-12 sm:py-20 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-end justify-between mb-8 sm:mb-12"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2">
                {searchQuery || selectedCity ? "Search Results" : "Leaderboard"}
              </p>
              <h2 className="font-display font-extrabold text-xl sm:text-4xl leading-tight">
                {searchQuery || selectedCity ? (
                  <>
                    {filteredProfiles.length} {filteredProfiles.length === 1 ? "Match" : "Matches"} Found
                  </>
                ) : (
                  <>
                    Top Rated<br className="hidden sm:block" /> This Month
                  </>
                )}
              </h2>
            </div>
            {(searchQuery || selectedCity) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCity(undefined);
                }}
                className="flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
              >
                Clear Filters
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
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
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCity(undefined);
                }}
                className="px-4 py-2 border border-border text-foreground text-xs font-mono uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:pb-24">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="border border-border p-8 sm:p-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
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
            <button
              onClick={handleCreateProfile}
              disabled={creating}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity glow-primary disabled:opacity-50 shrink-0"
            >
              {creating && <Loader2 className="w-4 h-4 animate-spin" />}
              {user ? "View Profile" : "Create Profile"}
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 sm:py-8 px-4">
        <div className="container max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-sm text-foreground tracking-tight">
              RATE<span className="text-primary">EATERS</span>
            </span>
            <span>🇳🇬</span>
          </div>
          <p className="normal-case tracking-normal text-[11px]">Your reviews stay anonymous. Always. No wahala.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
