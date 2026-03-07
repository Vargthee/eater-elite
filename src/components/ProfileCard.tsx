import { memo } from "react";
import { BadgeCheck, Heart, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export interface ProfileData {
  id: string;
  displayName: string;
  avatar: string;
  bio: string;
  rating: number;
  reviewCount: number;
  vouchCount: number;
  specialties: string[];
  verified: boolean;
  city: string;
  metrics: {
    technique: number;
    stamina: number;
    vibe: number;
  };
}

interface ProfileCardProps {
  profile: ProfileData;
  rank?: number;
  index?: number;
}

const ProfileCard = memo(({ profile, rank, index = 0 }: ProfileCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
      className="group relative border border-border bg-card p-5 flex flex-col gap-4 overflow-hidden transition-colors duration-500 hover:border-primary/30 hover:bg-card/80"
    >
      {/* Hover glow overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.06), transparent 70%)" }}
      />

      {/* Header */}
      <div className="relative flex items-start gap-3">
        {rank && (
          <motion.span
            className="font-mono text-xs text-primary tabular-nums pt-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 + 0.2, duration: 0.4 }}
          >
            {String(rank).padStart(2, "0")}
          </motion.span>
        )}
        <motion.div
          className="w-12 h-12 bg-secondary overflow-hidden shrink-0"
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <img
            src={profile.avatar}
            alt={profile.displayName}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-display font-bold text-sm truncate">{profile.displayName}</h3>
            {profile.verified && (
              <motion.span
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ delay: index * 0.08 + 0.5, duration: 0.5, ease: "easeInOut" }}
              >
                <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
              </motion.span>
            )}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{profile.city}</p>
        </div>
        <div className="text-right shrink-0">
          <motion.span
            className="font-display font-bold text-lg text-gradient leading-none inline-block"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.08 + 0.3, duration: 0.5, type: "spring", stiffness: 300 }}
          >
            {profile.rating.toFixed(1)}
          </motion.span>
          <div className="mt-0.5">
            <StarRating rating={profile.rating} size="sm" />
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="relative text-muted-foreground text-xs leading-relaxed line-clamp-2">{profile.bio}</p>

      {/* Tags */}
      <div className="relative flex flex-wrap gap-1.5">
        {profile.specialties.map((tag, i) => (
          <motion.span
            key={tag}
            className="tag"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 + 0.15 + i * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.5)" }}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Metrics */}
      <div className="relative grid grid-cols-3 gap-3">
        {Object.entries(profile.metrics).map(([key, value]) => (
          <div key={key}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{key}</span>
              <span className="font-mono text-[10px] text-foreground">{value.toFixed(1)}</span>
            </div>
            <div className="h-px bg-secondary overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${(value / 5) * 100}%` }}
                transition={{ delay: index * 0.08 + 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="relative flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            {profile.reviewCount}
          </span>
          <motion.span
            className="flex items-center gap-1 text-primary"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="w-3.5 h-3.5" />
            {profile.vouchCount}
          </motion.span>
        </div>
        <Link
          to={`/profile/${profile.id}`}
          className="group/link relative font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
        >
          <motion.span
            className="inline-flex items-center gap-1"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            View <span className="inline-block">→</span>
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
});

ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
