import { Serving } from "../../screens/FoodDetail";
import { IFood } from "../../services/get-food-by-id";

export type HomeActions =
  | {
      type: "ADD_MEAL";
      payload: IMeal;
    }
  | { type: "REMOVE_MEAL"; payload: IMeal["id"] }
  | {
      type: "ADD_FOOD_TO_MEAL";
      payload: {
        mealId: IMeal["id"];
        serving: Serving;
        food: IFood["food"];
        quantity: number;
      };
    }
  | {
      type: "REMOVE_FOOD_FROM_MEAL";
      payload: { mealId: IMeal["id"]; foodId: IFood["food"]["food_id"] };
    }
  | { type: "SELECT_MEAL"; payload: IMeal }
  | {
      type: "ADD_EATEN_FOOD_TO_MEAL";
      payload: {
        mealId: IMeal["id"];
        serving: Serving;
        food: IFood["food"];
        quantity: number;
      };
    }
  | {
      type: "REMOVE_EATEN_FOOD_FROM_MEAL";
      payload: { mealId: IMeal["id"]; foodId: IFood["food"]["food_id"] };
    };

export interface IMeal {
  id: string;
  name: string;
  maxKcal: number;
  eatenFoods: {
    food: IFood["food"];
    serving: IFood["food"]["servings"]["serving"][number];
    quantity: number;
  }[];
  remainingFoods: {
    food: IFood["food"];
    serving: IFood["food"]["servings"]["serving"][number];
    quantity: number;
  }[];
}

export interface HomeState {
  meals: IMeal[];
  selectedMeal: IMeal | null;
}

export const initialHomeState: HomeState = {
  meals: [],
  selectedMeal: null,
};

export function HomeReducer(state: HomeState, action: HomeActions): HomeState {
  switch (action.type) {
    case "ADD_MEAL":
      return { ...state, meals: [...state.meals, action.payload] };

    case "REMOVE_MEAL":
      return {
        ...state,
        meals: state.meals.filter((meal) => meal.id !== action.payload),
      };

    case "SELECT_MEAL":
      return { ...state, selectedMeal: action.payload };

    case "ADD_FOOD_TO_MEAL":
      console.log(action.payload);

      return {
        ...state,
        selectedMeal: state.selectedMeal
          ? {
              ...state.selectedMeal,
              eatenFoods: [
                ...(state.selectedMeal?.eatenFoods || []),
                {
                  food: {
                    ...action.payload.food,
                    servings: {
                      serving: [
                        ...action.payload.food.servings.serving,
                        action.payload.serving,
                      ],
                    },
                  },
                  serving: action.payload.serving,
                  quantity: action.payload.quantity,
                },
              ],
            }
          : null,
        meals: state.meals.map((meal) => {
          if (meal.id === action.payload.mealId) {
            return {
              ...meal,
              eatenFoods: [
                ...meal.eatenFoods,
                {
                  food: {
                    ...action.payload.food,
                    servings: {
                      serving: [
                        ...action.payload.food.servings.serving,
                        action.payload.serving,
                      ],
                    },
                  },
                  serving: action.payload.serving,
                  quantity: action.payload.quantity,
                },
              ],
            };
          }
          return meal;
        }),
      };

    case "REMOVE_FOOD_FROM_MEAL":
      return {
        ...state,
        selectedMeal: state.selectedMeal
          ? {
              ...state.selectedMeal,
              eatenFoods:
                state.selectedMeal?.eatenFoods.filter(
                  (food) => food.food.food_id !== action.payload.foodId
                ) || [],
            }
          : null,
        meals: state.meals.map((meal) => {
          if (meal.id === action.payload.mealId) {
            return {
              ...meal,
              eatenFoods: meal.eatenFoods.filter(
                (food) => food.food.food_id !== action.payload.foodId
              ),
            };
          }
          return meal;
        }),
      };

    case "REMOVE_EATEN_FOOD_FROM_MEAL":
      return {
        ...state,
        selectedMeal: state.selectedMeal
          ? {
              ...state.selectedMeal,
              eatenFoods: state.selectedMeal?.eatenFoods.filter(
                (food) => food.food.food_id !== action.payload.foodId
              ),
            }
          : null,
        meals: state.meals.map((meal) => {
          if (meal.id === action.payload.mealId) {
            return {
              ...meal,
              eatenFoods: meal.eatenFoods.filter(
                (food) => food.food.food_id !== action.payload.foodId
              ),
            };
          }
          return meal;
        }),
      };

    case "ADD_EATEN_FOOD_TO_MEAL":
      return {
        ...state,
        selectedMeal: state.selectedMeal
          ? {
              ...state.selectedMeal,
              eatenFoods: [
                ...(state.selectedMeal?.eatenFoods || []),
                {
                  food: {
                    ...action.payload.food,
                    servings: {
                      serving: [
                        ...action.payload.food.servings.serving,
                        action.payload.serving,
                      ],
                    },
                  },
                  serving: action.payload.serving,
                  quantity: action.payload.quantity,
                },
              ],
            }
          : null,
        meals: state.meals.map((meal) => {
          if (meal.id === action.payload.mealId) {
            return {
              ...meal,
              eatenFoods: [
                ...meal.eatenFoods,
                {
                  food: {
                    ...action.payload.food,
                    servings: {
                      serving: [
                        action.payload.serving,
                        ...action.payload.food.servings.serving,
                      ],
                    },
                  },
                  serving: action.payload.serving,
                  quantity: action.payload.quantity,
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
