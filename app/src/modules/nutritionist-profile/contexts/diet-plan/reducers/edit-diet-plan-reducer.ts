import { Serving } from "@/modules/home/screens/FoodDetail";
import { IFood } from "@/modules/home/services/get-food-by-id";

export type EditDietPlanActions =
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_DAILY_CALORIES"; payload: number }
  | { type: "ADD_DAILY_MEALS"; payload: IDietPlanMeal }
  | { type: "REMOVE_DAILY_MEALS"; payload: IDietPlanMeal["id"] }
  | { type: "SET_DAILY_MEALS"; payload: IDietPlanMeal[] }
  | { type: "SET_ADDITIONAL_NOTES"; payload: AdditionalNote[] }
  | { type: "ADD_ADDITIONAL_NOTE"; payload: AdditionalNote }
  | { type: "REMOVE_ADDITIONAL_NOTE"; payload: string }
  | {
      type: "REMOVE_FOOD_FROM_MEAL";
      payload: {
        mealId: IDietPlanMeal["id"];
        foodId: IFood["food"]["food_id"];
      };
    }
  | {
      type: "ADD_FOOD_TO_MEAL";
      payload: {
        mealId: IDietPlanMeal["id"];
        serving: Serving;
        food: IFood["food"];
        quantity: number;
      };
    };

interface AdditionalNote {
  id: string;
  note: string;
  order: number;
}

export interface IDietPlanMeal {
  id: string;
  name: string;
  maxKcal: number;
  foods: {
    food: IFood["food"];
    serving: IFood["food"]["servings"]["serving"][number];
    quantity: number;
  }[];
}

export interface EditDietPlanState {
  description: string;
  dailyCalories: number;
  dailyMeals: IDietPlanMeal[];
  additionalNotes: AdditionalNote[];
}

export const initialEditDietPlanState: EditDietPlanState = {
  description: "",
  dailyCalories: 0,
  dailyMeals: [],
  additionalNotes: [],
};

export function editDietPlanReducer(
  state: EditDietPlanState,
  action: EditDietPlanActions
): EditDietPlanState {
  switch (action.type) {
    case "SET_DESCRIPTION": {
      return {
        ...state,
        description: action.payload,
      };
    }

    case "SET_DAILY_CALORIES": {
      return {
        ...state,
        dailyCalories: action.payload,
      };
    }

    case "SET_DAILY_MEALS": {
      return {
        ...state,
        dailyMeals: action.payload,
      };
    }

    case "SET_ADDITIONAL_NOTES": {
      return {
        ...state,
        additionalNotes: action.payload,
      };
    }

    case "ADD_ADDITIONAL_NOTE": {
      return {
        ...state,
        additionalNotes: [...state.additionalNotes, action.payload],
      };
    }

    case "REMOVE_ADDITIONAL_NOTE": {
      return {
        ...state,
        additionalNotes: state.additionalNotes.filter(
          (note) => note.id !== action.payload
        ),
      };
    }

    case "ADD_DAILY_MEALS": {
      return {
        ...state,
        dailyMeals: [...state.dailyMeals, action.payload],
      };
    }

    case "REMOVE_DAILY_MEALS": {
      return {
        ...state,
        dailyMeals: state.dailyMeals.filter(
          (meal) => meal.id !== action.payload
        ),
      };
    }

    case "REMOVE_FOOD_FROM_MEAL":
      return {
        ...state,
        dailyMeals: state.dailyMeals.map((meal) => {
          if (meal.id === action.payload.mealId) {
            return {
              ...meal,
              foods: meal.foods.filter(
                (food) => food.food.food_id !== action.payload.foodId
              ),
            };
          }
          return meal;
        }),
      };

    case "ADD_FOOD_TO_MEAL":
      return {
        ...state,
        dailyMeals: state.dailyMeals.map((meal) => {
          if (meal.id === action.payload.mealId) {
            return {
              ...meal,
              maxKcal: meal.maxKcal + Number(action?.payload.food?.servings?.serving[0]?.calories || 0) * action.payload.quantity,
              foods: [
                ...meal.foods,
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

    default:
      return state;
  }
}
