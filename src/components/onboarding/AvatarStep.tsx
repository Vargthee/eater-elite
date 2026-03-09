import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AvatarStepProps {
  avatarUrl: string;
  avatarFile: File | null;
  onChange: (url: string, file: File | null) => void;
  onNext: () => void;
  onBack: () => void;
}

const AvatarStep = ({ avatarUrl, avatarFile, onChange, onNext, onBack }: AvatarStepProps) => {
  const { toast } = useToast();
  const [urlInput, setUrlInput] = useState(avatarUrl);
  const [previewUrl, setPreviewUrl] = useState(avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setUrlInput("");
    onChange("", file);
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) return;

    // Basic URL validation
    try {
      new URL(urlInput);
      setPreviewUrl(urlInput);
      onChange(urlInput, null);
      toast({
        title: "Avatar URL set",
        description: "Your avatar will be loaded from this URL",
      });
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid image URL",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    setPreviewUrl("");
    setUrlInput("");
    onChange("", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Step 4 of 5
        </p>
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl">
          Add Your Avatar
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Upload a photo or provide a URL. This step is optional — you can skip it.
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Preview */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="w-32 h-32 border-2 border-border overflow-hidden bg-muted flex items-center justify-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                  onError={() => {
                    toast({
                      title: "Failed to load image",
                      description: "Please check the URL or upload a different image",
                      variant: "destructive",
                    });
                    handleClear();
                  }}
                />
              ) : (
                <User className="w-16 h-16 text-muted-foreground" />
              )}
            </div>
            {previewUrl && (
              <button
                onClick={handleClear}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>

        {/* Upload Options */}
        <div className="space-y-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
              Upload from device
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="avatar-upload"
            />
            <label htmlFor="avatar-upload">
              <div className="p-6 border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer text-center">
                <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Max 5MB • JPG, PNG, WEBP
                </p>
              </div>
            </label>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
              Use image URL
            </p>
            <div className="flex gap-2">
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="text-sm"
              />
              <Button
                onClick={handleUrlSubmit}
                variant="outline"
                disabled={!urlInput.trim()}
              >
                Set
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="px-6"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          size="lg"
          className="px-8"
        >
          {previewUrl ? "Continue" : "Skip for Now"}
        </Button>
      </div>
    </div>
  );
};

export default AvatarStep;
