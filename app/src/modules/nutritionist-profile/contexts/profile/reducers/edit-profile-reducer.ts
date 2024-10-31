export type EditNutritionistProfileActions = {
  type: "CHANGE_IS_EDIT_ENABLED";
  payload: boolean;
};

export interface EditNutritionistProfileState {
  isEditEnabled: boolean;
}

export const initialEditNutritionistProfileState: EditNutritionistProfileState = {
  isEditEnabled: false,
};

export function NutritionistProfileReducer(
  state: EditNutritionistProfileState,
  action: EditNutritionistProfileActions
): EditNutritionistProfileState {
  switch (action.type) {
    case "CHANGE_IS_EDIT_ENABLED": {
      return {
        ...state,
        isEditEnabled: action.payload,
      };
    }
    default:
      return state;
  }
}
