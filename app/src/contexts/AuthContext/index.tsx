import dayjs from "dayjs";
import { createContext, ReactNode, useEffect, useState } from "react";

import { AsyncStorage } from "@/libs/AsyncStorage";
import { getAccessToken, IFatSecretToken } from "@/services/get-access-token";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  fatSecretToken: IFatSecretToken | null;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

interface AuthProviderProps {
  children: ReactNode;
}

const ACCESS_TOKEN_KEY = "@FatSecretToken";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [fatSecretToken, setFatSecretToken] = useState<IFatSecretToken | null>(
    null
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentTime = new Date();
    // AsyncStorage.removeItem(ACCESS_TOKEN_KEY);

    AsyncStorage.getItem<IFatSecretToken>(ACCESS_TOKEN_KEY).then((token) => {
      if (token) {
        setFatSecretToken(token);

        let expiresIn = dayjs(token?.expires_in_date).diff(
          currentTime,
          "second"
        );

        if (expiresIn <= 60) {
          console.log("FatSecret Token expired! Refreshing token...");

          getAccessToken().then((newToken) => {
            const updatedToken = {
              ...newToken,
              expires_in_date: new Date(
                currentTime.getTime() + newToken.expires_in * 1000
              ),
            };

            AsyncStorage.setItem(ACCESS_TOKEN_KEY, updatedToken);
            setFatSecretToken(updatedToken);

            expiresIn = dayjs(updatedToken.expires_in_date).diff(
              currentTime,
              "second"
            );
          });
        }

        timeout = setTimeout(async () => {
          console.log("FatSecret Token expired! Refreshing token...");

          const newToken = await getAccessToken();
          const expiresInDate = dayjs()
            .add(newToken.expires_in, "seconds")
            .toDate();

          const updatedToken = {
            ...newToken,
            expires_in_date: expiresInDate,
          };

          AsyncStorage.setItem(ACCESS_TOKEN_KEY, updatedToken);
          setFatSecretToken(updatedToken);
        }, expiresIn - 60);
      } else {
        console.log("FatSecret Token not found! Requesting it...");

        getAccessToken().then((newToken) => {
          const expiresInDate = dayjs()
            .add(newToken.expires_in, "seconds")
            .toDate();

          const updatedToken = {
            ...newToken,
            expires_in_date: expiresInDate,
          };

          AsyncStorage.setItem(ACCESS_TOKEN_KEY, updatedToken);
          setFatSecretToken(updatedToken);
        });
      }
    });

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AuthContext.Provider value={{ user, fatSecretToken }}>
      {children}
    </AuthContext.Provider>
  );
}
