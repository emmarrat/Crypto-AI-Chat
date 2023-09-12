export interface Chat {
  id: string;
  chat: Message[];
}
export interface Message {
  id: string;
  text: string;
  role: string;
}

export interface RequestBody {
  query: string;
}

export interface AiResponse {
  id: string;
  answer: string;
}

export interface AuthMutation {
  email: string;
  password: string;
}

export interface ConversationData {
  conversation_id: string;
  conversation_name: string;
}

export interface UserAuthResponse {
  id: string;
  email: string;
  paid: boolean;
  bill_date: string;
  conversations: ConversationData[];
}
export interface User {
  id: string;
  email: string;
  paid: boolean;
  bill_date: string;
}
export interface Conversation {
  role: string;
  content: string;
}

export interface ChatRequestBody {
  id: string;
  prompt: string;
  conversation_id: string | null;
}

export interface ChatResponse {
  id: string;
  reply: string;
  conversation_id: string;
}
