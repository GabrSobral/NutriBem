export type EditProfileActions = {
  type: "CHANGE_IS_EDIT_ENABLED";
  payload: boolean;
};

export interface EditProfileState {
  isEditEnabled: boolean;
}

export const initialEditProfileState: EditProfileState = {
  isEditEnabled: false,
};

export function ProfileReducer(
  state: EditProfileState,
  action: EditProfileActions
): EditProfileState {
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
