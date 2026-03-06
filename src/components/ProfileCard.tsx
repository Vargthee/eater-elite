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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group border border-border bg-card hover:border-primary/20 transition-all duration-500 p-5 flex flex-col gap-4 hover:bg-card/80"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        {rank && (
          <span className="font-mono text-xs text-primary tabular-nums pt-1">
            {String(rank).padStart(2, "0")}
          </span>
        )}
        <div className="w-12 h-12 bg-secondary overflow-hidden shrink-0">
          <img
            src={profile.avatar}
            alt={profile.displayName}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-display font-bold text-sm truncate">{profile.displayName}</h3>
            {profile.verified && (
              <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
            )}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{profile.city}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="font-display font-bold text-lg text-gradient leading-none">
            {profile.rating.toFixed(1)}
          </span>
          <div className="mt-0.5">
            <StarRating rating={profile.rating} size="sm" />
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{profile.bio}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {profile.specialties.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3">
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
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            {profile.reviewCount}
          </span>
          <span className="flex items-center gap-1 text-primary">
            <Heart className="w-3.5 h-3.5" />
            {profile.vouchCount}
          </span>
        </div>
        <Link
          to={`/profile/${profile.id}`}
          className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
        >
          View →
        </Link>
      </div>
    </motion.div>
  );
});

ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
