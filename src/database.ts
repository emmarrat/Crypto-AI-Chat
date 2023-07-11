import { Chat, HistoryChats } from './types';
import { MOCK_DATA, MOCK_DATA_FIFTEEN, MOCK_DATA_FIVE } from './constants';

export const HISTORY_CHATS: HistoryChats[] = [
  {
    id: '1',
    title: 'Starting chat',
    chatId: '1',
  },
  {
    id: '2',
    title: 'Crypto news for last week',
    chatId: '2',
  },
  {
    id: '3',
    title: 'Doggy coin is still relevant?',
    chatId: '3',
  },
];

export const CHATS: Chat[] = [
  { id: '1', chat: MOCK_DATA },
  { id: '2', chat: MOCK_DATA_FIFTEEN },
  { id: '3', chat: MOCK_DATA_FIVE },
];
