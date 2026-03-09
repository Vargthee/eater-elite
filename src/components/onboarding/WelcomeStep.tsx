import { motion } from "framer-motion";
import { Sparkles, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="inline-block"
      >
        <div className="w-24 h-24 mx-auto bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-primary" />
        </div>
      </motion.div>

      <div className="space-y-4">
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl leading-tight">
          Welcome to<br />
          <span className="text-gradient">RATEEATERS</span>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Join Nigeria's premier anonymous rating platform. Create your profile, get reviewed, and climb the leaderboard. 🇳🇬
        </p>
      </div>

      <div className="grid gap-4 max-w-md mx-auto text-left">
        {[
          {
            icon: Shield,
            title: "100% Anonymous",
            description: "Your reviews and ratings stay completely private",
          },
          {
            icon: TrendingUp,
            title: "Build Your Rep",
            description: "Collect reviews and vouches to boost your score",
          },
          {
            icon: Sparkles,
            title: "Get Discovered",
            description: "Top performers appear on the leaderboard and heatmap",
          },
        ].map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="flex gap-4 p-4 border border-border hover:border-primary/30 transition-colors"
          >
            <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-bold text-sm mb-1">{title}</h3>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={onNext}
          size="lg"
          className="px-8 py-6 text-sm font-display font-bold uppercase tracking-wider"
        >
          Let's Get Started
        </Button>
      </motion.div>

      <p className="text-xs text-muted-foreground">
        Takes less than 2 minutes to complete
      </p>
    </div>
  );
};

export default WelcomeStep;
