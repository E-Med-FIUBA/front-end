import { createContext, useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export interface UserData {
  token: {
    value: string;
    expires: number;
  };
}

export interface AuthContextType {
  user?: UserData;
  login: (data: UserData) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined, // TODO: Change this to a function that makes a request to the server to get the user data
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const login = useCallback(
    async (data: UserData) => {
      setUser(data);
    },
    [setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
