import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useReducer, useState } from 'react';

import { useAuth } from '@/contexts/AuthContext/hook';
import { getRecipeTypesApi } from '../services/get-recipe-types';
import { initialRecipesState, RecipesActions, RecipesReducer, RecipesState } from './reducers/home-reducer';
import { getRecipes } from '../services/get-recipes';
import { getSavedRecipes } from '../services/get-saved-recipe';

interface RecipesContextProps {
	recipesState: RecipesState;
	recipesDispatch: Dispatch<RecipesActions>;

	searchQuery: string;
	setSearchQuery: Dispatch<SetStateAction<string>>;

	recipeTypesArr: string[];
	setRecipeTypesArr: Dispatch<SetStateAction<string[]>>;
}

export const RecipesContext = createContext({} as RecipesContextProps);

interface RecipesProviderProps {
	children: ReactNode;
}

export function RecipesProvider({ children }: RecipesProviderProps) {
	const { fatSecretToken, accessToken } = useAuth();
	const [searchQuery, setSearchQuery] = useState('');
	const [recipeTypesArr, setRecipeTypesArr] = useState<string[]>([]);

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
		queryKey: ['getRecipes', searchQuery, recipeTypesArr],
		enabled: !!fatSecretToken?.access_token,
		placeholderData: keepPreviousData,
		queryFn: async () => {
			try {
				return await getRecipes(
					{ search: searchQuery || 'rice', recipeTypes: recipeTypesArr },
					{ accessToken: fatSecretToken?.access_token || '' }
				);
			} catch (error) {
				console.log(error);
			}
		},
	});

	const { data: savedRecipes } = useQuery({
		queryKey: ['getSavedRecipes'],
		enabled: !!accessToken,
		placeholderData: keepPreviousData,
		queryFn: async () => {
			try {
				return await getSavedRecipes({ accessToken: accessToken || '' });
			} catch (error) {
				console.log(error);
			}
		},
	});

	useEffect(() => {
		if (savedRecipes) {
			recipesDispatch({ type: 'SET_SAVED_RECIPES', payload: savedRecipes || [] });
		}
	}, [savedRecipes]);

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

				searchQuery,
				setSearchQuery,

				recipeTypesArr,
				setRecipeTypesArr,
			}}
		>
			{children}
		</RecipesContext.Provider>
	);
}
