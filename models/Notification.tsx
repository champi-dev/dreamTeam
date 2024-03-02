export interface Notification {
  id?: string; // Not available when creating, only when reading
  highlightedText: string;
  regularText: string;
  matchId?: string;
  senderId?: string;
  receiverId?: string;
}