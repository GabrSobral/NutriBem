
export type NutritionistActions =
  | {
      type: "SELECT_CURRENT_NUTRITIONIST";
      payload: any;
    }
  | { type: "SET_IS_NUTRITIONIST_LOADING"; payload: boolean };

export interface NutritionistState {
    currentNutritionist: null | any;
    isNutritionistLoading: boolean;
}

export const initialNutritionistState: NutritionistState = {
    currentNutritionist: null,
    isNutritionistLoading: false
};

export function nutritionistReducer(state: NutritionistState, action: NutritionistActions): NutritionistState {
  switch (action.type) {
    case "SELECT_CURRENT_NUTRITIONIST":
      return { ...state, currentNutritionist: action.payload };

    case "SET_IS_NUTRITIONIST_LOADING":
      return { ...state, isNutritionistLoading: action.payload }; 

    default:
      return state;
  }
}