import { AuthContext } from "@contexts/AuthContext";
import { useContext } from "react";

export function useAuth() {
    const user = useContext(AuthContext);

    return user;
}