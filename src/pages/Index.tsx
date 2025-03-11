
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Hero from "@/components/Hero";
import FoodCard from "@/components/FoodCard";
import RecipeDetail from "@/components/RecipeDetail";
import useRecipes from "@/hooks/useRecipes";
import AnimatedContainer from "@/components/AnimatedContainer";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const {
    loading,
    results,
    selectedRecipe,
    currentView,
    searchRecipes,
    selectRecipe,
    clearSelection,
    changeView
  } = useRecipes();

  const [hasSearched, setHasSearched] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearch = (query: string) => {
    searchRecipes(query);
    setHasSearched(true);
  };

  const handleSelectRecipe = (recipe: any) => {
    selectRecipe(recipe);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Ensure we display a limited number of recipes (3-5) for better visual appeal
  const limitedResults = results.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section with search */}
      <Hero onSearch={handleSearch} />
      
      {/* Results section */}
      {hasSearched && (
        <section className="px-4 pb-20">
          <div className="container mx-auto">
            <AnimatedContainer className="mb-8 text-center">
              <h2 className="text-2xl font-semibold">
                {loading
                  ? "Searching recipes..."
                  : results.length
                  ? `Found ${results.length} recipes`
                  : "No recipes found"}
              </h2>
              <p className="text-muted-foreground">
                {loading
                  ? "Just a moment while we find the best recipes for you"
                  : results.length
                  ? "Click on any recipe to see details"
                  : "Try searching for different ingredients"}
              </p>
            </AnimatedContainer>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-2xl bg-muted animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {limitedResults.map((recipe, index) => (
                  <FoodCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => handleSelectRecipe(recipe)}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* Recipe detail dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="p-0 max-w-3xl w-[95vw] rounded-2xl border bg-background shadow-lg"
          hideCloseButton={true} // Hide the default close button since we have our own back button
        >
          {selectedRecipe && (
            <RecipeDetail
              recipe={selectedRecipe}
              currentView={currentView}
              onChangeView={changeView}
              onClose={handleCloseDialog}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Footer */}
      {hasSearched && (
        <footer className="border-t py-6 px-4">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Recipe Finder. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Index;
