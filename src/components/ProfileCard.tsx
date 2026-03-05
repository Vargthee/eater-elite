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
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      className="glass-hover rounded-2xl p-4 sm:p-5 flex flex-col gap-3 sm:gap-4 group"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {rank && (
          <div className="text-gradient font-display font-bold text-xl sm:text-2xl leading-none pt-1">
            #{rank}
          </div>
        )}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-secondary overflow-hidden shrink-0">
          <img
            src={profile.avatar}
            alt={profile.displayName}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <h3 className="font-display font-semibold text-base sm:text-lg truncate">{profile.displayName}</h3>
            {profile.verified && (
              <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
            )}
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm">{profile.city}</p>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={profile.rating} size="sm" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              {profile.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <p className="text-secondary-foreground text-xs sm:text-sm line-clamp-2 leading-relaxed">{profile.bio}</p>

      <div className="flex flex-wrap gap-1 sm:gap-1.5">
        {profile.specialties.map((tag) => (
          <span
            key={tag}
            className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-secondary text-secondary-foreground text-[10px] sm:text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Metrics bar */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {Object.entries(profile.metrics).map(([key, value]) => (
          <div key={key} className="text-center">
            <div className="text-[10px] sm:text-xs text-muted-foreground capitalize mb-1">{key}</div>
            <div className="h-1 sm:h-1.5 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${(value / 5) * 100}%` }}
                transition={{ delay: index * 0.08 + 0.3, duration: 0.6, ease: "easeOut" }}
              />
            </div>
            <div className="text-[10px] sm:text-xs font-medium text-foreground mt-0.5">{value.toFixed(1)}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-border">
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {profile.reviewCount}
          </span>
          <span className="flex items-center gap-1 text-vouch">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {profile.vouchCount}
          </span>
        </div>
        <Link to={`/profile/${profile.id}`} className="text-xs sm:text-sm font-medium text-primary hover:underline underline-offset-2 transition-colors">
          View Profile
        </Link>
      </div>
    </motion.div>
  );
});

ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
