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
      className={`w-full max-w-2xl border transition-all duration-300 ${
        focused ? "border-primary/40 glow-primary" : "border-border"
      }`}
      animate={focused ? { scale: 1.01 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <motion.div animate={focused ? { rotate: 15 } : { rotate: 0 }} transition={{ duration: 0.3 }}>
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        </motion.div>
        <input
          type="text"
          placeholder="Search eater name, city, or specialty..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm font-body"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              type="button"
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
        <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          All Naija
        </span>
      </div>
    </motion.form>
  );
};

export default SearchBar;
