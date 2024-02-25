import { User } from "./User";

export interface Match {
  ownerId: string;
  date: string;
  time: string;
  courtId: string;
  whiteTeam: User[];
  blackTeam: User[];
  whiteTeamScore?: number;
  blackTeamScore?: number;
  playersPerTeam: number;
  createdAt: string;
  played: boolean;
}