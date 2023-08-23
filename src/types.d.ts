export interface HistoryChats {
  id: string;
  title: string;
  chatId: string;
}

export interface Chat {
  id: string;
  chat: Message[];
}
export interface Message {
  id: string;
  text: string;
  role: string;
}

interface RequestBody {
  query: string;
}

interface AiResponse {
  id: string;
  answer: string;
}
