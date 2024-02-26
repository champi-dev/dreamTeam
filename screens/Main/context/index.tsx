import React, { useState, createContext } from "react";
import { User } from "../../../models/User";
import { Court } from "../../../models/Court";
import { Match } from "../../../models/Match";
import { Notification } from "../../../models/Notification";

interface MainScreenContextProps {
  user?: User | null;
  setUser?: (user: User) => void;
  availableCourts?: Court[];
  setAvailableCourts?: (courts: Court[]) => void;
  matches?: Match[];
  setMatches?: (matches: Match[]) => void;  
  lastVisibleMatchDoc?: unknown;
  setLastVisibleMatchDoc?: (doc: unknown) => void;
  playedMatches?: Match[];
  setPlayedMatches?: (matches: Match[]) => void;
  lastVisiblePlayedMatchDoc?: unknown;
  setLastVisiblePlayedMatchDoc?: (doc: unknown) => void;
  notifications?: Notification[];
  setNotifications?: (notifications: Notification[]) => void;
}

export const MainScreenContextConfig = createContext<MainScreenContextProps>({});

export function MainScreenContext ({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [availableCourts, setAvailableCourts] = useState<Court[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [playedMatches, setPlayedMatches] = useState<Match[]>([]);
  const [lastVisibleMatchDoc, setLastVisibleMatchDoc] = useState<unknown>();
  const [lastVisiblePlayedMatchDoc, setLastVisiblePlayedMatchDoc] = useState<unknown>();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  return (
    <MainScreenContextConfig.Provider value={{ user, setUser, availableCourts, setAvailableCourts, matches, setMatches,lastVisibleMatchDoc, setLastVisibleMatchDoc, notifications, setNotifications, playedMatches, setPlayedMatches, lastVisiblePlayedMatchDoc, setLastVisiblePlayedMatchDoc }}>
      {children}
    </MainScreenContextConfig.Provider>
  );
}