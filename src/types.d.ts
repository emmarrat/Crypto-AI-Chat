export interface Chat {
  id: string;
  chat: MessageFull[];
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
export interface ConversationFull {
  conversation_id: string;
  conversation: MessageFull[];
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
export interface Message {
  role: string;
  content: string;
}

export interface MessageFull extends Message {
  id: string;
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

export interface ConversationId {
  id: string;
  conversation_id: string;
}

export interface ChatFullData extends ConversationId {
  conversation_name: string;
  conversation: Message[];
}

export interface ChatFull extends ConversationId {
  conversation_name: string;
  conversation: MessageFull[];
}

export interface GlobalError {
  detail: string;
}
