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
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Step 1 of 5
        </p>
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl">
          Choose Your Display Name
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          This is how you'll appear to others. Make it memorable! 
          You can't change it later.
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="VelvetTongue"
            className="pr-12 text-lg font-display tracking-tight"
            maxLength={30}
            autoFocus
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isChecking && <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />}
            {!isChecking && isAvailable === true && (
              <Check className="w-5 h-5 text-primary" />
            )}
            {!isChecking && isAvailable === false && value.length >= 3 && !error && (
              <X className="w-5 h-5 text-destructive" />
            )}
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs text-destructive"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}

        {!error && isAvailable === false && value.length >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-destructive"
          >
            This display name is already taken
          </motion.p>
        )}

        {!error && isAvailable === true && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-primary"
          >
            ✓ This name is available!
          </motion.p>
        )}

        <div className="space-y-2 text-xs text-muted-foreground">
          <p className="font-mono uppercase tracking-wider">Requirements:</p>
          <ul className="space-y-1 ml-4">
            <li className={value.length >= 3 ? "text-primary" : ""}>
              ✓ At least 3 characters
            </li>
            <li className={value.length <= 30 ? "text-primary" : ""}>
              ✓ Maximum 30 characters
            </li>
            <li className={/^[a-zA-Z0-9_]*$/.test(value) ? "text-primary" : ""}>
              ✓ Letters, numbers, underscores only
            </li>
          </ul>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="px-6"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          size="lg"
          className="px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default DisplayNameStep;
