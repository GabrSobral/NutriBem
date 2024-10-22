import { useContext } from "react";
import { AuthContext } from ".";

export const useAuth = () => useContext(AuthContext);
