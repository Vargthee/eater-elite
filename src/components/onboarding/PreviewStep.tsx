import { motion } from "framer-motion";
import { Loader2, MapPin, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OnboardingData } from "@/pages/Onboarding";

interface PreviewStepProps {
  data: OnboardingData;
  onComplete: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const PreviewStep = ({ data, onComplete, onBack, isSubmitting }: PreviewStepProps) => {
  const previewAvatarUrl = data.avatarFile
    ? URL.createObjectURL(data.avatarFile)
    : data.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.displayName}`;

  return (
    <div className="space-y-10">
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary mb-3">
            <span className="inline-block w-6 h-[1px] bg-primary/40 mr-2 align-middle"></span>
            Step 5 of 5
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl leading-[0.9] tracking-[-0.03em] mb-4">
            Preview Your<br />Profile
          </h2>
        </div>
        <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed tracking-[-0.01em]">
          Take a final look before going live. 
          <span className="text-foreground/60"> You can edit most of this later.</span>
        </p>
      </motion.div>

      <motion.div 
        className="max-w-lg mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          className="border-2 border-border p-8 space-y-8 bg-muted/10 hover:border-primary/20 transition-all duration-500"
          whileHover={{ y: -4, boxShadow: "0 20px 40px -12px hsl(var(--primary) / 0.1)" }}
        >
          {/* Avatar & Name */}
          <div className="flex items-start gap-5">
            <motion.div 
              className="w-20 h-20 border-2 border-border overflow-hidden shrink-0 bg-muted/50"
              whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.3)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {previewAvatarUrl ? (
                <img
                  src={previewAvatarUrl}
                  alt={data.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-10 h-10 text-muted-foreground" />
                </div>
              )}
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-2xl truncate tracking-tight mb-2">
                {data.displayName}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span className="font-mono uppercase tracking-wider">{data.city}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground leading-relaxed tracking-[-0.01em]">
              {data.bio}
            </p>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            {[
              { label: "Rating", value: "—" },
              { label: "Reviews", value: "0" },
              { label: "Vouches", value: "0" },
            ].map(({ label, value }, i) => (
              <motion.div 
                key={label} 
                className="text-center p-3 border border-border bg-muted/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                <p className="font-display font-bold text-xl mb-1">{value}</p>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.3em]">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* New Badge */}
          <motion.div 
            className="flex items-center justify-center gap-2 py-3 border border-primary/30 bg-primary/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary">
              New Profile
            </span>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[11px] text-center text-muted-foreground mt-6 leading-relaxed"
        >
          By creating a profile, you agree to our community guidelines and terms of service.
        </motion.p>
      </motion.div>

      <motion.div 
        className="flex gap-3 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="px-8 font-display uppercase tracking-[0.12em] text-xs"
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          onClick={onComplete}
          disabled={isSubmitting}
          size="lg"
          className="px-10 font-display uppercase tracking-[0.12em] text-xs glow-primary relative overflow-hidden group"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Creating...
            </>
          ) : (
            <>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative">Create Profile 🚀</span>
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default PreviewStep;
