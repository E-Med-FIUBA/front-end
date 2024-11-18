import { createContext, useCallback, useMemo } from 'react';

import { useLocalStorage } from '@/hooks/use-local-storage';
import KeyManager, { IncompatibleKeyError, InvalidFormatError } from '../signature/key_management';

export interface UserData {
  token: string;
  privateKey: string;
  userId: number;
  name: string;
  lastName: string;
  license: string;
  specialty: string;
}

export interface AuthContextType {
  user?: UserData;
  login: (data: UserData) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined, // TODO: Change this to a function that makes a request to the server to get the user data
  login: () => Promise.resolve(),
  logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser, removeUser] = useLocalStorage('user', null);

  const login =
    async (data: UserData) => {
      try {
        const { privateKey, ...user } = data
        const hasKey = await KeyManager.hasUserKey(user.userId);
        setUser(user);

        if (!hasKey) {
          await KeyManager.save(user.userId, privateKey);
        }
      } catch (err) {
        if (err instanceof IncompatibleKeyError || err instanceof InvalidFormatError) {
          removeUser();
          await KeyManager.delete();
        }

        throw err;
      }
    };

  const logout = useCallback(() => {
    removeUser();
  }, [removeUser]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
