import { motion } from "framer-motion";
import { Sparkles, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <div className="text-center space-y-10">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
        className="inline-block"
      >
        <div className="relative w-28 h-28 mx-auto">
          <motion.div 
            className="absolute inset-0 bg-primary/5 border border-primary/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-2 bg-background border border-primary/20 flex items-center justify-center">
            <Sparkles className="w-14 h-14 text-primary" />
          </div>
        </div>
      </motion.div>

      <div className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary mb-4">
            <span className="inline-block w-8 h-[1px] bg-primary/40 mr-3 align-middle"></span>
            Onboarding
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl leading-[0.9] tracking-[-0.03em]">
            Welcome to<br />
            <span className="text-gradient">RATEEATERS</span>
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto leading-relaxed tracking-[-0.01em]"
        >
          Join Nigeria's premier anonymous rating platform. Create your profile, get reviewed, and climb the leaderboard. 🇳🇬
        </motion.p>
      </div>

      <div className="grid gap-3 max-w-lg mx-auto">
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ x: 4, borderColor: "hsl(var(--primary) / 0.5)" }}
            className="flex gap-4 p-4 border border-border text-left transition-all duration-300"
          >
            <div className="w-10 h-10 border border-primary/20 bg-primary/5 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-sm mb-1 tracking-tight">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-4"
      >
        <Button
          onClick={onNext}
          size="lg"
          className="px-10 py-6 text-sm font-display font-bold uppercase tracking-[0.12em] hover:opacity-90 transition-opacity glow-primary"
        >
          Let's Get Started
        </Button>
        
        <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
          Takes less than 2 minutes
        </p>
      </motion.div>
    </div>
  );
};

export default WelcomeStep;
