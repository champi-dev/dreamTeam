export interface Notification {
  highlightedText: string;
  regularText: string;
  matchId?: string;
  senderId?: string;
  receiverId: string;
}