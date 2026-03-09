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
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Step 3 of 5
        </p>
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl">
          Select Your City
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Let people know where you're based. This helps with local discovery.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-3">
          {nigerianCities.map((city, i) => (
            <motion.button
              key={city}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onChange(city)}
              className={`p-4 border-2 text-left transition-all ${
                value === city
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="font-display font-bold text-sm">{city}</span>
              </div>
            </motion.button>
          ))}
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
          size="lg"
          className="px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CityStep;
