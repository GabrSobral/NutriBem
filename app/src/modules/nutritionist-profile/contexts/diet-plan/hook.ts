import { useContext } from "react";
import { DietPlanContext } from "./context";

export const useNutritionistDietPlan = () => useContext(DietPlanContext)