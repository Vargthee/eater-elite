import { Search, MapPin } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`glass w-full max-w-2xl mx-auto rounded-2xl transition-all duration-300 ${
        focused ? "glow-primary" : ""
      }`}
      animate={{ scale: focused ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="flex items-center gap-3 px-5 py-4">
        <Search className="w-5 h-5 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Search by name, location, or specialty..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base font-body"
        />
        <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground text-sm">
          <MapPin className="w-4 h-4" />
          <span>All Cities</span>
        </div>
      </div>
    </motion.form>
  );
};

export default SearchBar;
