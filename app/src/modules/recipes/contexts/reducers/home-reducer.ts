import { RecipeTypes } from '../../services/get-recipe-types';
import { Recipes } from '../../services/get-recipes';
import { SavedRecipe } from '../../services/get-saved-recipe';

export type RecipesActions =
	| {
			type: 'SET_RECIPE_TYPES';
			payload: RecipeTypes;
	  }
	| {
			type: 'SET_RECIPES';
			payload: Recipes;
	  }
	| {
			type: 'SET_SAVED_RECIPES';
			payload: SavedRecipe[];
	  }
	| {
			type: 'HANDLE_SAVE_RECIPES';
			payload: SavedRecipe;
	  };

export interface RecipesState {
	recipeTypes: RecipeTypes['recipe_types']['recipe_type'] | null;
	savedRecipes: SavedRecipe[];
	recipes: Recipes['recipes'] | null;
}

export const initialRecipesState: RecipesState = {
	recipeTypes: null,
	savedRecipes: [],
	recipes: null,
};

export function RecipesReducer(state: RecipesState, action: RecipesActions): RecipesState {
	switch (action.type) {
		case 'SET_RECIPE_TYPES': {
			return {
				...state,
				recipeTypes: action.payload['recipe_types']['recipe_type'],
			};
		}

		case 'SET_RECIPES': {
			return {
				...state,
				recipes: action.payload['recipes'],
			};
		}

		case 'SET_SAVED_RECIPES': {
			return {
				...state,
				savedRecipes: action.payload,
			};
		}

		case 'HANDLE_SAVE_RECIPES': {
			const recipeIndex = state.savedRecipes.findIndex(item => item.recipeId === action.payload.recipeId);

			if (recipeIndex === -1) {
				return {
					...state,
					savedRecipes: [...state.savedRecipes, action.payload],
				};
			}

			return {
				...state,
				savedRecipes: state.savedRecipes.filter(item => item.recipeId !== action.payload.recipeId),
			};
		}

		default:
			return state;
	}
}
