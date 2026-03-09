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
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Step 5 of 5
        </p>
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl">
          Preview Your Profile
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Take a final look before going live. You can edit most of this later.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-border p-6 space-y-6"
        >
          {/* Avatar & Name */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 border border-border overflow-hidden shrink-0 bg-muted">
              {previewAvatarUrl ? (
                <img
                  src={previewAvatarUrl}
                  alt={data.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-xl truncate">
                {data.displayName}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                <MapPin className="w-3 h-3" />
                {data.city}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data.bio}
            </p>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
            {[
              { label: "Rating", value: "—" },
              { label: "Reviews", value: "0" },
              { label: "Vouches", value: "0" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-display font-bold text-lg">{value}</p>
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* New Badge */}
          <div className="flex items-center justify-center gap-2 py-2 border border-primary/20 bg-primary/5">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono uppercase tracking-wider text-primary">
              New Profile
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs text-center text-muted-foreground mt-4"
        >
          By creating a profile, you agree to our community guidelines and terms of service.
        </motion.p>
      </div>

      <div className="flex gap-3 justify-center">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="px-6"
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          onClick={onComplete}
          disabled={isSubmitting}
          size="lg"
          className="px-8"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Creating...
            </>
          ) : (
            "Create Profile 🚀"
          )}
        </Button>
      </div>
    </div>
  );
};

export default PreviewStep;
