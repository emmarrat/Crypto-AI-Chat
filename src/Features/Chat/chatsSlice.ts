import { HistoryChats, Chat, Message } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CHATS, HISTORY_CHATS } from '../../constants';
import generateId from '../../generateId';

interface ChatState {
  chatsHistory: HistoryChats[];
  selectedChat: Chat | null;
  chat: Message[];
  fetching: boolean;
  sending: boolean;
}

const initialState: ChatState = {
  chatsHistory: HISTORY_CHATS,
  selectedChat: null,
  chat: [],
  fetching: false,
  sending: false,
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    selectChatFromHistory: (state, { payload: chat }: PayloadAction<HistoryChats>) => {
      const existingIndex = state.chatsHistory.find((item) => {
        return item.id === chat.id;
      });
      if (existingIndex) {
        const existingChat = CHATS.find((chat) => {
          return chat.id === existingIndex.chatId;
        });
        state.chat = existingChat?.chat || [];
        state.selectedChat = existingChat || null;
      }
    },
    addNewMessage: (state, { payload: message }: PayloadAction<Message>) => {
      if (state.chat.length > 0) {
        state.chat.push(message);
      } else {
        const newHistoryChat: HistoryChats = {
          id: generateId(),
          title: message.text.slice(0, 20),
          chatId: generateId(),
        };
        const newChat: Chat = {
          id: newHistoryChat.chatId,
          chat: [message],
        };
        state.chatsHistory.push(newHistoryChat);
        state.chat = newChat.chat;
        state.selectedChat = newChat;
      }
    },
  },
  extraReducers: (builder) => {},
});

export const chatsReducer = chatsSlice.reducer;
export const { selectChatFromHistory, addNewMessage } = chatsSlice.actions;

export const selectHistory = (state: RootState) => state.chats.chatsHistory;
export const selectChat = (state: RootState) => state.chats.chat;
export const selectFetchingChats = (state: RootState) => state.chats.fetching;
export const selectSendingMsg = (state: RootState) => state.chats.sending;
