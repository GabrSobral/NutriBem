import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { DietPlanActions, dietPlanReducer, dietPlanInitialState, DietPlanState } from './reducers/diet-plan-reducer';
import { SearchedFood, searchFood } from '@/modules/home/services/search-food';
import { useAuth } from '@/contexts/AuthContext/hook';

interface DietPlanContextProps {
	dietPlanState: DietPlanState;
	dietPlanDispatch: Dispatch<DietPlanActions>;

	editDietPlanState: DietPlanState;
	editDietPlanDispatch: Dispatch<DietPlanActions>;

	searchFoodAsync: (searchValue: string, signal: AbortSignal) => Promise<SearchedFood | null>;
}

export const DietPlanContext = createContext({} as DietPlanContextProps);

interface DietPlanProviderProps {
	children: ReactNode;
}

export function DietPlanProvider({ children }: DietPlanProviderProps) {
	const { fatSecretToken } = useAuth();
	const [dietPlanState, dietPlanDispatch] = useReducer(dietPlanReducer, dietPlanInitialState);
	const [editDietPlanState, editDietPlanDispatch] = useReducer(dietPlanReducer, dietPlanInitialState);

	async function searchFoodAsync(searchValue: string, signal: AbortSignal) {
		try {
			const foods = await searchFood(
				{ searchTerm: searchValue },
				{ accessToken: fatSecretToken?.access_token, cancellationToken: signal }
			);

			return foods;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	return (
		<DietPlanContext.Provider
			value={{
				dietPlanState,
				dietPlanDispatch,

				editDietPlanDispatch,
				editDietPlanState,

				searchFoodAsync,
			}}
		>
			{children}
		</DietPlanContext.Provider>
	);
}
