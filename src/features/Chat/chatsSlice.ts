import { Chat, ConversationData, Message, User } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CHATS, LIMIT_MESSAGES } from '../../constants';
import generateId from '../../generateId';
import { sendMessage } from './chatThunks';
import { login, register } from '../User/usersThunks';

interface ChatState {
  chatsHistory: ConversationData[];
  selectedChat: Chat | null;
  chat: Message[];
  allChats: Chat[];
  fetching: boolean;
  sending: boolean;
  totalMessages: number;
  user: User | null;
  authorizationLoading: boolean;
}

const initialState: ChatState = {
  chatsHistory: [],
  selectedChat: null,
  chat: [],
  allChats: CHATS,
  fetching: false,
  sending: false,
  totalMessages: 0,
  user: null,
  authorizationLoading: false,
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addNewMessage: (state, { payload: message }: PayloadAction<Message>) => {
      state.chat.push(message);
    },
    unsetUser: (state) => {
      state.user = null;
      state.chatsHistory = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state) => {
      state.sending = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, { payload: botResponse }) => {
      const botMessage = {
        role: 'assistant',
        text: botResponse.reply,
        id: generateId(),
      };
      state.sending = false;

      if (state.totalMessages < LIMIT_MESSAGES) {
        state.totalMessages += 1;
        state.chat.push(botMessage);
        const selectedChatIndex = state.allChats.findIndex(
          (chat) => chat.id === state.selectedChat?.id,
        );
        if (selectedChatIndex !== -1) {
          state.allChats[selectedChatIndex].chat.push(botMessage);
        }
      }
    });
    builder.addCase(sendMessage.rejected, (state) => {
      state.sending = false;
    });
    builder.addCase(register.pending, (state) => {
      state.authorizationLoading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload: user }) => {
      state.authorizationLoading = false;
      state.user = {
        id: user.id,
        email: user.email,
        paid: user.paid,
        bill_date: user.bill_date,
      };
      state.chatsHistory = user.conversations;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.authorizationLoading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.authorizationLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload: user }) => {
      state.authorizationLoading = false;
      state.user = {
        id: user.id,
        email: user.email,
        paid: user.paid,
        bill_date: user.bill_date,
      };
      state.chatsHistory = user.conversations;
    });
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.authorizationLoading = false;
    });
  },
});

export const chatsReducer = chatsSlice.reducer;
export const { addNewMessage, unsetUser } = chatsSlice.actions;

export const selectHistory = (state: RootState) => state.chats.chatsHistory;
export const selectChat = (state: RootState) => state.chats.chat;
export const selectFetchingChats = (state: RootState) => state.chats.fetching;
export const selectSendingMsg = (state: RootState) => state.chats.sending;
export const selectTotalMessages = (state: RootState) => state.chats.totalMessages;
export const selectUser = (state: RootState) => state.chats.user;
export const selectAuthLoading = (state: RootState) => state.chats.authorizationLoading;
