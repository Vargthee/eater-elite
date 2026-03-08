
-- Create client_ratings table for reciprocal ratings
CREATE TABLE public.client_ratings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  review_id uuid NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  rater_id uuid NOT NULL,
  client_id uuid NOT NULL,
  respect_rating smallint NOT NULL,
  communication_rating smallint NOT NULL,
  vibes_rating smallint NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (review_id)
);

-- Enable RLS
ALTER TABLE public.client_ratings ENABLE ROW LEVEL SECURITY;

-- Anyone can view client ratings (for badge calculation)
CREATE POLICY "Anyone can view client ratings"
  ON public.client_ratings FOR SELECT
  USING (true);

-- Only the profile owner (rater) who received the review can rate back
CREATE POLICY "Eaters can rate their reviewers"
  ON public.client_ratings FOR INSERT
  WITH CHECK (auth.uid() = rater_id);

-- Raters can delete their own ratings
CREATE POLICY "Raters can delete own ratings"
  ON public.client_ratings FOR DELETE
  USING (auth.uid() = rater_id);
