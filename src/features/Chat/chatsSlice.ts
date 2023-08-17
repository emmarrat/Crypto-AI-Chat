import { HistoryChats, Chat, Message } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CHATS, HISTORY_CHATS, LIMIT_MESSAGES } from '../../constants';
import generateId from '../../generateId';
import { sendMessage } from './chatThunks';

interface ChatState {
  chatsHistory: HistoryChats[];
  selectedChat: Chat | null;
  chat: Message[];
  allChats: Chat[];
  fetching: boolean;
  sending: boolean;
  totalMessages: number;
}

const initialState: ChatState = {
  chatsHistory: [],
  selectedChat: null,
  chat: [],
  allChats: CHATS,
  fetching: false,
  sending: false,
  totalMessages: 0,
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
        const existingChat = state.allChats.find((chat) => {
          return chat.id === existingIndex.chatId;
        });
        state.chat = existingChat?.chat || [];
        state.selectedChat = existingChat || null;
      }
    },
    addNewMessage: (state, { payload: message }: PayloadAction<Message>) => {
      if (state.chat.length > 0) {
        state.chat.push(message);
        const selectedChatIndex = state.allChats.findIndex(
          (chat) => chat.id === state.selectedChat?.id,
        );
        if (selectedChatIndex !== -1) {
          state.allChats[selectedChatIndex].chat.push(message);
        }
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
        state.chatsHistory = [...state.chatsHistory, newHistoryChat];
        state.allChats = [...state.allChats, newChat];
        state.chat = newChat.chat;
        state.selectedChat = newChat;
      }
      if (message.role === 'user' && state.totalMessages < LIMIT_MESSAGES) {
        state.totalMessages += 1;
      }
    },

    startNewChat: (state) => {
      const newHistoryChat: HistoryChats = {
        id: generateId(),
        title: '',
        chatId: generateId(),
      };
      const newChat: Chat = {
        id: newHistoryChat.chatId,
        chat: [],
      };
      state.chat = newChat.chat;
      state.selectedChat = newChat;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state) => {
      state.sending = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, { payload: botResponse }) => {
      const botMessage = {
        role: 'assistant',
        text: botResponse,
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
  },
});

export const chatsReducer = chatsSlice.reducer;
export const { selectChatFromHistory, addNewMessage, startNewChat } = chatsSlice.actions;

export const selectHistory = (state: RootState) => state.chats.chatsHistory;
export const selectChat = (state: RootState) => state.chats.chat;
export const selectFetchingChats = (state: RootState) => state.chats.fetching;
export const selectSendingMsg = (state: RootState) => state.chats.sending;
export const selectTotalMessages = (state: RootState) => state.chats.totalMessages;
