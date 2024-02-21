import React, { useState, createContext } from "react";
import { User } from "../../../models/User";

interface MainScreenContextProps {
  user?: User | null;
  setUser?: (user: User) => void;
}

export const MainScreenContextConfig = createContext<MainScreenContextProps>({});

export function MainScreenContext ({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <MainScreenContextConfig.Provider value={{ user, setUser }}>
      {children}
    </MainScreenContextConfig.Provider>
  );
}