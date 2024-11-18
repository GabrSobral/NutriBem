import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createContext, Dispatch, ReactNode, useEffect, useReducer } from 'react';

import { useAuth } from '@/contexts/AuthContext/hook';
import { getRecipeTypesApi, RecipeTypes } from '../services/get-recipe-types';
import { initialRecipesState, RecipesActions, RecipesReducer, RecipesState } from './reducers/home-reducer';
import { getRecipes } from '../services/get-recipes';

interface RecipesContextProps {
	recipesState: RecipesState;
	recipesDispatch: Dispatch<RecipesActions>;
}

export const RecipesContext = createContext({} as RecipesContextProps);

interface RecipesProviderProps {
	children: ReactNode;
}

export function RecipesProvider({ children }: RecipesProviderProps) {
	const { fatSecretToken, accessToken } = useAuth();
	const [recipesState, recipesDispatch] = useReducer(RecipesReducer, initialRecipesState);

	const { data: recipeTypes } = useQuery({
		queryKey: ['getRecipeTypes'],
		enabled: !!fatSecretToken?.access_token,
		placeholderData: keepPreviousData,
		queryFn: async () => {
			try {
				return await getRecipeTypesApi({ accessToken: fatSecretToken?.access_token || '' });
			} catch (error) {
				console.log(error);
			}
		},
	});

	const { data: recipes } = useQuery({
		queryKey: ['getRecipes'],
		enabled: !!fatSecretToken?.access_token,
		placeholderData: keepPreviousData,
		queryFn: async () => {
			try {
				return await getRecipes({ search: 'rice' }, { accessToken: fatSecretToken?.access_token || '' });
			} catch (error) {
				console.log(error);
			}
		},
	});

	useEffect(() => {
		if (recipeTypes) {
			recipesDispatch({ type: 'SET_RECIPE_TYPES', payload: recipeTypes || [] });
		}
	}, [recipeTypes]);

	useEffect(() => {
		if (recipes) {
			recipesDispatch({ type: 'SET_RECIPES', payload: recipes || [] });
		}
	}, [recipes]);

	return (
		<RecipesContext.Provider
			value={{
				recipesState,
				recipesDispatch,
			}}
		>
			{children}
		</RecipesContext.Provider>
	);
}
