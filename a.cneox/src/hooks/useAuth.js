import { useContext } from "react";
import { AuthContext } from "../state/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
};