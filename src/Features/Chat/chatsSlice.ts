import { Messages } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface ChatState {
  chatsHistory: History[];
  chat: Messages | null;
  fetching: boolean;
  sending: boolean;
}

const initialState: ChatState = {
  chatsHistory: [],
  chat: null,
  fetching: false,
  sending: false,
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const chatsReducer = chatsSlice.reducer;
export const {} = chatsSlice.actions;

export const selectHistory = (state: RootState) => state.chats.chatsHistory;
export const selectChat = (state: RootState) => state.chats.chat;
export const selectFetchingChats = (state: RootState) => state.chats.fetching;
export const selectSendingMsg = (state: RootState) => state.chats.sending;
