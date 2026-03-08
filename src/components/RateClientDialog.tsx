import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Shield, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface RateClientDialogProps {
  reviewId: string;
  clientId: string; // the reviewer's user_id
  clientName: string;
  alreadyRated?: boolean;
  onRated?: () => void;
}

const metrics = ["Respect", "Communication", "Vibes"] as const;

const RatingRow = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium">{label}</span>
      <span className="font-mono text-xs text-primary">{value}/5</span>
    </div>
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <motion.button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="p-1"
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              n <= value
                ? "text-primary fill-primary"
                : "text-muted-foreground/30"
            }`}
          />
        </motion.button>
      ))}
    </div>
  </div>
);

const RateClientDialog = ({
  reviewId,
  clientId,
  clientName,
  alreadyRated = false,
  onRated,
}: RateClientDialogProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [respect, setRespect] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [vibes, setVibes] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = respect > 0 && communication > 0 && vibes > 0;

  const handleSubmit = useCallback(async () => {
    if (!user || !canSubmit) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("client_ratings").insert({
        review_id: reviewId,
        rater_id: user.id,
        client_id: clientId,
        respect_rating: respect,
        communication_rating: communication,
        vibes_rating: vibes,
      });
      if (error) throw error;
      toast({ title: "Client rated", description: "Your private rating has been recorded." });
      setOpen(false);
      onRated?.();
    } catch (err: any) {
      if (err?.code === "23505") {
        toast({ title: "Already rated", description: "You've already rated this client.", variant: "destructive" });
      } else {
        toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
      }
    }
    setSubmitting(false);
  }, [user, reviewId, clientId, respect, communication, vibes, canSubmit, toast, onRated]);

  if (!user || alreadyRated) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.button
          className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Shield className="w-3 h-3" />
          Rate Client
        </motion.button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[380px] rounded-none border-border bg-card">
        <DialogHeader>
          <DialogTitle className="font-display font-extrabold text-lg">
            Rate <span className="text-primary">{clientName}</span>
          </DialogTitle>
          <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
            Visible as a badge on their profile
          </p>
        </DialogHeader>
        <div className="space-y-5 mt-2">
          <RatingRow label="Respect" value={respect} onChange={setRespect} />
          <RatingRow label="Communication" value={communication} onChange={setCommunication} />
          <RatingRow label="Vibes" value={vibes} onChange={setVibes} />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className="w-full h-11 mt-4 rounded-none font-display font-bold uppercase tracking-wider text-xs"
        >
          {submitting ? "Submitting…" : "Submit Rating"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RateClientDialog;
