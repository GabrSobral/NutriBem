import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createContext, Dispatch, ReactNode, useEffect, useReducer } from 'react';

import { HomeActions, HomeState, initialHomeState, HomeReducer, IDailyMeal } from './reducers/home-reducer';
import { useAuth } from '@/contexts/AuthContext/hook';

import { removeMealApi } from '../services/remove-meal';
import { getMealsApi, IMealApi } from '../services/get-meals';
import { SearchedFood, searchFood } from '../services/search-food';

interface HomeContextProps {
	homeState: HomeState;
	homeDispatch: Dispatch<HomeActions>;

	searchFoodAsync: (searchValue: string) => Promise<SearchedFood>;
	addMealAsync: (meal: IMealApi) => Promise<void>;
	removeMealAsync: (mealId: IMealApi['id']) => Promise<void>;

	isDailyMealLoading: boolean;
}

export const HomeContext = createContext({} as HomeContextProps);

interface HomeProviderProps {
	children: ReactNode;
}

export function HomeProvider({ children }: HomeProviderProps) {
	const { fatSecretToken, accessToken } = useAuth();
	const [homeState, homeDispatch] = useReducer(HomeReducer, initialHomeState);

	const {
		data: dailyMealData,
		isFetching,
		isFetched,
	} = useQuery<IDailyMeal<IMealApi>>({
		queryKey: ['getMeals', homeState.selectedDate],
		placeholderData: keepPreviousData,
		queryFn: async () => {
			if (!homeState.selectedDate) {
				return { date: new Date(), meals: [] };
			}

			try {
				return await getMealsApi({ date: homeState.selectedDate }, { accessToken: accessToken || '' });
			} catch (error) {
				console.log(error);
				return { date: new Date(), meals: [] };
			}
		},
	});

	useEffect(() => {
		if (dailyMealData) {
			homeDispatch({ type: 'SET_MEALS', payload: dailyMealData.meals });
		}
	}, [dailyMealData]);

	async function searchFoodAsync(searchValue: string) {
		const foods = await searchFood({ searchTerm: searchValue }, { accessToken: fatSecretToken?.access_token });

		return foods;
	}

	async function addMealAsync(meal: IMealApi) {
		homeDispatch({ type: 'ADD_MEAL', payload: meal });
		homeDispatch({ type: 'SELECT_MEAL', payload: meal });
	}

	async function removeMealAsync(mealId: IMealApi['id']) {
		try {
			homeDispatch({ type: 'REMOVE_MEAL', payload: mealId });
			await removeMealApi({ mealId }, { accessToken: accessToken || '' });
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<HomeContext.Provider
			value={{
				homeState,
				homeDispatch,

				searchFoodAsync,
				addMealAsync,
				removeMealAsync,

				isDailyMealLoading: isFetching && isFetched,
			}}
		>
			{children}
		</HomeContext.Provider>
	);
}
