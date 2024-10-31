import { createContext, Dispatch, ReactNode, useReducer } from "react";
import {
  EditNutritionistProfileActions,
  EditNutritionistProfileState,
  initialEditNutritionistProfileState,
  NutritionistProfileReducer,
} from "./reducers/edit-profile-reducer";

interface NutritionistProfileContextProps {
  editNutritionistProfileState: EditNutritionistProfileState;
  editNutritionistProfileDispatch: Dispatch<EditNutritionistProfileActions>;
}

export const NutritionistProfileContext = createContext(
  {} as NutritionistProfileContextProps
);

interface NutritionistProfileProviderProps {
  children: ReactNode;
}

export function NutritionistProfileProvider({
  children,
}: NutritionistProfileProviderProps) {
  const [editNutritionistProfileState, editNutritionistProfileDispatch] =
    useReducer(NutritionistProfileReducer, initialEditNutritionistProfileState);

  return (
    <NutritionistProfileContext.Provider
      value={{
        editNutritionistProfileState,
        editNutritionistProfileDispatch,
      }}
    >
      {children}
    </NutritionistProfileContext.Provider>
  );
}
