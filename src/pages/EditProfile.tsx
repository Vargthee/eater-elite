import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const cities = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Benin City", "Enugu", "Kano", "Kaduna"];

const EditProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profileId, setProfileId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("Lagos");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate("/auth"); return; }
    const fetchProfile = async () => {
      const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle();
      if (data) {
        setProfileId(data.id);
        setDisplayName(data.display_name);
        setBio(data.bio ?? "");
        setCity(data.city ?? "Lagos");
        setAvatarUrl(data.avatar_url ?? "");
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user, authLoading, navigate]);

  const handleSave = useCallback(async () => {
    if (!user || !profileId) return;
    if (!displayName.trim()) {
      toast({ title: "Display name is required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName.trim(), bio: bio.trim() || null, city: city || null, avatar_url: avatarUrl.trim() || null })
      .eq("user_id", user.id);
    if (error) {
      toast({ title: "Error saving", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated! 🎉" });
      navigate(`/profile/${profileId}`);
    }
    setSaving(false);
  }, [user, profileId, displayName, bio, city, avatarUrl, toast, navigate]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background noise">
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-14 px-4">
          <Link to="/" className="font-display font-extrabold text-lg tracking-tight">
            RATE<span className="text-primary">EATERS</span>
          </Link>
          <Link
            to={profileId ? `/profile/${profileId}` : "/"}
            className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Link>
        </div>
      </nav>

      <div className="container max-w-lg mx-auto pt-20 sm:pt-24 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-border p-5 sm:p-8"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">Settings</p>
          <h1 className="font-display font-extrabold text-xl sm:text-2xl mb-6">Edit Profile</h1>

          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-secondary overflow-hidden mb-3">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-display font-bold text-muted-foreground">
                  {displayName.charAt(0) || "?"}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <Camera className="w-3.5 h-3.5" />
              Paste image URL below
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="avatarUrl" className="text-xs font-medium">Avatar URL</Label>
              <Input id="avatarUrl" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://example.com/photo.jpg" className="mt-1.5 rounded-none border-border bg-transparent focus:border-primary/40" />
            </div>
            <div>
              <Label htmlFor="displayName" className="text-xs font-medium">Display Name *</Label>
              <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your display name" maxLength={30} className="mt-1.5 rounded-none border-border bg-transparent focus:border-primary/40" />
            </div>
            <div>
              <Label htmlFor="bio" className="text-xs font-medium">Bio</Label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell people about yourself..." maxLength={200} rows={3} className="mt-1.5 rounded-none border-border bg-transparent focus:border-primary/40" />
              <p className="font-mono text-[10px] text-muted-foreground mt-1 text-right">{bio.length}/200</p>
            </div>
            <div>
              <Label htmlFor="city" className="text-xs font-medium">City</Label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1.5 flex h-10 w-full border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-primary/40 transition-colors"
              >
                {cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full h-11 font-display font-bold text-xs uppercase tracking-wider mt-2 rounded-none"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditProfile;
