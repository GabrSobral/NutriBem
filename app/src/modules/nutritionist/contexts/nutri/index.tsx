import { createContext, Dispatch, ReactNode, useReducer } from "react";

import {
  initialNutritionistState,
  NutritionistActions,
  nutritionistReducer,
  NutritionistState,
} from "./reducers/nutritionist-reducer";

interface NutritionistContextProps {
    nutritionistState: NutritionistState;
    nutritionistDispatch: Dispatch<NutritionistActions>;
}

export const NutritionistContext = createContext({} as NutritionistContextProps);

interface NutritionistProviderProps {
  children: ReactNode;
}

export function NutritionistProvider({ children }: NutritionistProviderProps) {
  const [nutritionistState, nutritionistDispatch] = useReducer(
    nutritionistReducer,
    initialNutritionistState
  );

  return (
    <NutritionistContext.Provider value={{
        nutritionistState,
        nutritionistDispatch,
    }}>
      {children}
    </NutritionistContext.Provider>
  );
}
