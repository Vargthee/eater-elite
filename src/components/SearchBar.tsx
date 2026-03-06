import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      onSearch?.(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`w-full max-w-2xl border transition-all duration-300 ${
        focused ? "border-primary/40 glow-primary" : "border-border"
      }`}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Search eater name, city, or specialty..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm font-body"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          All Naija
        </span>
      </div>
    </form>
  );
};

export default SearchBar;
