import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

const sizeMap = {
  sm: "w-3.5 h-3.5",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const StarRating = ({ rating, maxStars = 5, size = "md", interactive = false, onRate }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxStars }, (_, i) => {
        const filled = i < Math.round(rating);
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate?.(i + 1)}
            className={`${interactive ? "cursor-pointer hover:scale-125 transition-transform" : "cursor-default"}`}
          >
            <Star
              className={`${sizeMap[size]} transition-colors ${
                filled ? "fill-star-filled text-star-filled" : "fill-transparent text-star-empty"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
