import { IFood } from '../../services/get-food-by-id';
import { IMealApi } from '../../services/get-meals';

export type HomeActions =
	| {
			type: 'ADD_MEAL';
			payload: IMealApi;
	  }
	| { type: 'REMOVE_MEAL'; payload: IMealApi['id'] }
	| { type: 'SELECT_DATE'; payload: Date }
	| { type: 'SET_DAILY_MEALS'; payload: IMealApi[] }
	| {
			type: 'ADD_FOOD_TO_MEAL';
			payload: IMealApi['eatenFoods'][number] & { mealId: string };
	  }
	| {
			type: 'EDIT_FOOD_TO_MEAL';
			payload: IMealApi['eatenFoods'][number] & { mealId: string };
	  }
	| {
			type: 'REMOVE_FOOD_FROM_MEAL';
			payload: { mealId: IMealApi['id']; foodId: IFood['food']['food_id'] };
	  }
	| { type: 'SELECT_MEAL'; payload: IMealApi }
	| { type: 'SET_MEALS'; payload: IMealApi[] }
	| {
			type: 'ADD_EATEN_FOOD_TO_MEAL';
			payload: IMealApi['eatenFoods'][number] & { mealId: string };
	  }
	| {
			type: 'REMOVE_EATEN_FOOD_FROM_MEAL';
			payload: { mealId: IMealApi['id']; foodId: IFood['food']['food_id'] };
	  };

export interface IDailyMeal<T = IMeal | IMealApi> {
	date: Date;
	meals: T[];
}

export interface IMeal {
	id: string;
	name: string;
	maxKcal: number;
	eatenFoods: {
		food: IFood['food'];
		serving: IFood['food']['servings']['serving'][number];
		quantity: number;
	}[];
	dietPlanFoods: {
		food: IFood['food'];
		serving: IFood['food']['servings']['serving'][number];
		quantity: number;
	}[];
}

export interface HomeState {
	meals: IMealApi[];
	selectedMeal: IMealApi | null;
	selectedDate: Date;
}

export const initialHomeState: HomeState = {
	meals: [],
	selectedMeal: null,
	selectedDate: new Date(),
};

export function HomeReducer(state: HomeState, action: HomeActions): HomeState {
	switch (action.type) {
		case 'SET_DAILY_MEALS': {
			return {
				...state,
				meals: action.payload,
			};
		}

		case 'ADD_MEAL':
			return { ...state, meals: [...state.meals, action.payload] };

		case 'SELECT_DATE':
			return { ...state, selectedDate: action.payload };

		case 'SET_MEALS':
			return { ...state, meals: action.payload };

		case 'REMOVE_MEAL':
			return {
				...state,
				meals: state.meals.filter(meal => meal.id !== action.payload),
			};

		case 'SELECT_MEAL':
			return { ...state, selectedMeal: action.payload };

		case 'EDIT_FOOD_TO_MEAL':
			return {
				...state,
				selectedMeal: state.selectedMeal
					? {
							...state.selectedMeal,
							eatenFoods: state.selectedMeal?.eatenFoods.map(food =>
								food.foodId === action.payload.foodId ? action.payload : food
							),
						}
					: null,
				meals: state.meals.map(meal => {
					if (meal.id === action.payload.mealId) {
						return {
							...meal,
							eatenFoods: meal.eatenFoods.map(food => (food.foodId === action.payload.foodId ? action.payload : food)),
						};
					}
					return meal;
				}),
			};

		case 'ADD_FOOD_TO_MEAL':
			return {
				...state,
				selectedMeal: state.selectedMeal
					? {
							...state.selectedMeal,
							eatenFoods: [
								...(state.selectedMeal?.eatenFoods || []),
								{
									id: action.payload.id,
									foodId: action.payload.foodId,
									foodName: action.payload.foodName,
									servingId: action.payload.servingId,
									servingName: action.payload.servingName,
									quantity: action.payload.quantity,
									servingCalories: action.payload.servingCalories,
									servingCarbohydrates: action.payload.servingCarbohydrates,
									servingFats: action.payload.servingFats,
									servingProteins: action.payload.servingProteins,
								},
							],
						}
					: null,
				meals: state.meals.map(meal => {
					if (meal.id === action.payload.mealId) {
						return {
							...meal,
							eatenFoods: [
								...meal.eatenFoods,
								{
									id: action.payload.id,
									foodId: action.payload.foodId,
									foodName: action.payload.foodName,
									servingId: action.payload.servingId,
									servingName: action.payload.servingName,
									quantity: action.payload.quantity,
									servingCalories: action.payload.servingCalories,
									servingCarbohydrates: action.payload.servingCarbohydrates,
									servingFats: action.payload.servingFats,
									servingProteins: action.payload.servingProteins,
									ingestedKcal: 0,
									maxKcal: 0,
								},
							],
						};
					}
					return meal;
				}),
			};

		case 'REMOVE_FOOD_FROM_MEAL':
			return {
				...state,
				selectedMeal: state.selectedMeal
					? {
							...state.selectedMeal,
							eatenFoods: state.selectedMeal?.eatenFoods.filter(food => food.foodId !== action.payload.foodId) || [],
						}
					: null,
				meals: state.meals.map(meal => {
					if (meal.id === action.payload.mealId) {
						return {
							...meal,
							eatenFoods: meal.eatenFoods.filter(food => food.foodId !== action.payload.foodId),
						};
					}
					return meal;
				}),
			};

		case 'REMOVE_EATEN_FOOD_FROM_MEAL':
			return {
				...state,
				selectedMeal: state.selectedMeal
					? {
							...state.selectedMeal,
							eatenFoods: state.selectedMeal?.eatenFoods.filter(food => food.foodId !== action.payload.foodId),
						}
					: null,
				meals: state.meals.map(meal => {
					if (meal.id === action.payload.mealId) {
						return {
							...meal,
							eatenFoods: meal.eatenFoods.filter(food => food.foodId !== action.payload.foodId),
						};
					}
					return meal;
				}),
			};

		case 'ADD_EATEN_FOOD_TO_MEAL':
			return {
				...state,
				selectedMeal: state.selectedMeal
					? {
							...state.selectedMeal,
							eatenFoods: [
								...(state.selectedMeal?.eatenFoods || []),
								{
									id: action.payload.id,
									foodId: action.payload.foodId,
									foodName: action.payload.foodName,
									servingId: action.payload.servingId,
									servingName: action.payload.servingName,
									servingCalories: action.payload.servingCalories,
									servingCarbohydrates: action.payload.servingCarbohydrates,
									servingFats: action.payload.servingFats,
									servingProteins: action.payload.servingProteins,
									quantity: action.payload.quantity,
								},
							],
						}
					: null,
				meals: state.meals.map(meal => {
					if (meal.id === action.payload.mealId) {
						return {
							...meal,
							eatenFoods: [
								...meal.eatenFoods,
								{
									id: action.payload.id,
									foodId: action.payload.foodId,
									foodName: action.payload.foodName,
									servingId: action.payload.servingId,
									servingName: action.payload.servingName,
									servingCalories: action.payload.servingCalories,
									servingCarbohydrates: action.payload.servingCarbohydrates,
									servingFats: action.payload.servingFats,
									servingProteins: action.payload.servingProteins,
									quantity: action.payload.quantity,
									ingestedKcal: 0,
									maxKcal: 0,
								},
							],
						};
					}
					return meal;
				}),
			};
		default:
			return state;
	}
}
