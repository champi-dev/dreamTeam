import { User } from "./User";

export interface Match {
  id?: string; // Optional because it's not present when creating a new match
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
  playedAt?: string;
  played: boolean;
}