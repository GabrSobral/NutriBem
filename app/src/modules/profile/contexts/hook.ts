import { useContext } from "react";
import { ProfileContext } from "./context";

export const useProfile = () => useContext(ProfileContext)