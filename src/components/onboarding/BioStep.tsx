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
  const progress = Math.min((charCount / maxChars) * 100, 100);

  const examples = [
    "The connoisseur's choice. Impeccable technique and unforgettable experience 🔥",
    "Marathon sessions specialist. Energy wey no dey finish. Abuja's finest 💎",
    "Where sophistication meets raw talent. Curated for your preferences ✨",
  ];

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
            Step 2 of 5
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl leading-[0.9] tracking-[-0.03em] mb-4">
            Tell Your<br />Story
          </h2>
        </div>
        <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed tracking-[-0.01em]">
          Write a compelling bio that highlights what makes you unique. 
          <span className="text-foreground/80"> Be creative and authentic!</span>
        </p>
      </motion.div>

      <motion.div 
        className="max-w-md mx-auto space-y-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-border overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Share what makes you stand out..."
            className="min-h-[140px] resize-none text-sm pt-4 border-border focus:border-primary transition-all"
            maxLength={maxChars}
            autoFocus
          />
          <div className="absolute bottom-3 right-3 font-mono text-xs">
            <span className={charCount > maxChars ? "text-destructive" : charCount >= 20 ? "text-primary" : "text-muted-foreground"}>
              {charCount}
            </span>
            <span className="text-muted-foreground">/{maxChars}</span>
          </div>
        </div>

        <div className="space-y-3 p-4 border border-border bg-muted/20">
          <div className="flex items-center gap-2 text-xs">
            <Lightbulb className="w-4 h-4 text-primary shrink-0" />
            <span className="font-mono uppercase tracking-[0.3em] text-foreground">Examples</span>
          </div>
          <div className="space-y-2">
            {examples.map((example, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                whileHover={{ x: 2, borderColor: "hsl(var(--primary) / 0.5)" }}
                onClick={() => onChange(example)}
                className="w-full text-left p-3 border border-border hover:bg-primary/5 transition-all text-xs text-muted-foreground hover:text-foreground"
              >
                "{example}"
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground">Pro Tips:</p>
          <ul className="space-y-2">
            <li className={`flex items-center gap-2 transition-colors ${charCount >= 20 ? "text-primary" : "text-muted-foreground"}`}>
              <span className="w-1 h-1 bg-current"></span>
              At least 20 characters for quality
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <span className="w-1 h-1 bg-current"></span>
              Highlight your specialties or unique style
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <span className="w-1 h-1 bg-current"></span>
              Use emojis to add personality
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

export default BioStep;
