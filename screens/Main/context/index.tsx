import React, { useState, createContext } from "react";
import { User } from "../../../models/User";
import { Court } from "../../../models/Court";

interface MainScreenContextProps {
  user?: User | null;
  setUser?: (user: User) => void;
  availableCourts?: Court[];
  setAvailableCourts?: (courts: Court[]) => void;
}

export const MainScreenContextConfig = createContext<MainScreenContextProps>({});

export function MainScreenContext ({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [availableCourts, setAvailableCourts] = useState<Court[]>([]);

  return (
    <MainScreenContextConfig.Provider value={{ user, setUser, availableCourts, setAvailableCourts }}>
      {children}
    </MainScreenContextConfig.Provider>
  );
}