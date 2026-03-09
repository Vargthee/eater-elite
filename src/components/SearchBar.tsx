import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
  };

  return (
    <motion.form
      onSubmit={(e) => e.preventDefault()}
      className={`w-full max-w-2xl border transition-all duration-400 ${
        focused ? "border-primary/40 shadow-[0_0_0_1px_hsl(165_75%_42%/0.15),0_0_25px_hsl(165_75%_42%/0.12),inset_0_1px_0_hsl(165_75%_85%/0.08)]" : "border-border"
      }`}
      animate={focused ? { scale: 1.01 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div className="flex items-center gap-3 px-4 py-3.5">
        <motion.div 
          animate={focused ? { rotate: 15, scale: 1.08 } : { rotate: 0, scale: 1 }} 
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Search className={`w-4 h-4 shrink-0 transition-colors duration-300 ${focused ? 'text-primary' : 'text-muted-foreground'}`} />
        </motion.div>
        <input
          type="text"
          placeholder="Search eater name, city, or specialty..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm font-body tracking-[-0.01em]"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              type="button"
              onClick={handleClear}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 shrink-0"
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.88 }}
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
        <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          All Naija
        </span>
      </div>
    </motion.form>
  );
};

export default SearchBar;
