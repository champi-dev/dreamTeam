export interface User {
  id?: string; // Optional because it's not present when creating a new user
  name: string;
  email: string;
  goals: number;
  avatarImgUrl?: string;
  goalsInMatch?: number;
  randomColor?: string;
  pushToken?: string;
}