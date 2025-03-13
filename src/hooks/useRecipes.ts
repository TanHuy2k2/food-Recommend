import { useState } from "react";
import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

// Types for our recipe data
export interface Ingredient {
  name: string;
  amount: string;
  unit?: string;
}

export interface RecipeStep {
  step: number;
  description: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  video: string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: number;
  calories: number;
  tags: string[];
}

export type RecipeView = "image" | "ingredients" | "recipe" | "video";

async function getRecipeByName(recipeName: string, num_results = 1): Promise<Recipe[]> {
  try {
    const endpoint = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${recipeName}&number=${num_results}&apiKey=${API_KEY}`;

    const sampleRecipes: Recipe[] = [];

    const response = await axios.get(endpoint);

    const recipes = response.data;

    recipes.map(async (recipe: any) => {
      if (recipe) {
        const recipe_id = recipe["id"]
        const title = recipe["title"]
        const image = recipe["image"]
        
        const details_url = `https://api.spoonacular.com/recipes/${recipe_id}/information?apiKey=${API_KEY}`
        
        const response_detail = await axios.get(details_url);

        const fetchedRecipe = {
          id: String(recipe_id),
          name: title,
          description: response_detail.data["summary"],
          image: image,
          ingredients: response_detail.data["extendedIngredients"].map((ingredient: any) => ({
            name: ingredient["name"],
            amount: ingredient["amount"].toString(),
            unit: ingredient["unit"] || '',
          })),
          steps: response_detail.data["analyzedInstructions"][0].steps.map((step: any) => ({
            step: step["number"],
            description: step["step"],
          })),
          video: '',
          prepTime: 0,
          cookTime: 0,
          totalTime:  parseInt(response_detail.data["summary"].match(/(\d+)\s*minutes/)[1]),
          servings: response_detail.data["servings"],
          calories:  parseInt(response_detail.data["summary"].match(/(\d+)\s*calories/)[1]),
          tags: response_detail.data["dishTypes"],
        };
        sampleRecipes.push(fetchedRecipe);
        
      };
    });
    return sampleRecipes;
  } catch (error) {
    console.error('Error fetching recipe:', error);
  }
}

export const useRecipes = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [currentView, setCurrentView] = useState<RecipeView>("image");
  // Mock data
  const searchRecipes = async (query: string) => {
    setLoading(true);
    
    try {
      const lowercaseQuery = query.toLowerCase();
      const recipes = await getRecipeByName(lowercaseQuery);

      setResults(recipes);
    }catch (error) {
      console.error("Error searching recipes:", error);
    }finally {  
      setLoading(false);
    }
  };

  const selectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView("image");
  };

  const clearSelection = () => {
    setSelectedRecipe(null);
  };

  const changeView = (view: RecipeView) => {
    setCurrentView(view);
  };

  return {
    loading,
    results,
    selectedRecipe,
    currentView,
    searchRecipes,
    selectRecipe,
    clearSelection,
    changeView
  };
};

export default useRecipes;
