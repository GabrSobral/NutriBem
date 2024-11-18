import dayjs from 'dayjs';

import { Serving } from '@/modules/home/screens/FoodDetail';
import { IFood } from '@/modules/home/services/get-food-by-id';
import { IPatient } from '../../profile/reducers/patients-reducer';
import { ulid } from 'ulidx';

export type DietPlanActions =
	| { type: 'RESET_STATE' }
	| { type: 'SET_DIET_PLAN_INITIAL_STATE'; payload: DietPlanState }
	| { type: 'SET_NAME'; payload: string }
	| { type: 'SET_DESCRIPTION'; payload: string }
	| { type: 'SET_DAILY_CALORIES'; payload: number }
	| { type: 'ADD_DAILY_MEALS'; payload: IDietPlanMeal }
	| { type: 'REMOVE_DAILY_MEALS'; payload: IDietPlanMeal['id'] }
	| { type: 'SET_DAILY_MEALS'; payload: IDietPlanMeal[] }
	| { type: 'SET_ADDITIONAL_NOTES'; payload: AdditionalNote[] }
	| { type: 'ADD_ADDITIONAL_NOTE'; payload: AdditionalNote }
	| { type: 'SET_INITIAL_DATE'; payload: Date }
	| { type: 'SET_FINAL_DATE'; payload: Date }
	| { type: 'SELECT_DIET_PLAN'; payload: IPatient['dietPlans'][number] | null }
	| { type: 'REMOVE_ADDITIONAL_NOTE'; payload: string }
	| { type: 'REMOVE_DIET_PLAN'; payload: IDietPlan['id'] }
	| {
			type: 'REMOVE_FOOD_FROM_MEAL';
			payload: {
				mealId: IDietPlanMeal['id'];
				foodId: IFood['food']['food_id'];
			};
	  }
	| {
			type: 'ADD_FOOD_TO_MEAL';
			payload: {
				mealId: IDietPlanMeal['id'];
				serving: Serving;
				food: IFood['food'];
				quantity: number;
			};
	  }
	| {
			type: 'EDIT_FOOD_TO_MEAL';
			payload: {
				mealId: IDietPlanMeal['id'];
				serving: Serving;
				food: IFood['food'];
				quantity: number;
			};
	  };

interface AdditionalNote {
	id: string;
	note: string;
	order: number;
}

export interface IDietPlan {
	id: string;
	name: string;
	description: string;
	startDate: Date;
	finalDate: Date;
	meals: IDietPlanMeal[];
	notes: AdditionalNote[];
}

export interface IDietPlanMeal {
	id: string;
	name: string;
	maxKcal: number;
	foods: {
		id: string;
		foodId: string;
		foodName: string;

		servingId: string;
		servingName: string;

		servingFats: number;
		servingProteins: number;
		servingCarbohydrates: number;
		servingCalories: number;

		quantity: number;
	}[];
}

export interface DietPlanState {
	description: string;
	planName: string;
	planDate: {
		initial: Date;
		final: Date;
	};
	dailyCalories: number;
	dailyMeals: IDietPlanMeal[];
	additionalNotes: AdditionalNote[];

	selectedDietPlan: IPatient['dietPlans'][number] | null;
}

export const dietPlanInitialState: DietPlanState = {
	description: '',
	planName: '',
	planDate: {
		initial: new Date(),
		final: dayjs().add(1, 'month').toDate(),
	},
	dailyCalories: 0,
	dailyMeals: [],
	additionalNotes: [],

	selectedDietPlan: null,
};

