import { RecipeTypes } from '../../services/get-recipe-types';
import { Recipes } from '../../services/get-recipes';

export type RecipesActions =
	| {
			type: 'SET_RECIPE_TYPES';
			payload: RecipeTypes;
	  }
	| {
			type: 'SET_RECIPES';
			payload: Recipes;
	  };

export interface RecipesState {
	recipeTypes: RecipeTypes['recipe_types']['recipe_type'] | null;
	recipes: Recipes['recipes'] | null;
}

export const initialRecipesState: RecipesState = {
	recipeTypes: null,
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

		default:
			return state;
	}
}
