import { IMeal } from '@/modules/home/contexts/reducers/home-reducer';
import { DietPlans } from '@/modules/nutritionist-profile/contexts/profile/reducers/patients-reducer';

export type NutritionistActions =
	| {
			type: 'SELECT_CURRENT_NUTRITIONIST';
			payload: IUserNutritionist;
	  }
	| { type: 'SET_IS_NUTRITIONIST_LOADING'; payload: boolean }
	| { type: 'SET_DIET_PLANS'; payload: DietPlans[] };

export interface NutritionistState {
	currentNutritionist: null | IUserNutritionist;
	selectedMeal: IMeal | null;
	isNutritionistLoading: boolean;
	dietPlans: DietPlans[];
}

export interface IUserNutritionist {
	id: string;
	firstName: string;
	lastName: string;
	crn: string;
	photoUrl: string | null;
}

export const initialNutritionistState: NutritionistState = {
	currentNutritionist: null,
	selectedMeal: null,
	isNutritionistLoading: false,
	dietPlans: [],
};

export function nutritionistReducer(state: NutritionistState, action: NutritionistActions): NutritionistState {
	switch (action.type) {
		case 'SELECT_CURRENT_NUTRITIONIST':
			return { ...state, currentNutritionist: action.payload };

		case 'SET_IS_NUTRITIONIST_LOADING':
			return { ...state, isNutritionistLoading: action.payload };

		case 'SET_DIET_PLANS':
			return {
				...state,
				dietPlans: action.payload,
			};

		default:
			return state;
	}
}
