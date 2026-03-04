
-- Random display name generator
CREATE OR REPLACE FUNCTION public.generate_random_display_name()
RETURNS TEXT
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT (
    ARRAY['Spicy', 'Sweet', 'Bold', 'Chill', 'Fire', 'Smooth', 'Sharp', 'Vibe', 'Fresh', 'Golden', 'Shadow', 'Swift', 'Mystic', 'Silent', 'Loud']
  )[(floor(random() * 15) + 1)::int] || '_' || (
    ARRAY['Eater', 'Chopper', 'Taster', 'Muncher', 'Champ', 'Boss', 'Legend', 'Star', 'King', 'Queen', 'Chief', 'Captain', 'Guru', 'Pro', 'Master']
  )[(floor(random() * 15) + 1)::int] || '_' || floor(random() * 9999)::int::text
$$;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT public.generate_random_display_name(),
  avatar_url TEXT,
  bio TEXT DEFAULT '',
  city TEXT DEFAULT 'Lagos',
  is_anonymous BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view profiles"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  technique_rating SMALLINT NOT NULL CHECK (technique_rating BETWEEN 1 AND 5),
  stamina_rating SMALLINT NOT NULL CHECK (stamina_rating BETWEEN 1 AND 5),
  vibe_rating SMALLINT NOT NULL CHECK (vibe_rating BETWEEN 1 AND 5),
  comment TEXT,
  is_anonymous BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews"
  ON public.reviews FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert reviews"
  ON public.reviews FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can delete own reviews"
  ON public.reviews FOR DELETE USING (auth.uid() = reviewer_id);

-- Vouches table
CREATE TABLE public.vouches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  voucher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(voucher_id, profile_id)
);

ALTER TABLE public.vouches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view vouches"
  ON public.vouches FOR SELECT USING (true);

CREATE POLICY "Authenticated users can vouch"
  ON public.vouches FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = voucher_id);

CREATE POLICY "Users can remove own vouch"
  ON public.vouches FOR DELETE USING (auth.uid() = voucher_id);

-- Auto-create profile on signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, is_anonymous)
  VALUES (NEW.id, public.generate_random_display_name(), true);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
