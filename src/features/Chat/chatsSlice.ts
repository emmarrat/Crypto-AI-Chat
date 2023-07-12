import { HistoryChats, Chat, Message } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CHATS, HISTORY_CHATS } from '../../constants';
import generateId from '../../generateId';

interface ChatState {
  chatsHistory: HistoryChats[];
  selectedChat: Chat | null;
  chat: Message[];
  allChats: Chat[];
  fetching: boolean;
  sending: boolean;
}

const initialState: ChatState = {
  chatsHistory: HISTORY_CHATS,
  selectedChat: null,
  chat: [],
  allChats: CHATS,
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
  extraReducers: (builder) => {},
});

export const chatsReducer = chatsSlice.reducer;
export const { selectChatFromHistory, addNewMessage, startNewChat } = chatsSlice.actions;

export const selectHistory = (state: RootState) => state.chats.chatsHistory;
export const selectChat = (state: RootState) => state.chats.chat;
export const selectFetchingChats = (state: RootState) => state.chats.fetching;
export const selectSendingMsg = (state: RootState) => state.chats.sending;
