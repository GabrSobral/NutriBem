import { createContext, Dispatch, ReactNode, useEffect, useReducer } from 'react';

import {
	initialNutritionistState,
	NutritionistActions,
	nutritionistReducer,
	NutritionistState,
} from './reducers/nutritionist-reducer';
import { useQuery } from '@tanstack/react-query';
import { getUserNutritionistApi } from '../../services/get-user-nutritionist';
import { useAuth } from '@/contexts/AuthContext/hook';
import { getUserDietPlansApi } from '../../services/get-user-diet-plans';

interface NutritionistContextProps {
	nutritionistState: NutritionistState;
	nutritionistDispatch: Dispatch<NutritionistActions>;

	isLoading: boolean;
	isUserDietPlansFetching: boolean;
}

export const NutritionistContext = createContext({} as NutritionistContextProps);

interface NutritionistProviderProps {
	children: ReactNode;
}

export function NutritionistProvider({ children }: NutritionistProviderProps) {
	const { accessToken } = useAuth();
	const [nutritionistState, nutritionistDispatch] = useReducer(nutritionistReducer, initialNutritionistState);

	const { data, isFetching } = useQuery({
		queryKey: ['user-nutritionist', accessToken],
		enabled: !!accessToken,
		queryFn: async () => {
			try {
				const response = await getUserNutritionistApi({ accessToken: accessToken || '' });
				return response;
			} catch (error) {
				console.log(error);
				return null;
			}
		},
	});

	const { data: userDietPlans, isFetching: isUserDietPlansFetching } = useQuery({
		queryKey: ['user-diet-plans', accessToken],
		enabled: !!accessToken,
		queryFn: async () => {
			try {
				const response = await getUserDietPlansApi({ accessToken: accessToken || '' });
				return response;
			} catch (error) {
				console.log(error);
				return null;
			}
		},
	});

	useEffect(() => {
		if (data) {
			nutritionistDispatch({ type: 'SELECT_CURRENT_NUTRITIONIST', payload: data });
		}
	}, [data]);

	useEffect(() => {
		if (userDietPlans) {
			nutritionistDispatch({ type: 'SET_DIET_PLANS', payload: userDietPlans });
		}
	}, [userDietPlans]);

	return (
		<NutritionistContext.Provider
			value={{
				nutritionistState,
				nutritionistDispatch,

				isLoading: isFetching,
				isUserDietPlansFetching,
			}}
		>
			{children}
		</NutritionistContext.Provider>
	);
}
