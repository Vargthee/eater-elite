import { motion } from "framer-motion";
import { Flame, Shield, TrendingUp } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ProfileCard from "@/components/ProfileCard";
import { dummyProfiles } from "@/data/dummyProfiles";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-primary" />
            <span className="font-display font-bold text-xl text-gradient">RateEaters</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
              Explore
            </button>
            <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-tight mb-4">
              Find the <span className="text-gradient">Top-Rated</span> Eaters
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Anonymous reviews. Real ratings. Discover providers rated on Technique, Stamina, and Vibe.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <SearchBar />
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-vouch" />
              100% Anonymous
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-primary" />
              2,400+ Reviews
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-primary" />
              500+ Verified Eaters
            </span>
          </motion.div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="pb-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl">
                🔥 Top Rated
              </h2>
              <p className="text-muted-foreground text-sm mt-1">The highest-rated eaters this month</p>
            </div>
            <button className="text-sm text-primary hover:underline underline-offset-2 font-medium">
              View All →
            </button>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {dummyProfiles.map((profile, i) => (
              <ProfileCard key={profile.id} profile={profile} rank={i + 1} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-primary" />
            <span className="font-display font-semibold text-foreground">RateEaters</span>
          </div>
          <p>Your reviews stay anonymous. Always.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
