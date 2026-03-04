import { motion } from "framer-motion";
import { Flame, Shield, TrendingUp, MapPin, Users } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ProfileCard from "@/components/ProfileCard";
import { dummyProfiles } from "@/data/dummyProfiles";

const nigerianCities = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Benin City", "Enugu"];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-border">
        <div className="container flex items-center justify-between h-14 sm:h-16 px-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <span className="font-display font-bold text-lg sm:text-xl text-gradient">RateEaters</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
              Explore
            </button>
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-10 sm:pb-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl leading-tight mb-3 sm:mb-4">
              Find the <span className="text-gradient">Top-Rated</span> Eaters
            </h1>
            <p className="text-muted-foreground text-base sm:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Anonymous reviews. Real ratings. Discover who dey <span className="text-primary font-medium">chop</span> well — rated on Technique, Stamina & Vibe. 🇳🇬
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <SearchBar />
          </motion.div>

          {/* City pills */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            {nigerianCities.map((city) => (
              <button
                key={city}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <MapPin className="w-3 h-3" />
                {city}
              </button>
            ))}
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 text-xs sm:text-sm text-muted-foreground"
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
              <Users className="w-4 h-4 text-primary" />
              Naija Only 🇳🇬
            </span>
          </motion.div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="pb-20 px-4">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex items-center justify-between mb-6 sm:mb-8"
          >
            <div>
              <h2 className="font-display font-bold text-xl sm:text-3xl">
                🔥 Top Rated This Month
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">The highest-rated eaters across Naija</p>
            </div>
            <button className="text-xs sm:text-sm text-primary hover:underline underline-offset-2 font-medium">
              View All →
            </button>
          </motion.div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {dummyProfiles.map((profile, i) => (
              <ProfileCard key={profile.id} profile={profile} rank={i + 1} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 pb-16">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="glass rounded-2xl p-6 sm:p-10 text-center"
          >
            <h3 className="font-display font-bold text-xl sm:text-2xl mb-2">You sabi chop? Get rated 🍽️</h3>
            <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-lg mx-auto">
              Create your anonymous profile, collect reviews, and climb the leaderboard. No real name needed — your reputation speaks for itself.
            </p>
            <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity glow-primary">
              Create Your Profile
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 sm:py-8 px-4">
        <div className="container max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-primary" />
            <span className="font-display font-semibold text-foreground">RateEaters</span>
            <span className="text-xs">🇳🇬</span>
          </div>
          <p>Your reviews stay anonymous. Always. No wahala.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
