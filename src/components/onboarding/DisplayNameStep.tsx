import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface DisplayNameStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const DisplayNameStep = ({ value, onChange, onNext, onBack }: DisplayNameStepProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAvailability = async () => {
      if (!value || value.length < 3) {
        setIsAvailable(null);
        setError("");
        return;
      }

      // Validate display name
      if (value.length > 30) {
        setError("Display name must be 30 characters or less");
        setIsAvailable(false);
        return;
      }

      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        setError("Only letters, numbers, and underscores allowed");
        setIsAvailable(false);
        return;
      }

      setIsChecking(true);
      setError("");

      try {
        const { data, error: queryError } = await supabase
          .from("profiles")
          .select("id")
          .ilike("display_name", value)
          .maybeSingle();

        if (queryError) throw queryError;

        setIsAvailable(!data);
      } catch (err: any) {
        console.error("Error checking availability:", err);
        setError("Failed to check availability");
        setIsAvailable(false);
      } finally {
        setIsChecking(false);
      }
    };

    const debounce = setTimeout(checkAvailability, 500);
    return () => clearTimeout(debounce);
  }, [value]);

  const canProceed = value.length >= 3 && isAvailable === true && !error;

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
            Step 1 of 5
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl leading-[0.9] tracking-[-0.03em] mb-4">
            Choose Your<br />Display Name
          </h2>
        </div>
        <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed tracking-[-0.01em]">
          This is how you'll appear to others. Make it memorable! 
          <span className="text-foreground/80"> You can't change it later.</span>
        </p>
      </motion.div>

      <motion.div 
        className="max-w-md mx-auto space-y-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative group">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="VelvetTongue"
            className="pr-12 text-lg font-display tracking-tight border-border focus:border-primary transition-all"
            maxLength={30}
            autoFocus
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isChecking && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
            {!isChecking && isAvailable === true && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Check className="w-5 h-5 text-primary" />
              </motion.div>
            )}
            {!isChecking && isAvailable === false && value.length >= 3 && !error && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <X className="w-5 h-5 text-destructive" />
              </motion.div>
            )}
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs text-destructive p-3 border border-destructive/30 bg-destructive/5"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </motion.div>
        )}

        {!error && isAvailable === false && value.length >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-destructive p-3 border border-destructive/30 bg-destructive/5"
          >
            This display name is already taken
          </motion.p>
        )}

        {!error && isAvailable === true && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-primary p-3 border border-primary/30 bg-primary/5"
          >
            ✓ This name is available!
          </motion.p>
        )}

        <div className="space-y-3 p-4 border border-border bg-muted/20">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground">Requirements:</p>
          <ul className="space-y-2 text-xs">
            <li className={`flex items-center gap-2 transition-colors ${value.length >= 3 ? "text-primary" : "text-muted-foreground"}`}>
              <span className="w-1 h-1 bg-current"></span>
              At least 3 characters
            </li>
            <li className={`flex items-center gap-2 transition-colors ${value.length <= 30 ? "text-primary" : "text-muted-foreground"}`}>
              <span className="w-1 h-1 bg-current"></span>
              Maximum 30 characters
            </li>
            <li className={`flex items-center gap-2 transition-colors ${/^[a-zA-Z0-9_]*$/.test(value) ? "text-primary" : "text-muted-foreground"}`}>
              <span className="w-1 h-1 bg-current"></span>
              Letters, numbers, underscores only
            </li>
          </ul>
        </div>
      </motion.div>

      <motion.div 
        className="flex gap-3 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="px-8 font-display uppercase tracking-[0.12em] text-xs"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          size="lg"
          className="px-10 font-display uppercase tracking-[0.12em] text-xs disabled:opacity-30"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
};

export default DisplayNameStep;
