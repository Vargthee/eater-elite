import { memo } from "react";
import { motion } from "framer-motion";
import type { HeatZone } from "@/data/lagosZones";

interface Props {
  zone: HeatZone;
  isSelected: boolean;
  onClick: (zone: HeatZone) => void;
}

const HeatZoneBlob = memo(({ zone, isSelected, onClick }: Props) => {
  const size = 30 + zone.intensity * 60; // 30-90px
  const glowOpacity = 0.15 + zone.intensity * 0.45;
  const pulseScale = 1 + zone.intensity * 0.25;

  return (
    <motion.button
      onClick={() => onClick(zone)}
      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
      style={{ left: `${zone.cx}%`, top: `${zone.cy}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: Math.random() * 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.2, zIndex: 20 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          width: size * 1.6,
          height: size * 1.6,
          left: -(size * 0.3),
          top: -(size * 0.3),
          background: `radial-gradient(circle, hsl(var(--primary) / ${glowOpacity * 0.3}) 0%, transparent 70%)`,
        }}
        animate={{ scale: [1, pulseScale, 1], opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Core blob */}
      <motion.div
        className="rounded-full relative"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 35% 35%, hsl(var(--primary) / ${glowOpacity}) 0%, hsl(var(--primary) / ${glowOpacity * 0.3}) 60%, transparent 100%)`,
          boxShadow: isSelected
            ? `0 0 ${size}px hsl(var(--primary) / 0.5), 0 0 ${size * 2}px hsl(var(--primary) / 0.2)`
            : `0 0 ${size * 0.5}px hsl(var(--primary) / ${glowOpacity * 0.4})`,
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Label on hover */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap pointer-events-none"
        initial={{ opacity: 0, y: 5 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-[10px] font-mono uppercase tracking-wider text-primary bg-background/90 border border-border px-2 py-0.5 backdrop-blur-sm">
          {zone.name}
        </span>
      </motion.div>
    </motion.button>
  );
});

HeatZoneBlob.displayName = "HeatZoneBlob";
export default HeatZoneBlob;
