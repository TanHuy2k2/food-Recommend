import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Utensils, Image, ListChecks, Video } from "lucide-react";
import { cn } from "@/lib/animations";
import { type Recipe, type RecipeView } from "@/hooks/useRecipes";
import AnimatedContainer from "./AnimatedContainer";

interface RecipeDetailProps {
  recipe: Recipe;
  currentView: RecipeView;
  onChangeView: (view: RecipeView) => void;
  onClose: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipe,
  currentView,
  onChangeView,
  onClose,
}) => {
  const renderContent = () => {
    switch (currentView) {
      case "image":
        return (
          <AnimatedContainer animation="fade" className="space-y-6">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-balance">{recipe.name}</h2>
              <p className="text-muted-foreground">{recipe.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-muted-foreground" />
                  <span>Prep: {recipe.prepTime} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Utensils size={18} className="text-muted-foreground" />
                  <span>Cook: {recipe.cookTime} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Servings: {recipe.servings}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Calories: {recipe.calories} kcal</span>
                </div>
              </div>
            </div>
          </AnimatedContainer>
        );
        
      case "ingredients":
        return (
          <AnimatedContainer animation="fade" className="space-y-6">
            <h2 className="text-2xl font-semibold">Ingredients</h2>
            <Card className="p-4 divide-y">
              {recipe.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="py-3 first:pt-1 last:pb-1 flex justify-between items-center"
                >
                  <span>{ingredient.name}</span>
                  <span className="text-muted-foreground">
                    {ingredient.amount} {ingredient.unit}
                  </span>
                </div>
              ))}
            </Card>
          </AnimatedContainer>
        );
        
      case "recipe":
        return (
          <AnimatedContainer animation="fade" className="space-y-6">
            <h2 className="text-2xl font-semibold">Instructions</h2>
            <div className="space-y-4">
              {recipe.steps.map((step) => (
                <div key={step.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                    {step.step}
                  </div>
                  <div className="flex-1 pt-1">
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedContainer>
        );
        
      case "video":
        return (
          <AnimatedContainer animation="fade" className="space-y-6">
            <h2 className="text-2xl font-semibold">Recipe Video</h2>
            <div className="aspect-video bg-black/10 rounded-xl flex items-center justify-center">
              <p className="text-muted-foreground">
                Video preview would be shown here in a real application.
              </p>
            </div>
          </AnimatedContainer>
        );
    }
  };

  return (
    <div className="bg-background rounded-2xl shadow-xl border overflow-hidden max-w-3xl w-full mx-auto">
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
          <ArrowLeft size={20} />
          <span className="sr-only">Back to results</span>
        </Button>
        
        <div className="flex-1 flex items-center justify-center gap-2 px-4">
          <Button
            variant={currentView === "image" ? "default" : "ghost"}
            size="sm"
            onClick={() => onChangeView("image")}
            className="gap-2"
          >
            <Image size={16} />
            <span className="sr-only md:not-sr-only">Overview</span>
          </Button>
          <Button
            variant={currentView === "ingredients" ? "default" : "ghost"}
            size="sm"
            onClick={() => onChangeView("ingredients")}
            className="gap-2"
          >
            <ListChecks size={16} />
            <span className="sr-only md:not-sr-only">Ingredients</span>
          </Button>
          <Button
            variant={currentView === "recipe" ? "default" : "ghost"}
            size="sm"
            onClick={() => onChangeView("recipe")}
            className="gap-2"
          >
            <Utensils size={16} />
            <span className="sr-only md:not-sr-only">Recipe</span>
          </Button>
          <Button
            variant={currentView === "video" ? "default" : "ghost"}
            size="sm"
            onClick={() => onChangeView("video")}
            className="gap-2"
          >
            <Video size={16} />
            <span className="sr-only md:not-sr-only">Video</span>
          </Button>
        </div>
        
        <div className="w-10 h-10"></div>
      </div>
      
      <div className="p-6 max-h-[70vh] overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default RecipeDetail;
