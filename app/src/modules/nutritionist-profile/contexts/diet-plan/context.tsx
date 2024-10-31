import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { EditDietPlanActions, editDietPlanReducer, EditDietPlanState, initialEditDietPlanState } from "./reducers/edit-diet-plan-reducer";
import { SearchedFood, searchFood } from "@/modules/home/services/search-food";
import { useAuth } from "@/contexts/AuthContext/hook";

interface DietPlanContextProps {
  editDietPlanState: EditDietPlanState;
  editDietPlanDispatch: Dispatch<EditDietPlanActions>;

  searchFoodAsync: (searchValue: string) => Promise<SearchedFood>;
}

export const DietPlanContext = createContext(
  {} as DietPlanContextProps
);

interface DietPlanProviderProps {
  children: ReactNode;
}

export function DietPlanProvider({
  children,
}: DietPlanProviderProps) {
  const { fatSecretToken } = useAuth();
  const [ editDietPlanState, editDietPlanDispatch ] = useReducer(editDietPlanReducer, initialEditDietPlanState);

  async function searchFoodAsync(searchValue: string) {
    const foods = await searchFood(
      { searchTerm: searchValue },
      { accessToken: fatSecretToken?.access_token }
    );

    console.log({ foods });

    return foods;
  }

  return (
    <DietPlanContext.Provider
      value={{
        editDietPlanState,
        editDietPlanDispatch,

        searchFoodAsync
      }}
    >
      {children}
    </DietPlanContext.Provider>
  );
}
