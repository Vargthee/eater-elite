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
    <div className="space-y-10">
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary mb-3">
            <span className="inline-block w-6 h-[1px] bg-primary/40 mr-2 align-middle"></span>
            Step 4 of 5
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl leading-[0.9] tracking-[-0.03em] mb-4">
            Add Your<br />Avatar
          </h2>
        </div>
        <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed tracking-[-0.01em]">
          Upload a photo or provide a URL. 
          <span className="text-foreground/60"> This step is optional — you can skip it.</span>
        </p>
      </motion.div>

      <motion.div 
        className="max-w-md mx-auto space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Preview */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="relative"
          >
            <div className="w-36 h-36 border-2 border-border overflow-hidden bg-muted/30 flex items-center justify-center relative">
              {previewUrl ? (
                <motion.img
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
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
                <User className="w-20 h-20 text-muted-foreground/50" />
              )}
            </div>
            {previewUrl && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClear}
                className="absolute -top-2 -right-2 w-7 h-7 bg-destructive text-destructive-foreground flex items-center justify-center hover:bg-destructive/90 transition-colors shadow-lg"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Upload Options */}
        <div className="space-y-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
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
              <motion.div 
                className="p-8 border-2 border-dashed border-border hover:border-primary/50 transition-all cursor-pointer text-center bg-muted/10 hover:bg-muted/20"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Upload className="w-7 h-7 mx-auto mb-3 text-muted-foreground" />
                <p className="text-xs text-foreground mb-1 font-display tracking-tight">
                  Click to upload or drag & drop
                </p>
                <p className="text-[11px] font-mono text-muted-foreground">
                  Max 5MB • JPG, PNG, WEBP
                </p>
              </motion.div>
            </label>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[10px] font-mono uppercase tracking-[0.3em]">
              <span className="bg-background px-3 text-muted-foreground">Or</span>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Use image URL
            </p>
            <div className="flex gap-2">
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="text-sm font-mono"
              />
              <Button
                onClick={handleUrlSubmit}
                variant="outline"
                disabled={!urlInput.trim()}
                className="px-4 font-display uppercase text-xs tracking-wider"
              >
                Set
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="flex gap-3 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="px-8 font-display uppercase tracking-[0.12em] text-xs"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          size="lg"
          className="px-10 font-display uppercase tracking-[0.12em] text-xs"
        >
          {previewUrl ? "Continue" : "Skip for Now"}
        </Button>
      </motion.div>
    </div>
  );
};

export default AvatarStep;
