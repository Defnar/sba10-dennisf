interface Categories {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface CategoryData {
  categories: Categories[];
}

export interface Recipe {
  meals: Meal[];
}

type Region = {
  strArea: string;
};

export interface RegionData {
  meals: Region[];
}


export interface IngredientMeasure {
  ingredients: string;
  measures: string | null;
}

export type ListType = "region" | "category" | "letter";

export type ResultListProp = {
  listType: ListType;
  lettter?: string
};

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string | null;
  strInstructions: string | null;
  strMealThumb: string | null;
  strTags: string | null;
  strYoutube: string | null;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}

export interface SearchBarProps {
  currentSearch: (input: string) => void;
  debounceTimer?: number;
  isDynamic: boolean;
  displaySearchButton: boolean;
}

export interface RecipeProp {
  isRandom?: boolean;
}

export type ThemeContextType = "light" | "dark"

export interface ThemeContextProvider{
  theme: ThemeContextType;
  toggleTheme: (theme: ThemeContextType) => void;
}