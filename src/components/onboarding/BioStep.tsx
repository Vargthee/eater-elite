import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface BioStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const BioStep = ({ value, onChange, onNext, onBack }: BioStepProps) => {
  const charCount = value.length;
  const maxChars = 200;
  const canProceed = charCount >= 20 && charCount <= maxChars;

  const examples = [
    "The connoisseur's choice. Impeccable technique and unforgettable experience 🔥",
    "Marathon sessions specialist. Energy wey no dey finish. Abuja's finest 💎",
    "Where sophistication meets raw talent. Curated for your preferences ✨",
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Step 2 of 5
        </p>
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl">
          Tell Your Story
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Write a compelling bio that highlights what makes you unique. 
          Be creative and authentic!
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div className="relative">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Share what makes you stand out..."
            className="min-h-[120px] resize-none text-sm"
            maxLength={maxChars}
            autoFocus
          />
          <div className="absolute bottom-3 right-3 text-xs font-mono">
            <span className={charCount > maxChars ? "text-destructive" : "text-muted-foreground"}>
              {charCount}
            </span>
            <span className="text-muted-foreground">/{maxChars}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="font-mono uppercase tracking-wider">Examples:</span>
          </div>
          <div className="space-y-2">
            {examples.map((example, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onChange(example)}
                className="w-full text-left p-3 border border-border hover:border-primary/50 transition-colors text-xs text-muted-foreground hover:text-foreground"
              >
                "{example}"
              </motion.button>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p className="font-mono uppercase tracking-wider">Tips:</p>
          <ul className="space-y-1 ml-4">
            <li className={charCount >= 20 ? "text-primary" : ""}>
              ✓ At least 20 characters for quality
            </li>
            <li>• Highlight your specialties or unique style</li>
            <li>• Keep it professional but authentic</li>
            <li>• Use emojis to add personality</li>
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

export default BioStep;
