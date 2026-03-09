import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Loader2 } from "lucide-react";
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-border z-50">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Step Indicators */}
      <div className="container max-w-2xl mx-auto px-4 pt-8 pb-4">
        <div className="flex items-center justify-between">
          {[...Array(TOTAL_STEPS)].map((_, i) => (
            <div key={i} className="flex items-center">
              <motion.div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-mono ${
                  i < currentStep
                    ? "bg-primary border-primary text-primary-foreground"
                    : i === currentStep
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground"
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {i < currentStep ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </motion.div>
              {i < TOTAL_STEPS - 1 && (
                <div
                  className={`w-8 sm:w-12 h-[2px] mx-1 ${
                    i < currentStep ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
