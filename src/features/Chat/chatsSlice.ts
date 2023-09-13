import { ConversationData, ConversationFull, MessageFull, User } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import generateId from '../../generateId';
import { getChatById, sendMessage } from './chatThunks';
import { login, register } from '../User/usersThunks';

interface ChatState {
  chatsHistory: ConversationData[];
  selectedChat: ConversationFull;
  fetching: boolean;
  sending: boolean;
  totalMessages: number;
  user: User | null;
  authorizationLoading: boolean;
}

const initialState: ChatState = {
  chatsHistory: [],
  selectedChat: { conversation_id: '', conversation: [] },
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
    startNewChat: (state) => {
      state.selectedChat = {
        conversation_id: '',
        conversation: [],
      };
    },
    addNewMessage: (state, { payload: message }: PayloadAction<string>) => {
      const userMessage: MessageFull = {
        role: 'user',
        content: message,
        id: generateId(),
      };
      state.selectedChat.conversation.push(userMessage);
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
      const botMessage: MessageFull = {
        role: 'assistant',
        content: botResponse.reply,
        id: generateId(),
      };

      state.sending = false;
      if (state.selectedChat.conversation.length === 1) {
        state.selectedChat.conversation_id = botResponse.conversation_id;
      }
      state.selectedChat.conversation.push(botMessage);
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
    builder.addCase(register.rejected, (state) => {
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
    builder.addCase(login.rejected, (state) => {
      state.authorizationLoading = false;
    });
    builder.addCase(getChatById.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(getChatById.fulfilled, (state, { payload: chat }) => {
      state.fetching = false;
      const { conversation_id, conversation } = chat;
      state.selectedChat = {
        conversation_id,
        conversation,
      };
    });
    builder.addCase(getChatById.rejected, (state) => {
      state.fetching = false;
    });
  },
});

export const chatsReducer = chatsSlice.reducer;
export const { startNewChat, addNewMessage, unsetUser } = chatsSlice.actions;

export const selectHistory = (state: RootState) => state.chats.chatsHistory;
export const selectChat = (state: RootState) => state.chats.selectedChat;
export const selectFetchingChats = (state: RootState) => state.chats.fetching;
export const selectSendingMsg = (state: RootState) => state.chats.sending;
export const selectTotalMessages = (state: RootState) => state.chats.totalMessages;
export const selectUser = (state: RootState) => state.chats.user;
export const selectAuthLoading = (state: RootState) => state.chats.authorizationLoading;
