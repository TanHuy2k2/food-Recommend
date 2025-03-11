
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/animations";
import { type Recipe } from "@/hooks/useRecipes";
import AnimatedContainer from "./AnimatedContainer";

interface FoodCardProps {
  recipe: Recipe;
  onClick: () => void;
  index: number;
}

const FoodCard: React.FC<FoodCardProps> = ({ recipe, onClick, index }) => {
  return (
    <AnimatedContainer
      delay={index * 100}
      animation="scale"
      className="h-full"
    >
      <Card
        className={cn(
          "group h-full overflow-hidden rounded-2xl border transition-all duration-300",
          "hover:shadow-lg hover:-translate-y-1 cursor-pointer"
        )}
        onClick={onClick}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.name}
            className={cn(
              "h-full w-full object-cover transition-transform duration-500",
              "group-hover:scale-105"
            )}
            loading="lazy"
          />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent",
            "opacity-70 group-hover:opacity-80 transition-opacity"
          )} />
          
          <div className="absolute bottom-0 left-0 w-full p-4 text-white">
            <h3 className="font-medium text-lg line-clamp-1">{recipe.name}</h3>
            <p className="text-sm text-white/80 line-clamp-2 mt-1">{recipe.description}</p>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex gap-1 flex-wrap mb-3">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{recipe.prepTime + recipe.cookTime} min</span>
            <span>{recipe.calories} cal</span>
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </Card>
    </AnimatedContainer>
  );
};

export default FoodCard;
