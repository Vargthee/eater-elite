import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Flame, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { lagosZones, lagoBoroughs, type HeatZone } from "@/data/lagosZones";
import HeatZoneBlob from "@/components/HeatZoneBlob";
import ZoneDetailPanel from "@/components/ZoneDetailPanel";

const Heatmap = () => {
  const [selectedZone, setSelectedZone] = useState<HeatZone | null>(null);
  const [selectedBorough, setSelectedBorough] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);

  const filteredZones = selectedBorough
    ? lagosZones.filter((z) => z.borough === selectedBorough)
    : lagosZones;

  const handleZoneClick = useCallback((zone: HeatZone) => {
    setSelectedZone((prev) => (prev?.id === zone.id ? null : zone));
  }, []);

  return (
    <div className="min-h-screen bg-background noise">
      {/* Top bar */}
      <motion.nav
        className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </Link>
            </motion.div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-primary" />
              <span className="font-display font-extrabold text-sm tracking-tight text-foreground">
                THE HEATMAP
              </span>
              <span className="tag hidden sm:inline-flex">LAGOS</span>
            </div>
          </div>

          <motion.button
            onClick={() => setShowLabels(!showLabels)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors border border-border"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {showLabels ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{showLabels ? "Hide" : "Show"} Labels</span>
          </motion.button>
        </div>
      </motion.nav>

      {/* Borough filters */}
      <div className="fixed top-14 inset-x-0 z-40 border-b border-border bg-background/60 backdrop-blur-lg">
        <div className="container px-4 py-2.5">
          <motion.div
            className="flex items-center gap-2 overflow-x-auto no-scrollbar"
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.04 } } }}
          >
            <motion.button
              variants={{ initial: { opacity: 0, y: 5 }, animate: { opacity: 1, y: 0 } }}
              onClick={() => setSelectedBorough(null)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider whitespace-nowrap border transition-colors shrink-0 ${
                !selectedBorough
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-3 h-3" />
              All Zones
            </motion.button>
            {lagoBoroughs.map((borough) => (
              <motion.button
                key={borough}
                variants={{ initial: { opacity: 0, y: 5 }, animate: { opacity: 1, y: 0 } }}
                onClick={() => setSelectedBorough(selectedBorough === borough ? null : borough)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider whitespace-nowrap border transition-colors shrink-0 ${
                  selectedBorough === borough
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {borough}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Map area */}
      <main className="pt-[108px] px-4 pb-8">
        <div className="container max-w-6xl mx-auto">
          {/* Map header */}
          <motion.div
            className="mb-6 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-1">
              Hyper-Local Discovery
            </p>
            <h1 className="font-display font-extrabold text-2xl sm:text-4xl leading-tight">
              Where Lagos<br />
              <span className="text-gradient">dey hot right now</span> 🔥
            </h1>
            <p className="text-muted-foreground text-sm mt-2 max-w-lg">
              Anonymized heat zones showing where top-rated providers are most active. No exact locations — privacy first.
            </p>
          </motion.div>

          {/* Map container */}
          <motion.div
            className="relative w-full border border-border bg-card/30 overflow-hidden"
            style={{ aspectRatio: "16/10" }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />

            {/* Ambient background glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse 60% 50% at 50% 60%, hsl(var(--primary) / 0.04) 0%, transparent 100%),
                  radial-gradient(ellipse 30% 40% at 55% 70%, hsl(var(--primary) / 0.06) 0%, transparent 100%)
                `,
              }}
            />

            {/* Lagos outline hint — abstract shape */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M10,45 Q15,30 25,25 Q35,18 45,22 Q55,15 65,20 Q75,18 85,25 Q90,35 88,50 Q90,60 85,70 Q78,78 65,75 Q55,80 45,78 Q35,82 25,75 Q15,68 12,55 Z"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="0.3"
              />
            </svg>

            {/* Heat zones */}
            {filteredZones.map((zone) => (
              <HeatZoneBlob
                key={zone.id}
                zone={zone}
                isSelected={selectedZone?.id === zone.id}
                onClick={handleZoneClick}
              />
            ))}

            {/* Zone labels */}
            {showLabels &&
              filteredZones.map((zone) => (
                <motion.div
                  key={`label-${zone.id}`}
                  className="absolute pointer-events-none -translate-x-1/2"
                  style={{ left: `${zone.cx}%`, top: `${zone.cy + 5}%` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 0.8 }}
                >
                  <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
                    {zone.name}
                  </span>
                </motion.div>
              ))}

            {/* Detail panel */}
            <ZoneDetailPanel zone={selectedZone} onClose={() => setSelectedZone(null)} />
          </motion.div>

          {/* Legend */}
          <motion.div
            className="flex flex-wrap items-center gap-6 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Intensity:</span>
            {[
              { label: "Low", opacity: 0.2 },
              { label: "Medium", opacity: 0.45 },
              { label: "High", opacity: 0.7 },
              { label: "Extreme", opacity: 0.95 },
            ].map(({ label, opacity }) => (
              <span key={label} className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: `radial-gradient(circle, hsl(var(--primary) / ${opacity}), transparent)`,
                    boxShadow: `0 0 8px hsl(var(--primary) / ${opacity * 0.5})`,
                  }}
                />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        className="border-t border-border py-6 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container max-w-6xl mx-auto flex items-center justify-between text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-primary" />
            <span className="uppercase tracking-wider">The Heatmap</span>
          </div>
          <p className="normal-case tracking-normal text-[11px]">
            All locations are anonymized heat zones. Privacy always. 🔒
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Heatmap;
