import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import WelcomeStep from "@/components/onboarding/WelcomeStep";
import DisplayNameStep from "@/components/onboarding/DisplayNameStep";
import BioStep from "@/components/onboarding/BioStep";
import CityStep from "@/components/onboarding/CityStep";
import AvatarStep from "@/components/onboarding/AvatarStep";
import PreviewStep from "@/components/onboarding/PreviewStep";

export interface OnboardingData {
  displayName: string;
  bio: string;
  city: string;
  avatarUrl: string;
  avatarFile: File | null;
}

const TOTAL_STEPS = 6;

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    displayName: "",
    bio: "",
    city: "Lagos",
    avatarUrl: "",
    avatarFile: null,
  });

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a profile",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsSubmitting(true);
    try {
      let finalAvatarUrl = data.avatarUrl;

      // Upload avatar if a file was selected
      if (data.avatarFile) {
        const fileExt = data.avatarFile.name.split(".").pop();
        const filePath = `${user.id}/avatar.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, data.avatarFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        finalAvatarUrl = urlData.publicUrl;
      }

      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (existingProfile) {
        // Update existing profile
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            display_name: data.displayName,
            bio: data.bio,
            city: data.city,
            avatar_url: finalAvatarUrl || null,
            is_anonymous: false,
          })
          .eq("id", existingProfile.id);

        if (updateError) throw updateError;

        toast({
          title: "Profile Updated! 🎉",
          description: "Your profile has been successfully updated.",
        });

        navigate(`/profile/${existingProfile.id}`);
      } else {
        // Create new profile
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert({
            user_id: user.id,
            display_name: data.displayName,
            bio: data.bio,
            city: data.city,
            avatar_url: finalAvatarUrl || null,
            is_anonymous: false,
          })
          .select()
          .single();

        if (insertError) throw insertError;

        toast({
          title: "Profile Created! 🎉",
          description: "Welcome to RateEaters. Your profile is now live!",
        });

        navigate(`/profile/${newProfile.id}`);
      }
    } catch (error: any) {
      console.error("Profile creation error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={handleNext} />;
      case 1:
        return (
          <DisplayNameStep
            value={data.displayName}
            onChange={(displayName) => setData({ ...data, displayName })}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <BioStep
            value={data.bio}
            onChange={(bio) => setData({ ...data, bio })}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <CityStep
            value={data.city}
            onChange={(city) => setData({ ...data, city })}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <AvatarStep
            avatarUrl={data.avatarUrl}
            avatarFile={data.avatarFile}
            onChange={(avatarUrl, avatarFile) =>
              setData({ ...data, avatarUrl, avatarFile })
            }
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <PreviewStep
            data={data}
            onComplete={handleComplete}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Ambient gradient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-14 px-4">
          <Link to="/" className="font-display font-extrabold text-lg tracking-tight">
            RATE<span className="text-primary">EATERS</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Home
          </Link>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="fixed top-14 left-0 right-0 h-[2px] bg-border z-40">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-accent to-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Step Indicators */}
      <div className="relative z-10 container max-w-3xl mx-auto px-4 pt-10 pb-6">
        <div className="flex items-center justify-between">
          {[...Array(TOTAL_STEPS)].map((_, i) => (
            <div key={i} className="flex items-center">
              <motion.div
                className={`relative w-9 h-9 border-2 flex items-center justify-center text-xs font-mono ${
                  i < currentStep
                    ? "bg-primary border-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                    : i === currentStep
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-muted-foreground bg-background"
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 300 }}
                whileHover={i <= currentStep ? { scale: 1.1 } : {}}
              >
                {i < currentStep ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </motion.div>
                ) : (
                  i + 1
                )}
                {i === currentStep && (
                  <motion.div
                    className="absolute inset-0 border border-primary"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
              {i < TOTAL_STEPS - 1 && (
                <motion.div
                  className={`w-10 sm:w-16 h-[2px] mx-1 ${
                    i < currentStep ? "bg-primary" : "bg-border"
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  style={{ transformOrigin: "left" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -40, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
