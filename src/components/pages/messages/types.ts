export interface IMessageData {
  userId: string;
  message: string;
}
export interface MessagesState {
  messagesList: [] | IMessageData[];
  status: string;
  error: null | string;
}
