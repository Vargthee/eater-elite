import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CityStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const nigerianCities = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
  "Benin City",
  "Enugu",
  "Kano",
  "Kaduna",
  "Jos",
  "Calabar",
];

const CityStep = ({ value, onChange, onNext, onBack }: CityStepProps) => {
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
            Step 3 of 5
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl leading-[0.9] tracking-[-0.03em] mb-4">
            Select Your<br />City
          </h2>
        </div>
        <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed tracking-[-0.01em]">
          Let people know where you're based. This helps with local discovery.
        </p>
      </motion.div>

      <motion.div 
        className="max-w-lg mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid grid-cols-2 gap-3">
          {nigerianCities.map((city, i) => (
            <motion.button
              key={city}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 + i * 0.03, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(city)}
              className={`p-5 border-2 text-left transition-all duration-300 ${
                value === city
                  ? "border-primary bg-primary/5 shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
                  : "border-border hover:border-primary/30 hover:bg-muted/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 border flex items-center justify-center transition-colors ${
                  value === city 
                    ? "border-primary bg-primary/10" 
                    : "border-border bg-muted/50"
                }`}>
                  <MapPin className={`w-4 h-4 transition-colors ${value === city ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <span className={`font-display font-bold text-sm tracking-tight transition-colors ${
                  value === city ? "text-primary" : "text-foreground"
                }`}>
                  {city}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="flex gap-3 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
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
          size="lg"
          className="px-10 font-display uppercase tracking-[0.12em] text-xs"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
};

export default CityStep;
