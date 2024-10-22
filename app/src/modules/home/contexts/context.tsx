import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";

import {
  HomeActions,
  HomeState,
  initialHomeState,
  HomeReducer,
  IMeal,
} from "./reducers/home-reducer";
import { SearchedFood, searchFood } from "../services/search-food";
import { useAuth } from "@/contexts/AuthContext/hook";

interface HomeContextProps {
  homeState: HomeState;
  homeDispatch: Dispatch<HomeActions>;

  searchFoodAsync: (searchValue: string) => Promise<SearchedFood>;
  addMealAsync: (meal: IMeal) => Promise<void>;
  removeMealAsync: (mealId: IMeal["id"]) => Promise<void>;
}

export const HomeContext = createContext({} as HomeContextProps);

interface HomeProviderProps {
  children: ReactNode;
}

export function HomeProvider({ children }: HomeProviderProps) {
  const { fatSecretToken } = useAuth();
  const [homeState, homeDispatch] = useReducer(HomeReducer, initialHomeState);

  async function searchFoodAsync(searchValue: string) {
    const foods = await searchFood(
      { searchTerm: searchValue },
      { accessToken: fatSecretToken?.access_token }
    );

    return foods;
  }

  async function addMealAsync(meal: IMeal) {
    homeDispatch({ type: "ADD_MEAL", payload: meal });
    homeDispatch({ type: "SELECT_MEAL", payload: meal });
  }

  async function removeMealAsync(mealId: IMeal["id"]) {
    homeDispatch({ type: "REMOVE_MEAL", payload: mealId });
  }

  useEffect(() => {
    console.log(homeState.selectedMeal);
  }, [homeState.selectedMeal]);

  return (
    <HomeContext.Provider
      value={{
        homeState,
        homeDispatch,

        searchFoodAsync,
        addMealAsync,
        removeMealAsync,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
