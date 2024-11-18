import { useContext } from 'react';
import { RecipesContext } from './context';

export const useRecipes = () => useContext(RecipesContext);
