import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, Star, Users } from "lucide-react";
import type { HeatZone } from "@/data/lagosZones";

interface Props {
  zone: HeatZone | null;
  onClose: () => void;
}

const ZoneDetailPanel = forwardRef<HTMLDivElement, Props>(({ zone, onClose }, ref) => (
  <div ref={ref}>
  <AnimatePresence>
    {zone && (
      <motion.div
        key={zone.id}
        initial={{ opacity: 0, x: 20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 20, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-4 top-4 bottom-4 w-72 border border-border bg-card/95 backdrop-blur-xl p-5 z-30 flex flex-col"
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-1">
              Heat Zone
            </p>
            <h3 className="font-display font-extrabold text-lg text-foreground leading-tight">
              {zone.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{zone.borough}</p>
          </div>
          <motion.button
            onClick={onClose}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Intensity bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              Heat Level
            </span>
            <span className="text-xs font-mono text-primary">{zone.label}</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, hsl(var(--primary) / 0.5), hsl(var(--primary)))`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${zone.intensity * 100}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          {[
            { icon: Users, label: "Active Providers", value: zone.activeCount, suffix: "nearby" },
            { icon: Star, label: "Top Rating", value: zone.topRating, suffix: "/ 5.0" },
            { icon: Flame, label: "Intensity", value: Math.round(zone.intensity * 100), suffix: "%" },
          ].map(({ icon: Icon, label, value, suffix }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              className="flex items-center gap-3 p-3 border border-border bg-background/50"
            >
              <Icon className="w-4 h-4 text-primary shrink-0" />
              <div className="flex-1">
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  {label}
                </p>
                <p className="text-sm font-display font-bold text-foreground">
                  {value} <span className="text-muted-foreground font-normal text-xs">{suffix}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-auto pt-4 text-[10px] text-muted-foreground leading-relaxed"
        >
          Locations are anonymized into heat zones. No exact positions are shown. Privacy first. 🔒
        </motion.p>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ZoneDetailPanel;
