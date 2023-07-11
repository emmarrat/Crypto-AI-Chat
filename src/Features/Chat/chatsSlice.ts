import { HistoryChats, Chat, Message } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CHATS, HISTORY_CHATS } from '../../constants';

interface ChatState {
  chatsHistory: HistoryChats[];
  chat: Chat | null;
  fetching: boolean;
  sending: boolean;
}

const initialState: ChatState = {
  chatsHistory: HISTORY_CHATS,
  chat: null,
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
        state.chat = existingChat || null;
      }
    },
    addNewMessage: (state, { payload: message }: PayloadAction<Message>) => {
      if (state.chat) {
        state.chat.chat.push(message);
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
