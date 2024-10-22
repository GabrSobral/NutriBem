import { useContext } from "react";
import { HomeContext } from "./context";

export const useHome = () => useContext(HomeContext);
