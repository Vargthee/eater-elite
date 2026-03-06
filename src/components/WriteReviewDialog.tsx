import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import StarRating from "./StarRating";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Loader2 } from "lucide-react";

interface Props {
  profileId: string;
  profileName: string;
  onReviewSubmitted: () => void;
}

const WriteReviewDialog = ({ profileId, profileName, onReviewSubmitted }: Props) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [technique, setTechnique] = useState(0);
  const [stamina, setStamina] = useState(0);
  const [vibe, setVibe] = useState(0);
  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = technique > 0 && stamina > 0 && vibe > 0;

  const handleSubmit = async () => {
    if (!user) {
      toast({ title: "Sign in first", description: "You need an account to leave a review." });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      profile_id: profileId,
      reviewer_id: user.id,
      technique_rating: technique,
      stamina_rating: stamina,
      vibe_rating: vibe,
      comment: comment.trim() || null,
      is_anonymous: anonymous,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Review posted! 🎉" });
      setOpen(false);
      setTechnique(0); setStamina(0); setVibe(0); setComment(""); setAnonymous(true);
      onReviewSubmitted();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1 h-11 text-xs font-display font-bold uppercase tracking-wider gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
          <MessageSquare className="w-4 h-4" />
          Review
        </Button>
      </DialogTrigger>
      <DialogContent className="border border-border bg-background sm:max-w-md rounded-none">
        <DialogHeader>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">New Review</p>
          <DialogTitle className="font-display font-extrabold">Rate {profileName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 pt-2">
          {[
            { label: "Technique", emoji: "🍴", value: technique, setter: setTechnique },
            { label: "Stamina", emoji: "💪", value: stamina, setter: setStamina },
            { label: "Vibe", emoji: "✨", value: vibe, setter: setVibe },
          ].map(({ label, emoji, value, setter }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm font-medium">{label} {emoji}</span>
              <StarRating rating={value} interactive onRate={setter} size="md" />
            </div>
          ))}

          <Textarea
            placeholder="Share your experience... (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-transparent border-border resize-none h-24 rounded-none focus:border-primary/40"
          />

          <div className="flex items-center justify-between">
            <Label htmlFor="anon-switch" className="text-sm text-muted-foreground">Post anonymously</Label>
            <Switch id="anon-switch" checked={anonymous} onCheckedChange={setAnonymous} />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            className="w-full h-11 font-display font-bold text-xs uppercase tracking-wider rounded-none glow-primary"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WriteReviewDialog;
