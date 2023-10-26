import { MessageFull } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import generateId from '../../generateId';
import { sendMessage } from './chatThunks';

interface ChatState {
  chat: MessageFull[];
  fetching: boolean;
  sending: boolean;
  totalMessages: number;

  authorizationLoading: boolean;
  error: string;
}

const initialState: ChatState = {
  chat: [],
  fetching: false,
  sending: false,
  totalMessages: 0,
  authorizationLoading: false,
  error: '',
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addNewMessage: (state, { payload: message }: PayloadAction<string>) => {
      const userMessage: MessageFull = {
        role: 'user',
        content: message,
        id: generateId(),
      };
      state.chat.push(userMessage);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state) => {
      state.sending = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, { payload: botResponse }) => {
      const botMessage: MessageFull = {
        role: 'assistant',
        content: botResponse.response,
        id: generateId(),
      };

      state.sending = false;
      state.chat.push(botMessage);
    });
    builder.addCase(sendMessage.rejected, (state) => {
      state.sending = false;
    });
  },
});

export const chatsReducer = chatsSlice.reducer;
export const { addNewMessage } = chatsSlice.actions;
export const selectChat = (state: RootState) => state.chats.chat;
export const selectFetchingChats = (state: RootState) => state.chats.fetching;
export const selectSendingMsg = (state: RootState) => state.chats.sending;
export const selectTotalMessages = (state: RootState) => state.chats.totalMessages;
export const selectAuthLoading = (state: RootState) => state.chats.authorizationLoading;
