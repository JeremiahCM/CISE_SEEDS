import { createContext, useState, useEffect } from "react";
import { useAuth } from "./auth";

const INITIAL_STATUS = true;
const AuthContext = createContext(INITIAL_STATUS);
export const AuthComsumer = AuthContext.Consumer;
export function AuthProvider({ children }) {
  const { updateLoginStatus } = useAuth();
  const [login, setLogin] = useState(INITIAL_STATUS);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginStatus = await updateLoginStatus();
        setLogin(loginStatus);
      } catch (err) {
        setLogin(false);
      }
    };
    fetchData();
  }, [login]);
  return (
    <AuthContext.Provider value={{ login, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
