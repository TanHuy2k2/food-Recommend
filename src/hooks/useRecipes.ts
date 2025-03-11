
import { useState } from "react";

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
  servings: number;
  calories: number;
  tags: string[];
}

export type RecipeView = "image" | "ingredients" | "recipe" | "video";

// Mock data
const sampleRecipes: Recipe[] = [
  {
    id: "1",
    name: "Avocado Toast with Poached Egg",
    description: "A simple yet delicious breakfast with creamy avocado and perfectly poached egg on toasted artisan bread.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2080&auto=format&fit=crop",
    ingredients: [
      { name: "Artisan bread", amount: "2", unit: "slices" },
      { name: "Ripe avocado", amount: "1" },
      { name: "Eggs", amount: "2" },
      { name: "Cherry tomatoes", amount: "5" },
      { name: "Red pepper flakes", amount: "1/4", unit: "tsp" },
      { name: "Salt", amount: "1/4", unit: "tsp" },
      { name: "Black pepper", amount: "1/4", unit: "tsp" },
      { name: "Fresh lemon juice", amount: "1", unit: "tsp" },
      { name: "Extra virgin olive oil", amount: "1", unit: "tsp" }
    ],
    steps: [
      { step: 1, description: "Toast the bread slices until golden brown." },
      { step: 2, description: "Halve the avocado, remove the pit, and scoop the flesh into a bowl." },
      { step: 3, description: "Mash the avocado with a fork, add lemon juice, salt, and pepper." },
      { step: 4, description: "Bring a pot of water to a gentle simmer, add a splash of vinegar." },
      { step: 5, description: "Crack each egg into a small cup, then gently slide into the simmering water." },
      { step: 6, description: "Poach eggs for 3-4 minutes until whites are set but yolks are still runny." },
      { step: 7, description: "Spread mashed avocado on toasted bread." },
      { step: 8, description: "Top with poached eggs, halved cherry tomatoes, and red pepper flakes." },
      { step: 9, description: "Drizzle with olive oil and serve immediately." }
    ],
    video: "https://example.com/avocado-toast-video",
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    calories: 320,
    tags: ["breakfast", "healthy", "vegetarian", "quick"]
  },
  {
    id: "2",
    name: "Maple Glazed Salmon",
    description: "Tender salmon fillets glazed with a sweet and savory maple sauce, perfect for a quick weeknight dinner.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop",
    ingredients: [
      { name: "Salmon fillets", amount: "4", unit: "6 oz each" },
      { name: "Maple syrup", amount: "1/4", unit: "cup" },
      { name: "Soy sauce", amount: "2", unit: "tbsp" },
      { name: "Garlic", amount: "2", unit: "cloves, minced" },
      { name: "Fresh ginger", amount: "1", unit: "tbsp, grated" },
      { name: "Lemon", amount: "1", unit: "juiced" },
      { name: "Olive oil", amount: "1", unit: "tbsp" },
      { name: "Salt", amount: "1/2", unit: "tsp" },
      { name: "Black pepper", amount: "1/4", unit: "tsp" }
    ],
    steps: [
      { step: 1, description: "Preheat oven to 400°F (200°C)." },
      { step: 2, description: "In a bowl, whisk together maple syrup, soy sauce, garlic, ginger, and lemon juice." },
      { step: 3, description: "Pat salmon fillets dry and place on a lined baking sheet." },
      { step: 4, description: "Season with salt and pepper, then brush with olive oil." },
      { step: 5, description: "Bake for 5 minutes, then remove from oven." },
      { step: 6, description: "Brush generously with maple glaze and return to oven." },
      { step: 7, description: "Bake for another 7-10 minutes until salmon is cooked through but still moist." },
      { step: 8, description: "Brush with remaining glaze before serving." }
    ],
    video: "https://example.com/maple-salmon-video",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    calories: 380,
    tags: ["dinner", "seafood", "quick", "healthy"]
  },
  {
    id: "3",
    name: "Creamy Mushroom Risotto",
    description: "A rich and creamy Italian risotto with earthy mushrooms and freshly grated Parmesan cheese.",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop",
    ingredients: [
      { name: "Arborio rice", amount: "1 1/2", unit: "cups" },
      { name: "Mixed mushrooms", amount: "8", unit: "oz, sliced" },
      { name: "Onion", amount: "1", unit: "medium, finely chopped" },
      { name: "Garlic", amount: "2", unit: "cloves, minced" },
      { name: "White wine", amount: "1/2", unit: "cup" },
      { name: "Vegetable broth", amount: "4", unit: "cups, warm" },
      { name: "Parmesan cheese", amount: "1/2", unit: "cup, grated" },
      { name: "Butter", amount: "2", unit: "tbsp" },
      { name: "Olive oil", amount: "2", unit: "tbsp" },
      { name: "Fresh thyme", amount: "1", unit: "tsp, chopped" },
      { name: "Salt", amount: "to taste" },
      { name: "Black pepper", amount: "to taste" }
    ],
    steps: [
      { step: 1, description: "In a large pan, heat 1 tbsp olive oil and sauté mushrooms until golden. Set aside." },
      { step: 2, description: "In the same pan, heat remaining oil and butter. Add onion and cook until translucent." },
      { step: 3, description: "Add garlic and cook for another minute until fragrant." },
      { step: 4, description: "Add Arborio rice and stir to coat with oil and butter. Toast for 1-2 minutes." },
      { step: 5, description: "Pour in white wine and stir until absorbed." },
      { step: 6, description: "Add warm broth one ladle at a time, stirring frequently. Wait until each addition is absorbed before adding more." },
      { step: 7, description: "Continue this process for about 18-20 minutes until rice is creamy and al dente." },
      { step: 8, description: "Stir in the sautéed mushrooms, Parmesan cheese, and thyme." },
      { step: 9, description: "Season with salt and pepper. Let rest for 2 minutes before serving." }
    ],
    video: "https://example.com/mushroom-risotto-video",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    calories: 420,
    tags: ["dinner", "italian", "vegetarian"]
  }
];

export const useRecipes = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [currentView, setCurrentView] = useState<RecipeView>("image");

  const searchRecipes = async (query: string) => {
    setLoading(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filter recipes based on query (case insensitive)
      const lowercaseQuery = query.toLowerCase();
      const filteredRecipes = sampleRecipes.filter(recipe => {
        // Search in name and description
        if (
          recipe.name.toLowerCase().includes(lowercaseQuery) ||
          recipe.description.toLowerCase().includes(lowercaseQuery)
        ) {
          return true;
        }
        
        // Search in ingredients
        const hasIngredient = recipe.ingredients.some(ingredient => 
          ingredient.name.toLowerCase().includes(lowercaseQuery)
        );
        
        if (hasIngredient) return true;
        
        // Search in tags
        const hasTag = recipe.tags.some(tag => 
          tag.toLowerCase().includes(lowercaseQuery)
        );
        
        return hasTag;
      });
      
      setResults(filteredRecipes);
    } catch (error) {
      console.error("Error searching recipes:", error);
    } finally {
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
