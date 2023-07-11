import { configureStore } from '@reduxjs/toolkit';
import { chatsReducer } from '../Features/Chat/chatsSlice';

export const store = configureStore({
  reducer: { chats: chatsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
