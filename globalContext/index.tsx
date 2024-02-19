import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GlobalContextConfigProps {
  authToken?: string | null;
  setAuthToken?: (token: string) => Promise<void>;
}

export const GlobalContextConfig = createContext<GlobalContextConfigProps>({});

export function GlobalContext ({ children }: { children: React.ReactNode }) {
  const [authToken, _setAuthToken] = useState<string | null>(null);

  const setAuthToken = async (token: string) => {
    _setAuthToken(token);
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          _setAuthToken(token);
        }
      } catch (e) {
        console.log(e);
      }
    }

    getAuthToken();
  }, []);

  return (
    <GlobalContextConfig.Provider value={{ authToken, setAuthToken }}>
      {children}
    </GlobalContextConfig.Provider>
  );
}