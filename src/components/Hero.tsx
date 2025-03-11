
import React from "react";
import { Separator } from "@/components/ui/separator";
import SearchBar from "./SearchBar";
import { cn } from "@/lib/animations";
import AnimatedContainer from "./AnimatedContainer";

interface HeroProps {
  onSearch: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  return (
    <section className="py-14 md:py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <AnimatedContainer animation="slide" className="space-y-6 text-center">
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary inline-block">
            Discover Recipes
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
            Find the perfect recipe
            <br className="hidden sm:block" /> for your ingredients
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl mx-auto max-w-2xl text-balance">
            Search for any ingredient you have and get delicious recipe ideas 
            with step-by-step instructions.
          </p>
        </AnimatedContainer>
        
        <AnimatedContainer 
          animation="slide" 
          delay={100} 
          className="mt-10"
        >
          <SearchBar onSearch={onSearch} />
        </AnimatedContainer>
        
        <AnimatedContainer 
          animation="slide" 
          delay={200} 
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Popular searches:</span>
            {["chicken", "pasta", "vegetarian", "quick dinner", "breakfast"].map((term) => (
              <button
                key={term}
                className="underline-offset-4 hover:underline hover:text-foreground transition-colors"
                onClick={() => onSearch(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
};

export default Hero;