export function dietPlanReducer(state: DietPlanState, action: DietPlanActions): DietPlanState {
	switch (action.type) {
		case 'RESET_STATE':
			return {
				...state,
				additionalNotes: [],
				dailyCalories: 0,
				dailyMeals: [],
				description: '',
				planDate: {
					final: dayjs().add(1, 'month').toDate(),
					initial: new Date(),
				},
				planName: '',
			};

		case 'REMOVE_DIET_PLAN':
			return {
				...state,
				selectedDietPlan: null,
			};

		case 'SET_DIET_PLAN_INITIAL_STATE': {
			return action.payload;
		}

		case 'SELECT_DIET_PLAN': {
			return {
				...state,
				selectedDietPlan: action.payload,
			};
		}

		case 'SET_DESCRIPTION': {
			return {
				...state,
				description: action.payload,
			};
		}

		case 'SET_NAME': {
			return {
				...state,
				planName: action.payload,
			};
		}

		case 'SET_DAILY_CALORIES': {
			return {
				...state,
				dailyCalories: action.payload,
			};
		}

		case 'SET_DAILY_MEALS': {
			return {
				...state,
				dailyMeals: action.payload,
			};
		}

		case 'SET_ADDITIONAL_NOTES': {
			return {
				...state,
				additionalNotes: action.payload,
			};
		}

		case 'ADD_ADDITIONAL_NOTE': {
			return {
				...state,
				additionalNotes: [...state.additionalNotes, action.payload],
			};
		}

		case 'REMOVE_ADDITIONAL_NOTE': {
			return {
				...state,
				additionalNotes: state.additionalNotes.filter(note => note.id !== action.payload),
			};
		}

		case 'ADD_DAILY_MEALS': {
			return {
				...state,
				dailyMeals: [...state.dailyMeals, action.payload],
			};
		}

		case 'REMOVE_DAILY_MEALS': {
			return {
				...state,
				dailyMeals: state.dailyMeals.filter(meal => meal.id !== action.payload),
			};
		}

		case 'REMOVE_FOOD_FROM_MEAL':
			return {
				...state,
				dailyMeals: state.dailyMeals.map(meal => {
					if (meal.id === action.payload.mealId) {
						return {
							...meal,
							foods: meal.foods.filter(food => food.foodId !== action.payload.foodId),
						};
					}
					return meal;
				}),
			};

		case 'ADD_FOOD_TO_MEAL':
			return {
				...state,
				dailyMeals: state.dailyMeals.map(meal => {
					if (meal.id === action.payload.mealId) {
						return {
							...meal,
							foods: [
								...meal.foods,
								{
									id: ulid(),
									foodId: action.payload.food.food_id,
									foodName: action.payload.food.food_name,
									servingId: action.payload.serving.serving_id,
									servingName: action.payload.serving.serving_description,
									servingFats: Number(action.payload.serving.fat),
									servingProteins: Number(action.payload.serving.protein),
									servingCarbohydrates: Number(action.payload.serving.carbohydrate),
									servingCalories: Number(action.payload.serving.calories),
									quantity: action.payload.quantity,
								},
							],
						};
					}

					return meal;
				}),
			};

		case 'EDIT_FOOD_TO_MEAL':
			return {
				...state,
				dailyMeals: state.dailyMeals.map(meal => {
					if (meal.id === action.payload.mealId) {
						return {
							...meal,
							foods: meal.foods.map(food => {
								if (food.foodId === action.payload.food.food_id) {
									return {
										...food,
										servingId: action.payload.serving.serving_id,
										servingName: action.payload.serving.serving_description,
										servingFats: Number(action.payload.serving.fat),
										servingProteins: Number(action.payload.serving.protein),
										servingCarbohydrates: Number(action.payload.serving.carbohydrate),
										servingCalories: Number(action.payload.serving.calories),
										quantity: action.payload.quantity,
									};
								}

								return food;
							}),
						};
					}

					return meal;
				}),
			};

		case 'SET_INITIAL_DATE':
			return {
				...state,
				planDate: {
					...state.planDate,
					initial: action.payload,
				},
			};

		case 'SET_FINAL_DATE':
			return {
				...state,
				planDate: {
					...state.planDate,
					final: action.payload,
				},
			};

		default:
			return state;
	}
}
