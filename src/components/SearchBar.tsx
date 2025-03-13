
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Search, X } from "lucide-react";
import { cn } from "@/lib/animations";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  className,
  placeholder = "Search for ingredients or recipes..."
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport
  } = useSpeechRecognition();

  // Effect to update query when speech recognition text changes
  useEffect(() => {
    if (text) {
      setQuery(text);
    }
  }, [text]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full max-w-2xl mx-auto flex items-center gap-2",
        className
      )}
    >
      <div className="relative w-full">
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "pl-12 pr-10 h-14 text-base border-2 rounded-full transition-all",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isListening && "border-primary ring-2 ring-primary ring-offset-2",
            "backdrop-blur-sm bg-white/70 dark:bg-black/30"
          )}
        />
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={20}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={handleClear}
          >
            <X size={18} />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      {hasRecognitionSupport && (
        <Button
          type="button"
          onClick={toggleListening}
          variant={isListening ? "default" : "secondary"}
          size="icon"
          className={cn(
            "h-14 w-14 rounded-full transition-all shrink-0",
            isListening && "bg-primary text-primary-foreground animate-pulse"
          )}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          <span className="sr-only">
            {isListening ? "Stop listening" : "Start voice search"}
          </span>
        </Button>
      )}

      <Button
        type="submit"
        variant="default"
        className="h-14 px-6 rounded-full transition-all shrink-0"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
