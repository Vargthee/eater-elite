import { useState } from "react";
import { motion } from "framer-motion";
import { UserCircle, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signIn, signInAnonymously } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === "signup") {
        await signUp(email, password);
        toast({ title: "Account created! 🎉", description: "Welcome to RateEaters, your profile is ready." });
      } else {
        await signIn(email, password);
        toast({ title: "Welcome back! 🔥" });
      }
      navigate("/");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnonymous = async () => {
    setIsLoading(true);
    try {
      await signInAnonymously();
      toast({ title: "You dey inside! 🔥", description: "Browsing anonymously — no wahala." });
      navigate("/");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col noise">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-14 px-4">
          <Link to="/" className="font-display font-extrabold text-lg tracking-tight">
            RATE<span className="text-primary">EATERS</span>
          </Link>
          <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Home
            </Link>
          </motion.div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >

        {/* Card */}
        <div className="border border-border p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">
            {mode === "signin" ? "Welcome back" : "Join the movement"}
          </p>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl mb-1">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            {mode === "signin"
              ? "Sign in to leave reviews and climb the board"
              : "Your identity stays private — always"}
          </p>

          {/* Anonymous */}
          <button
            onClick={handleAnonymous}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 border border-border text-foreground font-display font-bold text-xs uppercase tracking-wider hover:border-primary/30 transition-colors mb-4 disabled:opacity-50"
          >
            <UserCircle className="w-4 h-4" />
            Continue Anonymously
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-10 py-3 bg-transparent border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground font-display font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity glow-primary disabled:opacity-50"
            >
              {mode === "signin" ? "Sign In" : "Create Account"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-5">
            {mode === "signin" ? "No account?" : "Have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-primary font-medium hover:underline underline-offset-2"
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        <p className="text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-6">
          Your identity stays anonymous. Always. 🇳🇬
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
