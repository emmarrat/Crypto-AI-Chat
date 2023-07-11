export interface History {
  id: string;
  title: string;
  messagesId: string;
}

export interface Messages {
  id: string;
  messages: Message[];
}
export interface Message {
  id: string;
  text: string;
  role: string;
}
