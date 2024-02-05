import { User } from "./User";

export interface Match {
  date: string;
  time: string;
  court: string;
  whiteTeam: User[];
  blackTeam: User[];
  whiteTeamScore?: number;
  blackTeamScore?: number;
  playersPerTeam: number;
}